/* motion-igor element · swoosh-wipe
 * A slide transition on a TRANSPARENT stage. A thick S-curve band in the accent colour sweeps in from
 * content.from ("left" | "right"), a second trailing band (content.trail, default c1) riding just behind it
 * for depth. The accent band widens until it covers the whole frame, holds for 0.1 s, then collapses into a
 * thin, pointed S-curve tail that sweeps out the far side, revealing what is underneath; the trailing band
 * thins out and leaves alongside it. The first and last frames are empty.
 *
 * COVER MOMENT: the frame is fully covered from coverAt - 0.05 to coverAt + 0.05 (coverAt = 0.7 s by default).
 * Valid range 0.25 to 1.15 s (duration minus 0.25); a value outside it is clamped and the clamped value is
 * written back into content.coverAt, so a deck can always swap the slide underneath at that moment, e.g.
 *   inst.tl.call(function () { showNextSlide(); }, null, inst.ctx.content.coverAt);
 *
 * content.trail: any theme role ("c1", "c2", ...) or "tint" (a light tint of the accent).
 *
 * Geometry: in a frame rotated so the band's spine leans up and to the right, each edge is u = offset + f(w)
 * with f a deep sine (the S). The band's u-width is scaled by sqrt(1 + f'^2) so its true thickness is even.
 * Everything is drawn from t alone in ctx.onDraw (closed-form offsets); crisp fills, no blur, and a thin white
 * highlight line rides the edge that is moving.
 */
(function () {
MotionIgor.define({
  id: "swoosh-wipe",
  duration: 1.4,
  size: [1920, 1080],
  kind: "element",
  title: "Swoosh wipe transition",
  style: "Extras · swoosh wipe",
  engine: "svg",
  defaults: {
    from: "left",
    coverAt: 0.7,
    trail: "c1"
  },
  build: function (ctx) {
    var c = ctx.content, th = ctx.theme, u = ctx.util, W = ctx.W, H = ctx.H;
    var S = function (tag, attrs, parent) { return u.svg(tag, attrs, parent); };
    var E = function (name) { return ctx.gsap.parseEase(name); };
    ctx.stage.style.background = "transparent";

    var END = 1.4, HOLD = 0.05;
    var COVER = u.clamp(isFinite(+c.coverAt) && c.coverAt !== "" ? +c.coverAt : 0.7, 0.25, END - 0.25);
    c.coverAt = COVER;                                    // decks read the value actually used
    var IN_END = COVER - HOLD, OUT_START = COVER + HOLD;
    var flip = String(c.from).toLowerCase() === "right";

    function mixWhite(hex, k) {
      var m = /^#?([0-9a-f]{6})$/i.exec(String(hex || ""));
      if (!m) return hex;
      var n = parseInt(m[1], 16), ch = [n >> 16 & 255, n >> 8 & 255, n & 255].map(function (v) { return Math.round(v + (255 - v) * k); });
      return "rgb(" + ch.join(",") + ")";
    }
    var trailCol = c.trail === "tint" ? mixWhite(th.accent, 0.5) : (th[c.trail] || th.c1 || th.c2 || th.ink);

    // Rotated frame: U is the sweep direction (right and a little down), V the spine (up and to the right).
    var AL = 30 * Math.PI / 180, Ux = Math.cos(AL), Uy = Math.sin(AL), Vx = Math.sin(AL), Vy = -Math.cos(AL);
    var cx = W / 2, cy = H / 2;
    var corners = [[0, 0], [W, 0], [0, H], [W, H]], uMax = 0, wMax = 0;
    corners.forEach(function (p) {
      var dx = p[0] - cx, dy = p[1] - cy;
      uMax = Math.max(uMax, Math.abs(dx * Ux + dy * Uy)); wMax = Math.max(wMax, Math.abs(dx * Vx + dy * Vy));
    });
    var SPAN = 2 * wMax;                                  // spine length across the frame
    var A = SPAN * 0.13, K = 2 * Math.PI / (SPAN * 1.05), PH = 0.5;   // one deep S across the frame
    var T = SPAN * 0.105;                                  // band thickness on the way in (~215 px at 1080p)
    var TC = T * 0.5;                                      // trailing band thickness
    var TT = T * 0.75;                                     // tail thickness at its thick end
    var MG = 30;                                           // safety margin: no gap at any corner
    var N = 96, W0 = -wMax - 60, W1 = wMax + 60, ws = [], fw = [], sw = [], tp = [], SMAX = 1;
    for (var i = 0; i <= N; i++) {
      var w = W0 + (W1 - W0) * i / N;
      ws.push(w);
      fw.push(A * Math.sin(K * w + PH));
      var s = Math.sqrt(1 + Math.pow(A * K * Math.cos(K * w + PH), 2));
      sw.push(s); SMAX = Math.max(SMAX, s);
      var n = (w + wMax) / (2 * wMax);                     // 0 at the bottom-left end, 1 at the top-right end
      tp.push(Math.pow(Math.sin(Math.PI * u.clamp((n - 0.06) / 0.86, 0, 1)), 0.75)); // lens: pointed at both ends
    }
    var HWC = uMax + A + MG;                               // half width that covers the frame
    var C0 = -uMax - A - (T / 2 + TC) * SMAX - MG;         // entry: whole band set off-screen
    // Exact screen extent along U at each spine sample: the exit starts where the frame is only just covered
    // and ends where the last pixel has gone, so the cover window stays 0.1 s and no time is spent off-screen.
    var bLo = Infinity, bHi = -Infinity, TMAX = 0;
    for (var j = 0; j <= N; j++) {
      var wj = ws[j];
      var lo = Math.max((-cx - wj * Vx) / Ux, (-cy - wj * Vy) / Uy);
      var hi = Math.min((W - cx - wj * Vx) / Ux, (H - cy - wj * Vy) / Uy);
      TMAX = Math.max(TMAX, TT * tp[j] * sw[j]);
      if (lo > hi) continue;                               // this spine sample misses the frame
      bLo = Math.min(bLo, lo - fw[j] - 24); bHi = Math.max(bHi, hi - fw[j] + 24);
    }

    var travelE = E("power3.out"), widenE = E("power2.in"), backE = function (r) { return 0.4 * r + 0.6 * r * r; }, tailE = function (r) { return 0.15 * r + 0.85 * r * r; };
    // exit eases above move at once (no extra hold after the cover window), then accelerate out

    // Edge offsets at time t, as u-offsets from f(w): the accent runs from b to b + ev(i) * sw[i] + ex(i), so the
    // band thickness ev is drawn even (scaled by sw) and any extra cover width ex is a plain parallel shift (the
    // front stays a clean S at every width). The trailing band runs from b - tc(i) * sw[i] to b.
    function state(t) {
      if (t <= OUT_START) {
        var q = u.clamp(t / IN_END, 0, 1);
        var C = u.lerp(C0, 0, travelE(q));
        var hw = u.lerp(T / 2, HWC, widenE(u.clamp((q - 0.3) / 0.7, 0, 1)));
        return { b: C - hw, ev: function () { return T; }, ex: function () { return 2 * hw - T; }, tc: function () { return TC; }, out: false };
      }
      var rb = u.clamp((t - OUT_START) / (END - 0.2 - OUT_START), 0, 1);  // body leaves first
      var rt = u.clamp((t - OUT_START) / (END - 0.01 - OUT_START), 0, 1);   // the tail chases it and leaves last
      var bt = u.lerp(bLo - TMAX, bHi, tailE(rt));
      return {
        b: u.lerp(bLo, bHi, backE(rb)),
        ev: function () { return 0; },
        ex: function () { return 2 * HWC; },               // the body's front never retreats: it is past the far side
        tc: function () { return TC * (1 - rb); },
        tb: bt, tt: function (i) { return TT * tp[i]; },
        out: true
      };
    }

    var root = S("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, style: "position:absolute;inset:0;display:block;overflow:hidden" }, ctx.stage);
    var g = S("g", flip ? { transform: "matrix(-1 0 0 1 " + W + " 0)" } : {}, root);
    var pK = S("path", { fill: trailCol, d: "" }, g);
    var pA = S("path", { fill: th.accent, d: "" }, g);
    var hl = S("path", { fill: "none", stroke: "#ffffff", "stroke-width": 4, "stroke-opacity": 0.6, "stroke-linejoin": "round", "stroke-linecap": "round", d: "" }, g);

    function pt(uu, i) {
      var x = cx + uu * Ux + ws[i] * Vx, y = cy + uu * Uy + ws[i] * Vy;
      return (Math.round(x * 10) / 10) + " " + (Math.round(y * 10) / 10);
    }
    function onScreen(uu, i) {
      var x = cx + uu * Ux + ws[i] * Vx, y = cy + uu * Uy + ws[i] * Vy;
      return x > -4 && x < W + 4 && y > -4 && y < H + 4;
    }
    // Region between back offset lo(i) and front offset hi(i) (both already include f(w)).
    function region(lo, hi) {
      var a = [], z = [], any = false;
      for (var i = 0; i <= N; i++) {
        var l = lo(i), h = Math.max(hi(i), l);
        if (h - l > 0.5 && l < uMax + 4 && h > -uMax - 4) any = true;
        a.push(pt(h, i)); z.push(pt(l, i));
      }
      return any ? "M" + a.join("L") + "L" + z.reverse().join("L") + "Z" : "";
    }
    function draw(t) {
      var s = state(t);
      var back = function (i) { return s.b + fw[i]; };
      var front = function (i) { return s.b + fw[i] + s.ev(i) * sw[i] + s.ex(i); };
      pK.setAttribute("d", region(function (i) { return back(i) - s.tc(i) * sw[i]; }, function (i) { return Math.min(back(i) + 12, (back(i) + front(i)) / 2); }));
      var body = region(back, front);
      if (s.out) {                                         // the pointed accent tail, an S-curve lens of its own
        var tl0 = function (i) { return s.tb + fw[i]; };
        body += region(tl0, function (i) { return tl0(i) + s.tt(i) * sw[i]; });
      }
      pA.setAttribute("d", body);
      // highlight just inside the moving edge: the front on the way in, the back on the way out
      var pts = [], any = false;
      for (var i = 0; i <= N; i++) {
        var l = back(i), h = front(i), inset = Math.min(5, (h - l) / 2);
        var uu = s.out ? l + inset : h - inset;
        if (h - l > 2 && onScreen(uu, i)) any = true;
        pts.push(pt(uu, i));
      }
      hl.setAttribute("d", any ? "M" + pts.join("L") : "");
    }
    ctx.onDraw(draw);
    draw(END); // final state: the tail has left through the far side, stage empty
  }
});
})();
