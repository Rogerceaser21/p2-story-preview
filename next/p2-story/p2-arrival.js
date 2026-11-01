/* P-2 arrival beat · p2-arrival  (option A: 3D living storybook)
 * Maryam leads her mum by the hand up to the school gate while the teacher and friends wave; the name caption pops in.
 * The 3D art moves only as WHOLE figures (never cut at the joints). Every layer comes from image edits of the approved
 * arrival picture; each second pose is the first pose with only the hands (wave) or legs (step) replaced
 * (tools/poses.py), so faces never change between poses. Motion = camera drift with depth, a 2-pose step cycle,
 * a 2-pose wave cycle, contact shadows, and the live data layer (badge, week, name, grade) on top.
 * Every frame is a pure function of t (kit rule 1). Bitmap layers are an approved exception to kit rule 7, like the
 * mascot clips. Content (names, labels, art path) lives in defaults.
 */
(function () {
MotionIgor.define({
  id: "p2-arrival",
  duration: 8,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · arrival at the gate",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    art: "arrival-layers/",
    badge: "Weekly report",
    episode: "Week 7",
    child: { name: "Maryam", grade: "Grade 0", form: "PREP A" },
    chrome: true                       // false: the story draws the badge, week above its transitions
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col;
    var KART = P2Kid.art(c, c.art);                                // the child + mum pair: the girl / boy pictures when they are on (p2-form.js P2Kid)
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f";

    // ---------------------------------------------------------------- helpers (pure)
    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function smooth(x) { return x * x * (3 - 2 * x); }
    function outCubic(x) { return 1 - Math.pow(1 - x, 3); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }
    function img(file, css, parent, art) { var i = el("img", "position:absolute;display:block;max-width:none;" + css, parent); i.src = file.charAt(0) === "@" ? file.slice(1) : (art || c.art) + file; i.alt = ""; i.draggable = false; return i; }
    function shadow(x, y, w, h, a, parent) {
      return el("div", "position:absolute;left:" + x + "px;top:" + y + "px;width:" + w + "px;height:" + h + "px;border-radius:50%;" +
        "background:radial-gradient(ellipse at center, rgba(55,38,22," + a + ") 0%, rgba(55,38,22," + (a * 0.45) + ") 45%, rgba(55,38,22,0) 72%)", parent);
    }

    // ---------------------------------------------------------------- layers (world = 1080 x 1920 design px)
    ctx.stage.style.background = "#e9dccb";
    var OX = 540, OY = 1300;                                   // camera zooms about this point
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + OX + "px " + OY + "px;filter:saturate(1.15)");
    var bg = img("@" + WD.src(c.art, "arrival-bg.jpg", "bg.jpg"), WD.bg(1935, -8) + ";transform-origin:" + (OX + WD.wideLeft) + "px " + OY + "px", world);
    var glow = el("div", "position:absolute;left:-260px;top:-300px;width:900px;height:900px;border-radius:50%;" +
      "background:radial-gradient(circle, rgba(255,226,170,0.5) 0%, rgba(255,214,150,0.2) 38%, rgba(255,210,140,0) 70%);" +
      "mix-blend-mode:screen", world);

    // welcome group: further back at the gate (smaller), right edge on the world edge (kept off screen by the camera)
    var GS = 0.74, GX = 1080 - 1080 * GS, GY = 1393 - 1421 * GS;    // friends' shoes on the paving in front of the gate rail
    var group = el("div", "position:absolute;left:0;top:0;width:1080px;height:1890px;transform-origin:0 0" + (WD.wide ?
      ";-webkit-mask-image:linear-gradient(to right,#000 calc(100% - 8px),transparent);mask-image:linear-gradient(to right,#000 calc(100% - 8px),transparent)" : ""), world);
    shadow(250, 1290, 860, 170, 0.34, group);                           // soft pool under the whole group
    [[320, 1310, 180, 44], [505, 1310, 135, 44], [625, 1318, 170, 44], [780, 1388, 270, 54]].forEach(function (s) {
      shadow(s[0], s[1], s[2], s[3], 0.4, group);                       // one under each pair of shoes (friend, friend, boy, teacher)
    });
    var gA = img("group-a.webp", "left:0;top:0;width:1080px;height:1890px", group);
    var gB = img("group-b.webp", "left:0;top:0;width:1080px;height:1890px", group);

    // Maryam (leading, gate side) and her mum, walking in from the left, nearer the camera
    var PS = 0.95, PY = 1560 - 1530 * PS;
    var PX0 = -(762 * PS) - 20 - WD.ox, PX1 = 60 - 263 * PS;            // fully off screen left -> mum's back 60 px from the world edge
    var pair = el("div", "position:absolute;left:0;top:0;width:1080px;height:1935px;transform-origin:0 0", world);
    var pShadow = shadow(215, 1496, 600, 72, 0.6, pair);
    var pA = img("pair-a.webp", "left:0;top:0;width:1080px;height:1935px", pair, KART);   // mid-stride
    var pS = img("pair-s.webp", "left:0;top:0;width:1080px;height:1935px", pair, KART);   // feet together: passing step and the stop

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

    // caption: NAME · GRADE, letters pop one by one (SPEA layered caption look)
    var CAPY = 1640, MAXW = 940;
    var capBox = el("div", "position:absolute;left:0;right:0;top:" + CAPY + "px;height:0;display:flex;justify-content:center;align-items:flex-start", data);
    var cap = el("div", "flex:none;display:flex;justify-content:center;align-items:baseline;gap:4px;white-space:nowrap;transform-origin:50% 0", capBox);
    cap.setAttribute("data-p2-label", "gate-caption");
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
    // one shared shrink-to-fit (p2-form.js): a long name such as "Mohammed" + "Kindy A" must stay inside the frame
    var capFit = P2Fit.create({ css: "display:flex;align-items:baseline;gap:4px;white-space:nowrap",
      html: P2Fit.chars([[c.child.name, 132], [" \u00b7 ", 110], [P2Class(c.child), 132]], FONT), max: MAXW });
    // sparkles round the caption only (never on people)
    var SP = [[120, CAPY - 8, 40, 0.0], [960, CAPY - 30, 34, 0.1], [70, CAPY + 150, 26, 0.2], [1010, CAPY + 140, 30, 0.28], [540, CAPY - 70, 24, 0.36]];
    var sparkles = SP.map(function (s) {
      var d = el("div", "position:absolute;left:" + (s[0] - s[2]) + "px;top:" + (s[1] - s[2]) + "px;width:" + (2 * s[2]) +
        "px;height:" + (2 * s[2]) + "px;transform-origin:50% 50%", data);
      d.innerHTML = '<svg viewBox="-10 -10 20 20" width="100%" height="100%"><path d="M0,-10 C1,-2 2,-1 10,0 C2,1 1,2 0,10 C-1,2 -2,1 -10,0 C-2,-1 -1,-2 0,-10Z" fill="' +
        GOLD + '" stroke="' + INK + '" stroke-width="1.2"/></svg>';
      return { d: d, at: s[3] };
    });

    // ---------------------------------------------------------------- timing (s)
    var WALK0 = 0.2, WALK1 = 4.3, STEP = 0.25;
    var WAVE0 = 0.9, WAVE1 = 6.8, WAVEP = 0.36;
    var CAP0 = 4.5;
    // camera keys [time, scale, tx, ty]: open close on the waving group, then one steady pull-back and pan left that meets
    // Maryam and mum as they walk in. The right edge of the view stays on the world's right edge the whole way, so the
    // teacher is always whole (his picture ends at his elbow, just past that edge). |tx| <= 540 (scale - 1) and ty within
    // [620 (1 - s), 1300 (s - 1)] keep every world edge off screen.
    var CAM = [[0, 1.3, -160, 0], [0.6, 1.3, -160, 0], [4.8, 1.04, -20, 10]];
    function cam(t) {
      for (var i = 1; i < CAM.length; i++) {
        if (t <= CAM[i][0]) {
          var a = CAM[i - 1], b = CAM[i], u = smooth(seg(t, a[0], b[0]));
          return [a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u, a[3] + (b[3] - a[3]) * u];
        }
      }
      var z = CAM[CAM.length - 1]; return [z[1], z[2], z[3]];
    }

    ctx.onDraw(function (t) {
      var cv = cam(t), s = cv[0], tx = cv[1], ty = cv[2];
      world.style.transform = "translate(" + tx.toFixed(2) + "px," + ty.toFixed(2) + "px) scale(" + s.toFixed(4) + ")";
      // depth: the background moves a little less than the people
      var bs = (1 + (1 / s - 1) * 0.3) * 1.02;                  // 2% spare so the parallax never pulls the picture off the right edge
      bg.style.transform = "translate(" + (-tx * 0.25 / s).toFixed(2) + "px,0) scale(" + bs.toFixed(4) + ")";
      glow.style.transform = "translate(" + (40 * Math.sin(t * 0.5)).toFixed(1) + "px," + (20 * Math.cos(t * 0.4)).toFixed(1) + "px)";
      glow.style.opacity = (0.75 + 0.25 * Math.sin(t * 1.1)).toFixed(3);

      // walkers: ease-out glide with a 2-pose step cycle while moving, a slight dip on the step pose
      var wk = seg(t, WALK0, WALK1), moving = t > WALK0 && t < WALK1 - 0.06;
      var px = PX0 + (PX1 - PX0) * outCubic(wk);
      var stridePose = moving && (Math.floor((t - WALK0) / STEP) % 2 === 0);
      var settleU = seg(t, WALK1, WALK1 + 0.45), settle = t > WALK1 ? Math.sin(settleU * Math.PI) * (1 - settleU) : 0;
      pair.style.transform = "translate(" + px.toFixed(2) + "px," + (PY + (stridePose ? 6 : 0) + settle * 5).toFixed(2) + "px) scale(" + PS + ")";
      pA.style.visibility = stridePose ? "visible" : "hidden";
      pS.style.visibility = stridePose ? "hidden" : "visible";
      pShadow.style.transform = "scale(" + (stridePose ? 1.06 : 1) + ",1)";

      // welcome group: wave cycle (hands only), small breath, a little bounce when Maryam arrives
      var waving = t > WAVE0 && t < WAVE1;
      var wpose = waving && (Math.floor((t - WAVE0) / (WAVEP / 2)) % 2 === 1);
      gB.style.visibility = wpose ? "visible" : "hidden";
      gA.style.visibility = wpose ? "hidden" : "visible";
      var hop = Math.sin(seg(t, WALK1 - 0.1, WALK1 + 0.45) * Math.PI) * 8;
      var breathe = Math.sin(t * 2.1) * 1.5;
      group.style.transform = "translate(" + GX.toFixed(2) + "px," + (GY - hop + breathe).toFixed(2) + "px) scale(" + GS + ")";

      // data layer
      var b = seg(t, 0.15, 0.6);
      badge.style.transform = "scale(" + (b <= 0 ? 0 : outBack(b)).toFixed(3) + ")";
      var wkp = seg(t, 0.55, 0.95);
      week.style.transform = "scale(" + (wkp <= 0 ? 0 : outBack(wkp)).toFixed(3) + ") rotate(-4deg)";
      cap.style.transform = "scale(" + capFit.scale().toFixed(4) + ")";
      letters.forEach(function (l, i) {
        var u = seg(t, CAP0 + i * 0.05, CAP0 + i * 0.05 + 0.38);
        var sc = u <= 0 ? 0 : outBack(u);
        var bob = t > CAP0 + 1.4 ? Math.sin((t - CAP0) * 3 + i * 0.6) * 4 : 0;
        l.style.transform = "translateY(" + ((1 - Math.min(1, u * 1.4)) * 60 + bob).toFixed(1) + "px) scale(" + sc.toFixed(3) + ")";
      });
      sparkles.forEach(function (sp, i) {
        var u = seg(t, CAP0 + 0.2 + sp.at, CAP0 + 0.8 + sp.at);
        var sc = u <= 0 ? 0 : outBack(Math.min(1, u * 1.6)) * (1 - 0.25 * seg(t, CAP0 + 1.4 + sp.at, CAP0 + 2.6 + sp.at));
        var tw = 1 + 0.12 * Math.sin(t * 6 + i);
        sp.d.style.transform = "scale(" + (sc * tw).toFixed(3) + ") rotate(" + (t * 40 + i * 30).toFixed(1) + "deg)";
      });
    });
    return { destroy: function () { capFit.destroy(); } };
  }
});
})();
