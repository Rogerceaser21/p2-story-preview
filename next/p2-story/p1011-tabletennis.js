/* Grade 10-11 boys' table tennis beat · p1011-tabletennis  (3D living storybook, THREE ROUNDS; the Grade 10-11 boys' game, like p712-pool for the Grade 10-12 pool and p36-football for Grade 3-6)
 * Same data, same rounds, same counters and gold tags as the P-2 sorter, the Grade 3-6 football and the pool, told as table tennis points. TWO RACKETS, NO PEOPLE:
 * the red racket (ours, near end) and the grey racket (the opponent, far end), each one rigid picture that only moves and turns as a whole piece.
 *   Round 1 "Came to school"  : a day ABSENT is a miss (our return hits the net and drops on our side; gold tag Absent).
 *   Round 2 "On time"         : a day LATE TO SCHOOL is a miss (the ball passes the meeting point and leaves our end, the red racket arrives too late; gold tag Late to school). An absent day plays as in round 1.
 *   Round 3 "Stayed all day"  : a day he LEFT EARLY is a miss (the red racket slides off the table before the ball arrives and the ball goes on past where it was; gold tag Early leave); absent days miss again with the tag Absent.
 *   Order inside a round: days that went well first, then the round's own misses (late / early), then the absent misses LAST (same plan as p36-football's makePlan).
 * One point per school day open (at most four), 1.8 s each (a round is 8 s: four points = 7.2 s plus the start; the beat is 24 s, the last round holds to the end). Every point has its own LANE of the table
 * (serve spot, first bounce, second bounce, meeting point and return all differ from point to point). Every point:
 *   the grey racket serves (cue "kick"); the ball bounces on the far half, goes OVER the net (a real height arc, never through it), bounces on our half; the red racket moves to meet it. Then
 *   GOOD day  : we return it (cue "kick"); it goes over the net, bounces on the far half; the grey racket swings and misses (cue "goal", sparkle); the ball flies off the far end.
 *   ABSENT    : our return hits the net (cue "post", gold rays) and drops on our side; gold tag Absent.
 *   LATE      : the ball goes past the meeting point and leaves our end; the red racket arrives too late; gold tag Late to school.
 *   EARLY     : the red racket slides off the table before the ball arrives; the ball goes on past where it was; gold tag Early leave.
 *   More misses than points (odd data): the extra misses stack as a count on a tag that is already shown ("Late to school x2"); if no point is left for them (every day absent) the number just ticks on its card.
 * Between rounds a clean reset (the heading and the tags leave, both rackets glide home). Three counter cards at the top appear one per round and build as the points land: Days at school N of M,
 * Late to school N, Early leave N, each ending on the exact number in the data (absent misses in rounds 2 and 3 carry a tag but never add to the Late / Early numbers).
 * Pictures: the empty table (tabletennis-layers/bg.jpg for a phone; wide/tabletennis-bg.jpg for a laptop / tablet: the SAME table with more room around it) and the two rackets
 * (racket-hero.webp, racket-opp.webp: rigid pieces). Everything else is code: the ball (a shaded white sphere, a real height arc, a soft contact shadow on the table that follows the ground track and grows nearer the
 * camera), the bounce ripples, a soft contact shadow under each racket, the net OVERLAY (a copy of the net band of the table picture drawn over the ball while the ball is beyond the net, so the ball is behind the net),
 * the sparkle, the gold rays, the heading, the counter cards, the gold tags. No three.js, no WebGL. Every frame is a pure function of t (kit rule 1); the pictures are the approved exception to rule 7.
 * The grey racket stands BEYOND the far end of the table (its head past the far edge, only the handle tip reaches the table; Igor's picture, 30 Oct). The ball and the rackets never go up into the heading cards.
 * Where things sit is READ from tabletennis-layers/layout.json (src/tools/tt_layout.py writes the LAYOUT block below): the table's edges, the net, the rackets' sizes, picture heads and HOME places (the grey racket's
 * home moves with Igor's wishes: never hard-code it here).
 * MotionIgor.registry["p1011-tabletennis"].cues(content) returns the moments that carry sounds: [{ t, name }] in beat-local seconds, names
 * round-start, kick (a racket meets the ball: the serve and our return), goal (the point is ours), post (the ball hits the net), tag-absent, tag-late, tag-early, counter-tick, round-clear.
 * (p2-sound.js maps them to EXISTING files: kick = tap, goal = pop, post = clank, tag-absent = thud, tag-late = clank, tag-early = switch, counter-tick = tap; round-start and round-clear are silent.)
 * Art: content.art = "<base>tabletennis-layers/"; a laptop / tablet (stage 2400+ px wide) loads the whole room from <base>wide/tabletennis-bg.jpg; a portrait tablet shows the phone picture in the middle with its blurred copy.
 * Layouts: PHONE (stage 1080) uses the portrait plate; WIDE (stage 2400..3414) uses the 3414 wide plate (its middle 1080 px = the portrait column, which is where the cards are).
 * Tags: phone = a stack in the dark area under the table on the left; wide = a stack on the floor to the right of the table.
 */
(function () {
/*LAYOUT*/
var LAYOUT = {"phone":{"W":1080,"far":745,"near":1596,"el":{"a":-0.22867063492063483,"b":410.3348214285713},"er":{"a":0.2292391636141635,"b":668.5746565934066},"cx":540,"net":{"tape":966,"base":1044,"h":78,"pl":80,"pr":1000},"apron":[1604,1665],"heroH":400,"oppH":160},"laptop":{"W":3414,"far":758,"near":1743,"el":{"a":-0.2787889194139196,"b":1516.1840659340664},"er":{"a":0.27607982295482386,"b":1902.1675824175813},"cx":1707,"net":{"tape":1008,"base":1098,"h":90,"pl":1103,"pr":2312},"apron":[1759,1830],"heroH":470,"oppH":180},"hero":{"pic":[444,496],"head":[274,175],"home":[0.58,0.9],"homeL":[0.58,0.9]},"opp":{"pic":[215,290],"head":[90,95],"home":[0.2,-0.261],"homeL":[0.2,-0.262]}};
/*END LAYOUT*/

// ---------------------------------------------------------------- timing and the plan (pure data, no DOM: cues() uses it too)
var RD = 8, NR = 3, DUR = 24;
var TM = { HEAD0: 0.1, GO0: 0.35, STEP: 1.8, POP: 0.14, SERVE: 0.20, B1: 0.38, B2: 0.74, HIT: 0.98,
  TAG: 0.12, TAGSTEP: 0.14, OUT0: RD - 0.38, OUTD: 0.36 };
var LAND = { good: 1.52, absent: 1.14, late: 1.42, early: 1.10 };       // point-local second the point is decided (the counter moves, the tag follows 0.12 s later)
var ROUND_TAG = ["absent", "late", "early"];
var B1V = 0.24;                                                         // the first bounce on the far half (table v; Igor's picture, 30 Oct)
var DU = [0, 0.30, 0.12, 0.40];                                         // the grey racket's serve lane: offsets from its home u, one per point
var HITU = [0.40, 0.50, 0.34, 0.46];                                    // where our racket meets the ball, one per point (all left of the centre line + a little: a late / early ball leaves our end at u 0.5 at most, clear of the red racket parked at the right)
var RETU = [0.72, 0.28, 0.70, 0.30];                                    // good day: where our return bounces on the far half
var TILT = 24;                                                          // degrees our racket turns at the hit
function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
function smooth(x) { return x * x * (3 - 2 * x); }
function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
function lerp(a, b, k) { return a + (b - a) * k; }
function easeOut(x) { return 1 - (1 - x) * (1 - x); }

var FS = { 1: 2.0, 2: 1.6, 3: 1.2, 4: 1.0 };                           // a week of fewer than four days plays every point slower (all times of a point x FS) and spreads the points evenly over the round
function t0For(i, n) {                                                     // when point i of n starts (round-local s): the points share the window .35 to 7.55 s evenly
  var D = 1.8 * (FS[n] || 1);
  if (n <= 1) return 0.35 + (7.2 - D) / 2;
  return 0.35 + i * (7.2 - D) / (n - 1);
}
function makePlan(wk) {
  wk = wk || {};
  var D = Math.max(0, Math.round(wk.daysOpen || 0)), n = Math.min(4, D);
  var units = [Math.max(0, Math.round(wk.absent || 0)), Math.max(0, Math.round(wk.lateToSchool || 0)), Math.max(0, Math.round(wk.earlyLeave || 0))];
  var absShots = Math.min(units[0], n);
  var plan = { D: D, n: n, f: FS[n] || 1, units: units, rounds: [], target: [Math.max(0, D - units[0]), units[1], units[2]] };
  for (var r = 0; r < NR; r++) {
    // every point is played in every round. Misses are the LAST points: this round's own misses (late / early) just before the absent misses, which come last.
    var own = r === 0 ? 0 : Math.min(units[r], n - absShots), m = absShots + own, firstMiss = n - m, shots = [], i, q;
    for (i = 0; i < n; i++) {
      var tag = i < firstMiss ? null : (i >= n - absShots ? "absent" : ROUND_TAG[r]);
      shots.push({ i: i, state: tag ? "miss" : "good", tag: tag, kind: tag || "good", u: 0, t0: 0, land: 0, tagAt: [], f: plan.f });
    }
    for (q = 0; q < absShots; q++) shots[n - absShots + q].u = 1;
    for (q = absShots; q < units[0] && absShots > 0; q++) shots[n - 1 - ((q - absShots) % absShots)].u++;          // extra absences stack on a point that is already absent
    if (r > 0) {
      for (q = 0; q < own; q++) shots[firstMiss + q].u = 1;
      for (q = own; q < units[r] && own > 0; q++) shots[n - absShots - 1 - ((q - own) % own)].u++;                  // extra misses stack on a point that is already missed
    }
    var ev = [];                                                      // counter events {t, dv}, round-local seconds
    shots.forEach(function (p) {
      p.t0 = t0For(p.i, n);                                           // the ball pops onto the grey racket
      p.land = p.t0 + LAND[p.kind] * p.f;
      if (p.state === "good" && r === 0) ev.push({ t: p.land, dv: 1, p: p });
      for (var j = 0; j < p.u; j++) {
        p.tagAt.push(p.land + TM.TAG + j * TM.TAGSTEP);
        if (r > 0 && p.tag === ROUND_TAG[r]) ev.push({ t: p.land + TM.TAG + j * TM.TAGSTEP, dv: 1, p: p });          // absent tags never move the Late / Early numbers
      }
    });
    // the counter ends on the exact number in the data: whatever the points could not show goes on the last event (or a fallback one)
    var sum = 0; ev.forEach(function (e) { sum += e.dv; });
    var want = plan.target[r];
    if (sum !== want) {
      if (ev.length) ev[ev.length - 1].dv += want - sum;
      else ev.push({ t: TM.GO0 + 0.6, dv: want, p: null });
    }
    var last = 0; shots.forEach(function (p) { last = Math.max(last, p.land); });
    plan.rounds.push({ r: r, tag: ROUND_TAG[r], present: n - absShots, miss: m, shots: shots, events: ev, endAt: Math.max(last, ev.length ? ev[ev.length - 1].t : 0) + 0.5, perfect: m === 0 && n > 0 });
  }
  return plan;
}
function makeCues(wk) {
  var plan = makePlan(wk), out = [];
  plan.rounds.forEach(function (R) {
    var base = R.r * RD;
    out.push({ t: +(base + 0.1).toFixed(3), name: "round-start" });
    R.shots.forEach(function (p) {
      out.push({ t: +(base + p.t0 + TM.SERVE * p.f).toFixed(3), name: "kick" });
      if (p.kind === "good" || p.kind === "absent") out.push({ t: +(base + p.t0 + TM.HIT * p.f).toFixed(3), name: "kick" });
      if (p.kind === "good") out.push({ t: +(base + p.land).toFixed(3), name: "goal" });
      if (p.kind === "absent") out.push({ t: +(base + p.land).toFixed(3), name: "post" });
      if (p.state === "miss") p.tagAt.forEach(function (ta) { out.push({ t: +(base + ta).toFixed(3), name: "tag-" + p.tag }); });
    });
    R.events.forEach(function (e) { out.push({ t: +(base + e.t + 0.06).toFixed(3), name: "counter-tick" }); });
    if (R.events.length && R.r > 0 && R.events[0].p === null) out.push({ t: +(base + R.events[0].t).toFixed(3), name: "tag-" + R.tag });
    if (R.r < NR - 1) out.push({ t: +(base + TM.OUT0).toFixed(3), name: "round-clear" });
  });
  out.sort(function (a, b) { return a.t - b.t; });
  return out;
}

// ---------------------------------------------------------------- the court: table coordinates (u 0 left .. 1 right, v 0 far end .. 1 near end, net at v 0.5, h metres above the table) <-> plate px
function makeCourt(key) {
  var d = LAYOUT[key], far = d.far, near = d.near, base = d.net.base;
  var tn = (base - far) / (near - far), cc = 1 / tn - 1;
  var C = { key: key, W: d.W, far: far, near: near, base: base, tape: d.net.tape, c: cc, d: d, k: key === "phone" ? 1 : 1.35 };
  C.yOf = function (v) { return far + (v / (v + cc * (1 - v))) * (near - far); };
  C.xw = function (y) { return [d.el.a * y + d.el.b, d.er.a * y + d.er.b]; };
  C.width = function (y) { var x = C.xw(y); return x[1] - x[0]; };
  C.ground = function (u, v) { var y = C.yOf(v), x = C.xw(y); return [x[0] + u * (x[1] - x[0]), y]; };
  C.vOf = function (y) { var t = (y - far) / (near - far); return t * cc / (1 - t + t * cc); };
  C.uOf = function (px, y) { var x = C.xw(y); return (px - x[0]) / (x[1] - x[0]); };
  C.ballD = function (v) { return 0.075 * C.width(C.yOf(v)) / 1.525; };                  // the ball's diameter in px (drawn a little big on purpose, like the mock-ups)
  C.hpx = function (h, v) { return h * C.width(C.yOf(v)) / 1.525 * 0.85; };              // px above the table for h metres
  C.pt = function (u, v, h) { var g = C.ground(u, v); return [g[0], g[1] - C.ballD(v) / 2 - C.hpx(h, v)]; };   // the ball's CENTRE: h is the height of the ball's bottom above the table
  C.netH = d.net.h * 1.525 / (C.width(base) * 0.85);                                          // the net's height in metres on this plate
  return C;
}

// ---------------------------------------------------------------- the path of one point (table coordinates, point-local seconds) and the two rackets' tracks
function pointPath(i, kind, LK, OH, EXIT, C) {
  var us = clamp(OH[0] + DU[i], 0.14, 0.86), vs = OH[1], hit = HITU[i];
  var h0 = 0.065;
  while (h0 > 0.005 && C.pt(us, vs, h0 + 0.01)[1] - C.ballD(vs) * 0.72 < 584) h0 -= 0.005;                // the served ball (and its pop-in, 1.4 x) never reaches up into the heading cards
  var S0 = [us, vs, h0], B1 = [us + 0.12 * (hit - us), B1V, 0], B2 = [us + 0.8 * (hit - us), 0.70, 0], HIT = [hit, 0.90, 0.18];
  var legs = [
    { a: 0, b: TM.SERVE, A: S0, B: S0, ap: 0.01 },                        // the ball rests above the grey racket's head (a tiny toss)
    { a: TM.SERVE, b: TM.B1, A: S0, B: B1, ap: 0 },                        // served: down to the far half
    { a: TM.B1, b: TM.B2, A: B1, B: B2, ap: 0.34 },                        // over the net, down on our half
    { a: TM.B2, b: TM.HIT, A: B2, B: HIT, ap: 0.08 }                       // up to our racket
  ];
  var P = { i: i, kind: kind, us: us, vs: vs, hit: hit, S0: S0, B1: B1, B2: B2, HIT: HIT, legs: legs, ripples: [{ t: TM.B1, u: B1[0], v: B1[1] }, { t: TM.B2, u: B2[0], v: B2[1] }], fade: null, end: 0, fx: null };
  if (kind === "good") {
    var f1 = [RETU[i], 0.26, 0], eu = clamp(f1[0] + (f1[0] - hit) * 0.35, 0.08, 0.92), ev = -0.14;
    while (C.pt(eu, ev, 0.05)[1] - C.ballD(ev) / 2 < 584 && ev < 0.2) ev += 0.005;     // the ball flies off the far end but never up into the heading cards (its top stays below y 584)
    var E = [eu, ev, 0.05];
    legs.push({ a: TM.HIT, b: 1.26, A: HIT, B: f1, ap: 0.25 });             // our return: over the net, down on the far half
    legs.push({ a: 1.26, b: 1.50, A: f1, B: E, ap: 0.03 });                 // and on past the grey racket, off the far end
    P.ripples.push({ t: 1.26, u: f1[0], v: f1[1] });
    P.fade = [1.38, 1.50]; P.end = 1.50; P.f1 = f1; P.E = E;                // the ball is gone BEFORE the spark (LAND.good = 1.52) bursts where it left
    P.fx = { type: "spark", t: LAND.good, at: [lerp(f1[0], E[0], 0.8), 0.04, 0.05] };
  } else if (kind === "absent") {
    var nu = hit - 0.04, dd = nu < 0.5 ? -0.14 : 0.14, NETP = [nu, 0.5, 0.11], DROP = [clamp(nu + dd, 0.1, 0.9), 0.575, 0], R2 = [DROP[0] + (dd < 0 ? -0.03 : 0.03), 0.61, 0];
    legs.push({ a: TM.HIT, b: 1.14, A: HIT, B: NETP, ap: 0 });              // our return runs into the net
    legs.push({ a: 1.14, b: 1.40, A: NETP, B: DROP, ap: 0.04 });            // and drops on our side
    legs.push({ a: 1.40, b: 1.62, A: DROP, B: R2, ap: 0.05 });
    P.ripples.push({ t: 1.40, u: DROP[0], v: DROP[1] }, { t: 1.62, u: R2[0], v: R2[1] });
    P.fade = [1.62, 1.78]; P.end = 1.78; P.NETP = NETP;
    P.fx = { type: "rays", t: LAND.absent, at: NETP };
  } else {                                                                 // late / early: the ball goes on past the meeting point and leaves our end
    var ex = clamp(hit + 0.4 * (hit - us), 0.42, 0.5);                 // leaves our end between u 0.42 and 0.5: clear of the red racket parked at the right and of the tag stack at the left
    legs.push({ a: TM.HIT, b: 1.32, A: HIT, B: [ex, 1.30, 0], ap: 0 });
    P.end = 1.32; P.ex = ex;
  }
  return P;
}
function racketTracks(rd, PTS, LK, OH, HH, EXIT) {                         // keyframes [t, u, v, angle], round-local seconds; between two keyframes a smooth glide
  var opp = [[0, OH[0], OH[1], 0]], hero = [[0, HH[0], HH[1], 0]], n = rd.shots.length;
  // our racket waits on the side the ball's path and the racket's handle (lower left) do not share: late and early = RIGHT of the meeting point (the head is 130 px wide and the handle trails 220 px
  // to the lower left, so the head waits at least 0.30 to the right; a late racket lunges only after the ball has gone by, an early one leaves to the right), good / absent = alternating sides
  function ready(i, kind) { var h = HITU[i]; return [kind === "late" || kind === "early" ? clamp(h + 0.30, 0.2, 0.9) : clamp(h + (i % 2 ? -0.26 : 0.26), 0.18, 0.9), 0.90]; }
  function hold(kf, tNext) { var L = kf[kf.length - 1], th = tNext - 0.5; if (th > L[0] + 0.02) kf.push([th, L[1], L[2], L[3]]); }       // stay where it is, then glide for the last half second
  rd.shots.forEach(function (p, i) {
    var P = PTS[i], t0 = p.t0, f = p.f, T = function (x) { return t0 + x * f; }, us = P.us, vs = P.vs, h = P.HIT, rdy = ready(i, p.kind), rk;
    hold(opp, t0); hold(hero, t0);
    opp.push([T(0.0), us, vs, 0], [T(0.10), us, vs, -18], [T(TM.SERVE), us, vs + 0.03, 16], [T(0.38), us, vs, 0]);
    if (p.kind === "good") {
      var dir = P.E[0] > us ? 1 : -1;
      rk = clamp(us + dir * 0.14, 0.1, 0.9);
      opp.push([T(1.02), us, vs, 0], [T(1.10), us, vs, -26 * dir], [T(1.42), rk, vs + 0.04, 42 * dir], [T(1.55), rk, vs + 0.04, 42 * dir]);   // a big swing that comes too late and too short: the ball is already off the far end, well to the side
    }
    hero.push([T(0.0), rdy[0], rdy[1], 0]);
    if (p.kind === "late") hero.push([T(1.18), rdy[0], rdy[1], 0], [T(1.44), h[0], h[1], 0], [T(1.52), h[0], h[1], TILT - 2], [T(1.60), h[0], h[1], 0]);
    else if (p.kind === "early") hero.push([T(0.40), rdy[0], rdy[1], 0], [T(0.50), rdy[0], rdy[1], 0], [T(1.0), EXIT[0], EXIT[1], EXIT[2]], [T(1.3), EXIT[0], EXIT[1], EXIT[2]]);
    else hero.push([T(0.40), rdy[0], rdy[1], 0], [T(0.84), h[0], h[1], 0], [T(0.98), h[0], h[1], TILT], [T(1.22), h[0], h[1], 0], [T(1.32), h[0], h[1], 0]);
  });
  if (n) { hold(opp, RD); hold(hero, RD - 0.2); opp.push([RD, OH[0], OH[1], 0]); hero.push([RD - 0.2, HH[0], HH[1], 0]); }
  return { opp: opp, hero: hero };
}
function trackAt(kf, t) {
  if (t <= kf[0][0]) return { u: kf[0][1], v: kf[0][2], a: kf[0][3] };
  for (var i = 1; i < kf.length; i++) {
    if (t < kf[i][0]) {
      var A = kf[i - 1], B = kf[i], k = B[0] - A[0] < 1e-6 ? 1 : smooth((t - A[0]) / (B[0] - A[0]));
      return { u: lerp(A[1], B[1], k), v: lerp(A[2], B[2], k), a: lerp(A[3], B[3], k) };
    }
  }
  var L = kf[kf.length - 1]; return { u: L[1], v: L[2], a: L[3] };
}
function legAt(P, tau) {                                                   // the ball's [u, v, h] at point-local second tau (null before the point / after the last leg's end)
  var legs = P.legs, k, L;
  for (k = 0; k < legs.length; k++) {
    L = legs[k];
    if (tau < L.b || k === legs.length - 1) {
      var s = clamp((tau - L.a) / (L.b - L.a), 0, 1);
      return [lerp(L.A[0], L.B[0], s), lerp(L.A[1], L.B[1], s), lerp(L.A[2], L.B[2], s) + 4 * L.ap * s * (1 - s)];
    }
  }
  return null;
}

MotionIgor.define({
  id: "p1011-tabletennis",
  duration: DUR,
  size: [1080, 1920],
  kind: "scene",
  title: "Grade 10-11 boys report · last week at school (table tennis)",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  cues: function (content) { return makeCues(MotionIgor.util.deepMerge(MotionIgor.registry["p1011-tabletennis"].defaults, content || {}).lastWeek); },
  defaults: {
    art: "tabletennis-layers/",
    subtitle: "Last week at school",
    rounds: [{ head: [["Came", "to", "school"]] }, { head: [["On", "time"]] }, { head: [["Stayed", "all", "day"]] }],
    counter: "Days at school",
    of: "of",
    lateLabel: "Late to school",
    earlyLabel: "Early leave",
    tags: { absent: "Absent", late: "Late to school", early: "Early leave" },
    child: { name: "Omar", grade: "Grade 10", form: "10A" },
    lastWeek: { daysOpen: 4, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    badge: "Weekly report",
    episode: "Week 7",
    look: "",
    chrome: true                       // false: the story draws the badge, week above its transitions
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col, esc = ctx.util.esc;
    var LK = WD.sw >= 2400 ? "wide" : "phone", KEY = LK === "wide" ? "laptop" : "phone", C = makeCourt(KEY), k = C.k, OFF = LK === "wide" ? 1167 : 0;       // OFF: plate x -> column x
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f", GOLDD = "#d99a12";
    var OH = LK === "wide" ? LAYOUT.opp.homeL : LAYOUT.opp.home, HH = LAYOUT.hero.home;
    var EXIT = LK === "wide" ? [1.12, 0.90, 0] : [C.uOf(886, 1750), C.vOf(1750), 45];      // where our racket leaves the table (early leave): to the right (phone: turned 45 degrees and parked at x 886 so the whole head, its shadow included, stays inside the 1080 stage; laptop: the mock-up's place)
    function el(tag, css, parent) { var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e; }
    var PL = makePlan(c.lastWeek), daysTotal = PL.D, n = PL.n, FF = PL.f;
    var PTS = PL.rounds.map(function (rd) { return rd.shots.map(function (p) { return pointPath(p.i, p.kind, KEY, OH, EXIT, C); }); });
    var TRK = PL.rounds.map(function (rd, r) { return racketTracks(rd, PTS[r], KEY, OH, HH, EXIT); });
    function roundOf(t) { return clamp(Math.floor(t / RD), 0, NR - 1); }
    function countersAt(t) {
      var v = [0, 0, 0], last = [-9, -9, -9];
      PL.rounds.forEach(function (rd) {
        rd.events.forEach(function (e) { var at = rd.r * RD + e.t; if (t >= at) { v[rd.r] += e.dv; last[rd.r] = Math.max(last[rd.r], at); } });
      });
      return { v: v, last: last };
    }

    // ---------------------------------------------------------------- the room: ONE picture (the table); a laptop gets the wide plate with the same table in the middle
    ctx.stage.style.background = "#c9966e";
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;z-index:0");
    var bg;
    if (LK === "wide") { bg = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none", world); bg.src = WD.src(c.art, "tabletennis-bg.jpg", "bg.jpg"); }
    else {
      if (WD.wide) {                                                  // a portrait tablet: the phone picture in the middle, its own blurred copy behind it
        var back = el("img", "position:absolute;left:" + (-WD.ox) + "px;top:0;width:" + WD.sw + "px;height:1920px;max-width:none;display:block;filter:blur(26px);transform:scale(1.05)", world);
        back.src = c.art + "bg.jpg"; back.alt = ""; back.draggable = false;
      }
      bg = el("img", "position:absolute;left:0;top:0;width:1080px;height:1920px;display:block;max-width:none", world); bg.src = c.art + "bg.jpg";
    }
    bg.decoding = "sync"; bg.alt = ""; bg.draggable = false;
    var bgSrc = LK === "wide" ? WD.src(c.art, "tabletennis-bg.jpg", "bg.jpg") : c.art + "bg.jpg";   // the net overlay's picture: never read it back from the <img>, the app holds that src back while the story mounts
    function Z(z) { return "z-index:" + z; }
    var shLayer = el("div", "position:absolute;left:0;top:0;width:0;height:0;" + Z(1), world);        // ripples and the ball's shadow on the table
    // --- the two rackets: one rigid picture each, placed by its head centre, turned about it; a soft contact shadow (the same picture, black, blurred) a little right and down
    function makeRacket(file, info, dispH, z, zs) {
      var s = dispH / info.pic[1], w = info.pic[0] * s;
      var sh = el("div", "position:absolute;left:0;top:0;width:0;height:0;transform-origin:0 0;will-change:transform;" + Z(zs), world);
      var shi = el("img", "position:absolute;left:" + (-info.head[0] * s).toFixed(2) + "px;top:" + (-info.head[1] * s).toFixed(2) + "px;width:" + w.toFixed(2) + "px;height:" + dispH + "px;max-width:none;display:block;filter:brightness(0) blur(" + (7 * k).toFixed(1) + "px);opacity:0.40", sh);
      var bd = el("div", "position:absolute;left:0;top:0;width:0;height:0;transform-origin:0 0;will-change:transform;" + Z(z), world);
      var im = el("img", "position:absolute;left:" + (-info.head[0] * s).toFixed(2) + "px;top:" + (-info.head[1] * s).toFixed(2) + "px;width:" + w.toFixed(2) + "px;height:" + dispH + "px;max-width:none;display:block", bd);
      shi.src = im.src = c.art + file; shi.alt = im.alt = ""; shi.draggable = im.draggable = false; im.decoding = "sync"; shi.decoding = "sync";
      return { sh: sh, bd: bd, im: im, s: s, info: info, dispH: dispH, x: 0, y: 0, a: 0 };
    }
    var Z_OPP = 3, Z_FAR = 4, Z_NET = 5, Z_HERO = 7, Z_NEAR = 8, Z_FX = 9;
    var opp = makeRacket("racket-opp.webp", LAYOUT.opp, C.d.oppH, Z_OPP, 2), hero = makeRacket("racket-hero.webp", LAYOUT.hero, C.d.heroH, Z_HERO, 6);
    function placeRacket(R, u, v, a) {
      var g = C.ground(u, v), gx = g[0] - OFF;
      R.x = g[0]; R.y = g[1]; R.a = a;
      R.bd.style.transform = "translate(" + gx.toFixed(1) + "px," + g[1].toFixed(1) + "px) rotate(" + a.toFixed(2) + "deg)";
      R.sh.style.transform = "translate(" + (gx + 10 * k).toFixed(1) + "px," + (g[1] + 16 * k).toFixed(1) + "px) rotate(" + a.toFixed(2) + "deg)";
    }
    // --- the net overlay: the net band of the table picture drawn again over the ball while the ball is beyond the net (the ball is behind the net, seen through its mesh)
    var nx0 = Math.round(C.d.net.pl - 30), nx1 = Math.round(C.d.net.pr + 30), ny0 = Math.round(C.tape - 6), ny1 = Math.round(C.base + 12);
    var netO = el("div", "position:absolute;left:" + (nx0 - OFF) + "px;top:" + ny0 + "px;width:" + (nx1 - nx0) + "px;height:" + (ny1 - ny0) + "px;background-image:url(" + bgSrc + ");background-repeat:no-repeat;background-size:" +
      (LK === "wide" ? 3414 : 1080) + "px 1920px;background-position:" + (-nx0) + "px " + (-ny0) + "px;opacity:0.93;" + Z(Z_NET), world);
    // --- the ball: a shaded white sphere drawn once on a canvas (light from the top left like the picture)
    var BALL_URL = (function () {
      try {
        var N = 128, cv = document.createElement("canvas"); cv.width = cv.height = N; var g = cv.getContext("2d");
        var gr = g.createRadialGradient(N * 0.36, N * 0.32, N * 0.04, N * 0.5, N * 0.5, N * 0.52);
        gr.addColorStop(0, "#ffffff"); gr.addColorStop(0.45, "#f7f4ec"); gr.addColorStop(0.85, "#cbc6b9"); gr.addColorStop(1, "#a29d90");
        g.fillStyle = gr; g.beginPath(); g.arc(N / 2, N / 2, N / 2 - 2, 0, Math.PI * 2); g.fill();
        g.strokeStyle = "rgba(16,32,63,0.55)"; g.lineWidth = 3; g.beginPath(); g.arc(N / 2, N / 2, N / 2 - 2.5, 0, Math.PI * 2); g.stroke();
        g.fillStyle = "rgba(255,255,255,0.9)"; g.beginPath(); g.ellipse(N * 0.34, N * 0.27, N * 0.11, N * 0.06, -0.6, 0, Math.PI * 2); g.fill();
        return cv.toDataURL("image/png");
      } catch (e) { return ""; }
    })();
    var ball = el("img", "position:absolute;left:0;top:0;width:10px;height:10px;max-width:none;display:none;will-change:transform;" + Z(Z_NEAR), world); ball.src = BALL_URL; ball.alt = ""; ball.draggable = false;
    var ballSh = el("div", "position:absolute;left:0;top:0;width:10px;height:10px;display:none;will-change:transform;border-radius:50%;background:radial-gradient(ellipse at center,rgba(6,14,40,0.62) 0%,rgba(6,14,40,0.30) 45%,rgba(6,14,40,0) 72%)", shLayer);
    // --- bounce ripples (a soft white ring on the table where the ball lands) and the point's burst (sparkle on a won point, gold rays at the net)
    var RIPS = [], FXS = [];
    PL.rounds.forEach(function (rd, r) {
      rd.shots.forEach(function (p, i) {
        var P = PTS[r][i];
        P.ripples.forEach(function (rp) {
          var g = C.ground(rp.u, rp.v);
          var e = el("div", "position:absolute;left:0;top:0;width:10px;height:10px;box-sizing:border-box;border-radius:50%;border:" + Math.max(2, Math.round(3 * k)) + "px solid rgba(255,255,255,0.8);visibility:hidden;will-change:transform", shLayer);
          RIPS.push({ el: e, t: r * RD + p.t0 + rp.t * p.f, x: g[0], y: g[1], D: C.ballD(rp.v) });
        });
        if (P.fx) {
          var at = C.pt(P.fx.at[0], P.fx.at[1], P.fx.at[2]), box = el("div", "position:absolute;left:" + (at[0] - OFF) + "px;top:" + at[1] + "px;width:0;height:0;" + Z(Z_FX), world), parts = [];
          if (P.fx.type === "spark") {
            for (var q = 0; q < 8; q++) {
              var e2 = el("div", "position:absolute;left:-16px;top:-16px;width:32px;height:32px;visibility:hidden", box);
              e2.innerHTML = '<svg viewBox="-16 -16 32 32" width="32" height="32"><path d="M0-14 L3.6-4.6 13.3-4.3 5.8 1.8 8.2 11.3 0 5.8-8.2 11.3-5.8 1.8-13.3-4.3-3.6-4.6Z" fill="' +
                [GOLD, GREEN, BLUE, "#e8577e"][q % 4] + '" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/></svg>';
              parts.push(e2);
            }
          } else {
            for (var q2 = 0; q2 < 8; q2++) parts.push(el("div", "position:absolute;left:-4px;top:" + (-14 * k) + "px;width:8px;height:" + (28 * k) + "px;border-radius:4px;background:" + GOLD + ";box-shadow:0 0 0 2px " + INK + ";visibility:hidden", box));
          }
          FXS.push({ box: box, parts: parts, type: P.fx.type, t: r * RD + p.t0 + P.fx.t * p.f });
        }
      });
    });

    // ---------------------------------------------------------------- data layer (DOM over the picture, in the 1080 column)
    var data = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none;z-index:10");
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
      var host = el("div", "position:absolute;left:0;right:0;top:268px;height:92px;display:none;flex-direction:column;align-items:center;justify-content:center;gap:4px", data);
      var letters = [];
      rd.head.forEach(function (words, li) {
        var row = el("div", "display:flex;gap:24px", host);
        words.forEach(function (w) {
          var ws = el("span", "display:inline-flex", row);
          String(w).split("").forEach(function (ch) {
            var s = el("span", "display:inline-block;transform-origin:50% 90%;font:700 84px/1.02 " + FONT + ";color:" + colors[(li + r) % 2] +
              ";-webkit-text-stroke:13px " + INK + ";paint-order:stroke fill;text-shadow:0 8px 0 " + INK, ws);
            s.textContent = ch; letters.push(s);
          });
        });
      });
      return { host: host, letters: letters };
    });
    var CW = 306, CG = 22, CL = (1080 - (3 * CW + 2 * CG)) / 2, CTOP = 388;
    function card(i, label) {
      var e = el("div", "position:absolute;left:" + (CL + i * (CW + CG)) + "px;top:" + CTOP + "px;width:" + CW + "px;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:12px;" +
        "padding:16px 10px 16px;border-radius:34px;background:#fff;border:7px solid " + INK + ";box-shadow:8px 8px 0 " + INK + ";transform-origin:50% 0%", data);
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
    // gold tags for missed days (never red): one per missed point, in the order of the points. Phone: a stack in the dark area under the table, on the left; wide: a stack on the floor right of the table.
    var ICON = {
      absent: '<path d="M6 6 L22 22 M22 6 L6 22" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>',
      late: '<circle cx="14" cy="14" r="10" fill="none" stroke="#fff" stroke-width="3.5"/><path d="M14 8 V14 L18 17" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>',
      early: '<path d="M7 4 H19 V24 H7 Z" fill="none" stroke="#fff" stroke-width="3.2"/><path d="M13 14 H25 M21 10 L25 14 L21 18" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round"/>'
    };
    var TAGF = 30, TAGLIST = [], kt = LK === "wide" ? 1.35 : 1;
    function tagW(label) { return TAGF * String(label).length * 0.56 + 100; }
    var maxW = 0;
    PL.rounds.forEach(function (rd) { rd.shots.forEach(function (p) { if (p.state === "miss") maxW = Math.max(maxW, Math.round(tagW(c.tags[p.tag] + (p.u > 1 ? " ×" + p.u : "")) / 2) * 2 * kt); }); });
    var TAGX = LK === "wide" ? Math.min(2520, 1707 + WD.sw / 2 - 24 - maxW) - OFF : 36;                 // column x of the stack's left edge
    var TAGY0 = LK === "wide" ? 1000 : 1745, TAGDY = LK === "wide" ? 116 : 70;           // phone: first tag centre y 1745 (Igor's mock-up), below the red racket's handle; up to four tags in the dark area, 70 px apart (with four tags each is drawn at 0.85 size, 58 px apart from y 1717, so none overlaps another and the last one stays on the stage)
    PL.rounds.forEach(function (rd) {
      var slot = 0;
      rd.shots.forEach(function (p) {
        if (p.state !== "miss") return;
        var label = c.tags[p.tag] + (p.u > 1 ? " ×" + p.u : ""), w = Math.round(tagW(label) / 2) * 2;
        var nTags = rd.shots.filter(function (q) { return q.state === "miss"; }).length, cmp = (LK !== "wide" && nTags > 3), tk = cmp ? 0.85 : 1, dy = cmp ? 58 : TAGDY, cy = (cmp ? 1717 : TAGY0) + slot * dy; slot++;
        var box = el("div", "position:absolute;left:" + TAGX + "px;top:" + cy + "px;width:0;height:0;transform-origin:0 0", data);
        var tg = el("div", "position:absolute;left:0;top:-34px;width:" + w + "px;height:68px;box-sizing:border-box;display:flex;align-items:center;gap:10px;white-space:nowrap;padding:0 20px 0 12px;border-radius:999px;" +
          "background:" + GOLD + ";border:5px solid " + INK + ";box-shadow:5px 5px 0 " + INK + ";font:700 " + TAGF + "px/1 " + FONT + ";color:" + INK + ";transform-origin:50% 50%", box);
        tg.innerHTML = '<span style="display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:' + GOLDD + ';border:3px solid ' + INK +
          '"><svg width="26" height="26" viewBox="0 0 28 28">' + ICON[p.tag] + "</svg></span>" + esc(label);
        TAGLIST.push({ el: box, tg: tg, at: p.tagAt[0], r: rd.r, i: TAGLIST.length, tk: tk });
      });
    });

    // ---------------------------------------------------------------- one frame
    function popNum(el2, since, t) { return 1 + 0.2 * Math.sin(seg(t, since, since + 0.32) * Math.PI); }
    var lastDbg = null, lastT = 0;
    function drawAt(t) {
      lastT = t;
      var rNow = roundOf(t), ltNow = t - rNow * RD, rd = PL.rounds[rNow];
      var su = seg(t, 0.05, 0.45);
      sub.style.visibility = su > 0 ? "visible" : "hidden";
      sub.style.transform = su >= 1 ? "none" : "translateY(" + Math.round((1 - outBack(su)) * 40) + "px)";
      HEADS.forEach(function (h, r) {
        var rt = t - r * RD, on = rt >= 0 && (r === NR - 1 || rt < TM.OUT0 + TM.OUTD);
        h.host.style.display = on ? "flex" : "none";
        if (!on) return;
        h.letters.forEach(function (l, i) {
          var u = seg(rt, TM.HEAD0 + i * 0.04, TM.HEAD0 + i * 0.04 + 0.34);
          var bob = Math.sin(t * 3 + i * 0.6) * 3 * seg(rt, TM.HEAD0 + 1.0, TM.HEAD0 + 1.6);
          var out = r < NR - 1 ? smooth(seg(rt, TM.OUT0 + i * 0.006, TM.OUT0 + i * 0.006 + 0.3)) : 0;
          l.style.transform = "translateY(" + Math.round(-(1 - outBack(u)) * 50 + bob - out * 44) + "px)";
          l.style.visibility = (u > 0 && out < 0.98) ? "visible" : "hidden";
        });
      });

      // --- the two rackets
      var tr = TRK[rNow], hp = trackAt(tr.hero, ltNow), op = trackAt(tr.opp, ltNow);
      placeRacket(hero, hp.u, hp.v, hp.a); placeRacket(opp, op.u, op.v, op.a);
      // --- the ball of the point on stage (one at a time: a point's ball is gone before the next one pops)
      var ak = null, ai = -1;
      rd.shots.forEach(function (p, i) { if (ltNow >= p.t0 && ltNow < p.t0 + PTS[rNow][i].end * FF) { ak = p; ai = i; } });
      var info = null;
      ball.style.display = "none"; ballSh.style.display = "none";
      if (ak) {
        var P = PTS[rNow][ai], tau = (ltNow - ak.t0) / FF, b = legAt(P, tau), dIn = easeOut(seg(tau, 0, TM.POP));
        var fo = P.fade ? 1 - smooth(seg(tau, P.fade[0], P.fade[1])) : 1;
        var op2 = dIn * fo, sc = (1.4 - 0.4 * dIn) * (P.fade ? 1 - 0.25 * (1 - fo) : 1);
        var cp = C.pt(b[0], b[1], b[2]), D = C.ballD(b[1]) * sc;
        if (op2 > 0.004) {
          ball.style.display = "block"; ball.style.width = ball.style.height = D.toFixed(1) + "px";
          ball.style.transform = "translate(" + (cp[0] - OFF - D / 2).toFixed(1) + "px," + (cp[1] - D / 2).toFixed(1) + "px)";
          ball.style.opacity = op2.toFixed(3); ball.style.zIndex = b[1] < 0.5 ? Z_FAR : Z_NEAR;
          var onT = b[0] >= -0.02 && b[0] <= 1.02 && b[1] >= 0 && b[1] <= 1.0;
          if (onT) {
            var g = C.ground(b[0], b[1]), so = (1 - clamp(b[2] / 0.7, 0, 1)) * 0.85 * op2, sw = C.ballD(b[1]) * (1.7 + 0.9 * clamp(b[2] / 0.4, 0, 1)), sh2 = sw * 0.42;
            ballSh.style.display = "block"; ballSh.style.width = sw.toFixed(1) + "px"; ballSh.style.height = sh2.toFixed(1) + "px"; ballSh.style.opacity = so.toFixed(3);
            ballSh.style.transform = "translate(" + (g[0] - OFF - sw / 2 + D * 0.28).toFixed(1) + "px," + (g[1] - sh2 / 2 + D * 0.08).toFixed(1) + "px)";
          }
        }
        info = { r: rNow, i: ai, kind: ak.kind, tau: tau, u: b[0], v: b[1], h: b[2], x: cp[0], y: cp[1], D: D, op: op2, z: b[1] < 0.5 ? "far" : "near" };
      }
      RIPS.forEach(function (rp) {
        var u2 = t - rp.t, on = u2 >= 0 && u2 < 0.34;
        rp.el.style.visibility = on ? "visible" : "hidden";
        if (!on) return;
        var kk = u2 / 0.34, w2 = rp.D * (1.0 + 2.6 * easeOut(kk)), h2 = w2 * 0.38;
        rp.el.style.width = w2.toFixed(1) + "px"; rp.el.style.height = h2.toFixed(1) + "px"; rp.el.style.opacity = ((1 - kk) * 0.9).toFixed(3);
        rp.el.style.transform = "translate(" + (rp.x - OFF - w2 / 2).toFixed(1) + "px," + (rp.y - h2 / 2).toFixed(1) + "px)";
      });
      FXS.forEach(function (f) {
        var life = f.type === "spark" ? (LK === "wide" ? 0.30 : 0.32) : 0.45, u3 = t - f.t, on = u3 >= 0 && u3 < life, kk = clamp(u3 / life, 0, 1);
        f.parts.forEach(function (e, q) {
          e.style.visibility = on ? "visible" : "hidden";
          if (!on) return;
          if (f.type === "spark") {
            var a = (q / f.parts.length) * Math.PI * 2 + 0.3, rr = LK === "wide" ? 22 + 34 * easeOut(kk) : 30 + 46 * easeOut(kk);
            e.style.opacity = (1 - kk * kk).toFixed(3);
            e.style.transform = "translate(" + (Math.cos(a) * rr).toFixed(1) + "px," + (Math.sin(a) * rr * 0.8).toFixed(1) + "px) rotate(" + (kk * 140).toFixed(0) + "deg) scale(" + (LK === "wide" ? 1.0 : 1.3) + ")";
          } else {
            var a2 = (q / f.parts.length) * Math.PI * 2, r1 = (30 + 42 * easeOut(kk)) * k;
            e.style.opacity = (1 - kk).toFixed(3);
            e.style.transform = "rotate(" + (a2 * 180 / Math.PI).toFixed(1) + "deg) translate(0," + (-r1).toFixed(1) + "px)";
          }
        });
      });
      lastDbg = { r: rNow, lt: ltNow, point: ai, state: ak ? ak.kind : "", ball: info, hero: { x: hero.x, y: hero.y, a: hero.a, u: hp.u, v: hp.v }, opp: { x: opp.x, y: opp.y, a: opp.a, u: op.u, v: op.v } };

      // --- counters
      var cn = countersAt(t);
      CARDS.forEach(function (cd, i) {
        var cu = seg(t, i * RD + 0.2, i * RD + 0.6);
        cd.box.style.visibility = cu > 0 ? "visible" : "hidden";
        cd.box.style.transform = cu >= 1 ? "none" : "scale(" + (cu <= 0 ? 0 : outBack(cu)).toFixed(3) + ")";
        var rr = PL.rounds[i], val = cn.v[i], bg2, fg = "#fff";
        if (i === 0) {
          cd.num.textContent = val + " " + c.of + " " + daysTotal;
          bg2 = (val === daysTotal || t < rr.endAt) ? GREEN : "#b8770f";
        } else {
          cd.num.textContent = String(val);
          if (PL.units[i] > 0) { bg2 = val > 0 ? GOLD : "#8fa0bd"; if (val > 0) fg = INK; }
          else bg2 = rr.present > 0 ? GREEN : "#8fa0bd";
        }
        cd.num.style.background = bg2; cd.num.style.color = fg;
        var joy = rr.perfect ? seg(t, i * RD + rr.endAt - 0.7, i * RD + rr.endAt + 0.3) : 0;
        var pn = popNum(cd.num, cn.last[i], t) + 0.1 * Math.sin(joy * Math.PI);
        cd.num.style.transform = Math.abs(pn - 1) < 0.0005 ? "none" : "scale(" + pn.toFixed(3) + ")";
        SPARKS[i].forEach(function (e, j) {
          var a = -(150 - 120 * j / (SPARKS[i].length - 1)) * Math.PI / 180, rx = 205 + 10 * smooth(joy), ry = 112 + 90 * smooth(joy);
          e.style.opacity = joy > 0 && joy < 1 ? (1 - joy * joy).toFixed(3) : 0;
          e.style.transform = "translate(" + (Math.cos(a) * rx).toFixed(1) + "px," + (Math.sin(a) * ry).toFixed(1) + "px) rotate(" + (joy * 120).toFixed(0) + "deg) scale(1.3)";
        });
      });

      // --- tags: pop up when the point is decided, leave with the round
      TAGLIST.forEach(function (g) {
        var rt = t - g.r * RD, tu = seg(rt, g.at, g.at + 0.35), to = g.r < NR - 1 ? smooth(seg(rt, TM.OUT0 + 0.02, TM.OUT0 + 0.3)) : 0;
        var sc2 = (tu <= 0 ? 0 : outBack(tu)) * (1 - to) * kt * g.tk;
        g.el.style.visibility = tu > 0 && sc2 > 0.001 ? "visible" : "hidden";
        g.el.style.transform = Math.abs(sc2 - 1) < 0.0005 ? "none" : "scale(" + Math.max(0, sc2).toFixed(3) + ")";
        var rot = Math.sin(t * 2 + g.i) * 2 * seg(rt, g.at + 0.4, g.at + 0.8);
        g.tg.style.transform = "translateY(" + Math.round(rot * 1.6) + "px)";
      });
    }
    ctx.onDraw(drawAt);
    try {
      if (document.fonts && document.fonts.load) document.fonts.load("700 84px Fredoka").then(function () { drawAt(lastT); }, function () { });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { drawAt(lastT); });
    } catch (eF) { /* no font api */ }
    if (c.debug) window.__p1011tt = {
      dbg: function () { var tg = TAGLIST.filter(function (g) { return g.el.style.visibility === "visible"; }).map(function (g) { return g.r + ":" + g.tg.textContent.trim(); }); var cs = CARDS.map(function (cd) { return cd.num.textContent; }); return Object.assign({ tags: tg, cards: cs }, lastDbg); },
      PL: PL, PTS: PTS, TRK: TRK, TM: TM, LAND: LAND, C: C, LK: LK, OFF: OFF, OH: OH, HH: HH, EXIT: EXIT, LAYOUT: LAYOUT, legAt: legAt, trackAt: trackAt,
      // client-px rectangles of what is on screen (tags and cards), plate px of the racket's opaque box (measured from the picture's alpha once)
      scale: function () { return st.getBoundingClientRect().width / WD.sw * 1; },
      origin: function () { var r = st.getBoundingClientRect(); return [r.left, r.top, r.width / 1080]; },
      tags: function () { var o = []; TAGLIST.forEach(function (g) { if (g.el.style.visibility === "hidden") return; var r = g.tg.getBoundingClientRect(); o.push([r.left, r.right, r.top, r.bottom, g.r]); }); return o; },
      cards: function () { return CARDS.map(function (cd) { var r = cd.box.getBoundingClientRect(); return [r.left, r.right, r.top, r.bottom]; }); },
      ox: WD.ox, sw: WD.sw,
      racketBox: function (which) {                                  // the opaque shape of a racket as it is now: [minx, maxx] in column px, [miny, maxy] in plate px (convex hull of the picture's alpha, measured once)
        var R = which === "hero" ? hero : opp, im = R.im;
        if (!R.hull) {
          var cv = document.createElement("canvas"), W = im.naturalWidth, H = im.naturalHeight; cv.width = W; cv.height = H;
          var g = cv.getContext("2d"); g.drawImage(im, 0, 0); var d = g.getImageData(0, 0, W, H).data, pts = [], x, y;
          for (y = 0; y < H; y += 2) for (x = 0; x < W; x += 2) if (d[(y * W + x) * 4 + 3] > 40) pts.push([x / W * R.info.pic[0], y / H * R.info.pic[1]]);
          pts.sort(function (p, q) { return p[0] - q[0] || p[1] - q[1]; });
          var cr = function (o, p, q) { return (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0]); }, lo = [], up = [], i;
          for (i = 0; i < pts.length; i++) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], pts[i]) <= 0) lo.pop(); lo.push(pts[i]); }
          for (i = pts.length - 1; i >= 0; i--) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], pts[i]) <= 0) up.pop(); up.push(pts[i]); }
          R.hull = lo.concat(up);
        }
        var s = R.s, a = R.a * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a), xs = [], ys = [];
        R.hull.forEach(function (p) { var lx = (p[0] - R.info.head[0]) * s, ly = (p[1] - R.info.head[1]) * s; xs.push(R.x + lx * ca - ly * sa - OFF); ys.push(R.y + lx * sa + ly * ca); });
        return [Math.min.apply(null, xs), Math.max.apply(null, xs), Math.min.apply(null, ys), Math.max.apply(null, ys)];
      }
    };
    return { destroy: function () { /* the beat is plain DOM: nothing to release */ } };
  }
});
})();
