/* P-2 claw machine beat · p2-claw  (3D living storybook, real 3D claw, THREE ROUNDS; the girls' version of p2-sorter)
 * Same data, same rounds, same counters and gold tags as the peg sorter (p2-sorter.js), told with a toy claw machine instead:
 *   Round 1 "Came to school"  : a day ABSENT is a miss (gold tag Absent).
 *   Round 2 "On time"         : a day LATE TO SCHOOL is a miss (gold tag Late to school); absent days miss again (tag Absent).
 *   Round 3 "Stayed all day"  : a day she LEFT EARLY is a miss (gold tag Early leave); absent days miss again (tag Absent).
 *   Order inside a round: days that went well first, then the round's own misses (late / early), then the absent misses LAST.
 * One plush toy per school day open (at most four, a different toy every day) sits on top of the toy heap. The toys are lamb, owl, penguin and fox: the four plush that are NOT
 * in the picture's own heap (the heap already holds teddy, bunny, elephant, duck, puppy, kitten, unicorn and panda, so picking those showed the same toy twice); every round
 * uses the same four in a rotated order, the toys of a round are spread over the heap (SPOTS), and toy-0..7 stay in the art folder unused (content.kinds can pick any of the twelve).
 *   GOOD day  : the silver three-prong claw moves over the toy, lowers, the prongs close ON it (the closing angle is solved from the toy's own outline: the front prong tips
 *               end on the toy's widest row, within a pixel or two), lifts it, carries it to the front left corner, opens; the toy drops down the left edge of the heap (clear of
 *               the front toys' faces), goes behind the machine front (the chute pipe), drops into the prize tray (the chute window) and stays there, ready to be counted; the
 *               round's won toys pile up in the tray and leave with the round.
 *   MISSED day: the claw grabs and lifts the toy right out of the pile (as high as the cable allows), the toy wobbles, slips out of the prongs, falls back on the heap and
 *               lands with a bounce (nothing comes out); a gold tag labels it.
 * The picture (cabinet, glass, heap of toys) is ChatGPT art with the claw and the lifted teddy removed (claw-layers/bg.jpg, wide/claw-bg.jpg); the claw is REAL 3D
 * (three.js: trolley on the gold rail, cable, hub, three prongs whose arms rotate open and shut) and the toys are whole pictures (toy-0..11.webp, cut by colour
 * from one sheet) standing as flat planes inside the same 3D scene, so the back prong passes BEHIND a toy and the front prongs IN FRONT of it.
 * The cabinet base is drawn again above the 3D layer, so a won toy goes down BEHIND the machine front. Toys move as whole pictures only (no limbs).
 * Between rounds the toys left on the heap pop away and the next round's pop in; the last round stays. Counter cards, tags, headings: as the sorter.
 * Every frame is a pure function of t (kit rule 1): the claw is driven by keyframe channels built from the data at build time; three.js and the pictures
 * are approved exceptions to rule 7, like the sorter.
 * MotionIgor.registry["p2-claw"].cues(content) returns the moments that carry sounds: [{ t, name }] in beat-local seconds: round-start, claw-move, claw-grab,
 * toy-drop (a won toy goes into the chute), toy-slip (a missed toy leaves the prongs), tag-absent, tag-late, tag-early, round-clear.
 */
(function () {
// ---------------------------------------------------------------- the rounds: timing and the plan (pure data, no three.js: cues() uses it too)
var RD = 4.6, NR = 3, DUR = 14;                                       // seconds per round, rounds, length of the beat (the last round holds to the end)
var TM = {
  HEAD0: 0.1, GO0: 0.3, PIECE: 0.82,                                  // heading; the claw's first move; seconds per day (piece)
  MOVE: 0.15, LOW0: 0.10, LOW1: 0.22, CLOSE1: 0.47, GRAB: 0.43,       // piece-local: arrive over the toy (opening), rise to travel height, lower, close (0.25 s, cue at GRAB = the prongs touch)
  LIFT0: 0.47, LIFT1: 0.60, CARRY0: 0.55, REL: 0.72, REL1: 0.80,      // good day: lift, carry to the front left corner, the prongs open at REL
  FALLG: 0.20, HIDE: 0.94, TRAYD: 0.12,                               // good day: the toy falls from REL + 0.02 and is behind the machine front at HIDE; it drops down the chute and lands in the tray TRAYD later
  LIFTM1: 0.62, WOB0: 0.62, SLIP: 0.76, FALLM: 0.20, LANDM: 0.96,     // missed day: the toy is lifted as high as the cable allows, wobbles, leaves the prongs at SLIP, lands back at LANDM
  TAG: 0.1, TAGSTEP: 0.15, OUT0: RD - 0.45, OUTD: 0.4
};
var ROUND_TAG = ["absent", "late", "early"];
function makePlan(wk) {
  wk = wk || {};
  var D = Math.max(0, Math.round(wk.daysOpen || 0)), n = Math.min(4, D);
  var units = [Math.max(0, Math.round(wk.absent || 0)), Math.max(0, Math.round(wk.lateToSchool || 0)), Math.max(0, Math.round(wk.earlyLeave || 0))];
  var absPieces = Math.min(units[0], n);
  var plan = { D: D, n: n, units: units, rounds: [], target: [Math.max(0, D - units[0]), units[1], units[2]] };
  for (var r = 0; r < NR; r++) {
    // every piece is played in every round. Misses are the LAST pieces: this round's own misses (late / early) just before the absent misses, which come last.
    var own = r === 0 ? 0 : Math.min(units[r], n - absPieces), m = absPieces + own, firstMiss = n - m, pieces = [], i, q;
    for (i = 0; i < n; i++) {
      var tag = i < firstMiss ? null : (i >= n - absPieces ? "absent" : ROUND_TAG[r]);
      pieces.push({ i: i, state: tag ? "miss" : "good", tag: tag, k: i, u: 0, t0: 0, land: 0, tagAt: [] });
    }
    for (q = 0; q < absPieces; q++) pieces[n - absPieces + q].u = 1;
    for (q = absPieces; q < units[0] && absPieces > 0; q++) pieces[n - 1 - ((q - absPieces) % absPieces)].u++;       // extra absences stack on a toy that is already absent
    if (r > 0) {
      for (q = 0; q < own; q++) pieces[firstMiss + q].u = 1;
      for (q = own; q < units[r] && own > 0; q++) pieces[n - absPieces - 1 - ((q - own) % own)].u++;                  // extra misses stack on a toy that is already missed
    }
    var ev = [];                                                      // counter events {t, dv}, round-local seconds
    pieces.forEach(function (p) {
      p.t0 = TM.GO0 + p.k * TM.PIECE;
      p.land = p.t0 + (p.state === "miss" ? TM.LANDM : TM.HIDE + TM.TRAYD);     // a won toy counts when it lands in the tray
      if (p.state === "good" && r === 0) ev.push({ t: p.land, dv: 1, p: p });
      for (var j = 0; j < p.u; j++) {
        p.tagAt.push(p.land + TM.TAG + j * TM.TAGSTEP);
        if (r > 0 && p.tag === ROUND_TAG[r]) ev.push({ t: p.land + TM.TAG + j * TM.TAGSTEP, dv: 1, p: p });         // absent tags never move the Late / Early numbers
      }
    });
    // the counter ends on the exact number in the data: whatever the toys could not show goes on the last event (or a fallback one)
    var sum = 0; ev.forEach(function (e) { sum += e.dv; });
    var want = plan.target[r];
    if (sum !== want) {
      if (ev.length) ev[ev.length - 1].dv += want - sum;
      else ev.push({ t: TM.GO0 + 0.6, dv: want, p: null });
    }
    var last = 0; pieces.forEach(function (p) { last = Math.max(last, p.land); });
    plan.rounds.push({ r: r, tag: ROUND_TAG[r], present: n - absPieces, miss: m, pieces: pieces, events: ev, endAt: Math.max(last, ev.length ? ev[ev.length - 1].t : 0) + 0.5, perfect: m === 0 && n > 0 });
  }
  return plan;
}
function makeCues(wk) {
  var plan = makePlan(wk), out = [];
  plan.rounds.forEach(function (R) {
    var base = R.r * RD;
    out.push({ t: +(base + 0.1).toFixed(3), name: "round-start" });
    R.pieces.forEach(function (p) {
      out.push({ t: +(base + p.t0 + 0.02).toFixed(3), name: "claw-move" });
      out.push({ t: +(base + p.t0 + TM.GRAB).toFixed(3), name: "claw-grab" });
      if (p.state === "good") out.push({ t: +(base + p.t0 + TM.HIDE).toFixed(3), name: "toy-drop" });       // the toy enters the chute
      if (p.state === "miss") {
        out.push({ t: +(base + p.t0 + TM.SLIP + 0.02).toFixed(3), name: "toy-slip" });
        p.tagAt.forEach(function (ta) { out.push({ t: +(base + ta).toFixed(3), name: "tag-" + p.tag }); });
      }
    });
    if (R.events.length && R.r > 0 && R.events[0].p === null) out.push({ t: +(base + R.events[0].t).toFixed(3), name: "tag-" + R.tag });
    if (R.r < NR - 1) out.push({ t: +(base + TM.OUT0).toFixed(3), name: "round-clear" });
  });
  out.sort(function (a, b) { return a.t - b.t; });
  return out;
}
// the twelve toys: size of each cut-out picture (claw-layers/toy-N.webp) and where the prong tips hold it, all measured from the toy's own pixels by src/tools/claw.py grab:
// gy = the row (fraction of its height from the top: the widest row between 30 and 60 %), gx = the toy's centre on that row (fraction of its width), hw = half its width there (toy px)
var TOYS = [
  { n: "teddy", w: 276, h: 340, gy: 0.3471, gx: 0.5072, hw: 111.0 },
  { n: "bunny", w: 231, h: 371, gy: 0.5256, gx: 0.513, hw: 106.5 },
  { n: "elephant", w: 365, h: 283, gy: 0.3392, gx: 0.4986, hw: 178.0 },
  { n: "duck", w: 233, h: 328, gy: 0.436, gx: 0.5021, hw: 113.0 },
  { n: "puppy", w: 338, h: 289, gy: 0.3841, gx: 0.5, hw: 166.0 },
  { n: "kitten", w: 274, h: 307, gy: 0.3909, gx: 0.4453, hw: 118.0 },
  { n: "unicorn", w: 281, h: 333, gy: 0.5646, gx: 0.4395, hw: 112.5 },
  { n: "panda", w: 269, h: 294, gy: 0.3776, gx: 0.4944, hw: 118.0 },
  { n: "lamb", w: 331, h: 294, gy: 0.4286, gx: 0.5015, hw: 161.0 },
  { n: "owl", w: 274, h: 294, gy: 0.3776, gx: 0.5036, hw: 120.0 },
  { n: "penguin", w: 296, h: 284, gy: 0.5951, gx: 0.5051, hw: 126.5 },
  { n: "fox", w: 290, h: 302, gy: 0.5397, gx: 0.5138, hw: 135.0 }
];
// which of the twelve toys plays in round r on day i: the four that are not in the picture's own heap (lamb 8, owl 9, penguin 10, fox 11), rotated every round
function kindOf(r, i, kinds) { return kinds && kinds[r * 4 + i] != null ? kinds[r * 4 + i] : 8 + ((i - r) % 4 + 4) % 4; }

MotionIgor.define({
  id: "p2-claw",
  duration: DUR,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · last week at school (claw machine)",
  style: "3D living storybook",
  engine: "webgl",
  theme: "ais",
  cues: function (content) { return makeCues(MotionIgor.util.deepMerge(MotionIgor.registry["p2-claw"].defaults, content || {}).lastWeek); },
  defaults: {
    art: "claw-layers/",
    subtitle: "Last week at school",
    rounds: [{ head: [["Came", "to"], ["school"]] }, { head: [["On"], ["time"]] }, { head: [["Stayed", "all"], ["day"]] }],
    counter: "Days at school",
    of: "of",
    lateLabel: "Late to school",
    earlyLabel: "Early leave",
    tags: { absent: "Absent", late: "Late to school", early: "Early leave" },
    lastWeek: { daysOpen: 2, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    badge: "Weekly report",
    episode: "Week 7",
    look: "",
    chrome: true
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col, esc = ctx.util.esc;
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f", GOLDD = "#d99a12";
    var T3 = (typeof THREE !== "undefined") ? THREE : null;

    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function smooth(x) { return x * x * (3 - 2 * x); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function inQuad(x) { return x * x; }
    function lerp(a, b, k) { return a + (b - a) * k; }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }

    // ---------------------------------------------------------------- the picture, in picture pixels (1080 x 1920, the cabinet picture scaled 1.148)
    var RAILY = 681;                                                   // centre of the claw's trolley on the gold rail
    var HOMEX = 570, HOMET = 935, HOVT = 915, XC = 292;                // claw home (x, prong-tip y), travel height, x over the front left corner (where a won toy is let go)
    var XD = 222;                                                      // the line a won toy falls along: the left edge of the heap, clear of the front toys' faces
    var HIDEY = 1262;                                                  // top of the cabinet base: a won toy is hidden once it is behind it (it is then in the chute pipe)
    var CHUTE = [379, 1478];                                           // the prize chute opening on the picture
    var TRAY = { x0: 278, y0: 1349, w: 196, h: 190, floor: 1522 };     // the chute window's dark opening (the clip box of the tray toys) and the tray floor (toy bottoms rest here)
    var TRS = 0.48;                                                    // a toy lying in the tray is this fraction of its size on the heap
    var TS = 0.56;                                                     // toy picture px -> frame px
    var SPOTS = { 1: [590], 2: [445, 735], 3: [370, 580, 780], 4: [355, 500, 650, 795] }, SPY = 1072;   // where the toys of a round sit on the heap (centre x, by number of days open), spread over the heap
    var A_HOME = 60;                                                   // prong opening (degrees away from vertical) resting
    var S = 0.88, L1 = 95 * S, L2 = 85 * S, BETA = 62 * Math.PI / 180, HR = 24 * S, HY = 20 * S;   // claw size: arm lengths, elbow bend, hinge radius, hinge below the hub centre
    function dropOf(aDeg) { var a = aDeg * Math.PI / 180; return L1 * Math.cos(a) + L2 * Math.cos(BETA - a); }   // prong tips below the hinges
    function headYOf(tip, aDeg) { return tip - HY - dropOf(aDeg); }    // hub centre (picture y) for a given prong-tip y
    function tipMinOf(aDeg) { return 764 + HY + dropOf(aDeg); }        // highest prong-tip y the cable allows (the hub stays 764 px down: the cable still shows under the trolley)
    function radOf(aDeg) { var a = aDeg * Math.PI / 180; return HR + L1 * Math.sin(a) + L2 * Math.sin(a - BETA); }   // distance of a prong tip from the hub axis

    // ---------------------------------------------------------------- days -> what each toy does, round by round
    var PL = makePlan(c.lastWeek), daysTotal = PL.D, n = PL.n;
    var B = [], i;                                                     // B[i]: the toy at spot i, one per round (R[r])
    for (i = 0; i < n; i++) B.push({ i: i, R: [] });
    PL.rounds.forEach(function (rd) {
      var good = 0;
      rd.pieces.forEach(function (p) {
        var kind = kindOf(rd.r, p.i, c.kinds), meta = TOYS[kind], H = meta.h * TS, W = meta.w * TS, spx = (SPOTS[n] || SPOTS[4])[p.i];
        B[p.i].R[rd.r] = {
          state: p.state, tag: p.tag, t0: p.t0, land: p.land, u: p.u, tagAt: p.tagAt, pop0: 0.1 + p.i * 0.08, kind: kind, meta: meta, W: W, H: H,
          sx: spx, sy: SPY, sz: 0,                                     // the toy's centre on the heap
          ax: spx + (meta.gx - 0.5) * W,                               // the point the prongs hold: the centre of the toy on its widest row ...
          sh: SPY - H / 2 + meta.gy * H,                               // ... and that row's y
          hwpx: meta.hw * TS,                                          // half the toy's width on that row (picture px)
          aG: 54, aO: 68, mx: 0, cyo: 6, carryT: 905,                  // closing angle, wide-open angle, tips' mid x / y against the claw's nominal point (solved after the scene exists)
          slot: p.state === "good" ? good++ : -1, good: 0, tel: null
        };
      });
      rd.pieces.forEach(function (p) { B[p.i].R[rd.r].good = good; });
    });
    function roundOf(t) { return clamp(Math.floor(t / RD), 0, NR - 1); }

    // ---------------------------------------------------------------- the claw: keyframe channels (x, prong-tip y, opening, sway), built from the plan
    var EASE = { lin: function (x) { return x; }, io: smooth, out: function (x) { return 1 - Math.pow(1 - x, 3); }, inn: inQuad };
    var CH = { X: [{ t: 0, v: HOMEX, e: "lin" }], T: [{ t: 0, v: HOMET - 45, e: "lin" }], A: [{ t: 0, v: A_HOME, e: "lin" }], W: [{ t: 0, v: 1, e: "lin" }] };
    function go(ch, t0, t1, v, e) {
      var L = ch[ch.length - 1];
      if (t0 > L.t + 1e-6) ch.push({ t: t0, v: L.v, e: "lin" }); else t0 = L.t;
      if (t1 <= t0) t1 = t0 + 0.001;
      ch.push({ t: t1, v: v, e: e || "io" });
    }
    function ev(ch, t) {
      var m = ch.length, i2;
      if (t <= ch[0].t) return ch[0].v;
      for (i2 = 1; i2 < m; i2++) {
        if (t <= ch[i2].t) { var a = ch[i2 - 1], b = ch[i2], u = (t - a.t) / (b.t - a.t); return a.v + (b.v - a.v) * EASE[b.e](u); }
      }
      return ch[m - 1].v;
    }
    function buildChannels() {
      go(CH.T, 0.05, 0.55, HOMET, "out");                              // the claw settles on its cable at the start
      PL.rounds.forEach(function (rd) {
        var base = rd.r * RD, lastT0 = null;
        rd.pieces.forEach(function (p) {
          var R = B[p.i].R[rd.r], t0 = base + p.t0, hold = R.sh - R.cyo;     // hold: the nominal tip y that puts the front tips on the toy's grab row
          lastT0 = t0;
          // travel over the toy with the prongs wide open (at travel height), lower, close on it in 0.25 s (the tips settle onto the toy's widest row)
          go(CH.X, t0, t0 + TM.MOVE, R.ax - R.mx, "io");
          go(CH.A, t0, t0 + 0.13, R.aO, "io");
          go(CH.W, t0, t0 + TM.LOW0, 0, "io");                         // no sway while the claw works on a toy: the prong tips stay exactly where they were solved
          go(CH.T, t0, t0 + TM.LOW0, HOVT, "io");
          go(CH.T, t0 + TM.LOW0, t0 + TM.LOW1, hold - 8, "io");
          go(CH.A, t0 + TM.LOW1, t0 + TM.CLOSE1, R.aG, "io");
          go(CH.T, t0 + TM.LOW1, t0 + TM.CLOSE1, hold, "io");
          if (p.state === "good") {
            go(CH.T, t0 + TM.LIFT0, t0 + TM.LIFT1, R.carryT, "out");   // lift
            go(CH.X, t0 + TM.CARRY0, t0 + TM.REL, XC, "io");           // carry to the front left corner
            go(CH.A, t0 + TM.REL, t0 + TM.REL1, R.aO, "io");           // open: the toy is let go
          } else {
            go(CH.T, t0 + TM.LIFT0, t0 + TM.LIFTM1, R.carryT, "out");  // lift the toy right out of the pile
            go(CH.A, t0 + TM.WOB0, t0 + TM.SLIP, R.aG + 4, "io");      // the grip loosens
            go(CH.A, t0 + TM.SLIP, t0 + TM.PIECE - 0.02, R.aO, "io");  // the toy slides out
          }
        });
        if (lastT0 !== null) {                                         // after the last day the claw goes home
          go(CH.X, lastT0 + TM.PIECE - 0.02, lastT0 + TM.PIECE + 0.45, HOMEX, "io");
          go(CH.T, lastT0 + TM.PIECE - 0.02, lastT0 + TM.PIECE + 0.45, HOMET, "io");
          go(CH.A, lastT0 + TM.PIECE - 0.02, lastT0 + TM.PIECE + 0.45, A_HOME, "io");
          go(CH.W, lastT0 + TM.PIECE - 0.02, lastT0 + TM.PIECE + 0.45, 1, "io");
        }
      });
    }
    function clawAt(t) { return { x: ev(CH.X, t), tip: ev(CH.T, t), a: ev(CH.A, t), w: ev(CH.W, t) }; }
    function swingAt(t) { var vx = (ev(CH.X, t + 0.02) - ev(CH.X, t - 0.02)) / 0.04; return clamp(-vx * 0.00005, -0.06, 0.06); }   // the carried toy swings back a little as the claw moves (small: the prongs stay on its outline)

    // pose of the toy at spot i in round r at time t (absolute beat seconds): the point where the prongs hold it (anchor), its tilt, size, and what it is doing
    function toyPose(b, r, t) {
      var R = b.R[r], lt = t - r * RD, u = lt - R.t0, o = { ax: R.ax, ay: R.sh, rot: 0, s: 0, ph: "rest", vis: true };
      var pop = outBack(seg(lt, R.pop0, R.pop0 + 0.45));
      if (r < NR - 1) pop *= 1 - smooth(seg(lt, TM.OUT0, TM.OUT0 + TM.OUTD));      // the heap clears between rounds (the last round stays)
      o.s = pop;
      var T = r * RD + R.t0;
      if (u >= TM.CLOSE1) {
        var hx = ev(CH.X, t) + R.mx, hy = ev(CH.T, t) + R.cyo;           // the point between the front prong tips
        if (R.state === "good") {
          if (u < TM.REL + 0.02) { o.ph = "carry"; o.ax = hx; o.ay = hy; o.rot = swingAt(t); }
          else {
            var tr = T + TM.REL + 0.02, x0 = ev(CH.X, tr) + R.mx, y0 = ev(CH.T, tr) + R.cyo, k = seg(u, TM.REL + 0.02, TM.HIDE), yEnd = HIDEY + R.meta.gy * R.H * 0.62 + 8;
            o.ph = "fall";
            o.ax = lerp(x0, XD, smooth(seg(k, 0.2, 0.7))); o.ay = lerp(y0, yEnd, inQuad(k));
            o.rot = swingAt(tr) + 0.25 * k; o.s = pop * (1 - 0.38 * smooth(k));
            if (u >= TM.HIDE) o.vis = false;
          }
        } else {
          var dir = R.kind % 2 ? 1 : -1;
          if (u < TM.WOB0) { o.ph = "carry"; o.ax = hx; o.ay = hy; o.rot = swingAt(t); }
          else if (u < TM.SLIP) {                                        // held high, the toy wobbles in the loosening prongs
            var wk = seg(u, TM.WOB0, TM.SLIP);
            o.ph = "wobble"; o.ax = hx; o.ay = hy; o.rot = dir * 0.13 * Math.sin(2 * Math.PI * wk) * (0.5 + 0.5 * wk);
          } else {
            var ts = T + TM.SLIP, ay0 = ev(CH.T, ts) + R.cyo, ax0 = ev(CH.X, ts) + R.mx, kk = seg(u, TM.SLIP, TM.SLIP + TM.FALLM), w = u - TM.SLIP - TM.FALLM;
            o.ph = "slip";
            o.ay = lerp(ay0, R.sh, inQuad(kk) * 0.88 + 0.12 * kk);
            o.ax = lerp(ax0, R.ax, kk) + dir * 16 * Math.sin(Math.PI * kk);      // it slides off one side of the prongs
            o.rot = dir * 0.36 * Math.sin(Math.PI * Math.min(1, kk * 1.15));
            if (w > 0) {
              o.ax = R.ax; o.ay = R.sh;
              o.ay -= 14 * Math.sin(Math.PI * clamp(w / 0.18, 0, 1)) * (w < 0.18 ? 1 : 0);
              o.rot = dir * 0.07 * Math.exp(-9 * w) * Math.sin(2 * Math.PI * 3 * w);
              o.ph = "rest";
            }
          }
        }
      }
      return o;
    }
    // a won toy in the prize tray (a picture inside the chute window): drops in from the top of the window at HIDE, lands, bounces a little, leaves with the round
    function trayPose(R, r, t) {
      var lt = t - r * RD, tl = lt - (R.t0 + TM.HIDE), o = { vis: false, x: 0, y: 0, rot: 0, s: 1 };
      if (tl < 0) return o;
      var G = R.good, pitch = G >= 4 ? 44 : 58, th = R.H * TRS, kk = seg(tl, 0, TM.TRAYD), wl = tl - TM.TRAYD;
      var sx = TRAY.x0 + TRAY.w / 2 + (R.slot - (G - 1) / 2) * pitch, sy = TRAY.floor - th / 2 - (R.slot % 2 ? 7 : 0), tilt = (R.slot % 2 ? 1 : -1) * 0.12;
      o.x = sx; o.y = lerp(TRAY.y0 - th / 2 - 6, sy, inQuad(kk));
      if (wl > 0) o.y -= 11 * Math.sin(Math.PI * clamp(wl / 0.2, 0, 1)) * (1 - clamp(wl / 0.2, 0, 1) * 0.5) * (wl < 0.2 ? 1 : 0);
      o.rot = tilt * kk + 0.2 * (1 - kk);
      o.s = r < NR - 1 ? 1 - smooth(seg(lt, TM.OUT0, TM.OUT0 + TM.OUTD)) : 1;
      o.vis = o.s > 0.003;
      return o;
    }

    // counter values at time t (absolute beat seconds): days, late, early
    function countersAt(t) {
      var v = [0, 0, 0], last = [-9, -9, -9];
      PL.rounds.forEach(function (rd) {
        rd.events.forEach(function (e) { var at = rd.r * RD + e.t; if (t >= at) { v[rd.r] += e.dv; last[rd.r] = Math.max(last[rd.r], at); } });
      });
      return { v: v, last: last };
    }

    // ---------------------------------------------------------------- picture + shadows + WebGL canvas + cabinet front (one scaled world)
    ctx.stage.style.background = "#efe2d0";
    var OX = 540, OY = 1000;
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + OX + "px " + OY + "px;filter:saturate(1.1)");
    var bgSrc = WD.src(c.art, "claw-bg.jpg", "bg.jpg");
    var bg = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none", world);
    bg.src = bgSrc; bg.alt = ""; bg.draggable = false;
    // soft contact shadows of the toys on the heap (one per spot, under the toy of the round that is playing)
    var SHADOWS = B.map(function () {
      return el("div", "position:absolute;left:0;top:" + (SPY + 58) + "px;width:176px;height:46px;border-radius:50%;opacity:0;" +
        "background:radial-gradient(ellipse at center, rgba(58,28,8,0.55) 0%, rgba(58,28,8,0.30) 45%, rgba(58,28,8,0) 72%)", world);
    });
    // the gold tags live in this layer, which sits UNDER the 3D canvas (the canvas is added after it), so the claw and the toy it carries always draw above the tags
    var tagLayer = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none", world);
    // the toy pictures (hidden DOM images: the 3D layer takes them as textures; the harness and the loader wait for them)
    var toyImg = {};
    function imgFor(kind) {
      if (!toyImg[kind]) { var im = document.createElement("img"); im.alt = ""; im.style.cssText = "display:none"; im.src = c.art + "toy-" + kind + ".webp"; world.appendChild(im); toyImg[kind] = im; }
      return toyImg[kind];
    }
    B.forEach(function (b) { b.R.forEach(function (R) { imgFor(R.kind); }); });

    // ---------------------------------------------------------------- three.js scene
    var gl = null, renderer = null, scene = null, camera = null, camFull = null, lastW = 0, lastH = 0, ok = false;
    var VX0 = 200, VY0 = 630, VW = 700, VH = 760;                      // the part of the picture the 3D layer covers (claw, rail, toys, the drop to the chute)
    var CAP_PX = 16000000, GL_ZOOM = 1.06;
    function sizeGL() {
      if (!gl) return;
      var dpr = window.devicePixelRatio || 1, r = st.getBoundingClientRect(), sc = r.width > 0 ? r.width / 1080 : 1;
      var pr = clamp(dpr * sc * GL_ZOOM, 1, 3);
      pr = Math.min(pr, Math.sqrt(CAP_PX / (VW * VH)));
      var w = Math.round(VW * pr), h = Math.round(VH * pr);
      if (gl.canvas.width !== w || gl.canvas.height !== h) { gl.canvas.width = w; gl.canvas.height = h; }
    }
    if (T3) {
      try {
        var cv = document.createElement("canvas");
        cv.style.cssText = "position:absolute;left:" + VX0 + "px;top:" + VY0 + "px;width:" + VW + "px;height:" + VH + "px;pointer-events:none";
        var gx = null, gopt = { premultipliedAlpha: true, antialias: true, preserveDrawingBuffer: true, alpha: true };
        try { gx = cv.getContext("webgl2", gopt); } catch (e0) { gx = null; }
        if (!gx) { try { gx = cv.getContext("webgl", gopt); } catch (e1) { gx = null; } }
        if (gx) { gl = { canvas: cv, g: gx }; world.appendChild(cv); sizeGL(); } else gl = null;
      } catch (e) { gl = null; }
    }
    // the cabinet front (everything below the glass floor) again ABOVE the 3D layer: a won toy goes down behind it
    var front = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none;clip-path:inset(" + HIDEY + "px 0 0 0)", world);
    front.src = bgSrc; front.alt = ""; front.draggable = false;
    // the prize tray: a clip box over the chute window's dark opening, ABOVE the cabinet front, holding the pictures of the toys the claw has won (they drop in from the top of the window)
    var trayBox = el("div", "position:absolute;left:" + TRAY.x0 + "px;top:" + TRAY.y0 + "px;width:" + TRAY.w + "px;height:" + TRAY.h + "px;overflow:hidden;border-radius:0 0 14px 14px;pointer-events:none", world);
    B.forEach(function (b) {
      b.R.forEach(function (R) {
        if (!R || R.state !== "good") return;
        var im = el("img", "position:absolute;left:0;top:0;display:block;max-width:none;width:" + (R.W * TRS).toFixed(1) + "px;height:" + (R.H * TRS).toFixed(1) + "px;opacity:0;will-change:transform", trayBox);
        im.src = c.art + "toy-" + R.kind + ".webp"; im.alt = ""; im.draggable = false; R.tel = im;
      });
    });

    var CLAW = null, TROLLEY = null, CABLE = null, TOYM = [];
    var F = 3000, PITCH = 0.13;                                        // camera: 1 world unit = 1 picture pixel at the claw's plane; looking down a little
    var DEG = Math.PI / 180;
    function unp(sx, sy, out) {                                        // picture pixel -> world point on the plane z = 0
      var v = new T3.Vector3((sx - 540) / 540, (960 - sy) / 960, 0.5).unproject(camFull), d = v.sub(camFull.position);
      var k = -camFull.position.z / d.z;
      return out.set(camFull.position.x + d.x * k, camFull.position.y + d.y * k, 0);
    }
    if (gl && T3) {
      try {
        renderer = new T3.WebGLRenderer({ canvas: gl.canvas, context: gl.g, alpha: true, antialias: true, premultipliedAlpha: true, preserveDrawingBuffer: true });
        renderer.setClearColor(0x000000, 0);
        scene = new T3.Scene();
        var fov = 2 * Math.atan(960 / F) / DEG;
        function mkCam() {
          var cm = new T3.PerspectiveCamera(fov, 1080 / 1920, 100, 9000);
          cm.position.set(0, F * Math.sin(PITCH), F * Math.cos(PITCH)); cm.lookAt(0, 0, 0); cm.updateMatrixWorld(true); return cm;
        }
        camFull = mkCam();
        camera = mkCam(); camera.setViewOffset(1080, 1920, VX0, VY0, VW, VH); camera.updateProjectionMatrix();

        scene.add(new T3.HemisphereLight(0xfff4e4, 0x8a7560, 0.62));
        var sun = new T3.DirectionalLight(0xfff1dc, 1.0); sun.position.set(500, 400, 600); scene.add(sun);
        var fill = new T3.DirectionalLight(0xdfe8ff, 0.35); fill.position.set(-400, 100, 500); scene.add(fill);

        var mSil = new T3.MeshPhongMaterial({ color: 0xaab2c0, specular: 0xffffff, shininess: 70 });
        var mDark = new T3.MeshPhongMaterial({ color: 0x6c7586, specular: 0xdddddd, shininess: 50 });
        var mGold = new T3.MeshPhongMaterial({ color: 0xe0ac25, specular: 0xfff0b0, shininess: 80 });
        var mCab = new T3.MeshPhongMaterial({ color: 0x9aa3b3, specular: 0xffffff, shininess: 30 });
        function limb(len, r0, r1, mat) { var g = new T3.CylinderGeometry(r0, r1, len, 16, 1); g.translate(0, -len / 2, 0); return new T3.Mesh(g, mat); }
        function ball(r, mat) { return new T3.Mesh(new T3.SphereGeometry(r, 16, 12), mat); }
        // the claw, origin = centre of the hub, y up, z towards the viewer
        CLAW = new T3.Group();
        var head = new T3.Mesh(new T3.CylinderGeometry(24 * S, 26 * S, 56 * S, 32, 1), mSil); CLAW.add(head);
        var cap = new T3.Mesh(new T3.CylinderGeometry(30 * S, 28 * S, 10 * S, 32, 1), mGold); cap.position.y = -30 * S; CLAW.add(cap);
        var neck = new T3.Mesh(new T3.CylinderGeometry(13 * S, 15 * S, 16 * S, 24, 1), mDark); neck.position.y = 36 * S; CLAW.add(neck);
        for (var sr = 0; sr < 4; sr++) { var ring = new T3.Mesh(new T3.TorusGeometry(11 * S, 2.6 * S, 8, 20), mSil); ring.rotation.x = Math.PI / 2; ring.position.y = (30 + sr * 4.6) * S; CLAW.add(ring); }
        CLAW.userData.tips = [];
        CLAW.userData.prongs = [90, -30, -150].map(function (deg) {   // back, front right, front left
          var th = deg * DEG, P = new T3.Group(); P.rotation.y = th;
          P.position.set(HR * Math.cos(th), -HY, -HR * Math.sin(th));
          var knob = ball(10 * S, mGold); P.add(knob);
          var A = new T3.Group(); P.add(A);
          A.add(limb(L1, 11 * S, 9 * S, mSil));
          var el1 = ball(11 * S, mSil); el1.position.y = -L1; A.add(el1);
          var Bq = new T3.Group(); Bq.position.y = -L1; Bq.rotation.z = -BETA; A.add(Bq);
          Bq.add(limb(L2, 9 * S, 5.5 * S, mSil));
          var tip = ball(7.2 * S, mDark); tip.position.y = -L2; Bq.add(tip); CLAW.userData.tips.push(tip);
          CLAW.add(P);
          return A;
        });
        scene.add(CLAW);
        TROLLEY = new T3.Mesh(new T3.CylinderGeometry(58, 62, 26, 40, 1), mGold); scene.add(TROLLEY);
        var skirt = new T3.Mesh(new T3.CylinderGeometry(40, 44, 14, 32, 1), mCab); skirt.position.y = -18; TROLLEY.add(skirt);
        var cg = new T3.CylinderGeometry(2.6, 2.6, 1, 8, 1); CABLE = new T3.Mesh(cg, mDark); scene.add(CABLE);
        // the toys: flat planes standing at the claw's depth, so the back prong is hidden behind a toy and the front prongs pass in front of it
        B.forEach(function (b) {
          b.R.forEach(function (R, r) {
            if (!R) return;
            var tex = new T3.Texture(imgFor(R.kind));
            tex.colorSpace = T3.SRGBColorSpace; tex.generateMipmaps = false; tex.minFilter = T3.LinearFilter; tex.magFilter = T3.LinearFilter;
            var mat = new T3.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.01, depthWrite: true });
            var G = new T3.Group(), M = new T3.Mesh(new T3.PlaneGeometry(1, 1), mat);
            M.scale.set(R.W, R.H, 1); M.position.x = -(R.meta.gx - 0.5) * R.W; M.position.y = -(0.5 - R.meta.gy) * R.H; M.position.z = R.sz; G.add(M); scene.add(G);
            R.g3 = G; R.tex = tex; R.texOk = false; G.visible = false;
          });
        });
        ok = true;
      } catch (e) { ok = false; try { console.warn("p2-claw: WebGL scene not available (" + e.message + ")"); } catch (e2) { } }
    }
    var wp = ok ? new T3.Vector3() : null, wq = ok ? new T3.Vector3() : null;

    // ---------------------------------------------------------------- close the prongs ON each toy: solve, from the real 3D claw and camera, the closing angle that puts the two front
    // prong tips on the toy's outline at its grab row (width taken from the toy's own pixels), the sideways / vertical offset of the tips against the claw's nominal point
    // (perspective), and the wide-open angle that clears the toy. Falls back to the flat formulas when there is no WebGL (nothing is drawn then anyway).
    var tv = ok ? new T3.Vector3() : null;
    function tipsPx(clawX, tipY, aDeg) {                               // picture px of the two front tips (right, left) with the claw at (clawX, tipY), prongs at aDeg, no sway
      var hy = headYOf(tipY, aDeg), out = [];
      unp(clawX, hy, wp); CLAW.position.copy(wp); CLAW.rotation.set(0, 0, 0);
      CLAW.userData.prongs.forEach(function (A) { A.rotation.z = aDeg * DEG; });
      CLAW.updateMatrixWorld(true);
      [1, 2].forEach(function (q) { CLAW.userData.tips[q].getWorldPosition(tv); tv.project(camFull); out.push({ x: (tv.x + 1) / 2 * 1080, y: (1 - tv.y) / 2 * 1920 }); });
      return out;
    }
    function solveAngle(clawX, half) {                                 // closing angle a (degrees) whose front tips are `half` px either side of their midpoint
      var lo = 25, hi = 100, m, t;
      for (var it = 0; it < 40; it++) {
        m = (lo + hi) / 2;
        if (ok) { t = tipsPx(clawX, 1000, m); if ((t[0].x - t[1].x) / 2 < half) lo = m; else hi = m; }
        else { if (radOf(m) * 0.866 < half) lo = m; else hi = m; }
      }
      return (lo + hi) / 2;
    }
    function solveGrab(R) {
      var cx = R.ax, aG = 54, aO = 68, k;
      for (k = 0; k < 3; k++) {                                        // the sideways offset depends a little on where the claw is: refine it
        aG = solveAngle(cx, R.hwpx); aO = solveAngle(cx, R.hwpx + 30);
        if (ok) { var t = tipsPx(cx, 1000, aG); R.mx = (t[0].x + t[1].x) / 2 - cx; R.cyo = (t[0].y + t[1].y) / 2 - 1000; cx = R.ax - R.mx; }
        else { R.mx = 0; R.cyo = 6; }
      }
      R.aG = Math.min(aG, 96); R.aO = Math.min(Math.max(aO, aG + 8), 100); R.carryT = Math.max(tipMinOf(R.aG) + 3, 886);
    }
    B.forEach(function (b) { b.R.forEach(function (R) { if (R) solveGrab(R); }); });
    buildChannels();

    // ---------------------------------------------------------------- data layer (DOM over the picture)
    var data = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none");
    var badge = el("div", "position:absolute;left:44px;top:58px;display:flex;align-items:center;gap:18px;" +
      "padding:16px 34px 16px 20px;border-radius:999px;background:" + GOLD + ";border:6px solid " + INK + ";box-shadow:8px 8px 0 " + INK, data);
    badge.innerHTML = '<span style="font:700 50px/1 ' + FONT + ';color:#fff;-webkit-text-stroke:9px ' + INK + ';paint-order:stroke fill">' + esc(c.badge) + "</span>";
    var week = el("div", "position:absolute;left:552px;top:84px;padding:10px 24px;border-radius:999px;background:" + GREEN +
      ";border:5px solid " + INK + ";box-shadow:6px 6px 0 " + INK + ";font:700 38px/1 " + FONT + ";color:#fff;transform:rotate(-4deg)", data);
    week.textContent = c.episode;
    if (!c.chrome) { badge.style.display = "none"; week.style.display = "none"; }

    var sub = el("div", "position:absolute;left:0;right:0;top:196px;text-align:center;font:700 52px/1 " + FONT + ";color:#fff;-webkit-text-stroke:10px " + INK +
      ";paint-order:stroke fill;letter-spacing:0.01em;text-shadow:0 6px 0 " + INK + ";transform-origin:50% 50%", data);
    sub.textContent = c.subtitle;
    var colors = [BLUE, GREEN];
    var HEADS = c.rounds.slice(0, NR).map(function (rd, r) {
      var host = el("div", "position:absolute;left:0;right:0;top:268px;height:260px;display:none;flex-direction:column;align-items:center;justify-content:center;gap:4px", data);
      var letters = [];
      rd.head.forEach(function (words, li) {
        var row = el("div", "display:flex;gap:28px", host);
        words.forEach(function (w) {
          var ws = el("span", "display:inline-flex", row);
          String(w).split("").forEach(function (ch) {
            var s = el("span", "display:inline-block;transform-origin:50% 90%;font:700 112px/1.02 " + FONT + ";color:" + colors[(li + r) % 2] +
              ";-webkit-text-stroke:16px " + INK + ";paint-order:stroke fill;text-shadow:0 11px 0 " + INK, ws);
            s.textContent = ch; letters.push(s);
          });
        });
      });
      return { host: host, letters: letters };
    });

    // dust where a missed toy lands, sparkle at the chute where a won toy goes in (above the 3D layer, small, round the toy's feet)
    var puffs = [];
    B.forEach(function (b) {
      b.R.forEach(function (R, r) {
        var spot = R.state === "miss" ? [R.sx, R.sy + R.H / 2 - 6] : CHUTE;
        var p = el("div", "position:absolute;left:" + spot[0].toFixed(1) + "px;top:" + spot[1].toFixed(1) + "px;width:0;height:0", world);
        var dots = [];
        for (var d = 0; d < 9; d++) {
          var dd = el("div", "position:absolute;left:-8px;top:-8px;width:16px;height:16px;border-radius:50%", p);
          dd.style.background = R.state === "miss" ? (d % 2 ? "#f6ead2" : "#e2c79a") : (d % 2 ? "#fff6dc" : GOLD);
          dd.style.boxShadow = R.state === "miss" ? "0 0 8px rgba(255,244,222,0.9)" : "0 0 6px rgba(255,240,200,0.8)";
          dots.push(dd);
        }
        puffs.push({ b: b, R: R, r: r, box: p, dots: dots });
      });
    });

    // three counter cards at the bottom, one appears per round: Days at school N of M | Late to school N | Early leave N (under the cabinet, on the table)
    var CW = 306, CG = 22, CL = (1080 - (3 * CW + 2 * CG)) / 2, CTOP = 1655;
    function card(i2, label) {
      var e = el("div", "position:absolute;left:" + (CL + i2 * (CW + CG)) + "px;top:" + CTOP + "px;width:" + CW + "px;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:12px;" +
        "padding:16px 10px 16px;border-radius:34px;background:#fff;border:7px solid " + INK + ";box-shadow:8px 8px 0 " + INK + ";transform-origin:50% 100%", data);
      var l = el("span", "font:700 33px/1 " + FONT + ";color:" + INK + ";white-space:nowrap", e); l.textContent = label;
      var nm = el("span", "display:inline-block;min-width:150px;text-align:center;padding:8px 18px;border-radius:999px;font:700 52px/1 " + FONT +
        ";color:#fff;background:" + GREEN + ";border:5px solid " + INK + ";transform-origin:50% 50%;white-space:nowrap", e);
      return { box: e, num: nm };
    }
    var CARDS = [card(0, c.counter), card(1, c.lateLabel), card(2, c.earlyLabel)];
    var SPARKS = CARDS.map(function (cd, ci) {
      var spark = el("div", "position:absolute;left:" + (CL + ci * (CW + CG) + CW / 2) + "px;top:" + (CTOP + 60) + "px;width:0;height:0", data);
      var stars = [];
      for (var q = 0; q < 8; q++) {
        var e = el("div", "position:absolute;left:-16px;top:-16px;width:32px;height:32px", spark);
        e.innerHTML = '<svg viewBox="-16 -16 32 32" width="32" height="32"><path d="M0-14 L3.6-4.6 13.3-4.3 5.8 1.8 8.2 11.3 0 5.8-8.2 11.3-5.8 1.8-13.3-4.3-3.6-4.6Z" fill="' +
          [GOLD, GREEN, BLUE, "#e8577e"][q % 4] + '" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/></svg>';
        stars.push(e);
      }
      return stars;
    });

    // gold tags for missed days, above the toy that carries them (never red). They sit in the world, so they move with the picture's slow push-in.
    var ICON = {
      absent: '<path d="M6 6 L22 22 M22 6 L6 22" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>',
      late: '<circle cx="14" cy="14" r="10" fill="none" stroke="#fff" stroke-width="3.5"/><path d="M14 8 V14 L18 17" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>',
      early: '<path d="M7 4 H19 V24 H7 Z" fill="none" stroke="#fff" stroke-width="3.2"/><path d="M13 14 H25 M21 10 L25 14 L21 18" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round"/>'
    };
    var TAGF = 34, TAGH = 78, TAGLIST = [];
    function tagW(label) { return TAGF * String(label).length * 0.56 + 112; }
    PL.rounds.forEach(function (rd) {
      var L = [];
      B.forEach(function (b) {
        var R = b.R[rd.r]; if (!R || R.state !== "miss") return;
        var label = c.tags[R.tag] + (R.u > 1 ? " ×" + R.u : ""), w = tagW(label), ax = R.sx, ay = R.sy - R.H / 2 - 4;
        L.push({ r: rd.r, b: b, kind: R.tag, label: label, w: w, ax: ax, ay: ay, cx: clamp(ax, 24 + w / 2, 1056 - w / 2), cy: ay - 98, at: R.tagAt[0],
          box: { x0: R.sx - R.W / 2, x1: R.sx + R.W / 2, y0: R.sy - R.H / 2, y1: R.sy + R.H / 2 } });
      });
      L.sort(function (p, q) { return p.ax - q.ax; });
      // Placement: every tag picks a slot (a row, 0 = right above its toy, 1 to 3 = lifted one to three tag heights, and a sideways shift), all tags together are
      // chosen by a small exhaustive search for the least cost: tags never touch each other (at least TGAP px between them, shadow included), never cover a toy,
      // never sit in the headline zone, and no pointer runs through another tag or another toy. Pure function of the data.
      var CLAWHOME = { x0: 480, x1: 660, y0: 740, y1: 950 };
      var TGAP = 14, ROWSTEP = TAGH + 5 + TGAP + 1, HEADZONE = 548, SHIFTS = [0, -40, 40, -80, 80, -130, 130, -190, 190, -260, 260];
      function tagRect(p, o) { return { x0: o.cx - p.w / 2, x1: o.cx + p.w / 2 + 5, y0: o.cy - TAGH / 2, y1: o.cy + TAGH / 2 + 5 }; }
      function hit(a, b2, m) { return a.x0 < b2.x1 + m && b2.x0 < a.x1 + m && a.y0 < b2.y1 + m && b2.y0 < a.y1 + m; }
      function ptHit(p, o, rect, m) {                                  // does the pointer of tag p (placed at o) pass through the rectangle?
        var px0 = o.cx + clamp(p.ax - o.cx, -p.w / 2 + 44, p.w / 2 - 44), py0 = o.cy + TAGH / 2 - 8, x1 = p.ax, y1 = p.ay - 10;
        for (var q = 1; q < 28; q++) {
          var u = q / 28, x = px0 + (x1 - px0) * u, y = py0 + (y1 - py0) * u;
          if (x > rect.x0 - m && x < rect.x1 + m && y > rect.y0 - m && y < rect.y1 + m) return true;
        }
        return false;
      }
      var OPT = L.map(function (p) {
        var list = [], row, s2, k;
        for (row = 0; row < 4; row++) for (s2 = 0; s2 < SHIFTS.length; s2++) {
          var cx = clamp(p.ax + SHIFTS[s2], 24 + p.w / 2, 1056 - p.w / 2), cy = p.ay - 98 - row * ROWSTEP, o = { cx: cx, cy: cy, row: row }, rc = tagRect(p, o);
          var cost = row * 6 + Math.abs(cx - p.ax) * 0.12 + (p.ay - cy) * 0.05, bad = false;
          if (rc.y0 < HEADZONE) cost += 4000;
          if (hit(rc, CLAWHOME, 0)) cost += 300;                       // the claw rests at home (hub and prongs) after the last day: keep tags clear of it
          for (k = 0; k < L.length; k++) {
            if (L[k] === p) { if (hit(rc, L[k].box, 0)) bad = true; continue; }
            if (hit(rc, L[k].box, 4)) bad = true;
            if (ptHit(p, o, L[k].box, 2)) cost += 600;
          }
          o.rect = rc; o.cost = cost; if (!bad) list.push(o);
        }
        list.sort(function (a, b2) { return a.cost - b2.cost; });
        return list;
      });
      var bestCost = 1e18, bestPick = null, pick = [];
      (function dfs(n2, cost) {
        if (cost >= bestCost) return;
        if (n2 === L.length) { bestCost = cost; bestPick = pick.slice(); return; }
        for (var oi = 0; oi < OPT[n2].length; oi++) {
          var o = OPT[n2][oi], add = o.cost, ok2 = true, m;
          if (cost + o.cost >= bestCost) break;                        // options are sorted by cost
          for (m = 0; m < n2; m++) {
            if (hit(pick[m].rect, o.rect, TGAP)) { ok2 = false; break; }
            if (ptHit(L[m], pick[m], o.rect, 2)) add += 600;
            if (ptHit(L[n2], o, pick[m].rect, 2)) add += 600;
          }
          if (!ok2) continue;
          pick.push(o); dfs(n2 + 1, cost + add); pick.pop();
        }
      })(0, 0);
      if (!bestPick) bestPick = OPT.map(function (l, q) { var o = l[0] || { cx: L[q].cx, cy: L[q].cy }; return o; });      // cannot happen with the data, kept so a layout always exists
      L.forEach(function (p, q) { p.cx = bestPick[q].cx; p.cy = bestPick[q].cy; });
      L.forEach(function (p) {
        var box = el("div", "position:absolute;left:" + p.cx.toFixed(1) + "px;top:" + p.cy.toFixed(1) + "px;width:0;height:0;transform-origin:0 0", tagLayer);
        var tx = clamp(p.ax - p.cx, -p.w / 2 + 44, p.w / 2 - 44), y0 = TAGH / 2 - 8, dx = p.ax - p.cx, dy = p.ay - p.cy - 10;
        var sv = el("div", "position:absolute;left:0;top:0;width:0;height:0", box);
        sv.innerHTML = '<svg width="1" height="1" style="position:absolute;left:0;top:0;overflow:visible"><path d="M' + (tx - 17).toFixed(1) + " " + y0 + " L" + dx.toFixed(1) + " " + dy.toFixed(1) +
          " L" + (tx + 17).toFixed(1) + " " + y0 + ' Z" fill="' + GOLD + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/></svg>';
        var tg = el("div", "position:absolute;left:0;top:0;translate:-50% -50%;display:flex;align-items:center;gap:12px;white-space:nowrap;padding:12px 24px 12px 14px;border-radius:999px;" +
          "background:" + GOLD + ";border:5px solid " + INK + ";box-shadow:5px 5px 0 " + INK + ";font:700 " + TAGF + "px/1 " + FONT + ";color:" + INK + ";transform-origin:50% 50%", box);
        tg.innerHTML = '<span style="display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:' + GOLDD + ';border:3px solid ' + INK +
          '"><svg width="28" height="28" viewBox="0 0 28 28">' + ICON[p.kind] + "</svg></span>" + esc(p.label);
        TAGLIST.push({ el: box, tg: tg, at: p.at, r: rd.r, i: TAGLIST.length });
      });
    });

    // ---------------------------------------------------------------- draw
    function popNum(el2, since, t) { return 1 + 0.2 * Math.sin(seg(t, since, since + 0.32) * Math.PI); }

    function tipsNow() {                                               // picture px of the three prong tips (back, front right, front left) as last drawn
      var out = [];
      if (!ok) return out;
      CLAW.updateMatrixWorld(true);
      CLAW.userData.tips.forEach(function (tp) { tp.getWorldPosition(tv); tv.project(camFull); out.push({ x: (tv.x + 1) / 2 * 1080, y: (1 - tv.y) / 2 * 1920 }); });
      return out;
    }
    function drawGL(t) {
      if (!ok) return;
      sizeGL();
      var cw = gl.canvas.width, ch = gl.canvas.height;
      if (cw !== lastW || ch !== lastH) { renderer.setPixelRatio(1); renderer.setSize(cw, ch, false); lastW = cw; lastH = ch; }
      // the claw
      var cs = clawAt(t), hy = headYOf(cs.tip, cs.a);
      unp(cs.x, hy, wp); CLAW.position.copy(wp);
      CLAW.rotation.y = 0.18 * Math.sin(0.9 * t) * cs.w;
      var ar = cs.a * DEG; CLAW.userData.prongs.forEach(function (A) { A.rotation.z = ar; });
      unp(cs.x, RAILY, wq); TROLLEY.position.copy(wq);
      // the cable runs from under the trolley to the top of the spring
      var topY = hy - 36 * S - 18 * S, botY = RAILY + 13, len = Math.max(1, topY - botY);
      unp(cs.x, (topY + botY) / 2, wq); CABLE.position.copy(wq); CABLE.scale.set(1, len, 1);
      // the toys
      var rNow = roundOf(t);
      B.forEach(function (b) {
        b.R.forEach(function (R, r) {
          if (!R || !R.g3) return;
          if (!R.texOk) { var im = imgFor(R.kind); if (im.complete && im.naturalWidth) { R.tex.needsUpdate = true; R.texOk = true; } }
          var on = r === rNow, o = on ? toyPose(b, r, t) : null;
          if (!o || !o.vis || o.s < 0.002) { R.g3.visible = false; return; }
          unp(o.ax, o.ay, wq); R.g3.position.copy(wq); R.g3.rotation.z = o.rot; R.g3.scale.setScalar(Math.max(0.0001, o.s)); R.g3.visible = true;
        });
      });
      renderer.render(scene, camera);
    }

    ctx.onDraw(function (t) {
      var rNow = roundOf(t), ltNow = t - rNow * RD;
      var k = smooth(seg(t, 0, DUR));
      world.style.transform = "scale(" + (1.0 + 0.04 * k).toFixed(4) + ")";

      var su = seg(t, 0.05, 0.45);
      sub.style.opacity = su > 0 ? 1 : 0;
      sub.style.transform = "scale(" + (su <= 0 ? 0 : outBack(su)).toFixed(3) + ")";

      HEADS.forEach(function (h, r) {
        var rt = t - r * RD, on = rt >= 0 && (r === NR - 1 || rt < TM.OUT0 + TM.OUTD);               // the last round holds to the end
        h.host.style.display = on ? "flex" : "none";
        if (!on) return;
        h.letters.forEach(function (l, i2) {
          var u = seg(rt, TM.HEAD0 + i2 * 0.04, TM.HEAD0 + i2 * 0.04 + 0.34);
          var bob = Math.sin(t * 3 + i2 * 0.6) * 4 * seg(rt, TM.HEAD0 + 1.0, TM.HEAD0 + 1.6);
          var out = r < NR - 1 ? smooth(seg(rt, TM.OUT0 + i2 * 0.006, TM.OUT0 + i2 * 0.006 + 0.3)) : 0;
          l.style.transform = "translateY(" + (((1 - Math.min(1, u * 1.4)) * 60 + bob) - out * 50).toFixed(1) + "px) scale(" + ((u <= 0 ? 0 : outBack(u)) * (1 - out)).toFixed(3) + ")";
        });
      });

      drawGL(t);

      // contact shadows under the toys on the heap: full while a toy sits there, fading as it is lifted, none while it is carried, falling to the chute or gone
      SHADOWS.forEach(function (sh, i2) {
        var b = B[i2], a = 0;
        if (b && b.R[rNow]) {
          var R = b.R[rNow], o = toyPose(b, rNow, t);
          sh.style.left = (R.sx - 88).toFixed(1) + "px"; sh.style.top = (R.sy + R.H / 2 - 28).toFixed(1) + "px";
          if (o.vis && (o.ph === "rest" || o.ph === "slip")) a = 0.9 * clamp(o.s, 0, 1) * (1 - clamp((R.sh - o.ay) / 110, 0, 1));
        }
        sh.style.opacity = a.toFixed(3);
      });

      // the prize tray: the toys the claw has won this round (a picture each, inside the chute window)
      B.forEach(function (b) {
        b.R.forEach(function (R, r) {
          if (!R || !R.tel) return;
          var o = r === rNow ? trayPose(R, r, t) : { vis: false };
          if (!o.vis) { R.tel.style.opacity = 0; return; }
          var w = R.W * TRS, h = R.H * TRS;
          R.tel.style.opacity = 1;
          R.tel.style.transform = "translate(" + (o.x - TRAY.x0 - w / 2).toFixed(1) + "px," + (o.y - TRAY.y0 - h / 2).toFixed(1) + "px) rotate(" + o.rot.toFixed(3) + "rad) scale(" + o.s.toFixed(3) + ")";
        });
      });

      // puffs (dust where a missed toy lands, sparkle at the chute where a won toy goes in), for the toy of the current round
      puffs.forEach(function (pf) {
        var R = pf.R, on = pf.r === rNow, at = R.t0 + (R.state === "miss" ? TM.LANDM : TM.HIDE + TM.TRAYD - 0.04);
        var pu = on ? seg(ltNow, at - 0.05, at + 0.55) : 0, big = R.state === "miss" ? 0.9 : 1.2;
        pf.dots.forEach(function (d, j) {
          var a = j / pf.dots.length * Math.PI * 2 + 0.3, dist = (14 + 80 * smooth(pu)) * big;
          d.style.opacity = pu > 0 && pu < 1 ? (0.9 * (1 - pu)).toFixed(3) : 0;
          d.style.transform = "translate(" + (Math.cos(a) * dist).toFixed(1) + "px," + (Math.sin(a) * dist * 0.4 - (R.state === "miss" ? 14 : 30) * pu).toFixed(1) + "px) scale(" + ((1.2 - pu * 0.7) * big).toFixed(3) + ")";
        });
      });

      // counters: one card per round, built by that round's toys, ending on the exact number in the data
      var cn = countersAt(t);
      CARDS.forEach(function (cd, i2) {
        var cu = seg(t, i2 * RD + 0.2, i2 * RD + 0.6);
        cd.box.style.opacity = cu > 0 ? 1 : 0;
        cd.box.style.transform = "scale(" + (cu <= 0 ? 0 : outBack(cu)).toFixed(3) + ")";
        var rd = PL.rounds[i2], val = cn.v[i2], bg2, fg = "#fff";
        if (i2 === 0) {
          cd.num.textContent = val + " " + c.of + " " + daysTotal;
          bg2 = (val === daysTotal || t < rd.endAt) ? GREEN : "#b8770f";
        } else {
          cd.num.textContent = String(val);
          if (PL.units[i2] > 0) { bg2 = val > 0 ? GOLD : "#8fa0bd"; if (val > 0) fg = INK; }
          else bg2 = rd.present > 0 ? GREEN : "#8fa0bd";                // a clean round: the 0 is the good news
        }
        cd.num.style.background = bg2; cd.num.style.color = fg;
        var joy = rd.perfect ? seg(t, i2 * RD + rd.endAt - 0.7, i2 * RD + rd.endAt + 0.3) : 0;
        cd.num.style.transform = "scale(" + (popNum(cd.num, cn.last[i2], t) + 0.1 * Math.sin(joy * Math.PI)).toFixed(3) + ")";
        SPARKS[i2].forEach(function (e, j) {
          // an arc over the top of the card (from 150 to 30 degrees above the horizontal), always outside the card, so the number stays readable
          var a = -(150 - 120 * j / (SPARKS[i2].length - 1)) * Math.PI / 180, rx = 205 + 10 * smooth(joy), ry = 112 + 90 * smooth(joy);
          e.style.opacity = joy > 0 && joy < 1 ? (1 - joy * joy).toFixed(3) : 0;
          e.style.transform = "translate(" + (Math.cos(a) * rx).toFixed(1) + "px," + (Math.sin(a) * ry).toFixed(1) + "px) rotate(" + (joy * 120).toFixed(0) + "deg) scale(1.3)";
        });
      });

      // tags: pop up when the toy lands, leave with the round
      TAGLIST.forEach(function (g) {
        var rt = t - g.r * RD, tu = seg(rt, g.at, g.at + 0.35), to = g.r < NR - 1 ? smooth(seg(rt, TM.OUT0 + 0.02, TM.OUT0 + 0.3)) : 0;
        var sc = (tu <= 0 ? 0 : outBack(tu)) * (1 - to);
        g.el.style.opacity = tu > 0 && sc > 0.001 ? 1 : 0;
        g.el.style.transform = "scale(" + Math.max(0, sc).toFixed(3) + ")";
        g.tg.style.transform = "rotate(" + (Math.sin(t * 2 + g.i) * 2 * seg(rt, g.at + 0.4, g.at + 0.8)).toFixed(2) + "deg)";
      });
    });
    if (c.debug) window.__p2c = { B: B, ok: ok, PL: PL, CH: CH, TM: TM, clawAt: clawAt, toyPose: toyPose, trayPose: trayPose, tips: tipsNow, camera: camera, scene: scene };
    // a remount (Replay, or the window changing shape) must free this WebGL context, or the browser runs out of them after about 16
    return { destroy: function () { try { if (renderer) { renderer.dispose(); renderer.forceContextLoss(); } } catch (e) { /* already gone */ } } };
  }
});
})();
