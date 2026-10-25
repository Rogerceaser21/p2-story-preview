/* P-2 report story · p2-story
 * Plays the P-2 beats one after another (kit layout pattern: each beat is mounted once and seeked from this clock).
 * Between beats the kit's swoosh-wipe sweeps across, played 3x faster than its own 1.4 s so the full cover lasts
 * under 0.1 s, and the beat underneath swaps at the cover moment (hard cut under the band, never a cross-dissolve,
 * which ghosted the faces). The story owns the badge and week pill and draws them ABOVE the wipe, so they stay
 * on screen the whole time (each beat runs with chrome: false); the badge and week pill pop in when the title card ends
 * (the title has its own big week pill) and the week pill fades out on the final card. Beats: title 4.5 s, walk 6 s, gate 8 s,
 * classroom 6 s, shape sorter 14 s (three rounds of 4.6 s: came to school, on time, stayed all day), then the party (100% week) OR the results card (6 s), family 6 s, final card 4 s.
 * The walk to school (6 s: mum and Noor from behind up the school path) plays between the title and the gate, so the gate and
 * everything after it start 6 s later. The three-round sorter (14 s, was 7 s) makes the story 54.5 s in all.
 * Needs swoosh-wipe.js from the kit loaded alongside the beats.
 * content.look === "girl": the sorter beat is the claw machine (p2-claw, same 14 s, same three rounds, same data); anything else is the peg sorter (p2-sorter).
 * Sound: MotionIgor.registry["p2-story"].cues(content) lists every sound moment of the story ([{ t, name, beat }], story seconds): a swoosh at each wipe, the
 * bell (p2-class), the sorter's (or the claw machine's) drops / tags and a counter-tick per counter step. p2-sound.js plays them off the story clock; nothing here makes sound.
 */
(function () {
// beats in play order with their start second (b.at). 100% = the parent page's hasPerfectWeek: the class party; otherwise the results card. Exactly one of the two plays, so the story is the same length either way.
function beatList(perfect, look, band) {
  var g36 = band === "g36";                                           // Grade 3-6: the game scene is 18 s (three rounds of 6 s): jigsaw for girls, football for boys; everything after it starts 4 s later
  var list = [
    { id: "p2-title", dur: 4.5, art: "title-layers/" },
    { id: "p2-walk", dur: 6, art: "walk-layers/" },
    { id: "p2-arrival", dur: 8, art: "arrival-layers/" },
    { id: "p2-class", dur: 6, art: "classroom-layers/" },
    g36 ? (look === "girl" ? { id: "p36-puzzle", dur: 18, art: "puzzle-layers/" } : { id: "p36-football", dur: 18, art: "football-layers/" })
        : look === "girl" ? { id: "p2-claw", dur: 14, art: "claw-layers/" } : { id: "p2-sorter", dur: 14, art: "sorter-layers/" },   // P-2 girls: the claw machine (p2-claw), P-2 boys: the peg sorter
    perfect ? { id: "p2-party", dur: 6, art: "party-layers/" } : { id: "p2-results", dur: 6, art: "results-layers/" },
    { id: "p2-family", dur: 6, art: "family-layers/" },
    { id: "p2-final", dur: 4, art: "final-layers/" }
  ];
  var at = 0;
  list.forEach(function (b) { b.at = at; at += b.dur; });
  return list;
}
var SPEED = 3, WIPE = 1.4 / SPEED, COVER = 0.7 / SPEED;
// Sound cues of the whole story: [{ t, name, beat }] in story seconds (the sound layer, p2-sound.js, plays them off the story clock).
//   swoosh        at the start of every scene-change wipe (the beat underneath swaps COVER s later)
//   (beat cues)   whatever a beat declares in MotionIgor.registry[id].cues(content), moved by the beat's start: bell (p2-class), and the sorter's
//                 round-start / drop-in / wrong-hole / tag-absent / tag-late / tag-early / round-clear
//   counter-tick  a counter card goes up: round 1 of the sorter at each good piece (drop-in), round 2 at each tag-late, round 3 at each tag-early,
//                 SORTER_TICK_LAG s after the cue (the sorter does not declare counter cues; RD 4.6 s is its round length)
// Nothing is returned for the final beat (the report is silent) or after it.
var SORTER_RD = 4.6, SORTER_TICK_LAG = 0.06, G36_RD = 6;           // G36_RD: round length of the Grade 3-6 game beats (p36-puzzle, p36-football)
function storyCues(content, band, id) {
  var c = MotionIgor.util.deepMerge(MotionIgor.registry[id || "p2-story"].defaults, content || {});
  var beats = beatList(!!c.perfect, c.look, band), out = [], last = beats[beats.length - 1];
  beats.slice(1).forEach(function (b) { out.push({ t: +(b.at - COVER).toFixed(3), name: "swoosh", beat: b.id }); });
  beats.forEach(function (b) {
    var def = MotionIgor.registry[b.id];
    if (!def || typeof def.cues !== "function") return;
    def.cues(c).forEach(function (q) {
      out.push({ t: +(b.at + q.t).toFixed(3), name: q.name, beat: b.id });
      if ((b.id === "p2-sorter" || b.id === "p2-claw") && (((q.name === "drop-in" || q.name === "toy-drop") && q.t < SORTER_RD) || q.name === "tag-late" || q.name === "tag-early")) {
        out.push({ t: +(b.at + q.t + SORTER_TICK_LAG).toFixed(3), name: "counter-tick", beat: b.id });
      }
      // Grade 3-6: round 1 counts a day at school at each piece that goes in / goal; rounds 2 and 3 tick at each tag-late / tag-early
      if ((b.id === "p36-puzzle" || b.id === "p36-football") && (((q.name === "piece-in" || q.name === "goal") && q.t < G36_RD) || q.name === "tag-late" || q.name === "tag-early")) {
        out.push({ t: +(b.at + q.t + SORTER_TICK_LAG).toFixed(3), name: "counter-tick", beat: b.id });
      }
    });
  });
  return out.filter(function (q) { return q.t < last.at; }).sort(function (a, b) { return a.t - b.t; });
}

function defineStory(id, band, duration, title) {
MotionIgor.define({
  id: id,
  duration: duration,
  size: [1080, 1920],
  kind: "layout",
  title: title,
  cues: function (content) { return storyCues(content, band, id); },
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    base: "",
    lazySorter: false,                 // true (the app): the shape sorter is mounted just before its beat, once three.js has loaded (three.min.js is 630 KB: it must not delay the start)
    pxScale: 0,                        // css px of the screen per stage px (set by the app for the last beat); 0 = the old phone size
    badge: "Weekly report",
    episode: "Week 7",
    child: { name: "Noor", grade: "Grade 0", form: "PREP A" },
    // the child's numbers: what P2Data.toStory(response) gives for the app's response (lastWeek / term / year are the
    // parent page's period totals plus the numbers it works out from them). Default = sample-100 (a 100% week).
    weekEnding: "2026-10-15",
    weekEndingText: "Week ending 15 Oct",   // the page's own label for the week (P2Data.toStory)
    weekNumber: 7,                         // the weekInTerm the page's Term / Week picker shows for that week (Term 1 \u00b7 Week 7)
    perfect: true,                     // the page's hasPerfectWeek: true plays the class party, false the results card
    lastWeek: { daysOpen: 2, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    term: { daysOpen: 22, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    year: { daysOpen: 22, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    response: null,                    // the raw fetch-student-data response (P2Data.toStory(response).response): the last beat draws the whole page from it
    dataAsOf: "2026-10-20",
    look: ""                           // "girl": the claw machine (p2-claw) instead of the peg sorter in the sorter beat, handed to every beat. The link sets it from the child's gender (?look=girl|boy overrides)
  },
  build: function (ctx) {
    var c = ctx.content, st = ctx.stage, esc = ctx.util.esc;
    var SW = ctx.W;                                    // the stage follows the screen: 1080 on a phone, up to 3414 on a laptop (mount opts.size = [SW, 1920])
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f";
    // 100% = the parent page's hasPerfectWeek (computed by P2Data.toStory): the class party; otherwise the results card. Exactly one of the two plays, so the story is the same length either way.
    var perfect = !!c.perfect;
    var BEATS = beatList(perfect, c.look, band);                              // 54.5 s in all (P-2), 58.5 s (Grade 3-6)
    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function layer(z) {
      var h = document.createElement("div");
      h.style.cssText = "position:absolute;inset:0;width:" + SW + "px;height:1920px;z-index:" + z;
      st.appendChild(h); return h;
    }

    function nestBeat(h, b) {
      ctx.nest(h, b.id, { at: b.at, dur: b.dur, size: [SW, 1920], content: {
        // p36-football uses content.art as it is (no P2Kid inside): the story hands it the boy36 folder; p36-puzzle resolves girl36 itself with P2Kid.art, like the kid pictures of the other beats
        art: c.base + (b.id === "p36-football" ? P2Kid.art({ look: c.look, band: band }, b.art) : b.art), child: c.child, episode: c.episode, weekEnding: c.weekEnding, weekEndingText: c.weekEndingText, weekNumber: c.weekNumber, perfect: c.perfect,
        lastWeek: c.lastWeek, term: c.term, year: c.year, response: c.response, dataAsOf: c.dataAsOf, pxScale: c.pxScale, look: c.look, holdPictures: c.holdPictures, band: band, chrome: false
      } });
    }
    var lazy = null;                                                  // { h, b }: the beat that waits for three.js
    var hosts = BEATS.map(function (b) {
      var h = layer(1);
      if (c.lazySorter && (b.id === "p2-sorter" || b.id === "p2-claw" || b.id === "p36-football") && typeof THREE === "undefined") lazy = { h: h, b: b };
      else nestBeat(h, b);
      return h;
    });
    // wipes: mounted directly so they can run faster than their own clock (nest() only plays at 1x)
    var wipes = BEATS.slice(1).map(function (b) {
      var h = layer(5);
      var inst = MotionIgor.mount(h, "swoosh-wipe", { theme: ctx.theme && ctx.theme.id, fit: "cover", background: false, content: { from: "left", coverAt: 0.7 } });
      inst.pause();
      return { h: h, inst: inst, at: b.at - COVER, last: null };
    });

    // chrome above everything: badge, week pill (pop in at the start, then stay)
    var chrome = layer(10); chrome.style.pointerEvents = "none";
    function el(css, html) { var e = document.createElement("div"); e.style.cssText = css; if (html != null) e.innerHTML = html; chrome.appendChild(e); return e; }
    var badge = el("position:absolute;left:44px;top:58px;transform-origin:0 50%;display:flex;align-items:center;gap:18px;" +
      "padding:16px 34px 16px 20px;border-radius:999px;background:" + GOLD + ";border:6px solid " + INK + ";box-shadow:8px 8px 0 " + INK,
      '<svg width="70" height="70" viewBox="0 0 70 70"><rect x="6" y="8" width="58" height="54" rx="8" fill="#fff" stroke="' + INK +
      '" stroke-width="5"/><rect x="15" y="20" width="16" height="12" rx="2" fill="' + BLUE + '"/><path d="M37 22h18M37 30h14M15 42h40M15 51h30" stroke="' + INK +
      '" stroke-width="4.5" stroke-linecap="round"/></svg><span style="font:700 50px/1 ' + FONT + ';color:#fff;-webkit-text-stroke:9px ' + INK +
      ';paint-order:stroke fill;letter-spacing:0.01em">' + esc(c.badge) + "</span>");
    var week = el("position:absolute;left:552px;top:84px;transform-origin:50% 50%;padding:10px 24px;border-radius:999px;background:" +
      GREEN + ";border:5px solid " + INK + ";box-shadow:6px 6px 0 " + INK + ";font:700 38px/1 " + FONT + ";color:#fff", esc(c.episode));

    ctx.onDraw(function (t) {
      if (lazy && typeof THREE !== "undefined" && t >= lazy.b.at - 2.0) { var lz = lazy; lazy = null; nestBeat(lz.h, lz.b); }   // the app's clock waits for three.js at 23.9 s at the latest
      BEATS.forEach(function (b, i) {
        var next = BEATS[i + 1];
        hosts[i].style.display = t >= b.at && (!next || t < next.at) ? "block" : "none";   // display: beats set visibility on their own layers
      });
      wipes.forEach(function (w) {
        var on = t >= w.at && t <= w.at + WIPE;
        w.h.style.display = on ? "block" : "none";
        var ct = clamp((t - w.at) * SPEED, 0, 1.4);
        if (ct !== w.last) { w.last = ct; w.inst.seek(ct); }
      });
      var C0 = BEATS[1].at;                                         // badge and week pill arrive with the first story beat
      var b = seg(t, C0 + 0.15, C0 + 0.6);
      badge.style.transform = "scale(" + (b <= 0 ? 0 : outBack(b)).toFixed(3) + ")";
      var wk = seg(t, C0 + 0.55, C0 + 0.95);
      week.style.transform = "scale(" + (wk <= 0 ? 0 : outBack(wk)).toFixed(3) + ") rotate(-4deg)";
      var fin = BEATS.filter(function (x) { return x.id === "p2-final"; })[0];   // the final card's tabs name the period: no week pill there
      week.style.opacity = fin ? (1 - seg(t, fin.at - 0.05, fin.at + 0.25)).toFixed(3) : 1;
      badge.style.opacity = fin ? (1 - seg(t, fin.at - 0.05, fin.at + 0.25)).toFixed(3) : 1;   // the page carries its own title and wall: the last frame equals the page
    });
    return { destroy: function () { wipes.forEach(function (w) { if (w.inst.destroy) w.inst.destroy(); }); } };
  }
});
}
defineStory("p2-story", "p2", 54.5, "P-2 report · story");
defineStory("p36-story", "g36", 58.5, "Grade 3-6 report · story");
})();
