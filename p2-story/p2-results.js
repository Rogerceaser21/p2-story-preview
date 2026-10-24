/* P-2 results beat · p2-results  (option A: 3D living storybook; plays ONLY when last week was NOT 100%)
 * The classroom wall with its notice boards and clock: "Good week!" pops in, the "Last week" card rises into place,
 * three rings fill one after another (days at school, late to school, early leave) and count up, a green tick lands
 * on every zero and a gold dot on every miss (never red), then "Let's aim for every day" settles underneath.
 * The picture moves only as a whole; the card and all its numbers are live and come from content.lastWeek (the app numbers, via P2Data.toStory).
 * Every frame is a pure function of t (kit rule 1); the bitmap is an approved exception to rule 7, like the mascot.
 */
(function () {
MotionIgor.define({
  id: "p2-results",
  duration: 6,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · last week results",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    art: "results-layers/",
    headline: ["Good", "week!"],
    footer: "Let's aim for every day",
    cardTitle: "Last week",
    weekEnding: "2026-10-15",            // ISO date from the app
    weekEndingText: "Week ending 15 Oct", // the page's own label (P2Data.toStory().weekEndingText); with none, it is made from weekEnding the same way
    labels: { days: "Days at school", late: "Late to school", early: "Early leave", of: "of" },
    // last week's totals (P2Data.toStory): daysOpen = days the school was open, absent = days absent, lateToSchool = days late to school
    lastWeek: { daysOpen: 2, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    badge: "Weekly report",
    episode: "Week 7",
    chrome: true                       // false: the story draws the badge, week above its transitions
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col, esc = ctx.util.esc;
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f", GOLDD = "#d99a12";

    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function smooth(x) { return x * x * (3 - 2 * x); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function outCubic(x) { return 1 - Math.pow(1 - x, 3); }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }

    var wk = c.lastWeek;
    var attended = Math.max(0, wk.daysOpen - wk.absent);
    var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(c.weekEnding));
    // the page's label: "Week ending 15 Oct" (weekEndingText in src/lib/attendance.ts)
    var weekEndingText = c.weekEndingText ? String(c.weekEndingText) : iso ? "Week ending " + Number(iso[3]) + " " + MONTHS[Number(iso[2]) - 1] : String(c.weekEnding);

    // ---------------------------------------------------------------- picture
    ctx.stage.style.background = "#efe9e1";
    var OX = 540, OY = 300;                                    // zoom about the clock so it never rises into the chrome
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + OX + "px " + OY + "px;filter:saturate(1.25)");
    var pic = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none", world);
    pic.src = WD.src(c.art, "wall.jpg", "wall.jpg"); pic.alt = ""; pic.draggable = false;

    // ---------------------------------------------------------------- data layer
    var data = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none");
    var badge = el("div", "position:absolute;left:44px;top:58px;display:flex;align-items:center;gap:18px;" +
      "padding:16px 34px 16px 20px;border-radius:999px;background:" + GOLD + ";border:6px solid " + INK + ";box-shadow:8px 8px 0 " + INK, data);
    badge.innerHTML = '<span style="font:700 50px/1 ' + FONT + ';color:#fff;-webkit-text-stroke:9px ' + INK + ';paint-order:stroke fill">' + esc(c.badge) + "</span>";
    var week = el("div", "position:absolute;left:552px;top:84px;padding:10px 24px;border-radius:999px;background:" + GREEN +
      ";border:5px solid " + INK + ";box-shadow:6px 6px 0 " + INK + ";font:700 38px/1 " + FONT + ";color:#fff;transform:rotate(-4deg)", data);
    week.textContent = c.episode;
    if (!c.chrome) { badge.style.display = "none"; week.style.display = "none"; }

    // headline
    var head = el("div", "position:absolute;left:0;right:0;top:790px;display:flex;justify-content:center;align-items:baseline;gap:30px", data);
    var letters = [], colors = [GREEN, BLUE];
    c.headline.forEach(function (w, wi) {
      var ws = el("span", "display:inline-flex", head);
      String(w).split("").forEach(function (ch) {
        var s = el("span", "display:inline-block;transform-origin:50% 90%;font:700 124px/1 " + FONT + ";color:" + colors[wi % 2] +
          ";-webkit-text-stroke:17px " + INK + ";paint-order:stroke fill;text-shadow:0 12px 0 " + INK, ws);
        s.textContent = ch; letters.push(s);
      });
    });

    // the card
    var card = el("div", "position:absolute;left:70px;top:970px;width:940px;height:520px;box-sizing:border-box;border-radius:44px;background:linear-gradient(180deg, " + INK + " 0 108px, #fff 108px);" +
      "border:8px solid " + INK + ";box-shadow:12px 14px 0 " + INK + ", 0 40px 60px rgba(40,30,20,0.25);overflow:hidden;transform-origin:50% 100%", data);
    var bar = el("div", "position:absolute;left:0;right:0;top:0;height:108px;background:" + INK + ";display:flex;align-items:center;justify-content:center;gap:22px", card);
    bar.innerHTML = '<span style="font:700 52px/1 ' + FONT + ';color:#fff">' + esc(c.cardTitle) + '</span><span style="font:500 30px/1 ' + FONT +
      ';color:#dbe4f7">' + esc(weekEndingText) + "</span>";

    var R = 92, CIRC = 2 * Math.PI * R;
    function ring(x, label) {
      var g = el("div", "position:absolute;left:" + (x - 130) + "px;top:140px;width:260px;height:340px", card);
      g.innerHTML = '<svg width="260" height="230" viewBox="-130 -115 260 230" style="position:absolute;left:0;top:0;overflow:visible">' +
        '<circle r="' + R + '" fill="#f4f6fb" stroke="#e3e8f2" stroke-width="26"/>' +
        '<circle class="arc" r="' + R + '" fill="none" stroke-width="26" stroke-linecap="round" transform="rotate(-90)" stroke-dasharray="' + CIRC.toFixed(1) + '"/>' +
        '<circle r="' + (R + 13) + '" fill="none" stroke="' + INK + '" stroke-width="5"/><circle r="' + (R - 13) + '" fill="none" stroke="' + INK + '" stroke-width="5"/></svg>';
      var num = el("div", "position:absolute;left:0;top:0;width:260px;height:230px;display:flex;flex-direction:column;align-items:center;justify-content:center;" +
        "font:700 84px/0.9 " + FONT + ";color:" + INK, g);
      var n1 = el("div", "", num), n2 = el("div", "font:600 33px/1.1 " + FONT + ";color:#4a5570", num);
      var mark = el("div", "position:absolute;left:186px;top:6px;width:66px;height:66px;border-radius:50%;border:5px solid " + INK +
        ";display:grid;place-items:center;transform-origin:50% 50%", g);
      el("div", "position:absolute;left:0;right:0;top:250px;text-align:center;font:700 38px/1.05 " + FONT + ";color:" + INK, g).textContent = label;
      return { g: g, arc: g.querySelector(".arc"), n1: n1, n2: n2, mark: mark };
    }
    var TICK = '<svg width="38" height="38" viewBox="0 0 38 38"><path d="M8 20 L16 28 L31 10" fill="none" stroke="#fff" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var DOT = '<svg width="38" height="38" viewBox="0 0 38 38"><path d="M19 6 L22.8 15 L32 15.8 25 22 27.2 31.4 19 26.4 10.8 31.4 13 22 6 15.8 15.2 15Z" fill="#fff"/></svg>';
    var stats = [
      { r: ring(165, c.labels.days), val: attended, frac: wk.daysOpen ? attended / wk.daysOpen : 1, good: wk.absent === 0, sub: c.labels.of + " " + wk.daysOpen },
      { r: ring(470, c.labels.late), val: wk.lateToSchool, frac: 1, good: wk.lateToSchool === 0, sub: "" },
      { r: ring(775, c.labels.early), val: wk.earlyLeave, frac: 1, good: wk.earlyLeave === 0, sub: "" }
    ];
    stats.forEach(function (s) {
      s.r.arc.setAttribute("stroke", s.good ? GREEN : GOLD);
      s.r.mark.style.background = s.good ? GREEN : GOLDD;
      s.r.mark.innerHTML = s.good ? TICK : DOT;
      s.r.n2.textContent = s.sub;
    });

    var foot = el("div", "position:absolute;left:540px;top:1560px;translate:-50% 0;white-space:nowrap;padding:22px 52px;border-radius:999px;background:" +
      "#23913f;border:7px solid " + INK + ";box-shadow:8px 8px 0 " + INK + ";font:700 54px/1 " + FONT + ";color:#fff;transform-origin:50% 50%", data);
    foot.textContent = c.footer;

    // ---------------------------------------------------------------- motion
    var HEAD0 = 0.35, CARD0 = 0.9, RING0 = 1.5, RINGD = 0.75, RINGS = 0.45, FOOT0 = 3.9;

    ctx.onDraw(function (t) {
      var k = smooth(seg(t, 0, 6));
      world.style.transform = "scale(" + (1.02 + 0.03 * k).toFixed(4) + ")";

      letters.forEach(function (l, i) {
        var u = seg(t, HEAD0 + i * 0.05, HEAD0 + i * 0.05 + 0.38);
        var bob = Math.sin(t * 3 + i * 0.6) * 4 * seg(t, HEAD0 + 1.2, HEAD0 + 1.8);
        l.style.transform = "translateY(" + ((1 - Math.min(1, u * 1.4)) * 60 + bob).toFixed(1) + "px) scale(" + (u <= 0 ? 0 : outBack(u)).toFixed(3) + ")";
      });
      var cu = seg(t, CARD0, CARD0 + 0.55);
      card.style.opacity = cu > 0 ? 1 : 0;
      card.style.transform = "translateY(" + ((1 - outBack(cu)) * 260).toFixed(1) + "px) rotate(" + ((1 - cu) * 3).toFixed(2) + "deg)";

      stats.forEach(function (s, i) {
        var t0 = RING0 + i * RINGS, u = outCubic(seg(t, t0, t0 + RINGD));
        s.r.arc.setAttribute("stroke-dashoffset", (CIRC * (1 - s.frac * u)).toFixed(1));
        s.r.arc.style.opacity = u > 0 ? 1 : 0;
        s.r.n1.textContent = u > 0 ? String(Math.round(s.val * u)) : "";
        s.r.n2.style.opacity = u > 0 ? 1 : 0;
        var m = seg(t, t0 + RINGD - 0.05, t0 + RINGD + 0.3);
        s.r.mark.style.opacity = m > 0 ? 1 : 0;
        s.r.mark.style.transform = "scale(" + (m <= 0 ? 0 : outBack(m)).toFixed(3) + ") rotate(" + ((1 - m) * -40).toFixed(1) + "deg)";
      });

      var f = seg(t, FOOT0, FOOT0 + 0.45);
      foot.style.opacity = f > 0 ? 1 : 0;
      foot.style.transform = "scale(" + (f <= 0 ? 0 : outBack(f) * (1 + 0.015 * Math.sin((t - FOOT0) * 3) * seg(t, FOOT0 + 0.5, FOOT0 + 0.9))).toFixed(4) + ")";
    });
  }
});
})();
