/* P-2 walk-to-school beat · p2-walk  (option A: 3D living storybook, scene 2 of the final plan)
 * Mum and Maryam, seen from behind, walk hand in hand up the school path towards the clock tower and the arched gate.
 * Nobody is welcoming them: the empty school approach is a ChatGPT picture made from Igor's reference (flat storyboard),
 * remade in the approved 3D look; the pair is one whole-figure picture cut from green, with a second leg pose for the step
 * (pose B = pose A with only the legs from the edit, tools/walk.py; the body above the hems is one shared picture), so faces and clothes never change between the two.
 * Motion = the pair walks AWAY up the path getting smaller (scale follows the path), 2-pose step cycle with a small bob and
 * sway, a contact shadow that follows the feet, a gentle camera push, warm sun glow, then the name caption pops in.
 * Every frame is a pure function of t (kit rule 1). Bitmap layers are an approved exception to kit rule 7, like the mascot
 * clips and the gate scene. Content (names, labels, art path) lives in defaults.
 */
(function () {
MotionIgor.define({
  id: "p2-walk",
  duration: 6,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · walk to school",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    art: "walk-layers/",
    badge: "Weekly report",
    episode: "Week 7",
    child: { name: "Maryam", grade: "Grade 0", form: "PREP A" },
    chrome: true                       // false: the story draws the badge, week above its transitions
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col;
    var KART = P2Kid.art(c, c.art);                                // body and legs of the child: the girl / boy pictures when they are on (p2-form.js P2Kid)
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f";

    // ---------------------------------------------------------------- helpers (pure)
    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function smooth(x) { return x * x * (3 - 2 * x); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }
    function img(file, css, parent, art) { var i = el("img", "position:absolute;display:block;max-width:none;" + css, parent); i.src = file.charAt(0) === "@" ? file.slice(1) : (art || c.art) + file; i.alt = ""; i.draggable = false; return i; }

    // ---------------------------------------------------------------- layers (world = 1080 x 1920 design px)
    ctx.stage.style.background = "#e9dccb";
    var OX = 540, OY = 1250;                                   // camera pushes in about this point
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + OX + "px " + OY + "px;filter:saturate(1.12)");
    var bg = img("@" + WD.src(c.art, "walk-bg.jpg", "bg.jpg"), WD.bg(1920) + ";transform-origin:" + (OX + WD.wideLeft) + "px " + OY + "px", world);
    var glow = el("div", "position:absolute;left:560px;top:-260px;width:900px;height:900px;border-radius:50%;" +
      "background:radial-gradient(circle, rgba(255,236,180,0.55) 0%, rgba(255,222,150,0.22) 38%, rgba(255,214,140,0) 70%);" +
      "mix-blend-mode:screen", world);

    // The pair: the cut-out box in the 1080 x 1918 picture is x164-886, y382-1588 (tools/walk.py prints it). ANCHOR = the middle
    // of the pair's feet in that cut-out (the pair's own centre line, the contact line of the planted feet).
    var PW = 722, PH = 1206, AX = 360, AY = 1186;
    var shadowA = el("div", "position:absolute;left:0;top:0;width:640px;height:70px;margin:-35px 0 0 -320px;border-radius:50%;" +
      "background:radial-gradient(ellipse at center, rgba(60,38,18,0.75) 0%, rgba(60,38,18,0.38) 50%, rgba(70,44,22,0) 74%)", world);
    var shadowB = el("div", "position:absolute;left:0;top:0;width:520px;height:60px;margin:-30px 0 0 -300px;border-radius:50%;" +
      "background:radial-gradient(ellipse at center, rgba(70,44,22,0.3) 0%, rgba(70,44,22,0.12) 55%, rgba(70,44,22,0) 76%)", world);
    var pair = el("div", "position:absolute;left:0;top:0;width:" + PW + "px;height:" + PH + "px;transform-origin:" + AX + "px " + AY + "px", world);
    // body = rows 0 to 950, ONE picture for both poses (so faces and clothes can never differ between them); legs = rows 900 to the
    // end, one picture per pose, drawn on top of the body (tools/walk.py)
    var LEG0 = 900, BODY1 = 950;
    img("body.webp", "left:0;top:0;width:" + PW + "px;height:" + BODY1 + "px", pair, KART);
    var pA = img("legs-a.webp", "left:0;top:" + LEG0 + "px;width:" + PW + "px;height:" + (PH - LEG0) + "px", pair, KART);   // mid-stride
    var pB = img("legs-b.webp", "left:0;top:" + LEG0 + "px;width:" + PW + "px;height:" + (PH - LEG0) + "px", pair, KART);   // the other foot forward

    // ---------------------------------------------------------------- data layer (live text, above the camera)
    var data = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none");
    var esc = ctx.util.esc;
    var badge = el("div", "position:absolute;left:44px;top:58px;transform-origin:0 50%;display:flex;align-items:center;gap:18px;" +
      "padding:16px 34px 16px 20px;border-radius:999px;background:" + GOLD + ";border:6px solid " + INK + ";box-shadow:8px 8px 0 " + INK, data);
    badge.innerHTML = '<svg width="70" height="70" viewBox="0 0 70 70"><rect x="6" y="8" width="58" height="54" rx="8" fill="#fff" stroke="' + INK +
      '" stroke-width="5"/><rect x="15" y="20" width="16" height="12" rx="2" fill="' + BLUE + '"/><path d="M37 22h18M37 30h14M15 42h40M15 51h30" stroke="' + INK +
      '" stroke-width="4.5" stroke-linecap="round"/></svg><span style="font:700 50px/1 ' + FONT + ';color:#fff;-webkit-text-stroke:9px ' + INK +
      ';paint-order:stroke fill;letter-spacing:0.01em">' + esc(c.badge) + "</span>";
    var week = el("div", "position:absolute;left:552px;top:84px;transform-origin:50% 50%;padding:10px 24px;border-radius:999px;background:" +
      GREEN + ";border:5px solid " + INK + ";box-shadow:6px 6px 0 " + INK + ";font:700 38px/1 " + FONT + ";color:#fff", data);
    week.textContent = c.episode;
    if (!c.chrome) { badge.style.display = "none"; week.style.display = "none"; }

    // caption: NAME · CLASS, letters pop one by one (SPEA layered caption look). The whole line shrinks to fit the frame, so a
    // long name such as "Mohammed" + "Kindy A" stays inside it (measured at its natural width, then scaled about its centre).
    var CAPY = 1640, MAXW = 940;
    var capBox = el("div", "position:absolute;left:0;right:0;top:" + CAPY + "px;height:0;display:flex;justify-content:center;align-items:flex-start", data);
    var cap = el("div", "flex:none;display:flex;justify-content:center;align-items:baseline;gap:4px;white-space:nowrap;transform-origin:50% 0", capBox);
    cap.setAttribute("data-p2-label", "walk-caption");
    var letters = [];
    function word(text, color, size) {
      var w = el("span", "display:inline-flex", cap);
      String(text).split("").forEach(function (ch) {
        var s = el("span", "display:inline-block;transform-origin:50% 90%;font:700 " + size + "px/1 " + FONT + ";color:" + color +
          ";-webkit-text-stroke:14px " + INK + ";paint-order:stroke fill;text-shadow:0 10px 0 " + INK + ";white-space:pre", w);
        s.textContent = ch; letters.push(s);
      });
    }
    word(c.child.name, BLUE, 132);
    word(" · ", INK, 110);
    word(P2Class(c.child), GREEN, 132);
    // one shared shrink-to-fit (p2-form.js): measured on an off-screen twin of the caption, never with display:none
    var capFit = P2Fit.create({ css: "display:flex;align-items:baseline;gap:4px;white-space:nowrap",
      html: P2Fit.chars([[c.child.name, 132], [" \u00b7 ", 110], [P2Class(c.child), 132]], FONT), max: MAXW });
    var SP = [[120, CAPY - 8, 40, 0.0], [960, CAPY - 30, 34, 0.1], [70, CAPY + 150, 26, 0.2], [1010, CAPY + 140, 30, 0.28], [540, CAPY - 70, 24, 0.36]];
    var sparkles = SP.map(function (s) {
      var d = el("div", "position:absolute;left:" + (s[0] - s[2]) + "px;top:" + (s[1] - s[2]) + "px;width:" + (2 * s[2]) +
        "px;height:" + (2 * s[2]) + "px;transform-origin:50% 50%", data);
      d.innerHTML = '<svg viewBox="-10 -10 20 20" width="100%" height="100%"><path d="M0,-10 C1,-2 2,-1 10,0 C2,1 1,2 0,10 C-1,2 -2,1 -10,0 C-2,-1 -1,-2 0,-10Z" fill="' +
        GOLD + '" stroke="' + INK + '" stroke-width="1.2"/></svg>';
      return { d: d, at: s[3] };
    });

    // ---------------------------------------------------------------- timing (s) and path
    var W0 = 0, W1 = 5.5, STEP = 0.3;                              // walk from the start to the stop; one pose every STEP
    var CAP0 = 3.75;                                               // name caption pops in
    // The pair's feet line runs from the foot of the picture up the path towards the gate; the size follows it (nearer = bigger).
    var Y0 = 1760, Y1 = 1290, S0 = 0.70, S1 = 0.36;
    function walkU(t) { var u = seg(t, W0, W1); return 0.45 * u + 0.55 * smooth(u); }   // starts and ends gently, mostly steady

    ctx.onDraw(function (t) {
      // camera: one slow push, the background moves a little less than the people
      var k = seg(t, 0, 6), s = 1 + 0.07 * smooth(k);
      world.style.transform = "scale(" + s.toFixed(4) + ")";
      bg.style.transform = "scale(" + (1 + (1 / s - 1) * 0.35).toFixed(4) + ")";
      glow.style.transform = "translate(" + (30 * Math.sin(t * 0.5)).toFixed(1) + "px," + (14 * Math.cos(t * 0.4)).toFixed(1) + "px)";
      glow.style.opacity = (0.75 + 0.25 * Math.sin(t * 1.1)).toFixed(3);

      // the pair
      var u = walkU(t), fy = Y0 + (Y1 - Y0) * u, sc = S0 + (S1 - S0) * u;
      var ph = Math.max(0, t - W0) / STEP, step = Math.floor(ph), fr = ph - step;
      var moving = t < W1 - 0.05;
      var poseA = (step % 2) === 0 || !moving;                      // stand on pose A when the walk ends
      var bob = moving ? Math.sin(fr * Math.PI) * 9 * sc : 0;       // the body rises in the middle of each step
      var sway = moving ? Math.sin(ph * Math.PI) * 5 * sc : 0;      // a small shift from side to side with each step
      var rot = moving ? Math.sin(ph * Math.PI) * 0.7 : 0;
      var fx = 540 + sway;
      pair.style.transform = "translate(" + (fx - AX).toFixed(2) + "px," + (fy - AY - bob).toFixed(2) + "px) scale(" + sc.toFixed(4) + ") rotate(" + rot.toFixed(2) + "deg)";
      pA.style.visibility = poseA ? "visible" : "hidden";
      pB.style.visibility = poseA ? "hidden" : "visible";
      var sw = sc * (moving ? (1 - 0.06 * Math.sin(fr * Math.PI)) : 1);   // the shadow narrows a little as the body rises
      shadowA.style.transform = "translate(" + (fx + 6 * sc).toFixed(2) + "px," + (fy - 13 * sc).toFixed(2) + "px) scale(" + sw.toFixed(4) + ")";
      shadowB.style.transform = "translate(" + (fx - 70 * sc).toFixed(2) + "px," + (fy + 0 * sc).toFixed(2) + "px) scale(" + sw.toFixed(4) + ")";

      // data layer
      var b = seg(t, 0.15, 0.6);
      badge.style.transform = "scale(" + (b <= 0 ? 0 : outBack(b)).toFixed(3) + ")";
      var wkp = seg(t, 0.55, 0.95);
      week.style.transform = "scale(" + (wkp <= 0 ? 0 : outBack(wkp)).toFixed(3) + ") rotate(-4deg)";
      cap.style.transform = "scale(" + capFit.scale().toFixed(4) + ")";
      letters.forEach(function (l, i) {
        var uu = seg(t, CAP0 + i * 0.05, CAP0 + i * 0.05 + 0.38);
        var scl = uu <= 0 ? 0 : outBack(uu);
        var bobl = t > CAP0 + 1.4 ? Math.sin((t - CAP0) * 3 + i * 0.6) * 4 : 0;
        l.style.transform = "translateY(" + ((1 - Math.min(1, uu * 1.4)) * 60 + bobl).toFixed(1) + "px) scale(" + scl.toFixed(3) + ")";
      });
      sparkles.forEach(function (sp, i) {
        var uu = seg(t, CAP0 + 0.2 + sp.at, CAP0 + 0.8 + sp.at);
        var scl = uu <= 0 ? 0 : outBack(Math.min(1, uu * 1.6)) * (1 - 0.25 * seg(t, CAP0 + 1.4 + sp.at, CAP0 + 2.6 + sp.at));
        var tw = 1 + 0.12 * Math.sin(t * 6 + i);
        sp.d.style.transform = "scale(" + (scl * tw).toFixed(3) + ") rotate(" + (t * 40 + i * 30).toFixed(1) + "deg)";
      });
    });
    return { destroy: function () { capFit.destroy(); } };
  }
});
})();
