/*!
 * motion-igor · core runtime
 * A small kit of seekable animations for HTML presentations, websites and HyperFrames videos.
 *
 * The one contract: every module builds ONE paused GSAP timeline of fixed length.
 *   - A page or deck plays it (player below).
 *   - HyperFrames seeks it frame by frame (MotionIgor.hyperframes).
 *   - The export tool records it to MP4 through HyperFrames.
 * Canvas and WebGL modules draw from the timeline's time (ctx.onDraw), never from a clock,
 * so the same t always gives the same picture.
 *
 * Classic script (no ES modules) on purpose: it must run from file:// in a classroom and
 * build its timelines synchronously for HyperFrames.
 */
(function (global) {
  "use strict";

  var gsap = global.gsap;
  if (!gsap) throw new Error("motion-igor: load vendor/gsap.min.js before motion-igor.js");
  ["MorphSVGPlugin", "DrawSVGPlugin"].forEach(function (p) { if (global[p]) gsap.registerPlugin(global[p]); });
  // force3D false: GSAP otherwise writes translate3d mid-tween and 2D at rest, which promotes text to GPU layers (rule 10)
  // and makes a frame depend on seek history. Set through gsap.config (a CSS setting) because timeline defaults also
  // reach plain-object tweens and log "Invalid property force3D". Note: this applies to the whole page's GSAP.
  gsap.config({ force3D: false });

  // Where the kit folder is, for assets (logo). Order: explicit override, this script's own src,
  // any <script> whose src names the kit, else "kit/" (pages that inline the scripts, e.g. HyperFrames check).
  var KIT_BASE = (function () {
    if (global.MOTION_IGOR_BASE) return String(global.MOTION_IGOR_BASE).replace(/\/?$/, "/");
    var s = document.currentScript && document.currentScript.src;
    if (s && /motion-igor(\.bundle)?\.js(\?|$)/.test(s)) return s.replace(/[^/]*$/, "");
    var tags = document.querySelectorAll("script[src]");
    for (var i = 0; i < tags.length; i++) if (/motion-igor(\.bundle)?\.js(\?|$)/.test(tags[i].src)) return tags[i].src.replace(/[^/]*$/, "");
    return "kit/";
  })();

  // ------------------------------------------------------------------ themes
  // Roles every module reads. Modules never hard-code colours.
  //   paper: background   ink: main text   muted: secondary text
  //   accent: the one loud colour (the "dot")   c1..c4: supporting palette
  //   dark: deep background for night scenes    glass: translucent card fill
  var THEMES = {
    // The AIS product family (Observation Dashboard house style, brand/brand.md).
    ais: {
      name: "AIS", paper: "#ece9df", ink: "#14233f", muted: "#586479", accent: "#C9890C",
      c1: "#1257FF", c2: "#2ea15a", c3: "#D7382B", c4: "#3CBBEC", dark: "#060816",
      glass: "rgba(255,255,255,.66)", display: "'Lora', Georgia, serif", body: "'Inter', system-ui, sans-serif",
      logo: null
    },
    // Full AIS brand: official logo colours from the approved colour sheet, plus the logo.
    "ais-brand": {
      name: "AIS brand", paper: "#f7f5f0", ink: "#000019", muted: "#4a5068", accent: "#EF343A",
      c1: "#1257FF", c2: "#FFBA14", c3: "#3CBBEC", c4: "#BE2126", dark: "#000019",
      glass: "rgba(255,255,255,.62)", display: "'Lora', Georgia, serif", body: "'Inter', system-ui, sans-serif",
      logo: { light: "assets/ais-logo-navy.png", dark: "assets/ais-logo-white.png", aspectLight: 1400 / 465, aspectDark: 1400 / 530, aspect: 1400 / 530 }
    },
    // The source look (close to Vincent's reel), for comparison in the lab.
    vivid: {
      name: "Vivid", paper: "#fbf6e9", ink: "#141428", muted: "#6b6b80", accent: "#F2484B",
      c1: "#2A1FE8", c2: "#46F2A0", c3: "#F7C832", c4: "#7B6CFF", dark: "#0b0b1a",
      glass: "rgba(255,255,255,.14)", display: "'Outfit', system-ui, sans-serif", body: "'Outfit', system-ui, sans-serif",
      logo: null
    }
  };

  function resolveTheme(t) {
    if (!t) return Object.assign({}, THEMES.ais, { id: "ais" });
    if (typeof t === "string") return Object.assign({}, THEMES[t] || THEMES.ais, { id: THEMES[t] ? t : "ais" });
    return Object.assign({}, THEMES.ais, t, { id: t.id || "custom" });
  }

  // ------------------------------------------------------------------ utils
  function prng(seed) { // mulberry32: deterministic random
    var a = (seed >>> 0) || 1;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var SVGNS = "http://www.w3.org/2000/svg";
  function svg(tag, attrs, parent) {
    var n = document.createElementNS(SVGNS, tag);
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function el(tag, cls, parent, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    if (parent) parent.appendChild(n);
    return n;
  }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  // Progress of t inside [a,b], clamped to 0..1, optionally eased (GSAP ease string).
  function seg(t, a, b, ease) {
    var p = clamp((t - a) / (b - a), 0, 1);
    return ease ? gsap.parseEase(ease)(p) : p;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function deepMerge(a, b) {
    var out = Array.isArray(a) ? a.slice() : Object.assign({}, a);
    if (!b) return out;
    Object.keys(b).forEach(function (k) {
      var bv = b[k], av = out[k];
      out[k] = (av && bv && typeof av === "object" && typeof bv === "object" && !Array.isArray(av) && !Array.isArray(bv)) ? deepMerge(av, bv) : bv;
    });
    return out;
  }
  // Inline builds (motion-igor.inline.js) put every asset in window.MOTION_IGOR_ASSETS as a data URI.
  function asset(path) {
    var inl = global.MOTION_IGOR_ASSETS;
    if (inl && inl[path]) return inl[path];
    return /^(https?:|data:|\/)/.test(path) ? path : KIT_BASE + path;
  }

  // ------------------------------------------------------------------ registry
  var REG = {};
  /**
   * define({ id, kind:"scene"|"element", title, style, duration, size:[w,h], engine:"dom"|"svg"|"canvas"|"webgl",
   *          theme?: preferred theme id when the caller gives none, defaults:{...content}, build(ctx) })
   * build(ctx) must add its tweens to ctx.tl synchronously. Optional return { destroy(), resize() }.
   */
  function define(def) {
    if (!def || !def.id || typeof def.build !== "function") throw new Error("motion-igor: define() needs id and build");
    def.kind = def.kind || "element";
    def.size = def.size || [1920, 1080];
    def.engine = def.engine || "dom";
    def.defaults = def.defaults || {};
    REG[def.id] = def;
    return def;
  }

  // ------------------------------------------------------------------ mount
  var STYLE_ID = "motion-igor-base-css";
  function ensureBaseCss() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent =
      ".mi-host{overflow:hidden}" +
      ".mi-stage{position:absolute;left:0;top:0;transform-origin:0 0;overflow:hidden}" +
      ".mi-stage *{box-sizing:border-box}" +
      ".mi-layer{position:absolute;inset:0}";
    document.head.appendChild(s);
  }

  /**
   * mount(host, id, opts) -> instance
   * opts: { content, theme, seed, fit:"contain"|"cover"|"width", background:true, params }
   */
  function mount(host, id, opts) {
    var def = REG[id];
    if (!def) throw new Error("motion-igor: unknown module '" + id + "'. Is its script loaded?");
    opts = opts || {};
    ensureBaseCss();
    if (host._mi) host._mi.destroy();
    // A page saved with its animations already rendered (e.g. a frontend-slides deck exported with Cmd+S)
    // carries a baked .mi-stage; drop it so the fresh mount is the only one.
    Array.prototype.slice.call(host.children).forEach(function (c) { if (c.classList && c.classList.contains("mi-stage")) c.remove(); });
    host.classList.add("mi-host");
    if (global.getComputedStyle(host).position === "static") host.style.position = "relative";
    host.setAttribute("data-mi-fit", opts.fit || "contain");

    var W = (opts.size && opts.size[0]) || def.size[0];
    var H = (opts.size && opts.size[1]) || def.size[1];
    if (!host.style.aspectRatio && !host.style.height && host.clientHeight < 2) host.style.aspectRatio = W + " / " + H;

    var theme = resolveTheme(opts.theme || def.theme);
    var stage = el("div", "mi-stage", host);
    stage.style.width = W + "px";
    stage.style.height = H + "px";
    stage.style.fontFamily = theme.body;
    stage.style.color = theme.ink;
    if (opts.background !== false) {
      stage.style.background = theme.paper;
      // Letterbox bars (host shape differs from the design shape) take the theme background, not white.
      if (!host.style.background && !host.style.backgroundColor) { host.style.background = theme.paper; host._miBg = true; }
    }

    var tl = gsap.timeline({ paused: true });
    var draws = [];
    var clock = { t: 0 };
    var scale = 1;
    var content = deepMerge(def.defaults, opts.content || {});
    var canvases = [];
    var children = [];

    var ctx = {
      def: def, host: host, stage: stage, W: W, H: H, theme: theme, content: content,
      params: Object.assign({}, def.params || {}, opts.params || {}),
      tl: tl, gsap: gsap, seed: opts.seed != null ? opts.seed : 1234, rand: prng(opts.seed != null ? opts.seed : 1234),
      util: { svg: svg, el: el, clamp: clamp, lerp: lerp, seg: seg, prng: prng, esc: esc, asset: asset },
      // Register a pure draw(t) function, called whenever the timeline time changes.
      onDraw: function (fn) { draws.push(fn); },
      // A canvas that covers the stage at real device resolution: canvas({ webgl, maxPr, cpu }). Returns { canvas, g, pr }.
      canvas: function (o) {
        o = o || {};
        var c = el("canvas", "mi-layer", stage);
        // maxPr caps the pixel ratio (e.g. 1 for heavy shaders: render at design size, the browser scales it).
        var info = { canvas: c, g: null, pr: 1, webgl: !!o.webgl, maxPr: o.maxPr || 2 };
        if (o.webgl) {
          info.g = c.getContext(o.webgl === 1 ? "webgl" : "webgl2", { premultipliedAlpha: true, antialias: true, preserveDrawingBuffer: true, alpha: o.alpha !== false });
        } else {
          // cpu: true keeps the 2D canvas on the CPU (willReadFrequently). Slow in WebKit at full stage size (re-uploaded
          // every frame): prefer small CPU-backed sprites blitted onto a normal canvas (AUTHORING rule 12).
          info.g = o.cpu ? c.getContext("2d", { willReadFrequently: true }) : c.getContext("2d");
        }
        canvases.push(info);
        sizeCanvas(info);
        return info;
      },
      // Play another module inside this one: mounts module `id` into `childHost` (an element inside the stage). The child
      // stays paused and is seeked from the parent's time: child time = clamp(t - at, 0, dur) + offset. So seeking the
      // parent seeks the child, the child never stretches the parent's length, and `offset` starts it mid-way.
      // o: { at, dur, offset, theme, content, seed, fit, background }. Showing or hiding the child's host outside its
      // window is the parent module's job. The child is destroyed with the parent. Used by reel-layout and grid-finale.
      nest: function (childHost, childId, o) {
        o = o || {};
        var child = mount(childHost, childId, { theme: o.theme || opts.theme || def.theme, content: o.content, seed: o.seed,
          fit: o.fit, background: o.background, size: o.size });
        var at = o.at || 0, off = o.offset || 0, dur = o.dur != null ? o.dur : child.duration - off;
        var last = null; // skip the seek when the child's time has not changed (same input, same picture)
        draws.push(function (t) { var ct = clamp(t - at, 0, dur) + off; if (ct !== last) { last = ct; child.seek(ct); } });
        children.push(child);
        return child;
      },
      time: function () { return clock.t; },
      logoUrl: function (dark) { return theme.logo ? asset(dark ? theme.logo.dark : theme.logo.light) : null; },
      // Width / height of the logo file logoUrl(dark) returns (the two files differ).
      logoAspect: function (dark) { return theme.logo ? (dark ? theme.logo.aspectDark : theme.logo.aspectLight) || theme.logo.aspect : null; }
    };

    function sizeCanvas(info) {
      var pr = Math.min(global.devicePixelRatio || 1, 2) * scale;
      pr = clamp(pr, 0.25, info.maxPr);
      info.pr = pr;
      info.canvas.width = Math.round(W * pr);
      info.canvas.height = Math.round(H * pr);
      info.canvas.style.width = W + "px";
      info.canvas.style.height = H + "px";
      if (!info.webgl) info.g.setTransform(pr, 0, 0, pr, 0, 0);
    }

    function render() { for (var i = 0; i < draws.length; i++) draws[i](clock.t, ctx); }

    var built = def.build(ctx) || {};
    if (host._miBg) host.style.background = stage.style.background || theme.paper; // match a module's own backdrop
    var duration = def.duration || tl.duration();
    // The clock tween fixes the length and drives draw(t) for canvas/WebGL modules.
    tl.fromTo(clock, { t: 0 }, { t: duration, duration: duration, ease: "none", immediateRender: true, onUpdate: render }, 0);

    function layout() {
      var w = host.clientWidth, h = host.clientHeight;
      if (!w) return;
      var fit = opts.fit || "contain";
      var s = fit === "width" ? w / W : fit === "cover" ? Math.max(w / W, h / H) : Math.min(w / W, (h || w * H / W) / H);
      var changed = Math.abs(s - scale) > 1e-4;
      scale = s;
      stage.style.transform = "translate(" + ((w - W * s) / 2) + "px," + (fit === "width" ? 0 : ((h - H * s) / 2)) + "px) scale(" + s + ")";
      if (changed && canvases.length) { canvases.forEach(sizeCanvas); if (built.resize) built.resize(scale); render(); }
    }
    var ro = global.ResizeObserver ? new ResizeObserver(layout) : null;
    if (ro) ro.observe(host);
    layout();
    render();

    var inst = {
      id: id, def: def, el: host, stage: stage, tl: tl, duration: duration, ctx: ctx,
      seek: function (t) { tl.pause(); tl.seek(clamp(t, 0, duration), false); render(); return inst; },
      play: function (from) { if (from != null) tl.seek(from, false); tl.play(); return inst; },
      pause: function () { tl.pause(); return inst; },
      replay: function () { tl.pause(); tl.seek(0, false); tl.play(); return inst; },
      end: function () { return inst.seek(duration); },
      progress: function () { return tl.time() / duration; },
      destroy: function () {
        if (inst._player) inst._player.stop();
        if (ro) ro.disconnect();
        tl.kill();
        children.forEach(function (c) { c.destroy(); });
        if (built.destroy) built.destroy();
        stage.remove();
        if (host._miBg) { host.style.background = ""; delete host._miBg; }
        host.classList.remove("mi-host");
        delete host._mi;
      }
    };
    host._mi = inst;
    return inst;
  }

  // ------------------------------------------------------------------ player
  var reduceMotion = global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * player(inst, { when, loop, threshold, replayOnEnter, trigger })
   * when:
   *   "view"     plays when at least `threshold` of the host is on screen (scroll pages, decks that hide
   *              inactive slides), resets when it leaves.
   *   "fragment" plays when its reveal step is shown: the nearest [data-fragment] ancestor (or the host)
   *              gains the class "fragment-visible" (frontend-slides decks); resets when the step is hidden.
   *   "click"    plays (from the start) when the host itself is clicked.
   *   "manual"   never starts by itself; call inst.play() / inst.replay().
   * trigger: a CSS selector or element; clicking it replays the animation (works with any `when`).
   * loop: true restarts from 0; {from:n} loops from n to the end after the first pass.
   * Reduced motion: shows the final frame, no movement.
   */
  function player(inst, o) {
    o = Object.assign({ when: "view", loop: false, threshold: 0.5, replayOnEnter: true }, o || {});
    var tl = inst.tl, io = null, mo = null, visible = false, offs = [];
    if (o.loop) {
      tl.eventCallback("onComplete", function () {
        var from = typeof o.loop === "object" && o.loop.from != null ? o.loop.from : 0;
        tl.seek(from, false); tl.play();
      });
    }
    function start() { if (reduceMotion) inst.end(); else inst.replay(); }
    function enter() {
      if (visible) return; visible = true;
      if (reduceMotion) { inst.end(); return; }
      if (o.replayOnEnter || tl.time() === 0) inst.replay(); else tl.play();
    }
    function leave() { if (!visible) return; visible = false; tl.pause(); if (o.replayOnEnter) inst.seek(0); }
    function listen(node, fn) { node.addEventListener("click", fn); offs.push(function () { node.removeEventListener("click", fn); }); }

    if (o.when === "view" && global.IntersectionObserver) {
      io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { (e.isIntersecting && e.intersectionRatio >= o.threshold - 1e-3) ? enter() : leave(); });
      }, { threshold: [0, o.threshold] });
      io.observe(inst.el);
    } else if (o.when === "fragment" && global.MutationObserver) {
      var frag = (inst.el.closest && inst.el.closest("[data-fragment]")) || inst.el;
      var check = function () { frag.classList.contains("fragment-visible") ? enter() : leave(); };
      mo = new MutationObserver(check);
      mo.observe(frag, { attributes: true, attributeFilter: ["class"] });
      check();
    } else if (o.when === "click") {
      inst.el.style.cursor = "pointer";
      listen(inst.el, start);
    } else if (reduceMotion) { inst.end(); }

    if (o.trigger) {
      var nodes = typeof o.trigger === "string" ? document.querySelectorAll(o.trigger) : [o.trigger];
      Array.prototype.forEach.call(nodes, function (n) { listen(n, function (e) { e.preventDefault(); start(); }); });
    }
    var p = { enter: enter, leave: leave, play: start, stop: function () {
      if (io) io.disconnect(); if (mo) mo.disconnect(); offs.forEach(function (f) { f(); }); tl.eventCallback("onComplete", null);
    } };
    inst._player = p;
    return p;
  }

  // ------------------------------------------------------------------ declarative auto-mount
  /**
   * <div data-motion="flat-vector" data-theme="ais" data-play="view" data-loop="true"
   *      data-trigger="#replayBtn" data-content='{"title":"..."}'></div>
   * or put the JSON in a child <script type="application/json">.
   * data-play defaults to "fragment" inside a [data-fragment] reveal step, else "view".
   */
  function auto(root) {
    root = root || document;
    var nodes = root.querySelectorAll("[data-motion]");
    var out = [];
    Array.prototype.forEach.call(nodes, function (n) {
      if (n._mi) return;
      var json = n.getAttribute("data-content");
      var sc = n.querySelector('script[type="application/json"]');
      var content = {};
      try { content = json ? JSON.parse(json) : sc ? JSON.parse(sc.textContent) : {}; } catch (e) { console.warn("motion-igor: bad JSON in", n, e); }
      var loopAttr = n.getAttribute("data-loop");
      var loop = loopAttr == null || loopAttr === "false" ? false : /^\d+(\.\d+)?$/.test(loopAttr) ? { from: parseFloat(loopAttr) } : true;
      var inst = mount(n, n.getAttribute("data-motion"), {
        content: content, theme: n.getAttribute("data-theme") || undefined,
        fit: n.getAttribute("data-fit") || undefined,
        seed: n.hasAttribute("data-seed") ? +n.getAttribute("data-seed") : undefined,
        // data-size="1080x1920": design size (portrait layouts of modules that support them)
        size: /^\d+x\d+$/.test(n.getAttribute("data-size") || "") ? n.getAttribute("data-size").split("x").map(Number) : undefined,
        background: n.getAttribute("data-background") !== "false"
      });
      var when = n.getAttribute("data-play") || (n.closest && n.closest("[data-fragment]") ? "fragment" : "view");
      if (when !== "none") player(inst, { when: when, loop: loop, trigger: n.getAttribute("data-trigger") || undefined, replayOnEnter: n.getAttribute("data-replay") !== "false" });
      out.push(inst);
    });
    return out;
  }

  // ------------------------------------------------------------------ HyperFrames adapter
  /**
   * Build the composition's single master timeline synchronously and register it.
   * items: [{ el, id, start, opts }]
   */
  function hyperframes(compositionId, items) {
    var master = gsap.timeline({ paused: true });
    (items || []).forEach(function (it) {
      var inst = mount(it.el, it.id, it.opts || {});
      master.add(inst.tl.paused(false), it.start || 0);
    });
    global.__timelines = global.__timelines || {};
    global.__timelines[compositionId] = master;
    return master;
  }

  global.MotionIgor = {
    version: "0.2.0",
    define: define, mount: mount, player: player, auto: auto, hyperframes: hyperframes,
    themes: THEMES, theme: resolveTheme, registry: REG,
    list: function (kind) { return Object.keys(REG).map(function (k) { return REG[k]; }).filter(function (d) { return !kind || d.kind === kind; }); },
    util: { prng: prng, svg: svg, el: el, clamp: clamp, lerp: lerp, seg: seg, esc: esc, deepMerge: deepMerge, asset: asset },
    base: KIT_BASE
  };
})(window);
