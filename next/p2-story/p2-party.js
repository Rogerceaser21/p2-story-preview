/* P-2 party beat · p2-party  (option A: 3D living storybook; plays ONLY for a 100% week)
 * The class party: "100% this week!" pops in over the bunting, the camera pushes in towards the cake, the child's
 * name and "100%" are piped onto the cake front, the candles flicker and a burst of confetti falls over everyone.
 * The picture moves only as a whole (no cut-outs): every effect is drawn in code over it.
 * The class CLAPS (fix 6, 24 Oct 2026): party-apart.jpg is the same picture with the clappers' hands held apart (only hands and forearms differ,
 * made by src/tools/party_clap.py); the two whole pictures swap with a hard cut every 0.25 s, a pure function of t (no cross-dissolve, no timer).
 * Every frame is a pure function of t (kit rule 1); the bitmap is an approved exception to rule 7, like the mascot.
 */
(function () {
MotionIgor.define({
  id: "p2-party",
  duration: 6,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · 100% party",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    art: "party-layers/",
    headline: ["100%", "this", "week!"],
    child: { name: "Maryam", grade: "Grade 0", form: "PREP A" },
    score: "100%",
    perfect: true,                     // the story only mounts this beat when the week is perfect (P2Data.toStory().perfect)
    badge: "Weekly report",
    episode: "Week 7",
    chrome: true                       // false: the story draws the badge, week above its transitions
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col, esc = ctx.util.esc;
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f", PINK = "#e8577e";

    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function smooth(x) { return x * x * (3 - 2 * x); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }
    var rnd = ctx.util.prng ? ctx.util.prng(7) : ctx.rand;

    // ---------------------------------------------------------------- picture
    ctx.stage.style.background = "#efe2d0";
    var OX = 550, OY = 1340;                                   // the camera pushes in towards the cake
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + OX + "px " + OY + "px;filter:saturate(1.15)");
    var pic = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none", world);
    pic.src = WD.src(P2Kid.art(c, c.art), "party.jpg", "party.jpg"); pic.alt = ""; pic.draggable = false;   // the child is in this picture: the girl / boy one when on (p2-form.js P2Kid)
    // the same picture with the clappers' hands apart, stacked under / over the first. Both stay painted all the time and a swap only changes which one is on top
    // (z-index -1 / -2 inside this stacking context: below the flames and the icing, which are later and unpositioned-z): no layer is created, hidden or faded, so
    // iOS Safari never repaints (device law: no visibility / opacity changes on a picture layer)
    var apart = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none;z-index:-2", world);
    pic.style.zIndex = "-1";
    apart.alt = ""; apart.draggable = false;
    apart.src = WD.src(P2Kid.art(c, c.art), "party-apart.jpg", "party-apart.jpg");
    var CLAP = 0.25, apartOn = false;

    // candle flames flicker (tips measured on the 1080 x 1920 art)
    var FLAMES = [[478, 1265], [500, 1262], [522, 1262], [550, 1262], [575, 1265], [597, 1262], [622, 1263]];
    var flames = FLAMES.map(function (p) {
      var f = el("div", "position:absolute;left:" + (p[0] - 18) + "px;top:" + (p[1] - 24) + "px;width:36px;height:44px;border-radius:50%;transform-origin:50% 80%;" +
        "mix-blend-mode:screen;background:radial-gradient(ellipse at 50% 60%, rgba(255,240,190,0.95) 0%, rgba(255,190,90,0.55) 35%, rgba(255,160,60,0) 70%)", world);
      return f;
    });
    // writing piped onto the cake front: white icing with a thin pink outline on two lines that follow the curve of the
    // cake's front (about x 420-680, y 1318-1388), revealed left to right like a piping bag, with a soft raised shadow
    var NS = "http://www.w3.org/2000/svg";
    var icing = document.createElementNS(NS, "svg");
    icing.setAttribute("width", "1080"); icing.setAttribute("height", "1920");
    icing.style.cssText = "position:absolute;left:0;top:0;overflow:visible";
    world.appendChild(icing);
    // the soft raised shadow is drawn INSIDE the svg (a blurred, offset copy at 30%): a CSS drop-shadow filter on the svg element left the
    // writing blank in WebKit on an iPhone (device scale 3), and so did an SVG clipPath whose rect width changes per frame
    var NM = esc(c.child.name), SC = esc(c.score);
    // the name must fit the cake front (the piping path is about 195 px long): shared shrink-to-fit, 172 px of writing at most
    var nmFit = P2Fit.create({ css: "white-space:nowrap;font:700 29px " + FONT, html: NM, max: 172 });
    icing.innerHTML = '<defs><path id="ck1" d="M455 1350 Q551 1368 647 1350"/><path id="ck2" d="M478 1380 Q551 1394 624 1380"/>' +
      '<filter id="cksh" x="-10%" y="-40%" width="120%" height="180%"><feGaussianBlur stdDeviation="1"/></filter></defs>' +
      '<g style="font:700 29px ' + FONT + '" text-anchor="middle" stroke-linejoin="round">' +
      '<g transform="translate(2,3)" opacity="0.3" filter="url(#cksh)" fill="#5a2814" stroke="#5a2814" stroke-width="3.5">' +
      '<text><textPath href="#ck1" startOffset="50%">' + NM + '</textPath></text>' +
      '<text><textPath href="#ck2" startOffset="50%">' + SC + '</textPath></text></g>' +
      '<text fill="#fffaf2" stroke="' + PINK + '" stroke-width="3.5" paint-order="stroke fill"><textPath href="#ck1" startOffset="50%">' + NM + '</textPath></text>' +
      '<text fill="#fff3c4" stroke="' + PINK + '" stroke-width="3.5" paint-order="stroke fill"><textPath href="#ck2" startOffset="50%">' + SC + '</textPath></text>' +
      '<text fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.2" transform="translate(-0.8,-1)"><textPath href="#ck1" startOffset="50%">' + NM + '</textPath></text>' +
      '</g>';
    var nameTexts = [], allTexts = icing.querySelectorAll("text"), nameFs = "";
    [0, 2, 4].forEach(function (i) { nameTexts.push(allTexts[i]); });
    allTexts[2].setAttribute("data-p2-label", "cake-name");                  // the three copies of the name (shadow, writing, highlight)

    // ---------------------------------------------------------------- confetti (pre-simulated at build time, sampled by t)
    var conf = el("div", "position:absolute;left:" + (-WD.ox) + "px;top:0;width:" + WD.sw + "px;height:1920px;pointer-events:none;overflow:hidden");   // the whole wide stage
    var COLS = [GOLD, BLUE, GREEN, PINK, "#9b6bd8", "#ff8a3d"];
    var bits = [];
    // faces in the picture: centre x, y and radii (the cake writing counts as a face: keep it clear too)
    var FACES = [[545, 1075, 95, 115], [320, 1115, 85, 110], [775, 860, 85, 105], [150, 1205, 90, 105], [935, 1225, 90, 105], [551, 1365, 120, 45]];
    var NBITS = Math.round(70 * WD.sw / 1080);                      // the same density on a wide stage
    for (var i = 0; i < NBITS; i++) {
      var w = 14 + rnd() * 12, h = 8 + rnd() * 8, round = rnd() < 0.3;
      var e = el("div", "position:absolute;left:0;top:0;width:" + w.toFixed(0) + "px;height:" + (round ? w : h).toFixed(0) + "px;border-radius:" +
        (round ? "50%" : "3px") + ";background:" + COLS[i % COLS.length] + ";box-shadow:inset -3px -3px 0 rgba(0,0,0,0.18), inset 2px 2px 0 rgba(255,255,255,0.35)", conf);
      bits.push({ e: e, x: rnd() * WD.sw - WD.ox, t0: 1.2 + rnd() * 1.6, v: 380 + rnd() * 260, sway: 20 + rnd() * 40, ph: rnd() * 6.28,
        spin: (rnd() - 0.5) * 900, flip: 2 + rnd() * 4, y0: -60 - rnd() * 300 });
    }

    // ---------------------------------------------------------------- data layer
    var data = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none");
    var badge = el("div", "position:absolute;left:44px;top:58px;display:flex;align-items:center;gap:18px;" +
      "padding:16px 34px 16px 20px;border-radius:999px;background:" + GOLD + ";border:6px solid " + INK + ";box-shadow:8px 8px 0 " + INK, data);
    badge.innerHTML = '<span style="font:700 50px/1 ' + FONT + ';color:#fff;-webkit-text-stroke:9px ' + INK + ';paint-order:stroke fill">' + esc(c.badge) + "</span>";
    var week = el("div", "position:absolute;left:552px;top:84px;padding:10px 24px;border-radius:999px;background:" + GREEN +
      ";border:5px solid " + INK + ";box-shadow:6px 6px 0 " + INK + ";font:700 38px/1 " + FONT + ";color:#fff;transform:rotate(-4deg)", data);
    week.textContent = c.episode;
    if (!c.chrome) { badge.style.display = "none"; week.style.display = "none"; }

    var head = el("div", "position:absolute;left:0;right:0;top:244px;display:flex;justify-content:center;align-items:baseline;gap:28px", data);
    var letters = [], colors = [GOLD, BLUE, GREEN];
    c.headline.forEach(function (w, wi) {
      var ws = el("span", "display:inline-flex", head);
      String(w).split("").forEach(function (ch) {
        var s = el("span", "display:inline-block;transform-origin:50% 90%;font:700 112px/1 " + FONT + ";color:" + colors[wi % 3] +
          ";-webkit-text-stroke:16px " + INK + ";paint-order:stroke fill;text-shadow:0 11px 0 " + INK, ws);
        s.textContent = ch; letters.push(s);
      });
    });
    // a ring of sparkles bursts round the headline as it lands
    var burst = el("div", "position:absolute;left:540px;top:300px;width:0;height:0", data);
    data.insertBefore(burst, head);                              // behind the letters
    var rays = [];
    for (var r = 0; r < 12; r++) {
      var ray = el("div", "position:absolute;left:-16px;top:-16px;width:32px;height:32px", burst);
      ray.innerHTML = '<svg viewBox="-16 -16 32 32" width="32" height="32"><path d="M0-14 L3.6-4.6 13.3-4.3 5.8 1.8 8.2 11.3 0 5.8-8.2 11.3-5.8 1.8-13.3-4.3-3.6-4.6Z" fill="' +
        COLS[r % COLS.length] + '" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/></svg>';
      rays.push(ray);
    }

    // ---------------------------------------------------------------- motion
    var HEAD0 = 0.4, LET = 0.05, BURST0 = HEAD0 + 0.55, PIPE0 = 2.0, PIPED = 1.2;

    ctx.onDraw(function (t) {
      var k = smooth(seg(t, 0, 6));
      var cs = 1.02 + 0.1 * k;                                     // ends at 1.12: the bunting stays clear of the headline
      world.style.transform = "scale(" + cs.toFixed(4) + ")";

      // clapping: hands together (party.jpg) on even quarter-seconds, hands apart (party-apart.jpg) on odd ones; falls back to "together" until the apart picture is loaded
      var open = (Math.floor(t / CLAP + 1e-6) % 2 === 1) && apart.complete && apart.naturalWidth > 0;
      if (open !== apartOn) { apartOn = open; pic.style.zIndex = open ? "-2" : "-1"; apart.style.zIndex = open ? "-1" : "-2"; }

      flames.forEach(function (f, i) {
        var fl = 0.85 + 0.15 * Math.sin(t * 17 + i * 2.1) * Math.sin(t * 7.3 + i);
        f.style.opacity = (0.65 + 0.3 * Math.sin(t * 11 + i * 1.3)).toFixed(3);
        f.style.transform = "scale(" + fl.toFixed(3) + "," + (fl * 1.08).toFixed(3) + ")";
      });

      var nfs = (29 * nmFit.scale()).toFixed(2);
      if (nfs !== nameFs) { nameFs = nfs; nameTexts.forEach(function (e) { e.setAttribute("font-size", nfs); }); }
      var ckw = 230 * seg(t, PIPE0, PIPE0 + PIPED);
      icing.style.clipPath = icing.style.webkitClipPath = "inset(0px " + (1080 - 440 - ckw).toFixed(1) + "px 0px 440px)";

      var faces = FACES.map(function (f) { return [OX + (f[0] - OX) * cs, OY + (f[1] - OY) * cs, f[2] * cs, f[3] * cs]; });
      bits.forEach(function (b) {
        var dt = t - b.t0;
        if (dt <= 0) { b.e.style.opacity = 0; b.e.style.transform = "translate(-100px,-100px)"; return; }
        var y = b.y0 + b.v * dt, x = b.x + Math.sin(dt * 2.4 + b.ph) * b.sway;
        var fx = Math.cos(dt * b.flip + b.ph);
        var op = y > 1700 ? clamp((1900 - y) / 200, 0, 1) : 1;
        faces.forEach(function (f) {
          var q = Math.sqrt(Math.pow((x - f[0]) / f[2], 2) + Math.pow((y - f[1]) / f[3], 2));
          op = Math.min(op, clamp((q - 1) / 0.35, 0, 1));            // no confetti on a face: fades out at the edge of each face
        });
        b.e.style.opacity = op.toFixed(3);
        b.e.style.transform = "translate(" + (x + WD.ox).toFixed(1) + "px," + y.toFixed(1) + "px) rotate(" + (b.spin * dt).toFixed(1) + "deg) scaleX(" + fx.toFixed(3) + ")";
      });

      letters.forEach(function (l, i) {
        var u = seg(t, HEAD0 + i * LET, HEAD0 + i * LET + 0.38);
        var sc = u <= 0 ? 0 : outBack(u);
        var bob = Math.sin(t * 3 + i * 0.6) * 4 * seg(t, HEAD0 + 1.4, HEAD0 + 2);
        l.style.transform = "translateY(" + ((1 - Math.min(1, u * 1.4)) * 60 + bob).toFixed(1) + "px) scale(" + sc.toFixed(3) + ")";
      });
      var bu = seg(t, BURST0, BURST0 + 0.7);
      rays.forEach(function (ray, i) {
        var a = i / (rays.length - 1) * Math.PI, d = 340 + 220 * (1 - Math.pow(1 - bu, 3));   // 0 to 180 degrees: sides and below
        ray.style.opacity = bu > 0 && bu < 1 ? (1 - bu * bu).toFixed(3) : 0;
        ray.style.transform = "translate(" + (Math.cos(a) * d * 1.25).toFixed(1) + "px," + (Math.sin(a) * d * 0.42).toFixed(1) + "px) scale(" + (1.3 - 0.6 * bu).toFixed(3) + ") rotate(" + (bu * 160).toFixed(1) + "deg)";
      });
    });
    return { destroy: function () { nmFit.destroy(); } };
  }
});
})();
