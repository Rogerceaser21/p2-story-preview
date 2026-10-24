/* P-2 classroom beat · p2-class  (option A: 3D living storybook)
 * Noor at her desk, ready to learn: the camera eases in, she blinks and waves hello at the viewer, the wall clock ticks
 * from 7:55 to 8:00, "Ready to learn!" pops in and her name card drops onto the desk front.
 * Whole-figure layers only (tools/classroom.py): each extra pose is the first pose with only the waving arm or the eyes
 * replaced, so her face never changes between poses. The clock hands are drawn in code over a hand-less clock face.
 * Every frame is a pure function of t (kit rule 1); bitmap layers are an approved exception to rule 7, like the mascot.
 */
(function () {
// Sound cues (the sound layer, p2-sound.js, plays them off the story clock; beat-local seconds): the school bell rings as the lesson begins, just after the
// wipe into this scene has gone (the wipe ends 0.23 s in) and before the headline "Ready to learn!" pops in (0.6 s). Igor: "the moment the girl sits down".
var BELL_AT = 0.3;
MotionIgor.define({
  id: "p2-class",
  duration: 6,
  size: [1080, 1920],
  kind: "scene",
  cues: function () { return [{ t: BELL_AT, name: "bell" }]; },
  title: "P-2 report · ready to learn",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    art: "classroom-layers/",
    badge: "Weekly report",
    episode: "Week 7",
    headline: ["Ready", "to", "learn!"],
    child: { name: "Noor", grade: "Grade 0", form: "PREP A" },
    badgeIn: false,                    // false: badge already on screen (it popped in during the arrival beat)
    chrome: true                       // false: the story draws the badge, week above its transitions
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col;
    var KART = P2Kid.art(c, c.art);                                // the child at the desk: the girl / boy pictures when they are on (p2-form.js P2Kid)
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f";

    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function smooth(x) { return x * x * (3 - 2 * x); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }
    function img(file, css, parent, art) { var i = el("img", "position:absolute;display:block;max-width:none;" + css, parent); i.src = file.charAt(0) === "@" ? file.slice(1) : (art || c.art) + file; i.alt = ""; i.draggable = false; return i; }
    var esc = ctx.util.esc;

    // ---------------------------------------------------------------- layers
    ctx.stage.style.background = "#f3e6d6";
    var OX = 560, OY = 900;                                   // the camera eases in towards Noor's face
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + OX + "px " + OY + "px;filter:saturate(1.15)");
    var bg = img("@" + WD.src(c.art, "classroom-bg.jpg", "bg.jpg"), WD.bg(1935, -8) + ";transform-origin:" + (OX + WD.wideLeft) + "px " + OY + "px", world);
    // clock hands over the hand-less clock face (centre 544,522 in the picture; the wall is slightly soft-focus)
    var clock = el("div", "position:absolute;left:" + (544 - 70) + "px;top:" + (522 - 8 - 70) + "px;width:140px;height:140px;filter:blur(1.5px)", bg.parentNode);
    clock.innerHTML = '<svg viewBox="-70 -70 140 140" width="140" height="140"><defs><linearGradient id="hs" x1="0" x2="1">' +
      '<stop offset="0" stop-color="#2e2f37"/><stop offset="0.45" stop-color="#5a5c66"/><stop offset="1" stop-color="#2e2f37"/></linearGradient></defs>' +
      '<g id="hh"><rect x="-1.5" y="-28" width="7" height="34" rx="3.5" fill="rgba(40,30,20,0.22)"/><rect x="-3.5" y="-30" width="7" height="34" rx="3.5" fill="url(#hs)"/></g>' +
      '<g id="mh"><rect x="-0.5" y="-44" width="5" height="52" rx="2.5" fill="rgba(40,30,20,0.22)"/><rect x="-2.5" y="-46" width="5" height="52" rx="2.5" fill="url(#hs)"/></g>' +
      '<circle r="5.5" fill="#3a3b44"/><circle r="2" fill="#8d8f99"/></svg>';
    var hh = clock.querySelector("#hh"), mh = clock.querySelector("#mh");
    var girl = el("div", "position:absolute;left:0;top:0;width:1080px;height:1935px", world);
    var G = {};
    ["girl-a", "girl-blink", "girl-w1", "girl-w2"].forEach(function (k) { G[k] = img(k + ".webp", "left:0;top:0;width:1080px;height:1935px", girl, KART); });
    // soft shadow under the desk and chair
    var shade = el("div", "position:absolute;left:150px;top:1690px;width:900px;height:110px;border-radius:50%;" +
      "background:radial-gradient(ellipse at center, rgba(70,50,30,0.32) 0%, rgba(70,50,30,0.12) 50%, rgba(70,50,30,0) 72%)", world);
    world.insertBefore(shade, girl);

    // name card on the desk front (live text)
    var card = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none", world);
    // the desk's grey front panel spans about x 290-960, y 1162-1250 in the picture: the card sits inside it
    var tag2 = el("div", "position:absolute;left:660px;top:1176px;transform-origin:50% 0;translate:-50% 0;white-space:nowrap;" +
      "padding:9px 22px;border-radius:12px;background:#fff;border:4px solid " + INK + ";box-shadow:0 7px 9px rgba(40,30,20,0.35), 3px 3px 0 " + INK +
      ";font:700 36px/1 " + FONT + ";color:" + BLUE, card);
    tag2.innerHTML = esc(c.child.name) + ' <span style="color:' + INK + '">·</span> <span style="color:' + GREEN + '">' + esc(P2Class(c.child)) + "</span>";
    tag2.setAttribute("data-p2-label", "desk-card");
    // the card must stay inside the desk's grey front panel (x 290-960, centre 660): one shared shrink-to-fit, 580 px at most
    var cardFit = P2Fit.create({ css: "white-space:nowrap;padding:9px 22px;border:4px solid transparent;font:700 36px/1 " + FONT, html: tag2.innerHTML, max: 580 });

    // ---------------------------------------------------------------- data layer
    var data = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none");
    var badge = el("div", "position:absolute;left:44px;top:58px;transform-origin:0 50%;display:flex;align-items:center;gap:18px;" +
      "padding:16px 34px 16px 20px;border-radius:999px;background:" + GOLD + ";border:6px solid " + INK + ";box-shadow:8px 8px 0 " + INK, data);
    badge.innerHTML = '<svg width="70" height="70" viewBox="0 0 70 70"><rect x="6" y="8" width="58" height="54" rx="8" fill="#fff" stroke="' + INK +
      '" stroke-width="5"/><rect x="15" y="20" width="16" height="12" rx="2" fill="' + BLUE + '"/><path d="M37 22h18M37 30h14M15 42h40M15 51h30" stroke="' + INK +
      '" stroke-width="4.5" stroke-linecap="round"/></svg><span style="font:700 50px/1 ' + FONT + ';color:#fff;-webkit-text-stroke:9px ' + INK +
      ';paint-order:stroke fill;letter-spacing:0.01em">' + esc(c.badge) + "</span>";
    var week = el("div", "position:absolute;left:552px;top:84px;transform-origin:50% 50%;padding:10px 24px;border-radius:999px;background:" +
      GREEN + ";border:5px solid " + INK + ";box-shadow:6px 6px 0 " + INK + ";font:700 38px/1 " + FONT + ";color:#fff", data);
    week.textContent = c.episode;
    if (!c.chrome) { badge.style.display = "none"; week.style.display = "none"; }   // the headline stays

    // headline: three words, letters pop one by one
    var head = el("div", "position:absolute;left:0;right:0;top:256px;display:flex;justify-content:center;align-items:baseline;gap:26px", data);
    var letters = [], colors = [BLUE, GOLD, GREEN];
    c.headline.forEach(function (w, wi) {
      var ws = el("span", "display:inline-flex", head);
      String(w).split("").forEach(function (ch) {
        var s = el("span", "display:inline-block;transform-origin:50% 90%;font:700 92px/1 " + FONT + ";color:" + colors[wi % 3] +
          ";-webkit-text-stroke:14px " + INK + ";paint-order:stroke fill;text-shadow:0 10px 0 " + INK, ws);
        s.textContent = ch; letters.push(s);
      });
    });

    // ---------------------------------------------------------------- motion
    var HEAD0 = 0.6, CARD0 = 1.5, WAVE0 = 2.3, WAVE1 = 3.9, WAVEP = 0.4;
    var BLINKS = [1.05, 4.75];

    ctx.onDraw(function (t) {
      // camera: slow push-in towards her face
      var k = smooth(seg(t, 0, 6));
      var s = 1.05 + 0.09 * k;
      world.style.transform = "scale(" + s.toFixed(4) + ")";
      bg.style.transform = "scale(" + (1 + (1 / s - 1) * 0.35).toFixed(4) + ")";
      clock.style.transform = bg.style.transform;
      clock.style.transformOrigin = (OX - 474) + "px " + (OY - 444) + "px";

      // clock: 7:55 -> 8:00, the minute hand ticks one minute every 1.1 s with a little overshoot
      var tick = Math.min(5, Math.floor(t / 1.1)), frac = (t - tick * 1.1) / 1.1;
      var over = tick < 5 && frac < 0.18 ? Math.sin(frac / 0.18 * Math.PI) * 2.2 : 0;
      var minute = 55 + tick;
      mh.setAttribute("transform", "rotate(" + (minute * 6 + over).toFixed(2) + ")");
      hh.setAttribute("transform", "rotate(" + ((7 + minute / 60) * 30).toFixed(2) + ")");

      // poses: wave between two arm positions; blinks; otherwise hands folded
      var pose = "girl-a";
      if (t > WAVE0 && t < WAVE1) pose = Math.floor((t - WAVE0) / (WAVEP / 2)) % 2 === 0 ? "girl-w1" : "girl-w2";
      else BLINKS.forEach(function (b) { if (t > b && t < b + 0.14) pose = "girl-blink"; });
      for (var key in G) G[key].style.visibility = key === pose ? "visible" : "hidden";

      // headline and name card
      letters.forEach(function (l, i) {
        var u = seg(t, HEAD0 + i * 0.05, HEAD0 + i * 0.05 + 0.38);
        var sc = u <= 0 ? 0 : outBack(u);
        var bob = t > HEAD0 + 1.4 ? Math.sin((t - HEAD0) * 3 + i * 0.6) * 4 : 0;
        l.style.transform = "translateY(" + ((1 - Math.min(1, u * 1.4)) * 60 + bob).toFixed(1) + "px) scale(" + sc.toFixed(3) + ")";
      });
      var cu = seg(t, CARD0, CARD0 + 0.5);
      tag2.style.opacity = cu > 0 ? 1 : 0;
      tag2.style.transform = "translateY(" + ((1 - outBack(cu)) * -120).toFixed(1) + "px) rotate(" + ((1 - cu) * -6 - 2).toFixed(2) + "deg) skewX(-2deg) scale(" + cardFit.scale().toFixed(4) + ")";

      // data layer: already on screen from the arrival beat unless badgeIn
      var b = c.badgeIn ? seg(t, 0.15, 0.6) : 1;
      badge.style.transform = "scale(" + (b <= 0 ? 0 : outBack(b)).toFixed(3) + ")";
      week.style.transform = "scale(" + (b <= 0 ? 0 : outBack(b)).toFixed(3) + ") rotate(-4deg)";
    });
    return { destroy: function () { cardFit.destroy(); } };
  }
});
})();
