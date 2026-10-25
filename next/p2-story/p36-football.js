/* Grade 3-6 boys' football beat · p36-football  (3D living storybook, real 3D ball, THREE ROUNDS; the boys' version of p2-sorter / p2-claw)
 * Same data, same rounds, same counters and gold tags as the P-2 sorter, told as penalty kicks at a school goal:
 *   Round 1 "Came to school"  : a day ABSENT is a miss (gold tag Absent).
 *   Round 2 "On time"         : a day LATE TO SCHOOL is a miss (gold tag Late to school). An absent day plays exactly as in round 1 (same miss, tag Absent).
 *   Round 3 "Stayed all day"  : a day he LEFT EARLY is a miss (gold tag Early leave); absent days miss again with the tag Absent.
 *   Order inside a round: days that went well first, then the round's own misses (late / early), then the absent misses LAST.
 * One kick per school day open (at most four) at the SAME corner order every round: day 1 bottom left, day 2 top left, day 3 top right, day 4 bottom right.
 *   GOOD day  : the ball flies on a curve into that corner, the goalkeeper throws himself the same way and is too late, the net bulges and shivers, sparkles.
 *   MISSED day: the ball hits the post (bottom corners) or the crossbar (top corners) next to that corner and bounces out (no goal); the post / bar shakes a
 *               little, the keeper dives all the same (beaten by the woodwork, not by the ball) and a gold tag stays near that corner for the rest of the round.
 *   More misses than kicks (odd data): the extra misses stack on a kick that is already missed: one tag with a count ("Late to school x2"); if no kick is left for them
 *   (every day absent) the number just ticks on its card.
 * Between rounds a clean reset (the ball pops away, keeper and kicker are back in their ready poses, heading and tags leave; no cross-dissolve). The last round stays.
 * Three counter cards at the bottom appear one per round and build as the kicks land: Days at school N of M, Late to school N, Early leave N, each ending on the exact
 * number in the data (absent misses in rounds 2 and 3 carry a tag but never add to the Late to school / Early leave numbers).
 * Pictures: the empty pitch (football-layers/bg.jpg, wide/football-bg.jpg) and WHOLE-figure poses cut from picture takes (keeper ready + four dives, kicker ready + strike (the foot is on the ball) + follow-through);
 * poses swap on the story clock, they are never cut into limbs. The ball and the net are code: a real 3D football (three.js, panel texture, spinning, with a soft
 * shadow on the grass) and the plate's own net picture bent by a small mesh (bulge on a goal, shiver of the post or bar on a miss).

 * Layer order: plate, net mesh, keeper, ball, kicker (the ball is farther from the camera than the kicker, so he is drawn over it; he stands where he never covers a flight).
 * Every frame is a pure function of t (kit rule 1); the pictures and three.js are approved exceptions to rule 7, like the sorter.
 * If WebGL is not available the picture, the poses, headings, tags and counters still play (no ball, no net bend).
 * MotionIgor.registry["p36-football"].cues(content) returns the moments that will later carry sounds: [{ t, name }] in beat-local seconds, names
 * round-start, kick (the foot meets the ball), goal (ball in the net), post (ball on the post or bar), tag-absent, tag-late, tag-early, round-clear.
 */
(function () {
// ---------------------------------------------------------------- the rounds: timing and the plan (pure data, no three.js: cues() uses it too)
var RD = 6, NR = 3, DUR = 18;                                         // seconds per round, rounds, length of the beat (the last round holds to the end)
// per kick (seconds after the ball pops on the spot, t0): the kicker steps in 0.12-0.26, the foot meets the ball at STRIKE, the ball is in the net / on the post FLY later
var TM = { HEAD0: 0.1, GO0: 0.60, STEP: 1.25, POP: 0.18, RUN0: 0.02, STRIKE: 0.38, PRE: 0.10, FOL: 0.30, BACK1: 99, FLY: 0.40, TAG: 0.12, TAGSTEP: 0.14, OUT0: RD - 0.38, OUTD: 0.36,
  KEEP_REACT: 0.18, KEEP_APEX: 0.50, KEEP_FALL1: 0.70, KEEP_RISE0: 0.84, KEEP_READY: 1.14 };      // keeper, seconds after the strike: dive, apex, on the grass, lying, rises (whole figure), ready
var ROUND_TAG = ["absent", "late", "early"];
var CORNER = ["bl", "tl", "tr", "br"];                                // kick i goes to corner i, every round
function makePlan(wk) {
  wk = wk || {};
  var D = Math.max(0, Math.round(wk.daysOpen || 0)), n = Math.min(4, D);
  var units = [Math.max(0, Math.round(wk.absent || 0)), Math.max(0, Math.round(wk.lateToSchool || 0)), Math.max(0, Math.round(wk.earlyLeave || 0))];
  var absKicks = Math.min(units[0], n);
  var plan = { D: D, n: n, units: units, rounds: [], target: [Math.max(0, D - units[0]), units[1], units[2]] };
  for (var r = 0; r < NR; r++) {
    // every kick is played in every round. Misses are the LAST kicks: this round's own misses (late / early) just before the absent misses, which come last.
    var own = r === 0 ? 0 : Math.min(units[r], n - absKicks), m = absKicks + own, firstMiss = n - m, kicks = [], i, q;
    for (i = 0; i < n; i++) {
      var tag = i < firstMiss ? null : (i >= n - absKicks ? "absent" : ROUND_TAG[r]);
      kicks.push({ i: i, k: i, corner: CORNER[i], state: tag ? "miss" : "good", tag: tag, u: 0, t0: 0, L: 0, land: 0, tagAt: [] });
    }
    for (q = 0; q < absKicks; q++) kicks[n - absKicks + q].u = 1;
    for (q = absKicks; q < units[0] && absKicks > 0; q++) kicks[n - 1 - ((q - absKicks) % absKicks)].u++;          // extra absences stack on a kick that is already absent
    if (r > 0) {
      for (q = 0; q < own; q++) kicks[firstMiss + q].u = 1;
      for (q = own; q < units[r] && own > 0; q++) kicks[n - absKicks - 1 - ((q - own) % own)].u++;                    // extra misses stack on a kick that is already missed
    }
    var ev = [];                                                      // counter events {t, dv}, round-local seconds
    kicks.forEach(function (p) {
      p.t0 = TM.GO0 + p.k * TM.STEP;                                  // the ball pops on the spot
      p.L = p.t0 + TM.STRIKE;                                         // the foot meets the ball
      p.land = p.L + TM.FLY;                                          // the ball arrives (net or post)
      if (p.state === "good" && r === 0) ev.push({ t: p.land, dv: 1, p: p });
      for (var j = 0; j < p.u; j++) {
        p.tagAt.push(p.land + TM.TAG + j * TM.TAGSTEP);
        if (r > 0 && p.tag === ROUND_TAG[r]) ev.push({ t: p.land + TM.TAG + j * TM.TAGSTEP, dv: 1, p: p });          // absent tags never move the Late / Early numbers
      }
    });
    // the counter ends on the exact number in the data: whatever the kicks could not show goes on the last event (or a fallback one)
    var sum = 0; ev.forEach(function (e) { sum += e.dv; });
    var want = plan.target[r];
    if (sum !== want) {
      if (ev.length) ev[ev.length - 1].dv += want - sum;
      else ev.push({ t: TM.GO0 + 0.6, dv: want, p: null });
    }
    var last = 0; kicks.forEach(function (p) { last = Math.max(last, p.land); });
    plan.rounds.push({ r: r, tag: ROUND_TAG[r], present: n - absKicks, miss: m, kicks: kicks, events: ev, endAt: Math.max(last, ev.length ? ev[ev.length - 1].t : 0) + 0.5, perfect: m === 0 && n > 0 });
  }
  return plan;
}
function makeCues(wk) {
  var plan = makePlan(wk), out = [];
  plan.rounds.forEach(function (R) {
    var base = R.r * RD;
    out.push({ t: +(base + 0.1).toFixed(3), name: "round-start" });
    R.kicks.forEach(function (p) {
      out.push({ t: +(base + p.L).toFixed(3), name: "kick" });
      out.push({ t: +(base + p.land).toFixed(3), name: p.state === "good" ? "goal" : "post" });
      if (p.state === "miss") p.tagAt.forEach(function (ta) { out.push({ t: +(base + ta).toFixed(3), name: "tag-" + p.tag }); });
    });
    if (R.events.length && R.r > 0 && R.events[0].p === null) out.push({ t: +(base + R.events[0].t).toFixed(3), name: "tag-" + R.tag });
    if (R.r < NR - 1) out.push({ t: +(base + TM.OUT0).toFixed(3), name: "round-clear" });
  });
  out.sort(function (a, b) { return a.t - b.t; });
  return out;
}

// ---------------------------------------------------------------- where the pictures sit (design px, 1080 x 1920): offsets, glove tips, feet. Written by src/tools/football.py layout.
/*LAYOUT*/
var LAY = {
  "keeper-dive-bl": {x: 314, y: 825, w: 605, h: 278, tip: [5, 201], feet: [151, 273, 24]},
  "keeper-dive-br": {x: 209, y: 790, w: 732, h: 316, tip: [727, 144], feet: [583, 310, 13]},
  "keeper-dive-tl": {x: 345, y: 507, w: 511, h: 406, tip: [5, 40], feet: [417, 400, 26]},
  "keeper-dive-tr": {x: 344, y: 578, w: 492, h: 284, tip: [486, 57], feet: [129, 279, 121]},
  "keeper-ready": {x: 395, y: 565, w: 299, h: 325, feet: [139, 319, 233]},
  "kicker-follow": {x: 380, y: 515, w: 691, h: 815, feet: [257, 809, 60]},
  "kicker-ready": {x: 12, y: 511, w: 513, h: 1048, feet: [235, 1042, 52]},
  "kicker-strike": {x: -10, y: 524, w: 720, h: 854, feet: [381, 862, 77]}
};
/*END LAYOUT*/
// How the whole-figure poses are placed (all design px).
//  keeper: every dive picture is scaled so his head is as big as in the ready crouch (DIVE.s), starts with its head where the ready head is and glides to its final place, where the
//  furthest glove pixel (LAY tip) is on tipAt: about 90 px (a ball and a half) inside the point where the ball arrives. He is still in the air when the ball is in the net, then drops to the grass.
var READY_HEAD = [543, 603];                                          // head centre of the crouching keeper (his picture sits at LAY["keeper-ready"])
var DIVE = {                                                          // head: head centre inside the picture, s: scale, tipAt: where the glove tip ends up
  bl: { head: [165, 46], s: 0.58, tipAt: [318, 790], lift: 46 }, tl: { head: [153, 75], s: 0.80, tipAt: [318, 504], lift: 0 },
  tr: { head: [347, 35], s: 0.87, tipAt: [762, 504], lift: 0 }, br: { head: [467, 83], s: 0.62, tipAt: [762, 790], lift: 46 }
};
var GROUND_Y = 888;                                                   // a fallen keeper's lowest pixel (the grass in front of the goal line, 875)
//  kicker: ready = the approved pose, a bit smaller and lower left (KICK_S about the planted foot KICK_PIV); he steps in towards the ball (STEP_IN), the strike picture stands where its take put it
//  (the ball in that picture IS the ball on the spot), the follow-through picture whooshes to FOLLOW_AT (low, far left: no flight ever passes behind him), then he is back to ready.
var KICK_S = 0.70, TAKE_S = 0.806;                                    // the strike picture comes from a larger take: scaled to the ready kicker's size (the ball in it shrinks with it)
//  ONE ANCHOR for every kicker picture: the planted (standing) foot on the grass (ANCH: its contact point in each served picture, pixels). The ready kicker eases from R0 to the
//  anchor point A during the run-up, the strike picture stands with its planted foot exactly on A, and after the kick the ready picture (planted foot on A) eases back to R0:
//  a swap of pictures never moves that foot, and nothing hops. The follow-through picture shares the anchor too.
var ANCH = { ready: [209, 655], strike: [307, 681], follow: [212, 652] };
var R0 = [282, 1446], ANCH_A = [373, 1399];                       // A: where the planted foot stands when the foot meets the ball (the ball of the strike picture sits exactly on the penalty spot)
var SPOT = [588, 1294];                                               // the ball on the penalty spot (the ball of the strike picture)

// ---------------------------------------------------------------- the camera, fitted to the picture (design px): pinhole 0.85 m high, horizon at row 600
// ground: the spot is 2.58 m away, the goal line 7.0 m, the back of the net 8.33 m. The ball is 0.061 m in radius (RS px on the spot, so it rests ON the grass of the spot) and shrinks with distance^0.5
// (slower than true perspective, so that at the goal line it is about as big as the keeper's head, as in the approved still).
var CAMF = 2273, YH = 600, PX = 540, HC = 0.85, BR = 0.0614, ZS = 2.583, RS = 54;
var XS = (SPOT[0] - PX) * ZS / CAMF;
function proj(X, Y, Z) { return [PX + CAMF * X / Z, YH + CAMF * (HC - Y) / Z, RS * Math.pow(ZS / Z, 0.5)]; }   // design x, y, ball radius px
var TARGET = {                                                        // where the ball arrives: [X, Y, Z] in the net, and on the woodwork (+ its rebound speed)
  bl: { goal: [-1.15, 0.30, 8.33], wood: [-1.54, 0.75, 7.0], wk: "post", rv: [-0.7, 2.0, -2.4] },
  tl: { goal: [-1.15, 1.20, 8.33], wood: [-1.00, 1.52, 7.0], wk: "bar", rv: [-0.7, 0.4, -2.6] },
  tr: { goal: [1.15, 1.20, 8.33], wood: [1.00, 1.52, 7.0], wk: "bar", rv: [0.7, 0.4, -2.6] },
  br: { goal: [1.15, 0.30, 8.33], wood: [1.54, 0.75, 7.0], wk: "post", rv: [0.7, 2.0, -2.4] }
};
var G = 9.8, REST = 0.52;

MotionIgor.define({
  id: "p36-football",
  duration: DUR,
  size: [1080, 1920],
  kind: "scene",
  title: "Grade 3-6 boys report · last week at school (football)",
  style: "3D living storybook",
  engine: "webgl",
  theme: "ais",
  cues: function (content) { return makeCues(MotionIgor.util.deepMerge(MotionIgor.registry["p36-football"].defaults, content || {}).lastWeek); },
  defaults: {
    art: "football-layers/",
    subtitle: "Last week at school",
    rounds: [{ head: [["Came", "to", "school"]] }, { head: [["On", "time"]] }, { head: [["Stayed", "all", "day"]] }],
    counter: "Days at school",
    of: "of",
    lateLabel: "Late to school",
    earlyLabel: "Early leave",
    tags: { absent: "Absent", late: "Late to school", early: "Early leave" },
    lastWeek: { daysOpen: 4, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    badge: "Weekly report",
    episode: "Week 7",
    look: "",
    chrome: true                       // false: the story draws the badge, week above its transitions
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
    function lerp(a, b, k) { return a + (b - a) * k; }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }
    var PL = makePlan(c.lastWeek), daysTotal = PL.D, n = PL.n;
    function roundOf(t) { return clamp(Math.floor(t / RD), 0, NR - 1); }
    function countersAt(t) {
      var v = [0, 0, 0], last = [-9, -9, -9];
      PL.rounds.forEach(function (rd) {
        rd.events.forEach(function (e) { var at = rd.r * RD + e.t; if (t >= at) { v[rd.r] += e.dv; last[rd.r] = Math.max(last[rd.r], at); } });
      });
      return { v: v, last: last };
    }
    // the kick that is on stage at round time lt: the last one whose ball has popped (null before the first one)
    function activeKick(rd, lt) {
      var a = null;
      rd.kicks.forEach(function (p) { if (lt >= p.t0) a = p; });
      return a;
    }
    function endOf(rd, p) {                                           // when this kick leaves the stage: the next kick starts, or the round clears
      var nx = rd.kicks[p.i + 1];
      return nx ? nx.t0 : (rd.r < NR - 1 ? TM.OUT0 : 99);
    }

    // ---------------------------------------------------------------- the picture and the whole-figure poses
    ctx.stage.style.background = "#7fb14a";
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;filter:saturate(1.08)");
    var bg = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none", world);
    bg.src = WD.src(c.art, "football-bg.jpg", "bg.jpg"); bg.alt = ""; bg.draggable = false;
    bg.style.zIndex = 1;

    var NETY0 = 340, NETH = 560, CAP_PX = 16000000;
    function sizeCanvas(cv, wDesign, hDesign, maxPr) {
      var dpr = window.devicePixelRatio || 1, r = st.getBoundingClientRect(), sc = r.width > 0 ? r.width / 1080 : 1;
      var pr = clamp(dpr * sc, 1, maxPr);
      pr = Math.min(pr, Math.sqrt(CAP_PX / (wDesign * hDesign)));
      return [Math.round(wDesign * pr), Math.round(hDesign * pr)];
    }
    function fitGL(g) {                                               // size the drawing buffer through the renderer (setSize), only when the wanted size changed
      var d = sizeCanvas(g.cv, g.wd, g.h, g.maxPr);
      if (d[0] !== g.w || d[1] !== g.hh) { g.rd.setSize(d[0], d[1], false); g.w = d[0]; g.hh = d[1]; }
    }
    function makeGL(top, h, maxPr, left, wd) {                        // left / wd: the canvas box in column design px (default: the 1080 px column; the ball canvas spans the whole stage on a wide screen)
      if (!T3) return null;
      left = left || 0; wd = wd || 1080;
      try {
        var cv = document.createElement("canvas");
        cv.style.cssText = "position:absolute;left:" + left + "px;top:" + top + "px;width:" + wd + "px;height:" + h + "px;pointer-events:none";
        var gx = null, gopt = { premultipliedAlpha: true, antialias: true, preserveDrawingBuffer: true, alpha: true };
        try { gx = cv.getContext("webgl2", gopt); } catch (e0) { gx = null; }
        if (!gx) { try { gx = cv.getContext("webgl", gopt); } catch (e1) { gx = null; } }
        if (!gx) return null;
        var rd = new T3.WebGLRenderer({ canvas: cv, context: gx, alpha: true, antialias: true, premultipliedAlpha: true, preserveDrawingBuffer: true });
        rd.setClearColor(0x000000, 0);
        var g = { cv: cv, rd: rd, h: h, top: top, maxPr: maxPr, w: 0, hh: 0, left: left, wd: wd };
        fitGL(g);
        return g;
      } catch (e) { return null; }
    }
    function poseImg(name, z) {
      var L = LAY[name], im = el("img", "position:absolute;left:" + L.x + "px;top:" + L.y + "px;width:" + L.w + "px;height:" + L.h + "px;max-width:none;display:none;will-change:transform;transform-origin:0 0", world);
      im.src = c.art + name + ".webp"; im.alt = ""; im.draggable = false; im.style.zIndex = z;
      return im;
    }
    var SHADOW_URL = (function () {                                   // the soft ground shadow is drawn ONCE on a canvas (a CSS gradient is dithered differently from frame to frame)
      try {
        var cvs = document.createElement("canvas"); cvs.width = 128; cvs.height = 32; var g2 = cvs.getContext("2d");
        g2.translate(64, 16); g2.scale(1, 0.25); var gr = g2.createRadialGradient(0, 0, 0, 0, 0, 64);
        gr.addColorStop(0, "rgba(12,38,10,0.55)"); gr.addColorStop(0.45, "rgba(12,38,10,0.32)"); gr.addColorStop(0.72, "rgba(12,38,10,0)");
        g2.fillStyle = gr; g2.fillRect(-64, -64, 128, 128); return cvs.toDataURL("image/png");
      } catch (e) { return ""; }
    })();
    function softShadow(z) {                                          // a soft dark ellipse on the grass under a figure
      var im = el("img", "position:absolute;left:0;top:0;width:100px;height:25px;max-width:none;display:none;will-change:transform;z-index:" + z, world); im.src = SHADOW_URL; im.alt = ""; return im;
    }
    var netGL = makeGL(NETY0, NETH, 2), netCv = netGL && netGL.cv;
    if (netCv) { netCv.style.display = "none"; world.appendChild(netCv); netCv.style.zIndex = 2; }
    var shKeeper = softShadow(2), shKicker = softShadow(2);
    var keeperReady = poseImg("keeper-ready", 3);
    var keeperDive = {}; CORNER.forEach(function (k) { keeperDive[k] = poseImg("keeper-dive-" + k, 3); });
    var BALLY0 = 300, BALLH = 1300;
    // round 2 fix: on a wide stage the ball canvas covers the whole visible stage (the column sits WD.ox in from its left edge), so a rebound off the post or bar flies out past the 1080 px column instead of being cut by a vertical line
    var ballGL = WD.wide ? makeGL(BALLY0, BALLH, 2.4, -WD.ox, WD.sw) : makeGL(BALLY0, BALLH, 2.4);
    if (ballGL) { world.appendChild(ballGL.cv); ballGL.cv.style.zIndex = 4; }
    var kickerReady = poseImg("kicker-ready", 5), kickerStrike = poseImg("kicker-strike", 5), kickerFollow = poseImg("kicker-follow", 5);
    // sparkles / clangs above everything of the scene
    var puff = el("div", "position:absolute;left:0;top:0;width:0;height:0;z-index:6", world), puffDots = [];
    for (var pdi = 0; pdi < 10; pdi++) puffDots.push(el("div", "position:absolute;left:-9px;top:-9px;width:18px;height:18px;border-radius:50%", puff));
    var ring = el("div", "position:absolute;left:-40px;top:-40px;width:80px;height:80px;border-radius:50%;border:8px solid #fff6dc;box-sizing:border-box;opacity:0", puff);

    // ---------------------------------------------------------------- the real football: a truncated icosahedron (12 black pentagons, 20 white hexagons)
    var okBall = false, ballM = null, shM = null, scB = null, camB = null, qSpin = null, spinAxis = null;
    if (ballGL) {
      try {
        scB = new T3.Scene();
        camB = new T3.OrthographicCamera(ballGL.left, ballGL.left + ballGL.wd, BALLH, 0, -3000, 3000); camB.position.z = 1000;
        scB.add(new T3.HemisphereLight(0xfff3df, 0x9ab86a, 0.95));
        var sunB = new T3.DirectionalLight(0xfff0d8, 1.9); sunB.position.set(1.0, 1.1, 1.5); scB.add(sunB);
        // the 12 pentagon centres are the vertices of an icosahedron, the 20 hexagon centres the centres of its 20 faces; every texel of the equirectangular texture belongs to the
        // nearest of the 32 centres (these are the faces of a truncated icosahedron), pentagons black, hexagons white, thin grey seams where two faces nearly meet.
        var TW = 1024, TH = 512, cvT = document.createElement("canvas"); cvT.width = TW; cvT.height = TH;
        var gT = cvT.getContext("2d"), imT = gT.createImageData(TW, TH), dT = imT.data, phi = (1 + Math.sqrt(5)) / 2, cen = [], pe = [], q0, q1, q2;
        function nrm(v) { var l = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]); return [v[0] / l, v[1] / l, v[2] / l]; }
        var ico = [];
        [[0, 1, phi], [0, -1, phi], [0, 1, -phi], [0, -1, -phi], [1, phi, 0], [-1, phi, 0], [1, -phi, 0], [-1, -phi, 0], [phi, 0, 1], [-phi, 0, 1], [phi, 0, -1], [-phi, 0, -1]].forEach(function (v) { ico.push(nrm(v)); });
        ico.forEach(function (v) { cen.push(v); pe.push(1); });
        function dist3(a, b) { return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]) + (a[2] - b[2]) * (a[2] - b[2])); }
        var edge = 1e9; for (q0 = 1; q0 < 12; q0++) edge = Math.min(edge, dist3(ico[0], ico[q0]));
        for (q0 = 0; q0 < 12; q0++) for (q1 = q0 + 1; q1 < 12; q1++) for (q2 = q1 + 1; q2 < 12; q2++) {
          if (Math.abs(dist3(ico[q0], ico[q1]) - edge) < 1e-3 && Math.abs(dist3(ico[q1], ico[q2]) - edge) < 1e-3 && Math.abs(dist3(ico[q0], ico[q2]) - edge) < 1e-3) {
            cen.push(nrm([ico[q0][0] + ico[q1][0] + ico[q2][0], ico[q0][1] + ico[q1][1] + ico[q2][1], ico[q0][2] + ico[q1][2] + ico[q2][2]])); pe.push(0);
          }
        }
        for (var ty = 0; ty < TH; ty++) {
          var la = (0.5 - (ty + 0.5) / TH) * Math.PI, cl = Math.cos(la), sl = Math.sin(la);
          for (var tx = 0; tx < TW; tx++) {
            var lo = ((tx + 0.5) / TW) * 2 * Math.PI, px = cl * Math.cos(lo), py = sl, pz = cl * Math.sin(lo);
            var d1 = -9, d2 = -9, b1 = 0;
            for (q0 = 0; q0 < cen.length; q0++) {
              var dd = px * cen[q0][0] + py * cen[q0][1] + pz * cen[q0][2] - (pe[q0] ? 0.035 : 0);           // the pentagons are a little smaller than the plain nearest-centre cells
              if (dd > d1) { d2 = d1; d1 = dd; b1 = q0; } else if (dd > d2) d2 = dd;
            }
            var seam = clamp((d1 - d2) / 0.03, 0, 1), base = pe[b1] ? 22 : 247, v = base + (166 - base) * (1 - smooth(seam)) * 0.85;
            var o = (ty * TW + tx) * 4; dT[o] = dT[o + 1] = dT[o + 2] = clamp(v, 0, 255); dT[o + 3] = 255;
          }
        }
        gT.putImageData(imT, 0, 0);
        var texB = new T3.CanvasTexture(cvT); texB.colorSpace = T3.SRGBColorSpace; texB.anisotropy = 4;
        ballM = new T3.Mesh(new T3.SphereGeometry(1, 48, 32), new T3.MeshStandardMaterial({ map: texB, roughness: 0.4, metalness: 0 }));
        scB.add(ballM);
        // soft shadow disc on the grass
        var cvS = document.createElement("canvas"); cvS.width = cvS.height = 128; var gS = cvS.getContext("2d");
        var gr = gS.createRadialGradient(64, 64, 4, 64, 64, 62); gr.addColorStop(0, "rgba(10,34,10,0.9)"); gr.addColorStop(0.55, "rgba(10,34,10,0.5)"); gr.addColorStop(1, "rgba(10,34,10,0)");
        gS.fillStyle = gr; gS.fillRect(0, 0, 128, 128);
        shM = new T3.Mesh(new T3.PlaneGeometry(1, 1), new T3.MeshBasicMaterial({ map: new T3.CanvasTexture(cvS), transparent: true, depthWrite: false }));
        shM.position.z = -50; scB.add(shM);
        qSpin = new T3.Quaternion(); spinAxis = new T3.Vector3(0.35, 0.9, 0.25).normalize();
        okBall = true;
      } catch (eB) { okBall = false; try { console.warn("p36-football: ball scene not available (" + eB.message + ")"); } catch (e2) { } }
    }
    // ---------------------------------------------------------------- the net: a CROP of the plate's own picture on a mesh that bends
    // (round 2, 25 Oct 2026) The old mesh used the plate <img> itself as the texture. three.js sizes the GPU texture from image.width / image.height, which for a displayed <img> are
    // its CSS size (3414 x 1920 on a laptop) and not its pixels (2560 x 1440 after webify), so the picture landed in a corner of a bigger texture and the rest stayed BLACK;
    // on a phone the whole net canvas came out black. Now the texture is a canvas holding exactly the plate under the net (the 1080 x NETH design box, cut at the picture's own
    // pixel size), so the mesh uv is simply 0..1 whatever the plate's size, wide or portrait. And the canvas is only visible where the mesh has actually moved: every vertex
    // carries an alpha that is 0 where it stands still, so outside the bulge the plate underneath is untouched (pixel-identical), never a second copy of it.
    var okNet = false, netMesh = null, netPos = null, netBase = null, netCol = null, scN = null, camN = null, NX = 54, NY = 28, texN = null, geoN = null;
    if (netGL) {
      try {
        scN = new T3.Scene();
        camN = new T3.OrthographicCamera(0, 1080, NETH, 0, -10, 10); camN.position.z = 5;
        geoN = new T3.PlaneGeometry(1080, NETH, NX, NY); var pa = geoN.attributes.position, ua = geoN.attributes.uv;
        netBase = new Float32Array(pa.count * 2); netCol = new Float32Array(pa.count * 4);
        for (var vi = 0; vi < pa.count; vi++) {
          var bx = pa.getX(vi) + 540, by = NETH / 2 - pa.getY(vi);
          netBase[vi * 2] = bx; netBase[vi * 2 + 1] = by;
          ua.setXY(vi, bx / 1080, 1 - by / NETH);
          pa.setXYZ(vi, bx, NETH - by, 0);
          netCol[vi * 4] = netCol[vi * 4 + 1] = netCol[vi * 4 + 2] = 1; netCol[vi * 4 + 3] = 0;
        }
        geoN.setAttribute("color", new T3.BufferAttribute(netCol, 4));
        netPos = pa; okNet = true;
      } catch (eN) { okNet = false; try { console.warn("p36-football: net mesh not available (" + eN.message + ")"); } catch (e3) { } }
    }
    function netTexture() {                                           // the crop of the plate under the net, once the plate picture has really loaded; null until then (the net stays hidden, never black)
      if (texN) return texN;
      if (!(bg.complete && bg.naturalWidth > 0 && bg.naturalHeight > 0)) return null;
      try {
        var sx = bg.naturalWidth / (WD.wide ? 3414 : 1080), sy = bg.naturalHeight / 1920;
        var cw = Math.max(2, Math.round(1080 * sx)), ch = Math.max(2, Math.round(NETH * sy)), cv2 = document.createElement("canvas"); cv2.width = cw; cv2.height = ch;
        var g2 = cv2.getContext("2d", { willReadFrequently: true }); g2.drawImage(bg, WD.wideLeft * sx, NETY0 * sy, cw, ch, 0, 0, cw, ch);
        // the crop must really hold the picture (a picture that is "complete" but not decoded yet can draw nothing): ONE read of the whole crop, spot-check 25 pixels, try again next frame if any is empty
        var px = g2.getImageData(0, 0, cw, ch).data;
        for (var gy = 0; gy < 5; gy++) for (var gx = 0; gx < 5; gx++) { if (px[(Math.floor((gy + 0.5) * ch / 5) * cw + Math.floor((gx + 0.5) * cw / 5)) * 4 + 3] < 250) return null; }
        var tx = new T3.CanvasTexture(cv2); tx.colorSpace = T3.SRGBColorSpace; tx.generateMipmaps = false; tx.minFilter = T3.LinearFilter; tx.magFilter = T3.LinearFilter;
        tx.wrapS = tx.wrapT = T3.ClampToEdgeWrapping; tx.needsUpdate = true;
        netMesh = new T3.Mesh(geoN, new T3.MeshBasicMaterial({ map: tx, vertexColors: true, transparent: true, depthTest: false, depthWrite: false })); scN.add(netMesh);
        texN = tx; return tx;
      } catch (eT) { okNet = false; try { console.warn("p36-football: net texture not available (" + eT.message + ")"); } catch (e4) { } return null; }
    }

    // ---------------------------------------------------------------- the ball in flight (pure functions of the kick and the time since the foot met the ball)
    var VP = [PX, YH];                                                // the vanishing point on the picture (design px)
    function kickWorld(p, tau) {                                      // tau seconds after the foot met the ball -> {X,Y,Z, mode}
      var T = TARGET[p.corner], tg = p.state === "good" ? T.goal : T.wood, s = clamp(tau / TM.FLY, 0, 1);
      if (tau <= TM.FLY) {
        var arc = (T.goal[1] < 1 ? 0.30 : 0.10) * 4 * s * (1 - s), bend = 0.2 * (T.goal[0] < 0 ? -1 : 1) * Math.sin(Math.PI * s) * (1 - s);
        return { X: XS + (tg[0] - XS) * s + bend, Y: BR + (tg[1] - BR) * s + arc, Z: ZS + (tg[2] - ZS) * s, mode: "fly" };
      }
      var u = tau - TM.FLY;
      if (p.state === "good") {                                       // the ball settles into the pocket a little further back, then hangs
        var sink = 1 - Math.exp(-9 * u);
        return { X: tg[0], Y: tg[1] - 0.04 * sink, Z: tg[2] + 0.18 * sink, mode: "net" };
      }
      // woodwork: a rebound, simulated in small fixed steps (deterministic); bounces on the grass
      var X = tg[0], Y = tg[1], Z = tg[2], vx = T.rv[0], vy = T.rv[1], vz = T.rv[2], dt = 1 / 120, tt = 0;
      while (tt < u) {
        var h = Math.min(dt, u - tt); vy -= G * h; X += vx * h; Y += vy * h; Z += vz * h; tt += h;
        if (Y < BR) { Y = BR; vy = -vy * REST; vx *= 0.85; vz *= 0.85; if (Math.abs(vy) < 0.4) vy = 0; }
      }
      return { X: X, Y: Y, Z: Z, mode: "out" };
    }
    function ballAt(rd, p, lt) {                                      // -> {x, y, r (design px), s (pop scale), spin, sh:{x,y,w,h,a}} or null
      var u = lt - p.t0; if (u < 0) return null;
      var endT = endOf(rd, p), s = outBack(seg(u, 0, TM.POP));
      var outK = 1 - smooth(seg(lt, endT - 0.14, endT));              // the old ball pops away just before the next one comes
      if (rd.r < NR - 1) outK = Math.min(outK, 1 - smooth(seg(lt, TM.OUT0, TM.OUT0 + 0.25)));
      if (p.state === "miss") outK = Math.min(outK, 1 - smooth(seg(u, TM.STRIKE + TM.FLY + 0.55, TM.STRIKE + TM.FLY + 0.75)));   // a rebound ball is gone after about half a second
      s *= outK; if (s <= 0.002) return null;
      var tau = u - TM.STRIKE, X, Y, Z, spin;
      if (u >= TM.STRIKE - TM.PRE && tau < 0) return null;            // the strike picture carries the ball itself for these few frames (its ball is on the spot)
      if (tau <= 0) { X = XS; Y = BR; Z = ZS; spin = 0.15 * Math.sin(u * 5); }
      else { var w = kickWorld(p, tau); X = w.X; Y = w.Y; Z = w.Z; spin = tau * 15; }
      var pr = proj(X, Y, Z), hgt = Math.max(0, Y - BR), ps = proj(X - 0.45 * hgt, 0, Z + 0.1 * hgt);
      var sw = pr[2] * 2.2 * (1 - 0.25 * Math.min(1, hgt / 2));
      // the shadow touches the ball when it rests on the grass: its centre sits on the contact point
      return { x: pr[0], y: pr[1], r: pr[2] * s, s: s, spin: spin, sh: { x: ps[0], y: ps[1] + 2, w: sw * s, h: sw * 0.30 * s, a: 0.9 * (1 - 0.6 * Math.min(1, hgt / 2.0)) } };
    }

    // ---------------------------------------------------------------- the net's bend (displacement of the mesh), pure function of the round time
    function netEffects(rd, lt) {
      var ef = [];
      rd.kicks.forEach(function (p) {
        var tt = lt - p.land; if (tt < 0) return;
        var T = TARGET[p.corner], tg = p.state === "good" ? T.goal : T.wood, a = proj(tg[0], tg[1], tg[2]);
        var gone = seg(lt, endOf(rd, p), endOf(rd, p) + 0.35); if (gone >= 1) return;
        if (p.state === "good") {
          var amp = (0.55 + 0.45 * Math.exp(-4.2 * tt) * Math.cos(2 * Math.PI * 3.3 * tt)) * smooth(seg(tt, 0, 0.07)) * (1 - smooth(gone));
          ef.push({ kind: "bulge", x: a[0], y: a[1], a: amp });
        } else {
          var sh = Math.exp(-6.5 * tt) * Math.sin(2 * Math.PI * 14 * tt) * (1 - smooth(gone));
          if (Math.abs(sh) > 0.002) ef.push({ kind: T.wk, x: a[0], y: a[1], a: sh });
        }
      });
      return ef;
    }
    function netMask(x, y) {                                          // 1 inside the net, 0 on the posts, the crossbar, the grass: the frame never bends on a goal
      return smooth(seg(x, 150, 200)) * smooth(seg(1080 - x, 150, 200)) * smooth(seg(y, 408, 450)) * smooth(seg(860 - y, 0, 30));
    }
    function drawNet(rd, lt) {
      if (!okNet) return;
      var ef = netEffects(rd, lt), act = ef.length > 0;
      if (act && !netTexture()) act = false;
      if (!okNet) return;
      netCv.style.display = act ? "block" : "none";
      if (!act) return;
      var vi, N = netPos.count, i, x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      for (vi = 0; vi < N; vi++) {
        var bx = netBase[vi * 2], by = netBase[vi * 2 + 1], X = bx, Y = by + NETY0;
        for (i = 0; i < ef.length; i++) {
          var e = ef[i], dx = bx - e.x, dy = by + NETY0 - e.y;
          if (e.kind === "bulge") {
            var w = Math.exp(-(dx * dx + dy * dy) / (150 * 150)) * netMask(bx, by + NETY0);
            if (w < 0.004) continue;
            var vx = VP[0] - e.x, vy = VP[1] - e.y, vl = Math.sqrt(vx * vx + vy * vy) || 1;
            X += (-dx * 0.5 + vx / vl * 36) * e.a * w; Y += (-dy * 0.5 + vy / vl * 36) * e.a * w;
          } else if (e.kind === "post") {                              // a vertical post shivers sideways
            var wx = Math.exp(-(dx * dx) / (46 * 46)), wy = Math.exp(-(dy * dy) / (150 * 150));
            X += 7 * e.a * wx * wy;
          } else {                                                     // the crossbar shivers up and down
            var wy2 = Math.exp(-(dy * dy) / (40 * 40)), wx2 = Math.exp(-(dx * dx) / (200 * 200));
            Y += 6 * e.a * wy2 * wx2;
          }
        }
        netPos.setXYZ(vi, X, NETH - (Y - NETY0), 0);
        // alpha: 0 where the vertex stands still (the plate shows through untouched), 1 once it has moved a couple of pixels
        var mv = Math.sqrt((X - bx) * (X - bx) + (Y - NETY0 - by) * (Y - NETY0 - by)), al = mv < 0.05 ? 0 : smooth(clamp(mv / 2.5, 0, 1));
        netCol[vi * 4 + 3] = al;
        if (al > 0) { if (bx < x0) x0 = bx; if (bx > x1) x1 = bx; if (by + NETY0 < y0) y0 = by + NETY0; if (by + NETY0 > y1) y1 = by + NETY0; }
      }
      netPos.needsUpdate = true; geoN.attributes.color.needsUpdate = true;
      // the box the net layer may change (design px of the column); the verify check reads it to know where the bulge is
      netCv.setAttribute("data-net-box", x1 < x0 ? "" : [Math.floor(x0 - 40), Math.floor(y0 - 40), Math.ceil(x1 + 40), Math.ceil(y1 + 40)].join(","));
      fitGL(netGL);
      netGL.rd.render(scN, camN);
    }
    function drawBall(b) {
      if (!okBall) return;
      fitGL(ballGL);
      if (!b) { ballM.visible = false; shM.visible = false; }
      else {
        ballM.visible = true; ballM.position.set(b.x, BALLH - (b.y - BALLY0), 0); ballM.scale.setScalar(Math.max(0.0001, b.r));
        qSpin.setFromAxisAngle(spinAxis, b.spin); ballM.quaternion.copy(qSpin);
        shM.visible = b.sh.a > 0.01; shM.position.set(b.sh.x, BALLH - (b.sh.y - BALLY0), -50); shM.scale.set(Math.max(0.01, b.sh.w), Math.max(0.01, b.sh.h), 1);
        shM.material.opacity = clamp(b.sh.a, 0, 1);
      }
      ballGL.rd.render(scB, camB);
    }

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

    // three counter cards at the bottom, one appears per round: Days at school N of M | Late to school N | Early leave N
    var CW = 306, CG = 22, CL = (1080 - (3 * CW + 2 * CG)) / 2, CTOP = 1592;
    function card(i, label) {
      var e = el("div", "position:absolute;left:" + (CL + i * (CW + CG)) + "px;top:" + CTOP + "px;width:" + CW + "px;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:12px;" +
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

    // gold tags for missed days, each beside ITS OWN corner (never red): top corners just under the crossbar, bottom corners lower down the same side, next to the post
    var ICON = {
      absent: '<path d="M6 6 L22 22 M22 6 L6 22" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>',
      late: '<circle cx="14" cy="14" r="10" fill="none" stroke="#fff" stroke-width="3.5"/><path d="M14 8 V14 L18 17" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>',
      early: '<path d="M7 4 H19 V24 H7 Z" fill="none" stroke="#fff" stroke-width="3.2"/><path d="M13 14 H25 M21 10 L25 14 L21 18" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round"/>'
    };
    var TAGF = 30, TAGH = 68, TAGLIST = [];
    function tagW(label) { return TAGF * String(label).length * 0.56 + 100; }
    var TAGY = { tl: 484, tr: 484, bl: 790, br: 790 }, TAGX = { tl: 178, tr: 178, bl: 56, br: 56 };       // the top tags stand inside the rebound's way out (the ball leaves up and sideways over the bar)
    PL.rounds.forEach(function (rd) {
      rd.kicks.forEach(function (p) {
        if (p.state !== "miss") return;
        var T = TARGET[p.corner], a = proj(T.wood[0], T.wood[1], T.wood[2]), label = c.tags[p.tag] + (p.u > 1 ? " ×" + p.u : ""), w = tagW(label);
        var left = p.corner === "tl" || p.corner === "bl", cx = left ? TAGX[p.corner] + w / 2 : 1080 - TAGX[p.corner] - w / 2, cy = TAGY[p.corner];
        var box = el("div", "position:absolute;left:" + cx.toFixed(1) + "px;top:" + cy + "px;width:0;height:0;transform-origin:0 0", data);
        var dx = a[0] - cx, dy = a[1] - cy, down = dy > 0, y0 = (down ? 1 : -1) * (TAGH / 2 - 8), tx = clamp(dx, -w / 2 + 44, w / 2 - 44);
        if (Math.abs(dy) > TAGH / 2 + 6 || Math.abs(dx) > w / 2 + 6) {
          var sv = el("div", "position:absolute;left:0;top:0;width:0;height:0", box);
          sv.innerHTML = '<svg width="1" height="1" style="position:absolute;left:0;top:0;overflow:visible"><path d="M' + (tx - 15).toFixed(1) + " " + y0 + " L" + dx.toFixed(1) + " " + (dy + (down ? -8 : 8)).toFixed(1) +
            " L" + (tx + 15).toFixed(1) + " " + y0 + ' Z" fill="' + GOLD + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/></svg>';
        }
        var tg = el("div", "position:absolute;left:" + (-Math.round(w / 2)) + "px;top:-34px;width:" + (Math.round(w / 2) * 2) + "px;height:68px;box-sizing:border-box;display:flex;align-items:center;gap:10px;white-space:nowrap;padding:0 20px 0 12px;border-radius:999px;" +
          "background:" + GOLD + ";border:5px solid " + INK + ";box-shadow:5px 5px 0 " + INK + ";font:700 " + TAGF + "px/1 " + FONT + ";color:" + INK + ";transform-origin:50% 50%", box);
        tg.innerHTML = '<span style="display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:' + GOLDD + ';border:3px solid ' + INK +
          '"><svg width="26" height="26" viewBox="0 0 28 28">' + ICON[p.tag] + "</svg></span>" + esc(label);
        TAGLIST.push({ el: box, tg: tg, at: p.tagAt[0], r: rd.r, i: TAGLIST.length });
      });
    });

    // ---------------------------------------------------------------- poses (pure functions of the time since the ball popped)
    function popNum(el2, since, t) { return 1 + 0.2 * Math.sin(seg(t, since, since + 0.32) * Math.PI); }
    function show(im, on) { im.style.display = on ? "block" : "none"; }
    function putImg(im, name, left, top, s) {                          // a picture at page position (left, top), at scale s: its size is set (no transform scale, so a frame never depends on how the picture was rastered before)
      var L = LAY[name];
      im.style.left = "0px"; im.style.top = "0px"; im.style.width = Math.round(L.w * s) + "px"; im.style.height = Math.round(L.h * s) + "px"; im.style.transform = "translate(" + Math.round(left) + "px," + Math.round(top) + "px)";
    }
    function moveImg(im, name, dx, dy, s, px, py) {                    // scale about the page point (px, py), then move by (dx, dy)
      var L = LAY[name];
      putImg(im, name, px + (L.x - px) * s + dx, py + (L.y - py) * s + dy, s);
    }
    function putShadow(sh, cx, cy, w, a) {
      if (a <= 0.01) { sh.style.display = "none"; return; }
      sh.style.display = "block";
      var ww = Math.round(w), hh = Math.round(w * 0.25);
      sh.style.width = ww + "px"; sh.style.height = hh + "px"; sh.style.left = Math.round(cx - ww / 2) + "px"; sh.style.top = Math.round(cy - hh / 2) + "px"; sh.style.margin = "0"; sh.style.opacity = a.toFixed(2);
    }
    // the kicker: which picture and where his planted foot is (pure function of the time since the ball popped)
    function kickerPose(u) {
      var st0 = TM.STRIKE, e;
      if (u < TM.RUN0) return { pic: "ready", ax: R0[0], ay: R0[1], s: KICK_S };
      if (u < st0 - TM.PRE) { e = smooth(seg(u, TM.RUN0, st0 - TM.PRE)); return { pic: "ready", ax: lerp(R0[0], ANCH_A[0], e), ay: lerp(R0[1], ANCH_A[1], e), s: KICK_S }; }
      if (u < st0) return { pic: "strike", ax: ANCH_A[0], ay: ANCH_A[1], s: TAKE_S };
      if (u < st0 + TM.FOL) return { pic: "follow", ax: ANCH_A[0], ay: ANCH_A[1], s: TAKE_S };
      return { pic: "ready", ax: R0[0], ay: R0[1], s: KICK_S, home: true };           // after the follow-through he is back in his ready pose at home (a swap, not a slide: no moonwalk)
    }
    // the keeper: ready, or a dive picture at its place (head-matched scale): dive, the grass, lying, then a whole-figure rise to the crouch and a swap to ready
    function keeperPose(ak, u, t) {
      var uk = u - TM.STRIKE;
      if (!ak || uk < TM.KEEP_REACT || uk >= TM.KEEP_READY) return null;
      var D = DIVE[ak.corner], L = LAY["keeper-dive-" + ak.corner], g = smooth(seg(uk, TM.KEEP_REACT, TM.KEEP_APEX)), f = seg(uk, TM.KEEP_APEX, TM.KEEP_FALL1);
      var x0 = READY_HEAD[0] - D.head[0] * D.s, y0 = READY_HEAD[1] - D.head[1] * D.s, x1 = D.tipAt[0] - L.tip[0] * D.s, y1 = D.tipAt[1] - L.tip[1] * D.s;
      var bottomEnd = y1 + L.h * D.s, fall = (GROUND_Y - bottomEnd) * f * f;                                  // gravity: a short fall, quick at the end; he always ends with his lowest pixel exactly on the grass line
      var x = lerp(x0, x1, g), y = lerp(y0, y1, g) - D.lift * Math.sin(g * Math.PI) + fall;
      var hx = x + D.head[0] * D.s;                                                                         // head x of the lying keeper = where he stands up
      if (uk >= TM.KEEP_RISE0) {                                                                            // up: the ready crouch AT the landing spot (feet on the grass), then a short crouch glide along the line to the centre
        var e = smooth(seg(uk, TM.KEEP_RISE0 + 0.02, TM.KEEP_READY));
        return { corner: ak.corner, rise: true, x: x, y: y, s: 1, bottom: LAY["keeper-ready"].y + LAY["keeper-ready"].feet[1], dx: (hx - READY_HEAD[0]) * (1 - e), g: 1, f: 1, hx: READY_HEAD[0] + (hx - READY_HEAD[0]) * (1 - e), hy: READY_HEAD[1] };
      }
      return { corner: ak.corner, x: x, y: y, s: D.s, bottom: y + L.h * D.s, g: g, f: f, hx: hx, hy: y + D.head[1] * D.s };
    }

    var lastDbg = null, lastT = 0;
    function drawAt(t) {
      lastT = t;
      var rNow = roundOf(t), ltNow = t - rNow * RD, rd = PL.rounds[rNow], clearing = rNow < NR - 1 && ltNow >= TM.OUT0 + 0.32;

      var su = seg(t, 0.05, 0.45);
      sub.style.visibility = su > 0 ? "visible" : "hidden";
      sub.style.transform = su >= 1 ? "none" : "translateY(" + Math.round((1 - outBack(su)) * 40) + "px)";

      HEADS.forEach(function (h, r) {
        var rt = t - r * RD, on = rt >= 0 && (r === NR - 1 || rt < TM.OUT0 + TM.OUTD);
        h.host.style.display = on ? "flex" : "none";
        if (!on) return;
        // letters rise into place and fade in (no scale: a scaled text layer is rastered at a size that depends on what was shown before, and frames must not depend on history)
        h.letters.forEach(function (l, i) {
          var u = seg(rt, TM.HEAD0 + i * 0.04, TM.HEAD0 + i * 0.04 + 0.34);
          var bob = Math.sin(t * 3 + i * 0.6) * 3 * seg(rt, TM.HEAD0 + 1.0, TM.HEAD0 + 1.6);
          var out = r < NR - 1 ? smooth(seg(rt, TM.OUT0 + i * 0.006, TM.OUT0 + i * 0.006 + 0.3)) : 0;
          l.style.transform = "translateY(" + Math.round((1 - outBack(u)) * 60 + bob - out * 44) + "px)";
          l.style.visibility = (u > 0 && out < 0.98) ? "visible" : "hidden";
        });
      });

      // --- the figures
      var ak = clearing ? null : activeKick(rd, ltNow), u = ak ? ltNow - ak.t0 : -1;
      var kp = kickerPose(ak ? u : -1), kn = "kicker-" + kp.pic, kimg = kp.pic === "ready" ? kickerReady : kp.pic === "strike" ? kickerStrike : kickerFollow;
      show(kickerReady, kp.pic === "ready"); show(kickerStrike, kp.pic === "strike"); show(kickerFollow, kp.pic === "follow");
      putImg(kimg, kn, kp.ax - ANCH[kp.pic][0], kp.ay - ANCH[kp.pic][1], kp.s);
      putShadow(shKicker, kp.ax + 6, kp.ay - 6, 210, 0.9);
      // the keeper: this kick's dive, or the previous kick's rise from the grass (the next kick pops while he is still getting up)
      var kz = keeperPose(ak, u, t);
      if (!kz && ak && ak.i > 0) kz = keeperPose(rd.kicks[ak.i - 1], ltNow - rd.kicks[ak.i - 1].t0, t);
      var kr = !kz || kz.rise;
      show(keeperReady, kr);
      if (kr) {
        var rl = LAY["keeper-ready"], bob = kz ? 0 : Math.sin(t * 3.1) * 2, kdx = kz ? kz.dx : 0;
        putImg(keeperReady, "keeper-ready", rl.x + kdx, rl.y + bob, 1);
        putShadow(shKeeper, rl.x + kdx + rl.feet[0], rl.y + rl.feet[1] - 6, 190, 0.9);
      }
      CORNER.forEach(function (k) {
        var on = kz && !kz.rise && kz.corner === k;
        show(keeperDive[k], !!on);
        if (!on) return;
        var L = LAY["keeper-dive-" + k];
        putImg(keeperDive[k], "keeper-dive-" + k, kz.x, kz.y, kz.s);
        var height = Math.max(0, GROUND_Y - kz.bottom);
        putShadow(shKeeper, kz.x + (L.w * kz.s) / 2, 880, (L.w * kz.s) * 0.7, 0.9 / (1 + height / 160));
      });

      // --- ball, net
      var b = (!clearing && ak) ? ballAt(rd, ak, ltNow) : null;
      if (!b && !clearing && ak && n === 0) b = null;
      drawBall(b);
      drawNet(rd, clearing ? 99 : ltNow);

      // sparkle on a goal, clang on the woodwork
      puffDots.forEach(function (d) { d.style.opacity = 0; }); ring.style.opacity = 0;
      if (!clearing && ak) {
        var pu = seg(ltNow, ak.land - 0.02, ak.land + 0.6), T = TARGET[ak.corner];
        if (pu > 0 && pu < 1) {
          var q = ak.state === "good" ? T.goal : T.wood, pt = proj(q[0], q[1], q[2]);
          puff.style.left = pt[0].toFixed(1) + "px"; puff.style.top = pt[1].toFixed(1) + "px";
          if (ak.state === "good") {
            puffDots.forEach(function (d, j) {
              var a = j / puffDots.length * Math.PI * 2 + 0.3, dist = 20 + 95 * smooth(pu);
              d.style.background = j % 2 ? "#fff6dc" : GOLD; d.style.boxShadow = "0 0 8px rgba(255,240,200,0.9)";
              d.style.opacity = (0.95 * (1 - pu)).toFixed(3);
              d.style.transform = "translate(" + (Math.cos(a) * dist).toFixed(1) + "px," + (Math.sin(a) * dist * 0.8 - 20 * pu).toFixed(1) + "px) scale(" + (1.3 - pu * 0.8).toFixed(3) + ")";
            });
          } else {
            var pr2 = seg(pu, 0, 0.55);
            ring.style.opacity = pr2 < 1 ? (0.9 * (1 - pr2)).toFixed(3) : 0;
            ring.style.transform = "scale(" + (0.5 + 1.6 * smooth(pr2)).toFixed(3) + ")";
          }
        }
      }
      lastDbg = { r: rNow, lt: ltNow, kick: ak ? ak.i : -1, corner: ak ? ak.corner : "", state: ak ? ak.state : "", u: u, kickerPic: kp.pic, kicker: { home: !!kp.home, ax: kp.ax, ay: kp.ay, s: kp.s, left: kp.ax - ANCH[kp.pic][0], top: kp.ay - ANCH[kp.pic][1] },
        dive: CORNER.filter(function (k) { return keeperDive[k].style.display === "block"; }).join(""), keeper: kz ? { corner: kz.corner, rise: !!kz.rise, x: kz.x, y: kz.y, s: kz.s, bottom: kz.bottom, g: kz.g, f: kz.f, hx: kz.hx, hy: kz.hy } : null, readyHead: READY_HEAD,
        ready: keeperReady.style.display === "block", ball: b ? { x: Math.round(b.x), y: Math.round(b.y), r: Math.round(b.r) } : null, mesh: okNet && netCv.style.display === "block" };

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

      // --- tags: pop up when the ball hits the woodwork, leave with the round
      TAGLIST.forEach(function (g) {
        var rt = t - g.r * RD, tu = seg(rt, g.at, g.at + 0.35), to = g.r < NR - 1 ? smooth(seg(rt, TM.OUT0 + 0.02, TM.OUT0 + 0.3)) : 0;
        var sc = (tu <= 0 ? 0 : outBack(tu)) * (1 - to);
        g.el.style.visibility = tu > 0 && sc > 0.001 ? "visible" : "hidden";
        g.el.style.transform = Math.abs(sc - 1) < 0.0005 ? "none" : "scale(" + Math.max(0, sc).toFixed(3) + ")";
        var rot = Math.sin(t * 2 + g.i) * 2 * seg(rt, g.at + 0.4, g.at + 0.8);
        g.tg.style.transform = "translateY(" + Math.round(rot * 1.6) + "px)";            // a small bob (whole pixels: a rotated text layer is rastered differently depending on what was drawn before)
      });
    }
    ctx.onDraw(drawAt);
    // the heading is measured text: when the font arrives (or the page finishes loading) redraw the current frame, so a frame never depends on the order of loading
    try {
      if (document.fonts && document.fonts.load) document.fonts.load("700 84px Fredoka").then(function () { drawAt(lastT); }, function () { });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { drawAt(lastT); });
    } catch (eF) { /* no font api */ }
    if (c.debug) window.__p36 = { dbg: function () { var tg = TAGLIST.filter(function (g) { return g.el.style.visibility === "visible"; }).map(function (g) { return g.r + ":" + g.tg.textContent.trim(); }); var cs = CARDS.map(function (cd) { return cd.num.textContent; }); return Object.assign({ tags: tg, cards: cs }, lastDbg); }, groundY: GROUND_Y, tagRects: function () { return TAGLIST.filter(function (g) { return g.el.style.visibility === "visible"; }).map(function (g) { var r = g.tg.getBoundingClientRect(), o = st.getBoundingClientRect(), k = o.width / 1080; return [(r.left - o.left) / k, (r.top - o.top) / k, (r.right - o.left) / k, (r.bottom - o.top) / k]; }); }, TARGETS: TARGET, LAY: LAY, DIVE: DIVE, PL: PL, okBall: okBall, okNet: okNet, ballAt: ballAt, kickWorld: kickWorld, proj: proj };
    return { destroy: function () { try { if (ballGL) { ballGL.rd.dispose(); ballGL.rd.forceContextLoss(); } if (netGL) { netGL.rd.dispose(); netGL.rd.forceContextLoss(); } } catch (e) { /* already gone */ } } };
  }
});
})();
