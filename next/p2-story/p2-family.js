/* P-2 family beat · p2-family  (option A: 3D living storybook)
 * At home in the evening: Maryam shows her report on the phone and her parents are proud. Mum's speech bubble pops
 * first, then Dad's, word by word; the camera drifts slowly from Mum towards Dad as each one speaks; the phone screen
 * glows, the night stars in the window twinkle and a few hearts float up from the phone at the end.
 * The picture moves only as a whole (no cut-outs): every effect is drawn in code over it.
 * Every frame is a pure function of t (kit rule 1); the bitmap is an approved exception to rule 7, like the mascot.
 */
(function () {
MotionIgor.define({
  id: "p2-family",
  duration: 6,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · family at home",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    art: "family-layers/",
    mum: { text: "Good job, we are super proud of you!", hi: ["super", "proud"] },
    dad: { text: "Keep it up, superstar!", hi: ["superstar!"] },
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

    // ---------------------------------------------------------------- picture
    ctx.stage.style.background = "#efe3d2";
    var OX = 540, OY = 1000;
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + OX + "px " + OY + "px;filter:saturate(1.15)");
    var pic = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none", world);
    pic.src = WD.src(P2Kid.art(c, c.art), "family.jpg", "family.jpg"); pic.alt = ""; pic.draggable = false;   // the child is in this picture: the girl / boy one when on (p2-form.js P2Kid)

    // the phone screen glows softly (phone at about 365,1140 in the picture)
    var phone = el("div", "position:absolute;left:" + (365 - 110) + "px;top:" + (1140 - 110) + "px;width:220px;height:220px;border-radius:50%;" +
      "mix-blend-mode:screen;background:radial-gradient(circle, rgba(170,205,255,0.75) 0%, rgba(150,190,255,0.3) 35%, rgba(150,190,255,0) 70%)", world);
    // twinkles on the night sky in the window (top right of the table scene)
    // twinkles only on clear night sky between the window bars, away from Dad's headdress
    var SKY = [[1000, 760], [1035, 840]];                    // right pane only: never under a bubble or the headdress
    var twinkles = SKY.map(function (p) {
      var g = el("div", "position:absolute;left:" + (p[0] - 22) + "px;top:" + (p[1] - 22) + "px;width:44px;height:44px;mix-blend-mode:screen", world);
      g.innerHTML = '<svg viewBox="-22 -22 44 44" width="44" height="44"><circle r="6" fill="rgba(255,255,255,0.55)"/>' +
        '<path d="M0-20 C1.5-3 3-1.5 20 0 C3 1.5 1.5 3 0 20 C-1.5 3-3 1.5-20 0 C-3-1.5-1.5-3 0-20Z" fill="#fff"/></svg>';
      return g;
    });

    // ---------------------------------------------------------------- speech bubbles (live text)
    var data = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none");
    // box = where the bubble sits; tip = the speaker's head (the tail points there); the bubble grows from its tail root
    function bubble(line, box, tip, color) {          // box = [left, top, width, height]
      var b = el("div", "position:absolute;left:" + box[0] + "px;top:" + box[1] + "px;width:" + box[2] + "px;transform-origin:" +
        (tip[0] - box[0]) + "px 100%", data);
      var body = el("div", "position:relative;box-sizing:border-box;height:" + box[3] + "px;display:grid;place-items:center;padding:0 40px;border-radius:56px;" +
        "background:#fff;border:7px solid " + INK + ";box-shadow:10px 10px 0 " + INK + ";font:700 60px/1.12 " + FONT + ";color:" + INK + ";text-align:center", b);
      var inner = el("div", "", body);
      var words = [];
      String(line.text).split(" ").forEach(function (w, i) {
        if (i) inner.appendChild(document.createTextNode(" "));
        var s = el("span", "display:inline-block;transform-origin:50% 80%", inner);
        s.textContent = w;
        if ((line.hi || []).indexOf(w) >= 0) s.style.color = color;
        words.push(s);
      });
      // tail: a white wedge with an ink outline from the bubble's bottom edge down towards the speaker
      var tail = el("div", "position:absolute;left:0;top:0;width:" + box[2] + "px;height:1px;overflow:visible", b);
      tail.innerHTML = '<svg style="position:absolute;left:0;top:0;overflow:visible" width="1" height="1"></svg>';
      return { b: b, body: body, words: words, tail: tail, box: box, tip: tip };
    }
    function drawTail(B) {
      // the tail starts inside the body's bottom edge, centred on its root x, and points at the speaker's head
      var h = B.box[3], rx = B.tip[0] - B.box[0];
      rx = clamp(rx, 90, B.box[2] - 90);
      var tx = B.tip[0] - B.box[0], ty = B.tip[1] - B.box[1];
      var svg = B.tail.firstChild;
      svg.innerHTML = '<path d="M' + (rx - 44) + ' ' + (h - 14) + ' Q' + (rx - 10) + ' ' + (h + 30) + ' ' + tx + ' ' + ty +
        ' Q' + (rx + 18) + ' ' + (h + 20) + ' ' + (rx + 40) + ' ' + (h - 14) + 'Z" fill="#fff" stroke="' + INK + '" stroke-width="7" stroke-linejoin="round"/>' +
        '<rect x="' + (rx - 40) + '" y="' + (h - 30) + '" width="78" height="22" fill="#fff"/>';
    }
    var mum = bubble(c.mum, [50, 456, 580, 250], [480, 850], BLUE);
    var dad = bubble(c.dad, [652, 500, 380, 196], [815, 748], GREEN);    // beside Mum's bubble; the tip stops just above Dad's headdress
    drawTail(mum); drawTail(dad);
    // the white tail must sit under the body's text but over its border: put the body above the tail
    [mum, dad].forEach(function (B) { B.body.style.zIndex = 2; B.tail.style.zIndex = 1; B.b.insertBefore(B.tail, B.body); });

    // hearts float up from the phone at the end (data layer: x allows for the camera scale and pan)
    var HEARTS = [[347, 1100, 0.0, 0.85], [375, 1080, 0.25, 0.65], [325, 1090, 0.5, 0.6], [367, 1110, 0.75, 0.75], [341, 1120, 1.0, 0.55]];   // up from the phone, clear of every face
    var hearts = HEARTS.map(function (h) {
      var e = el("div", "position:absolute;left:" + (h[0] - 40) + "px;top:" + (h[1] - 40) + "px;width:80px;height:80px;transform-origin:50% 50%", data);
      e.innerHTML = '<svg viewBox="0 0 80 80" width="80" height="80"><defs><radialGradient id="hg" cx="0.35" cy="0.3" r="0.8">' +
        '<stop offset="0" stop-color="#ff9db5"/><stop offset="0.55" stop-color="' + PINK + '"/><stop offset="1" stop-color="#b8324f"/></radialGradient></defs>' +
        '<path d="M40 70 C10 50 4 34 12 22 C20 10 34 12 40 24 C46 12 60 10 68 22 C76 34 70 50 40 70Z" fill="url(#hg)" stroke="' + INK + '" stroke-width="4"/>' +
        '<ellipse cx="25" cy="27" rx="7" ry="4.5" fill="rgba(255,255,255,0.75)" transform="rotate(-35 25 27)"/></svg>';
      return e;
    });

    var badge = el("div", "position:absolute;left:44px;top:58px;transform-origin:0 50%;display:flex;align-items:center;gap:18px;" +
      "padding:16px 34px 16px 20px;border-radius:999px;background:" + GOLD + ";border:6px solid " + INK + ";box-shadow:8px 8px 0 " + INK, data);
    badge.innerHTML = '<span style="font:700 50px/1 ' + FONT + ';color:#fff;-webkit-text-stroke:9px ' + INK + ';paint-order:stroke fill">' + esc(c.badge) + "</span>";
    var week = el("div", "position:absolute;left:552px;top:84px;padding:10px 24px;border-radius:999px;background:" + GREEN +
      ";border:5px solid " + INK + ";box-shadow:6px 6px 0 " + INK + ";font:700 38px/1 " + FONT + ";color:#fff;transform:rotate(-4deg)", data);
    week.textContent = c.episode;
    if (!c.chrome) { badge.style.display = "none"; week.style.display = "none"; }

    // ---------------------------------------------------------------- motion
    var MUM0 = 0.5, DAD0 = 2.5, HEART0 = 4.1;

    function pop(B, t0, t) {
      var u = seg(t, t0, t0 + 0.42);
      B.b.style.opacity = u > 0 ? 1 : 0;
      B.b.style.transform = "scale(" + (u <= 0 ? 0 : outBack(u)).toFixed(3) + ")";
      B.words.forEach(function (w, i) {
        var v = seg(t, t0 + 0.08 + i * 0.09, t0 + 0.08 + i * 0.09 + 0.25);
        w.style.opacity = v > 0 ? Math.min(1, v * 2).toFixed(3) : 0;
        w.style.transform = "translateY(" + ((1 - v) * 18).toFixed(1) + "px) scale(" + (v <= 0 ? 0.6 : 0.6 + 0.4 * outBack(v)).toFixed(3) + ")";
      });
      // a gentle float once the bubble is up
      var f = seg(t, t0 + 0.5, t0 + 0.9);
      B.body.style.transform = "translateY(" + (Math.sin((t - t0) * 2.2) * 5 * f).toFixed(2) + "px)";
      B.tail.style.transform = B.body.style.transform;
    }

    ctx.onDraw(function (t) {
      // camera: slow push-in, drifting from Mum's side towards Dad's as he speaks
      var k = smooth(seg(t, 0, 6)), pan = smooth(seg(t, DAD0 - 0.4, DAD0 + 1.4));
      var s = 1.03 + 0.06 * k, tx = 12 - 24 * pan;
      world.style.transform = "translate(" + tx.toFixed(2) + "px,0) scale(" + s.toFixed(4) + ")";

      phone.style.opacity = (0.55 + 0.3 * Math.sin(t * 2.6)).toFixed(3);
      twinkles.forEach(function (g, i) {
        var a = Math.pow(Math.max(0, Math.sin(t * 1.9 + i * 1.7)), 6);
        g.style.opacity = (0.25 + 0.75 * a).toFixed(3);
        g.style.transform = "scale(" + (0.5 + 0.6 * a).toFixed(3) + ")";
      });

      pop(mum, MUM0, t);
      pop(dad, DAD0, t);

      hearts.forEach(function (e, i) {
        var h = HEARTS[i], u = seg(t, HEART0 + h[2], HEART0 + h[2] + 1.6);
        var a = u <= 0 ? 0 : u < 0.15 ? u / 0.15 : u > 0.75 ? (1 - u) / 0.25 : 1;
        e.style.opacity = a.toFixed(3);
        e.style.transform = "translate(" + (Math.sin(u * 5 + i) * 10).toFixed(1) + "px," + (-u * 300).toFixed(1) + "px) scale(" +
          (h[3] * (u <= 0 ? 0 : outBack(Math.min(1, u * 4)))).toFixed(3) + ") rotate(" + (Math.sin(u * 4 + i * 2) * 10).toFixed(1) + "deg)";
      });
    });
  }
});
})();
