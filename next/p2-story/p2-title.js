/* P-2 title beat · p2-title  (option A: 3D living storybook)
 * The opening card: the sunburst with books, pencil, globe and stars. The camera eases back from the glowing centre,
 * a soft band of light turns slowly over the rays, the gold stars glint one after another, "Your weekly attendance
 * report" pops in letter by letter and the gold week pill stamps on underneath.
 * The picture moves only as a whole (no cut-outs): every effect is drawn in code over it.
 * Phone speed (24 Oct, iPhone Safari stutter): the turning light used to be a 2600 px square with filter:blur(18px) rotating under a soft-light blend and a mask,
 * which Safari re-blurred every frame (about 150 ms a frame in the WebKit rig; with the blur off, 17 ms). The rays' own ramps are already soft (the blur was
 * invisible past the masked-out centre), so the blur is gone; the big layers (world, light) are made persistent at mount (will-change, so no layer is created
 * or destroyed mid-animation) and animate transform / opacity only; the saturate filter sits on the still picture, not on the moving group.
 * Every frame is a pure function of t (kit rule 1); the bitmap is an approved exception to rule 7, like the mascot.
 */
(function () {
MotionIgor.define({
  id: "p2-title",
  duration: 4.5,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · title",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    art: "title-layers/",
    lines: [["Your", "weekly"], ["attendance"], ["report"]],
    episode: "Week 7",
    chrome: true                       // kept for the story (the week pill is part of the title and always shows)
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col, esc = ctx.util.esc;
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f";

    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function smooth(x) { return x * x * (3 - 2 * x); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }

    // ---------------------------------------------------------------- picture
    ctx.stage.style.background = "#f6ecd6";
    var CX = 540, CY = 975;                                    // the glowing centre of the rays in the picture
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + CX + "px " + CY + "px;will-change:transform");
    var pic = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none;filter:saturate(1.15)", world);
    pic.src = WD.src(c.art, "title.jpg", "title.jpg"); pic.alt = ""; pic.draggable = false;

    // a soft band of light over the rays: wide white wedges, blurred, faded at the centre and the edges, turning slowly
    var lightWrap = el("div", "position:absolute;left:" + (-WD.ox) + "px;top:0;width:" + WD.sw + "px;height:1920px;overflow:hidden;mix-blend-mode:soft-light;" +
      "-webkit-mask-image:radial-gradient(circle at " + (CX + WD.ox) + "px " + CY + "px, rgba(0,0,0,0) 90px, #000 360px, #000 900px, rgba(0,0,0,0.35) 1300px);" +
      "mask-image:radial-gradient(circle at " + (CX + WD.ox) + "px " + CY + "px, rgba(0,0,0,0) 90px, #000 360px, #000 900px, rgba(0,0,0,0.35) 1300px);will-change:opacity", world);
    var LS = WD.wide ? 4000 : 2600;                             // the turning light must cover the wide picture too
    var light = el("div", "position:absolute;left:" + (CX + WD.ox - LS / 2) + "px;top:" + (CY - LS / 2) + "px;width:" + LS + "px;height:" + LS + "px;will-change:transform;" +
      "transform-origin:50% 50%;background:repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.95) 9deg, rgba(255,255,255,0) 18deg, rgba(255,255,255,0) 60deg)", lightWrap);
    // warm glow breathing at the centre, behind the title
    var glow = el("div", "position:absolute;left:" + (CX - 520) + "px;top:" + (CY - 520) + "px;width:1040px;height:1040px;border-radius:50%;" +
      "background:radial-gradient(circle, rgba(255,250,232,0.85) 0%, rgba(255,246,220,0.45) 38%, rgba(255,240,210,0) 70%)", world);

    // glints on the gold stars of the picture (centres measured on the 1080 x 1920 art)
    var STARS = [[124, 160], [492, 105], [425, 232], [112, 565], [965, 567], [82, 1222], [978, 1263], [112, 1815], [570, 1808]];
    var glints = STARS.map(function (p) {
      var g = el("div", "position:absolute;left:" + (p[0] - 60) + "px;top:" + (p[1] - 60) + "px;width:120px;height:120px;transform-origin:50% 50%;mix-blend-mode:screen", world);
      g.innerHTML = '<svg viewBox="-60 -60 120 120" width="120" height="120"><defs>' +
        '<radialGradient id="gc' + p[0] + '"><stop offset="0" stop-color="#fff"/><stop offset="0.3" stop-color="#fff8dc" stop-opacity="0.8"/>' +
        '<stop offset="1" stop-color="#ffe9a0" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="gh' + p[0] + '" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff"/>' +
        '<stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
        '<linearGradient id="gv' + p[0] + '" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff"/>' +
        '<stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>' +
        '<circle r="16" fill="url(#gc' + p[0] + ')"/><rect x="-26" y="-1.6" width="52" height="3.2" rx="1.6" fill="url(#gh' + p[0] + ')"/>' +
        '<rect x="-1.6" y="-26" width="3.2" height="52" rx="1.6" fill="url(#gv' + p[0] + ')"/><circle r="3.5" fill="#fff"/></svg>';
      return g;
    });

    // ---------------------------------------------------------------- title text (live)
    var data = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none");
    

    var head = el("div", "position:absolute;left:0;right:0;top:700px;display:flex;flex-direction:column;align-items:center;gap:8px", data);
    var letters = [], colors = [BLUE, BLUE, GREEN];
    c.lines.forEach(function (words, li) {
      var row = el("div", "display:flex;justify-content:center;gap:30px", head);
      words.forEach(function (w) {
        var ws = el("span", "display:inline-flex", row);
        String(w).split("").forEach(function (ch) {
          var s = el("span", "display:inline-block;transform-origin:50% 90%;font:700 128px/1.04 " + FONT + ";color:" + colors[li % 3] +
            ";-webkit-text-stroke:18px " + INK + ";paint-order:stroke fill;text-shadow:0 12px 0 " + INK, ws);
          s.textContent = ch; letters.push(s);
        });
      });
    });
    var pill = el("div", "position:absolute;left:540px;top:1196px;translate:-50% 0;transform-origin:50% 50%;white-space:nowrap;padding:16px 46px;" +
      "border-radius:999px;background:" + GOLD + ";border:7px solid " + INK + ";box-shadow:8px 8px 0 " + INK + ";font:700 62px/1 " + FONT + ";color:" + INK, data);
    pill.innerHTML = esc(c.episode);

    // ---------------------------------------------------------------- motion
    var HEAD0 = 0.35, LET = 0.045, PILL0 = HEAD0 + 1.45;            // the pill stamps once "report" has landed

    ctx.onDraw(function (t) {
      // camera eases back from the centre; the light turns about 14 degrees
      var k = smooth(seg(t, 0, 4.5));
      world.style.transform = "scale(" + (1.12 - 0.08 * k).toFixed(4) + ")";
      light.style.transform = "rotate(" + (k * 14 - 4).toFixed(3) + "deg)";
      lightWrap.style.opacity = (0.8 + 0.2 * Math.sin(t * 1.6)).toFixed(3);
      var gs = 0.92 + 0.08 * Math.sin(t * 2.2);
      glow.style.transform = "scale(" + gs.toFixed(4) + ")";
      glow.style.opacity = (0.55 + 0.35 * seg(t, 0.1, 0.9)).toFixed(3);

      // glints: each star flashes once, staggered, a second round late in the beat
      glints.forEach(function (g, i) {
        var a = 0;
        [0.5 + i * 0.27, 2.6 + ((i * 5) % 9) * 0.16].forEach(function (t0) {
          var u = seg(t, t0, t0 + 0.35);
          if (u > 0 && u < 1) a = Math.max(a, Math.sin(u * Math.PI));
        });
        g.style.opacity = a.toFixed(3);
        g.style.transform = "scale(" + (0.3 + 0.8 * a).toFixed(3) + ") rotate(" + (a * 45).toFixed(1) + "deg)";
      });

      // title letters pop in, then bob gently
      letters.forEach(function (l, i) {
        var u = seg(t, HEAD0 + i * LET, HEAD0 + i * LET + 0.4);
        var sc = u <= 0 ? 0 : outBack(u);
        var bob = Math.sin(t * 3 + i * 0.55) * 5 * seg(t, HEAD0 + 1.6, HEAD0 + 2.2);
        l.style.transform = "translateY(" + ((1 - Math.min(1, u * 1.4)) * 70 + bob).toFixed(1) + "px) scale(" + sc.toFixed(3) + ")";
      });
      // week pill stamps on: drops from a bigger size with a little turn and settles
      var p = seg(t, PILL0, PILL0 + 0.38);
      var ps = p <= 0 ? 0 : 1.9 - 0.9 * outBack(p);
      pill.style.opacity = p > 0 ? 1 : 0;
      pill.style.transform = "scale(" + ps.toFixed(3) + ") rotate(" + (-4 + (1 - p) * 10).toFixed(2) + "deg)";
    });
  }
});
})();
