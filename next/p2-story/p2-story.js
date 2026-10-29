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
 * Secondary (Grade 7-12, 26 Oct 2026, Phase 5): modules g79-story (Grade 7-9 girl: show jumping, art girl79) and g1012-story (Grade 10-12 boy: pool, art boy1012). Beats: p712-title 4.5, p712-walk 6,
 * p712-friends 8, p712-class 6, the game 18, p712-around (3 or 6, P712Around.duration), p2-results OR p712-celebrate 6, p712-family (P712Family.duration, data driven), p2-final 4. The length
 * is DATA DRIVEN (about 66 to 95 s): build() sets the instance length from the beat list, MotionIgor.registry[id].beatsFor(content) gives the list (the app uses it for its picture loading).
 * The music bed is 55 s: longer stories fade it out over its last 2.5 s (musicFade in the app, p2-sound.js envelope). The games emit their own counter-ticks: none are added here.
 * content.look === "girl": the sorter beat is the claw machine (p2-claw, same 14 s, same three rounds, same data); anything else is the peg sorter (p2-sorter).
 * Sound: MotionIgor.registry["p2-story"].cues(content) lists every sound moment of the story ([{ t, name, beat }], story seconds): a swoosh at each wipe, the
 * bell (p2-class), the sorter's (or the claw machine's) drops / tags and a counter-tick per counter step. p2-sound.js plays them off the story clock; nothing here makes sound.
 */
(function () {
// beats in play order with their start second (b.at). 100% = the parent page's hasPerfectWeek: the class party; otherwise the results card. Exactly one of the two plays, so the story is the same length either way.
function beatList(perfect, look, band, c) {
  if (band === "g79") return look === "girl" ? girl79List(perfect, c) : boy79List(perfect, c);   // 29 Oct 2026: the Grade 7-9 boy has the girl's story with the Grade 3-6 football as the game (boy79List below)
  if (band === "g1012") return secondaryList(perfect, look, band, c);
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
  return place(list);
}
function place(list) {
  var at = 0;
  list.forEach(function (b) { b.at = at; at += b.dur; });
  return list;
}
// Secondary stories (Grade 7-9 girl = g79, Grade 10-12 boy = g1012): same engine, their own scenes. Around school and the family table are DATA DRIVEN (P712Around.duration, P712Family.duration).
// c = the merged story content (defaults + the child's data); without it the data driven scenes get their shortest length.
function secondaryList(perfect, look, band, c) {
  c = c || {};
  var A = window.P712Around && c.secondary ? P712Around.duration(c) : 6, F = window.P712Family && c.secondary ? P712Family.duration(c) : 8;
  var list = [
    { id: "p712-title", dur: 4.5, art: "title-layers/" },
    { id: "p712-walk", dur: 6, art: "walk-layers/" },
    { id: "p712-friends", dur: 8, art: "friends-layers/" },
    { id: "p712-class", dur: 6, art: "classroom-layers/" },
    band === "g79" ? { id: "p712-showjump", dur: 18, art: "showjump-layers/" } : { id: "p712-pool", dur: 18, art: "pool-layers/" },   // Grade 7-9 girls: show jumping; Grade 10-12 boys: pool (Grade 7-9 boys will reuse the football later)
    { id: "p712-around", dur: A, art: "around-layers/" },
    perfect ? { id: "p712-celebrate", dur: 6, art: "celebrate-layers/" } : { id: "p2-results", dur: 6, art: "results-layers/" },
    { id: "p712-family", dur: F, art: "family-layers/" },
    { id: "p2-final", dur: 4, art: "final-layers/" }
  ];
  return place(list);
}
// Grade 7-9 girl (g79), rebuilt 27 Oct 2026 to P-2 quality (Igor's list): the P-2 storybook title (no student), longer scenes, the classroom ON TIME or LATE (orange crosses),
// the bathroom pass and the clinic as two scenes (6 s each, 4 s at 0 visits), the family email loop (about 7 s per email, up to 5). Girl-only modules p79-*; show jumping, the results card
// and the final page are reused. Bathroom, clinic and family are DATA DRIVEN (P79Bathroom / P79Clinic / P79Family .duration(content)).
function girl79List(perfect, c, game) {
  c = c || {};
  var has = !!c.secondary;
  function d(mod, fallback) { return window[mod] && has ? window[mod].duration(c) : fallback; }
  var list = [
    { id: "p2-title", dur: 4.5, art: "title-layers/" },
    { id: "p79-walk", dur: 4, art: "walk-layers/" },                     // 28 Oct 2026 (Igor's storyboard notes): walk 4 s, friends 4 s, ONE classroom scene 5 s / 12 s,
    { id: "p79-friends", dur: 4, art: "friends-layers/" },               // continuous show jumping (p79-showjump), results and celebration 4 s
    { id: "p79-class", dur: d("P79Class", 5), art: "classroom-layers/" },
    game === "football" ? { id: "p36-football", dur: 18, art: "football-layers/" } : { id: "p79-showjump", dur: 18, art: "showjump-layers/" },   // the Grade 7-9 BOY (art boy79) plays the football: the only difference to the girl's story
    { id: "p79-bathroom", dur: d("P79Bathroom", 4), art: "bathroom-layers/" },
    { id: "p79-clinic", dur: d("P79Clinic", 4), art: "clinic-layers/" },
    perfect ? { id: "p79-celebrate", dur: 4, art: "celebrate-layers/" } : { id: "p79-results", dur: 2, art: "results-layers/" },
    perfect ? null : { id: "p79-reward", dur: 3, art: "results-layers/" },          // round 3 (28 Oct 2026): results card 2 s, then a gold star reward for a not-100% week
    { id: "p79-family", dur: d("P79Family", 7), art: "family-layers/" },
    { id: "p2-final", dur: 4, art: "final-layers/" }
  ].filter(Boolean);
  return place(list);
}
// Grade 7-9 BOY (band g79, art boy79, 29 Oct 2026): the girl's story, every scene and timing, with the Grade 3-6 football (p36-football, art boy79/football-layers/, 18 s) instead of the show jumping.
function boy79List(perfect, c) { return girl79List(perfect, c, "football"); }
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
  var beats = beatList(!!c.perfect, c.look, band, c), out = [], last = beats[beats.length - 1];
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
    secondary: null,                   // Grade 7-12 only (P2Data.toStory): { lateToClass, bathroom, clinic, emails: [{ teacher, category, note, count }] } of the newest week
    grade12: false,                    // Grade 12 only: the senior jacket (name, initials, 27) and the taller figure
    initials: "",                      // the jacket front ("OA")
    classYear: null,                   // the jacket back ("27" for the class of 2027)
    look: ""                           // "girl": the claw machine (p2-claw) instead of the peg sorter in the sorter beat, handed to every beat. The link sets it from the child's gender (?look=girl|boy overrides)
  },
  build: function (ctx) {
    var c = ctx.content, st = ctx.stage, esc = ctx.util.esc;
    var SW = ctx.W;                                    // the stage follows the screen: 1080 on a phone, up to 3414 on a laptop (mount opts.size = [SW, 1920])
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f";
    // 100% = the parent page's hasPerfectWeek (computed by P2Data.toStory): the class party; otherwise the results card. Exactly one of the two plays, so the story is the same length either way.
    var perfect = !!c.perfect;
    var BEATS = beatList(perfect, c.look, band, c);                           // 54.5 s in all (P-2), 58.5 s (Grade 3-6), secondary: the sum of the beats (data driven)
    var TOTAL = BEATS[BEATS.length - 1].at + BEATS[BEATS.length - 1].dur;
    if (band === "g79" || band === "g1012") ctx.def.duration = TOTAL;     // the kit reads def.duration after build(): the secondary stories are as long as their beats
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
        // p36-football, p712-showjump, p79-showjump and p712-pool use content.art as it is (no P2Kid inside): the story hands it the boy36 folder; p36-puzzle resolves girl36 itself with P2Kid.art, like the kid pictures of the other beats
        art: c.base + (b.id === "p36-football" || b.id === "p712-showjump" || b.id === "p79-showjump" || b.id === "p712-pool" ? P2Kid.art({ look: c.look, band: band }, b.art) : b.art), child: c.child, episode: c.episode, weekEnding: c.weekEnding, weekEndingText: c.weekEndingText, weekNumber: c.weekNumber, perfect: c.perfect,
        lastWeek: c.lastWeek, term: c.term, year: c.year, response: c.response, dataAsOf: c.dataAsOf, pxScale: c.pxScale, look: c.look, holdPictures: c.holdPictures, band: band, chrome: false,
        secondary: c.secondary, grade12: c.grade12, initials: c.initials, classYear: c.classYear
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
defineStory("g79-story", "g79", 75.5, "Grade 7-9 girl report · story");     // 75.5 s = the shortest case (0 visits, 0 emails); the real length is set in build()
defineStory("g1012-story", "g1012", 66, "Grade 10-12 boy report · story");
// beatsFor(content) = the beat list with start seconds for the child's data (the app's picture loading needs it)
["p2-story", "p36-story", "g79-story", "g1012-story"].forEach(function (id) {
  var band = id === "p36-story" ? "g36" : id === "g79-story" ? "g79" : id === "g1012-story" ? "g1012" : "p2";
  MotionIgor.registry[id].beatsFor = function (content) { var c = MotionIgor.util.deepMerge(MotionIgor.registry[id].defaults, content || {}); return beatList(!!c.perfect, c.look, band, c); };
});
})();
