/* P-2 shape sorter beat · p2-sorter  (3D living storybook, real 3D blocks, THREE ROUNDS)
 * "Last week at school" in three short rounds on the same sorter box, every week, a perfect one too. There is one wooden piece per school day
 * open (as many pieces as days open, at most four: star, cylinder, cube, triangle prism; no day names, the data is weekly totals only).
 *   Round 1 "Came to school"  : a day ABSENT is a miss (gold tag Absent).
 *   Round 2 "On time"         : a day LATE TO SCHOOL is a miss (gold tag Late to school). A day she was ABSENT plays exactly like in round 1: that
 *                               piece also flies to a wrong hole, does not fit and carries the gold tag Absent (nothing is greyed or left hanging).
 *   Round 3 "Stayed all day"  : a day she LEFT EARLY is a miss (gold tag Early leave); absent days miss again with the tag Absent.
 *   Order inside a round (rounds 2 and 3): pieces that went in first, then the round's own misses (late / early), then the absent misses LAST.
 * The blocks are REAL 3D solids drawn in code with three.js (a WebGL canvas laid over the photo, vendor/three.min.js, loaded from a local file) and
 * lit like the photo (soft light from the window on the right, soft shadows on the box top).
 *   Good piece: flies over its own hole, tilts, then SINKS into it (solid, no squash). The box top is an invisible depth-only mask with the hole
 *   outlines cut out, so the box edge is correctly in FRONT of the block as it goes in.
 *   Missed piece (always the LAST pieces of the round): goes to a WRONG hole, lands on its rim, does NOT fit, wobbles and stays sitting there
 *   with a gold tag. If a round has more misses than free pieces (odd data), the extra misses stack on a piece that is already missed: one tag
 *   with a count ("Late to school x2"); if no piece is left for them (every day absent) the number just ticks on its card.
 * Between rounds the box clears cleanly (the pieces pop away, the heading leaves, no cross-dissolve) and the next round's pieces pop in. The last round stays.
 * Three counter cards at the bottom appear one per round and build as the pieces land: Days at school N of M (round 1; days open minus absent),
 * Late to school N (round 2), Early leave N (round 3). Each ends on the exact number in the data, whatever the pieces could show
 * (absent misses in rounds 2 and 3 carry a tag but never add to the Late to school / Early leave numbers).
 * Camera: solved from the photo (the box top diamond), so the 3D box top lines up with the picture's top face and the picture's holes.
 * Every frame is a pure function of t (kit rule 1); the photo and three.js are approved exceptions to rule 7, like the mascot.
 * If WebGL is not available the photo, headings, tags and counters still play (no pieces).
 * MotionIgor.registry["p2-sorter"].cues(content) returns the moments that will later carry sounds: [{ t, name }] in beat-local seconds, names
 * round-start, drop-in (a good piece goes into its hole), wrong-hole (a missed piece lands on a rim), tag-absent, tag-late, tag-early, round-clear.
 */
(function () {
// ---------------------------------------------------------------- the rounds: timing and the plan (pure data, no three.js: cues() uses it too)
var RD = 4.6, NR = 3, DUR = 14;                                       // seconds per round, rounds, length of the beat (the last round holds to the end)
var TM = { HEAD0: 0.1, GO0: 0.9, STEP: 0.45, FLY: 0.5, DROP0: 0.55, SINKD: 0.6, FALLD: 0.22, GOODLAND: 0.2, TAG: 0.1, TAGSTEP: 0.15, OUT0: RD - 0.45, OUTD: 0.4 };
var KIND = ["star", "circle", "square", "triangle"];
var THICK = { star: 0.12, circle: 0.12, square: 0.14, triangle: 0.12 };
var AY = 0.30, SINK_TO = -0.42;                                       // height a good piece hovers over its hole, and where it ends inside it
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
    for (q = absPieces; q < units[0] && absPieces > 0; q++) pieces[n - 1 - ((q - absPieces) % absPieces)].u++;       // extra absences stack on a piece that is already absent
    if (r > 0) {
      for (q = 0; q < own; q++) pieces[firstMiss + q].u = 1;
      for (q = own; q < units[r] && own > 0; q++) pieces[n - absPieces - 1 - ((q - own) % own)].u++;                  // extra misses stack on a piece that is already missed
    }
    var ev = [];                                                      // counter events {t, dv}, round-local seconds
    pieces.forEach(function (p) {
      p.t0 = TM.GO0 + p.k * TM.STEP;
      p.land = p.t0 + TM.DROP0 + (p.state === "miss" ? TM.FALLD : TM.GOODLAND);
      if (p.state === "good" && r === 0) ev.push({ t: p.land, dv: 1, p: p });
      for (var j = 0; j < p.u; j++) {
        p.tagAt.push(p.land + TM.TAG + j * TM.TAGSTEP);
        if (r > 0 && p.tag === ROUND_TAG[r]) ev.push({ t: p.land + TM.TAG + j * TM.TAGSTEP, dv: 1, p: p });         // absent tags never move the Late / Early numbers
      }
    });
    // the counter ends on the exact number in the data: whatever the pieces could not show goes on the last event (or a fallback one)
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
// seconds after the start of the sink when the block's underside crosses the box top (y = 0) and goes into its hole: the sink is
// py = lerp(AY, SINK_TO, 0.5 - 0.5 cos(pi sk)) over SINKD seconds, the underside is py - thickness / 2
function sinkEnter(kind) {
  var e = (AY - THICK[kind] / 2) / (AY - SINK_TO), sk = Math.acos(1 - 2 * e) / Math.PI;
  return sk * TM.SINKD;
}
function makeCues(wk) {
  var plan = makePlan(wk), out = [];
  plan.rounds.forEach(function (R) {
    var base = R.r * RD;
    out.push({ t: +(base + 0.1).toFixed(3), name: "round-start" });
    R.pieces.forEach(function (p) {
      if (p.state === "good") out.push({ t: +(base + p.t0 + TM.DROP0 + sinkEnter(KIND[p.i])).toFixed(3), name: "drop-in" });
      if (p.state === "miss") {
        out.push({ t: +(base + p.land).toFixed(3), name: "wrong-hole" });
        p.tagAt.forEach(function (ta) { out.push({ t: +(base + ta).toFixed(3), name: "tag-" + p.tag }); });
      }
    });
    if (R.events.length && R.r > 0 && R.events[0].p === null) out.push({ t: +(base + R.events[0].t).toFixed(3), name: "tag-" + R.tag });
    if (R.r < NR - 1) out.push({ t: +(base + TM.OUT0).toFixed(3), name: "round-clear" });
  });
  out.sort(function (a, b) { return a.t - b.t; });
  return out;
}

MotionIgor.define({
  id: "p2-sorter",
  duration: DUR,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · last week at school",
  style: "3D living storybook",
  engine: "webgl",
  theme: "ais",
  cues: function (content) { return makeCues(MotionIgor.util.deepMerge(MotionIgor.registry["p2-sorter"].defaults, content || {}).lastWeek); },
  defaults: {
    art: "sorter-layers/",
    subtitle: "Last week at school",
    // one heading per round (rows of words)
    rounds: [{ head: [["Came", "to"], ["school"]] }, { head: [["On"], ["time"]] }, { head: [["Stayed", "all"], ["day"]] }],
    counter: "Days at school",
    of: "of",
    lateLabel: "Late to school",
    earlyLabel: "Early leave",
    tags: { absent: "Absent", late: "Late to school", early: "Early leave" },
    // last week's totals (P2Data.toStory): daysOpen, absent (days), lateToSchool (days), earlyLeave (days). Default = sample-100.
    lastWeek: { daysOpen: 2, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    badge: "Weekly report",
    episode: "Week 7",
    look: "",                          // local switch of the proof link (?look=girl|boy): both show this story for now
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
    function inQuad(x) { return x * x; }
    function lerp(a, b, k) { return a + (b - a) * k; }
    function el(tag, css, parent) {
      var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e;
    }
    // ---------------------------------------------------------------- camera solved from the photo
    // World: X right, Y up, Z towards the viewer; the box top is the diamond |X|+|Z| <= 1 at Y = 0 (units = half the top's diagonal).
    // R = world -> camera (OpenCV: x right, y down, z forward), f in picture pixels, principal point (540, 960). Fitted to the four
    // corners of the box top: reprojection error 1.2 px. The four holes below were measured on the same plane (overlay-checked).
    var CAM = {
      f: 2918.4985823977227,
      R: [[0.999999449946052, 0.00040355029773606423, 0.000968119181912554],
          [0.00013711751371994814, -0.9653974454603498, 0.260782962437001],
          [0.001039858827255488, -0.26078268624620776, -0.9653969697734872]],
      pos: [-0.004990507750880654, 2.1683196520603523, 6.751904611181446]
    };
    var CT = [0, 1, 2].map(function (i) { return -(CAM.R[i][0] * CAM.pos[0] + CAM.R[i][1] * CAM.pos[1] + CAM.R[i][2] * CAM.pos[2]); });
    function projPx(x, y, z) {                                        // world point -> picture pixel
      var R = CAM.R, cx = R[0][0] * x + R[0][1] * y + R[0][2] * z + CT[0], cy = R[1][0] * x + R[1][1] * y + R[1][2] * z + CT[1], cz = R[2][0] * x + R[2][1] * y + R[2][2] * z + CT[2];
      return [CAM.f * cx / cz + 540, CAM.f * cy / cz + 960];
    }

    var SUN = [1.3, 3.6, -0.9];                                       // direction of the light (towards the sun): from the right and a little behind the box

    // ---------------------------------------------------------------- the holes (plane coordinates) and the blocks that fit them
    function circlePts(cx, cz, r, n) { var p = []; for (var i = 0; i < n; i++) { var a = i / n * Math.PI * 2; p.push([cx + r * Math.cos(a), cz + r * Math.sin(a)]); } return p; }
    function centroid(P) {                                            // area centroid of a polygon
      var a = 0, cx = 0, cz = 0, i, j, w;
      for (i = 0; i < P.length; i++) { j = (i + 1) % P.length; w = P[i][0] * P[j][1] - P[j][0] * P[i][1]; a += w; cx += (P[i][0] + P[j][0]) * w; cz += (P[i][1] + P[j][1]) * w; }
      return [cx / (3 * a), cz / (3 * a)];
    }
    var TRI = [[0.296, -0.121], [0.777, 0.024], [0.380, 0.384]];
    var TRIC = [(TRI[0][0] + TRI[1][0] + TRI[2][0]) / 3, (TRI[0][1] + TRI[1][1] + TRI[2][1]) / 3];
    // The star hole is NOT a regular star in the photo: it is traced from bg.jpg (the dark opening and its far wall, 8 points picked in picture pixels
    // (307,1071) (370,1084) (442,1075) (421,1099) (467,1118) (337,1141) (316,1121) (306,1119) and put on the box-top plane with the solved camera).
    // The pale sliver left of x = 305 in the photo is a lit bevel on solid wood, not part of the opening, so it is outside the outline.
    var STAR = [[-0.579, -0.212], [-0.416, -0.104], [-0.241, -0.179], [-0.286, 0.016], [-0.171, 0.163], [-0.468, 0.333], [-0.528, 0.186], [-0.552, 0.171]];
    // The BLOCK is a regular five-point star (so it still reads as a star), the biggest that fits inside that outline with a margin of 0.008 (found by search);
    // its centre is where the star goes in. The mask and the shadow cut-outs use the traced outline, so nothing can show through solid wood.
    function starPts(cx, cz, R, phi, ri) {
      var p = []; for (var i = 0; i < 10; i++) { var r = i % 2 ? R * ri : R; p.push([cx + r * Math.cos(phi + i * Math.PI / 5), cz + r * Math.sin(phi + i * Math.PI / 5)]); } return p;
    }
    var STARC = [-0.39, 0.09], STARB = starPts(0, 0, 0.17, 1.3963, 0.56);
    var HOLE = {
      star: { c: STARC, poly: STAR, block: STARB },
      circle: { c: [0.013, -0.40], poly: circlePts(0.013, -0.40, 0.245, 72), r: 0.245 },
      square: { c: [0, 0.50], poly: [[-0.277, 0.50], [0, 0.223], [0.277, 0.50], [0, 0.777]] },
      triangle: { c: TRIC, poly: TRI }
    };
    var FIT = 0.88;                                                   // a block is 88% of its hole, so it clears the walls
    var PAINT = { star: 0xdca02c, circle: 0x4079c2, square: 0x409e35, triangle: 0xbf2b1d };
    // Where each block rests when its day was missed: on the rim of a WRONG hole, its centre over solid wood and about 30% of its footprint over the hole,
    // so most of that hole stays open and visible from the camera. Found by search over position and yaw (every hole used by one block at most, no block touching
    // another or the other three holes, the box edge cleared, at least 70% of the wrong hole's opening uncovered in the picture, blocks overlapping each other
    // as little as possible on screen). The missed blocks are always the last ones, so the set is a run of kinds: "first-last" (0 star, 1 cylinder, 2 cube, 3 prism).
    var RESTSETS = {
      "0-0": { star: { hole: "circle", at: [0.3, -0.275], yaw: 1.5708 } },
      "0-1": { star: { hole: "triangle", at: [0.25, 0.05], yaw: 2.7489 }, circle: { hole: "star", at: [-0.15, 0.05], yaw: -3.1416 } },
      "0-2": { star: { hole: "circle", at: [-0.275, -0.325], yaw: 1.5708 }, circle: { hole: "triangle", at: [0.225, 0.125], yaw: -3.1416 }, square: { hole: "star", at: [-0.65, 0], yaw: -3.1416 } },
      "0-3": { star: { hole: "square", at: [-0.25, 0.425], yaw: -1.1781 }, circle: { hole: "triangle", at: [0.175, 0.075], yaw: -1.9635 }, square: { hole: "star", at: [-0.675, 0], yaw: -3.1416 }, triangle: { hole: "circle", at: [0.35, -0.375], yaw: 1.5708 } },
      "1-1": { circle: { hole: "triangle", at: [0.2, 0.1], yaw: -3.1416 } },
      "1-2": { circle: { hole: "triangle", at: [0.2, 0.1], yaw: -3.1416 }, square: { hole: "star", at: [-0.65, 0], yaw: -3.1416 } },
      "1-3": { circle: { hole: "triangle", at: [0.225, 0.125], yaw: -3.1416 }, square: { hole: "star", at: [-0.65, 0], yaw: -3.1416 }, triangle: { hole: "circle", at: [-0.25, -0.375], yaw: 0.7854 } },
      "2-2": { square: { hole: "triangle", at: [0.225, 0.075], yaw: -3.1416 } },
      "2-3": { square: { hole: "star", at: [-0.65, 0], yaw: -3.1416 }, triangle: { hole: "circle", at: [0.275, -0.275], yaw: 0 } },
      "3-3": { triangle: { hole: "star", at: [-0.15, 0.15], yaw: 0 } }
    };
    // hovering spots, above the box like the approved picture (picked by projecting the old cut-outs' positions onto the plane Z = -0.15)
    var HOVER = {
      star: { p: [-0.58, 0.39, -0.15], yaw: 0.5, ph: 0.4 }, circle: { p: [-0.2, 0.75, -0.15], yaw: -0.35, ph: 1.7 },
      square: { p: [0.23, 0.85, -0.15], yaw: 0.3, ph: 3.1 }, triangle: { p: [0.59, 0.36, -0.15], yaw: -0.45, ph: 4.4 }
    };
    // the rim point where the block teeters (the line from the resting centre towards the hole centre meets the hole outline)
    function rimPoint(from, hole) {
      var dx = hole.c[0] - from[0], dz = hole.c[1] - from[1], L = Math.sqrt(dx * dx + dz * dz); dx /= L; dz /= L;
      var best = 1e9, P = hole.poly;
      for (var i = 0; i < P.length; i++) {
        var a = P[i], b = P[(i + 1) % P.length], ex = b[0] - a[0], ez = b[1] - a[1];
        var den = dx * ez - dz * ex; if (Math.abs(den) < 1e-9) continue;
        var s = ((a[0] - from[0]) * ez - (a[1] - from[1]) * ex) / den, w = ((a[0] - from[0]) * dz - (a[1] - from[1]) * dx) / den;
        if (s > 0 && w >= 0 && w <= 1 && s < best) best = s;
      }
      if (best > 1e8) best = 0.1;
      return { x: from[0] + dx * best, z: from[1] + dz * best, dx: dx, dz: dz };
    }

    // ---------------------------------------------------------------- days -> what each piece does, round by round
    var PL = makePlan(c.lastWeek), daysTotal = PL.D, n = PL.n;
    var B = [], i;
    for (i = 0; i < n; i++) B.push({ i: i, kind: KIND[i], hv: HOVER[KIND[i]], th: THICK[KIND[i]], R: [] });
    PL.rounds.forEach(function (rd) {
      var first = n - rd.miss, last = n - 1;
      rd.pieces.forEach(function (p) {
        var b = B[p.i], R = { state: p.state, tag: p.tag, t0: p.t0, land: p.land, u: p.u, tagAt: p.tagAt, pop0: 0.1 + p.i * 0.08 };
        var h = HOLE[b.kind];
        if (p.state === "miss") { var rs = RESTSETS[first + "-" + last][b.kind]; R.tx = rs.at[0]; R.tz = rs.at[1]; R.yaw = rs.yaw; R.rim = rimPoint(rs.at, HOLE[rs.hole]); R.hole = HOLE[rs.hole]; }
        else { R.tx = h.c[0]; R.tz = h.c[1]; R.yaw = 0; }
        b.R[rd.r] = R;
      });
    });
    function roundOf(t) { return clamp(Math.floor(t / RD), 0, NR - 1); }
    // counter values at time t (absolute beat seconds): days, late, early
    function countersAt(t) {
      var v = [0, 0, 0], last = [-9, -9, -9];
      PL.rounds.forEach(function (rd) {
        rd.events.forEach(function (e) { var at = rd.r * RD + e.t; if (t >= at) { v[rd.r] += e.dv; last[rd.r] = Math.max(last[rd.r], at); } });
      });
      return { v: v, last: last };
    }
    // ---------------------------------------------------------------- picture + WebGL canvas (one scaled world)
    ctx.stage.style.background = "#efe2d0";
    var OX = 540, OY = 1000;
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:" + OX + "px " + OY + "px;filter:saturate(1.15)");
    var bg = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none", world);
    bg.src = WD.src(c.art, "sorter-bg.jpg", "bg.jpg"); bg.alt = ""; bg.draggable = false;

    // ---------------------------------------------------------------- three.js scene
    var SHN = 512;
    var gl = null, renderer = null, scene = null, camera = null, lastW = 0, lastH = 0, lastT = 0, ok = false;
    var shCan = null, shG = null, shUn = null, shUg = null, shMask = null, shTex = null;
    // canvas size in device pixels: device pixels per design pixel (device pixel ratio x how big the stage is on screen x the slow zoom of the picture),
    // at most 3x, and at most 16 million pixels in all (the canvas area limit of iOS Safari), so a full-screen 3x display gets 2.8x
    var CAP_PX = 16000000, GL_ZOOM = 1.08;
    function sizeGL() {
      if (!gl) return;
      var dpr = window.devicePixelRatio || 1, r = st.getBoundingClientRect(), sc = r.width > 0 ? r.width / 1080 : 1;
      var pr = clamp(dpr * sc * GL_ZOOM, 1, 3);
      pr = Math.min(pr, Math.sqrt(CAP_PX / (1080 * 1920)));
      var w = Math.round(1080 * pr), h = Math.round(1920 * pr);
      if (gl.canvas.width !== w || gl.canvas.height !== h) { gl.canvas.width = w; gl.canvas.height = h; }
    }
    if (T3) {
      try {
        // own canvas (not ctx.canvas): the kit caps its canvases at 2x, but the blocks must be as sharp as the page text at 3x (phones)
        var cv = document.createElement("canvas");
        cv.style.cssText = "position:absolute;left:0;top:0;width:1080px;height:1920px;pointer-events:none";
        var gx = null, gopt = { premultipliedAlpha: true, antialias: true, preserveDrawingBuffer: true, alpha: true };
        try { gx = cv.getContext("webgl2", gopt); } catch (e0) { gx = null; }
        if (!gx) { try { gx = cv.getContext("webgl", gopt); } catch (e1) { gx = null; } }
        if (gx) { gl = { canvas: cv, g: gx }; world.appendChild(cv); sizeGL(); } else gl = null;
      } catch (e) { gl = null; }
    }
    if (gl && T3) {
      try {
        renderer = new T3.WebGLRenderer({ canvas: gl.canvas, context: gl.g, alpha: true, antialias: true, premultipliedAlpha: true, preserveDrawingBuffer: true });
        renderer.setClearColor(0x000000, 0);
        renderer.shadowMap.enabled = false;                           // soft shadows are drawn by hand (see drawShadows)
        scene = new T3.Scene();
        camera = new T3.PerspectiveCamera(2 * Math.atan(960 / CAM.f) * 180 / Math.PI, 1080 / 1920, 0.5, 30);
        var R = CAM.R;
        var bx = new T3.Vector3(R[0][0], R[0][1], R[0][2]), by = new T3.Vector3(-R[1][0], -R[1][1], -R[1][2]), bz = new T3.Vector3(-R[2][0], -R[2][1], -R[2][2]);
        camera.position.set(CAM.pos[0], CAM.pos[1], CAM.pos[2]);
        camera.quaternion.setFromRotationMatrix(new T3.Matrix4().makeBasis(bx, by, bz));
        camera.updateMatrixWorld(true);

        // light from the window side (right, a little behind), warm; soft fills from the room and from the camera side
        scene.add(new T3.HemisphereLight(0xfff0dc, 0xc89a68, 0.85));
        var sun = new T3.DirectionalLight(0xfff1dc, 1.3);
        sun.position.set(SUN[0], SUN[1], SUN[2]); sun.target.position.set(0, 0, 0); scene.add(sun); scene.add(sun.target);
        var fill = new T3.DirectionalLight(0xffeedd, 0.5);
        fill.position.set(-1.6, 1.8, 3.2); fill.target.position.set(0, 0, 0); scene.add(fill); scene.add(fill.target);

        // the box top: an invisible mask that only writes depth (so a block sinking below the top is hidden by the box, except through the hole
        // outlines cut out of it) plus a shadow-only layer on the box top itself
        function shapeOf(poly) { var s = new T3.Shape(); poly.forEach(function (p, i) { if (i) s.lineTo(p[0], -p[1]); else s.moveTo(p[0], -p[1]); }); s.closePath(); return s; }
        function topGeo(outer) {
          var s = shapeOf(outer);
          KIND.forEach(function (k) { var h = new T3.Path(); HOLE[k].poly.forEach(function (p, i) { if (i) h.lineTo(p[0], -p[1]); else h.moveTo(p[0], -p[1]); }); h.closePath(); s.holes.push(h); });
          var g = new T3.ShapeGeometry(s, 4); g.rotateX(-Math.PI / 2); return g;
        }
        var mask = new T3.Mesh(topGeo([[-4, -4], [4, -4], [4, 4], [-4, 4]]), new T3.MeshBasicMaterial({ colorWrite: false }));
        mask.renderOrder = -10; scene.add(mask);
        // the walls of every hole shaft (depth only): a ray that enters one hole can never see a block sitting in another hole's shaft
        var wv = [], WD = 3;
        KIND.forEach(function (k) {
          var P = HOLE[k].poly;
          for (var wi = 0; wi < P.length; wi++) {
            var a = P[wi], b2 = P[(wi + 1) % P.length];
            wv.push(a[0], 0, a[1], b2[0], 0, b2[1], b2[0], -WD, b2[1], a[0], 0, a[1], b2[0], -WD, b2[1], a[0], -WD, a[1]);
          }
        });
        var wg = new T3.BufferGeometry(); wg.setAttribute("position", new T3.BufferAttribute(new Float32Array(wv), 3));
        var walls = new T3.Mesh(wg, new T3.MeshBasicMaterial({ colorWrite: false, side: T3.DoubleSide }));
        walls.renderOrder = -10; scene.add(walls);
        // soft shadows: one 2D canvas covering the box top (plane -1..1 -> 0..SHN px), redrawn from t every frame, shown on the top face only (holes stay clear)
        var rg = topGeo([[-1, 0], [0, -1], [1, 0], [0, 1]]), rp = rg.attributes.position, ruv = new Float32Array(rp.count * 2);
        for (var vi = 0; vi < rp.count; vi++) { ruv[vi * 2] = (rp.getX(vi) + 1) / 2; ruv[vi * 2 + 1] = (1 - rp.getZ(vi)) / 2; }
        rg.setAttribute("uv", new T3.BufferAttribute(ruv, 2));
        shCan = document.createElement("canvas"); shCan.width = shCan.height = SHN; shG = shCan.getContext("2d");
        shUn = document.createElement("canvas"); shUn.width = shUn.height = SHN; shUg = shUn.getContext("2d");
        shMask = document.createElement("canvas"); shMask.width = shMask.height = SHN;
        (function () {                                                // soft diamond: shadows fade out towards the box edges (they would run down the side faces)
          var g = shMask.getContext("2d"), im = g.createImageData(SHN, SHN), d = im.data;
          for (var yy = 0; yy < SHN; yy++) for (var xx = 0; xx < SHN; xx++) {
            var X = (xx + 0.5) / SHN * 2 - 1, Z = (yy + 0.5) / SHN * 2 - 1, e = (1 - Math.abs(X) - Math.abs(Z)) / Math.SQRT2, a = clamp(e / 0.16, 0, 1);
            var o = (yy * SHN + xx) * 4; d[o] = d[o + 1] = d[o + 2] = Math.round(255 * smooth(a)); d[o + 3] = 255;
          }
          g.putImageData(im, 0, 0);
        })();
        shTex = new T3.CanvasTexture(shCan); shTex.generateMipmaps = false; shTex.minFilter = T3.LinearFilter; shTex.magFilter = T3.LinearFilter;
        var recv = new T3.Mesh(rg, new T3.MeshBasicMaterial({ color: 0x3a1e08, alphaMap: shTex, transparent: true, depthWrite: false }));
        recv.position.y = 0.002; recv.renderOrder = 5; scene.add(recv);

        // wood-painted blocks: bevelled prisms for star / cube / triangle, a bevelled cylinder for the circle
        var BV = 0.013;
        function prismGeo(poly, th) {
          var s = shapeOf(poly), d = th - 2 * BV;
          var g = new T3.ExtrudeGeometry(s, { depth: d, bevelEnabled: true, bevelThickness: BV, bevelSize: BV, bevelOffset: -BV, bevelSegments: 2, curveSegments: 1 });
          g.rotateX(-Math.PI / 2); g.translate(0, -d / 2, 0); return g;
        }
        function cylGeo(r, th) {
          var pts = [new T3.Vector2(0, -th / 2), new T3.Vector2(r - BV, -th / 2)], a;
          for (a = 1; a <= 4; a++) { var g1 = -Math.PI / 2 + a / 4 * Math.PI / 2; pts.push(new T3.Vector2(r - BV + BV * Math.cos(g1), -th / 2 + BV + BV * Math.sin(g1))); }
          for (a = 1; a <= 4; a++) { var g2 = a / 4 * Math.PI / 2; pts.push(new T3.Vector2(r - BV + BV * Math.cos(g2), th / 2 - BV + BV * Math.sin(g2))); }
          pts.push(new T3.Vector2(0, th / 2));
          var lg = new T3.LatheGeometry(pts, 72), lp = lg.attributes.position, lu = new Float32Array(lp.count * 2);
          for (var li = 0; li < lp.count; li++) { lu[li * 2] = lp.getX(li) * 1.4; lu[li * 2 + 1] = lp.getZ(li) * 1.4; }   // grain runs one way across the top, like the prisms
          lg.setAttribute("uv", new T3.BufferAttribute(lu, 2));
          return lg;
        }
        // a faint painted-wood grain (drawn once from the kit's seeded random, so every load is identical)
        var grain = (function () {
          var cv = document.createElement("canvas"); cv.width = cv.height = 256; var g = cv.getContext("2d");
          g.fillStyle = "#f4f4f4"; g.fillRect(0, 0, 256, 256);
          for (var li = 0; li < 150; li++) {
            var yy = ctx.rand() * 256, hh = 0.6 + ctx.rand() * 2.0, v = 185 + Math.floor(ctx.rand() * 60);
            g.fillStyle = "rgba(" + v + "," + v + "," + v + "," + (0.2 + ctx.rand() * 0.35).toFixed(2) + ")";
            g.beginPath(); g.moveTo(0, yy);
            for (var xx = 0; xx <= 256; xx += 32) g.lineTo(xx, yy + Math.sin(xx / 40 + li) * 1.6 + (ctx.rand() - 0.5) * 0.8);
            for (xx = 256; xx >= 0; xx -= 32) g.lineTo(xx, yy + hh + Math.sin(xx / 40 + li) * 1.6);
            g.closePath(); g.fill();
          }
          var tx = new T3.CanvasTexture(cv); tx.wrapS = tx.wrapT = T3.RepeatWrapping; tx.repeat.set(3, 3); tx.colorSpace = T3.SRGBColorSpace; return tx;
        })();
        function paint(hex) {
          var m = new T3.MeshStandardMaterial({ color: hex, roughness: 0.5, metalness: 0, map: grain });
          // darker the deeper a block is below the box top (inside the hole it is in shadow)
          m.onBeforeCompile = function (sh) {
            sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nvarying float vWY;").replace("#include <begin_vertex>", "#include <begin_vertex>\nvWY = (modelMatrix * vec4(transformed, 1.0)).y;");
            sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nvarying float vWY;").replace("#include <dithering_fragment>", "gl_FragColor.rgb = mix(vec3(0.075, 0.036, 0.014), gl_FragColor.rgb, mix(0.04, 1.0, smoothstep(-0.34, -0.01, vWY)));\n#include <dithering_fragment>");
          };
          return m;
        }
        B.forEach(function (b) {
          var h = HOLE[b.kind], local;
          var geo;
          if (b.kind === "circle") geo = cylGeo(h.r * FIT, THICK.circle);
          else { local = h.block || h.poly.map(function (p) { return [(p[0] - h.c[0]) * FIT, (p[1] - h.c[1]) * FIT]; }); geo = prismGeo(local, THICK[b.kind]); }
          var m = new T3.Mesh(geo, paint(PAINT[b.kind])); scene.add(m); b.mesh = m;
          b.ring = b.kind === "circle" ? circlePts(0, 0, h.r * FIT, 28) : local;
        });
        ok = true;
      } catch (e) { ok = false; try { console.warn("p2-sorter: WebGL scene not available (" + e.message + ")"); } catch (e2) { } }
    }

    // scratch objects for the pose maths (nothing is carried from one frame to the next)
    var VY = ok ? new T3.Vector3(0, 1, 0) : null, VX = ok ? new T3.Vector3(1, 0, 0) : null;
    var qa = ok ? new T3.Quaternion() : null, qb = ok ? new T3.Quaternion() : null, qc = ok ? new T3.Quaternion() : null, qd = ok ? new T3.Quaternion() : null;
    var pv = ok ? new T3.Vector3() : null, pw = ok ? new T3.Vector3() : null, ax = ok ? new T3.Vector3() : null;
    var HOVER_BANK = 1.38;                                            // the block hangs nearly upright, face to the camera, tipped a little back
    function placeBlock(b, t) {
      var r = roundOf(t), R = b.R[r], lt = t - r * RD, m = b.mesh, hv = b.hv, ph = hv.ph, u = lt - R.t0;
      var s = outBack(seg(lt, R.pop0, R.pop0 + 0.45));
      if (r < NR - 1) s *= 1 - smooth(seg(lt, TM.OUT0, TM.OUT0 + TM.OUTD));      // the box clears between rounds (the last round stays)
      // hovering pose at this time
      var hx = hv.p[0], hy = hv.p[1] + 0.03 * Math.sin(2.1 * t + ph), hz = hv.p[2];
      qa.setFromAxisAngle(VY, hv.yaw + 0.25 * Math.sin(1.1 * t + ph));
      qb.setFromAxisAngle(VX, HOVER_BANK + 0.06 * Math.sin(1.7 * t + ph * 1.7));
      qc.setFromAxisAngle(VY, 0.3 * Math.sin(0.9 * t + ph * 2.3));
      qa.multiply(qb).multiply(qc);                                   // qa = hovering orientation
      var px = hx, py = hy, pz = hz;
      if (u > 0) {
        var k = smooth(seg(u, 0, TM.FLY));
        var ay = R.state === "miss" ? 0.34 : AY;
        px = lerp(hx, R.tx, k); pz = lerp(hz, R.tz, k);
        py = lerp(hy, ay, k) + Math.sin(k * Math.PI) * 0.22;
        // tipped as it arrives, levelling out over the hole
        var tilt = 0.17 * (1 - smooth(seg(u, 0.56 * TM.FLY, 1.16 * TM.FLY)));
        qb.setFromAxisAngle(VY, R.yaw);
        qc.setFromEuler(new T3.Euler(tilt, 0, -tilt * 0.8));
        qd.copy(qc).multiply(qb);                                     // qd = tilted, yawed, flat orientation
        qa.slerp(qd, k);
        if (u > TM.DROP0) {
          if (R.state === "good") {
            // a good day: sinks straight into its own hole
            var sk = seg(u, TM.DROP0, TM.DROP0 + TM.SINKD);
            py = lerp(ay, SINK_TO, 0.5 - 0.5 * Math.cos(Math.PI * sk));
            qc.setFromAxisAngle(VX, 0.19 * Math.sin(Math.min(1, sk * 1.25) * Math.PI)); qa.premultiply(qc);   // its front edge goes in first
          } else {
            var fk = seg(u, TM.DROP0, TM.DROP0 + TM.FALLD);
            py = lerp(ay, b.th / 2, inQuad(fk));
            var w = u - (TM.DROP0 + TM.FALLD);
            if (w > 0) {
              py += 0.03 * Math.abs(Math.sin(Math.PI * Math.min(1, w / 0.3))) * Math.max(0, 1 - w / 0.3);
              // an attempt and a refusal: it lands on the rim, the side over the hole drops in (about 25 degrees), catches and rocks back, drops in again
              // (about 11, then 5 degrees) and ends leaning into the hole at 4 degrees, wedged, not in
              var ang = 0.07 * (1 - Math.exp(-8 * w)) + 0.46 * Math.exp(-3.1 * w) * Math.abs(Math.sin(2 * Math.PI * 2.0 * w));
              ax.set(R.rim.dz, 0, -R.rim.dx);
              qc.setFromAxisAngle(ax, ang);
              pv.set(px - R.rim.x, py, pz - R.rim.z).applyQuaternion(qc); px = R.rim.x + pv.x; py = pv.y; pz = R.rim.z + pv.z;
              qa.premultiply(qc);
            }
          }
        }
      }
      m.position.set(px, py, pz);
      m.quaternion.copy(qa);
      m.scale.setScalar(Math.max(0.0001, s));
      m.visible = s > 0.002;
      m.material.color.setHex(PAINT[b.kind]);
      b.s = s;
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

    // the beat's own small title, then one big heading per round (letters pop one by one, the heading leaves when the round clears)
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

    // dust where a missed piece touches the rim, sparkle where a good piece goes into its hole. They sit BEHIND the 3D canvas (between the photo and the
    // blocks), so a block always covers what is behind it: the dust comes from the contact point at the foot of the block, never stuck on its face.
    var puffs = B.map(function (b) {
      var p = el("div", "position:absolute;left:0;top:0;width:0;height:0", world);
      if (gl && gl.canvas.parentNode === world) world.insertBefore(p, gl.canvas);
      var dots = [];
      for (var d = 0; d < 9; d++) dots.push(el("div", "position:absolute;left:-8px;top:-8px;width:16px;height:16px;border-radius:50%", p));
      return { box: p, dots: dots, key: "" };
    });
    function puffSpot(b, r) {                                         // the contact point of this piece in this round (px on the picture), or null
      var R = b.R[r], pt = R.state === "miss" ? [R.rim.x, 0.0, R.rim.z] : R.state === "good" ? [HOLE[b.kind].c[0], 0.0, HOLE[b.kind].c[1]] : null;
      return pt ? projPx(pt[0], pt[1], pt[2]) : null;
    }

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

    // sparkle stars round a card when its round went perfectly (every played piece went in, nothing missed)
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

    // gold tags for missed days, above the piece that carries them (never red)
    var ICON = {
      absent: '<path d="M6 6 L22 22 M22 6 L6 22" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>',
      late: '<circle cx="14" cy="14" r="10" fill="none" stroke="#fff" stroke-width="3.5"/><path d="M14 8 V14 L18 17" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>',
      early: '<path d="M7 4 H19 V24 H7 Z" fill="none" stroke="#fff" stroke-width="3.2"/><path d="M13 14 H25 M21 10 L25 14 L21 18" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round"/>'
    };
    // Layout, per round: each tag sits right above the piece it labels, with a small pointer down to that piece. Tags that would touch are pushed sideways (never over a
    // neighbour's piece: the order left to right is the order of the pieces) and, as a last resort, lifted. A piece that carries more than one miss shows ONE tag with a count.
    var TAGF = 34, TAGH = 78, TAGLIST = [];
    function tagW(label) { return TAGF * String(label).length * 0.56 + 112; }
    PL.rounds.forEach(function (rd) {
      var L = [];
      B.forEach(function (b) {
        var R = b.R[rd.r]; if (R.state !== "miss") return;
        var label = c.tags[R.tag] + (R.u > 1 ? " ×" + R.u : ""), a0 = projPx(R.tx, b.th + 0.04, R.tz), w = tagW(label), zk = 1.06;       // the picture is zoomed about (OX, OY) by about 1.06 when the tags are up
        var a = [OX + (a0[0] - OX) * zk, OY + (a0[1] - OY) * zk];
        L.push({ r: rd.r, b: b, kind: R.tag, label: label, w: w, ax: a[0], ay: a[1], cx: clamp(a[0], 24 + w / 2, 1056 - w / 2), cy: a[1] - 98, at: R.tagAt[0] });
      });
      var it, i, j, k; L.sort(function (p, q) { return p.ax - q.ax; });
      // Each piece's box on the picture (its resting footprint, bottom and top, projected and zoomed like the tags): a tag or pointer must never cover another piece.
      L.forEach(function (p) {
        var R = p.b.R[rd.r], h = HOLE[p.b.kind], ring = p.b.kind === "circle" ? circlePts(0, 0, h.r * FIT, 20) : (h.block || h.poly.map(function (q) { return [(q[0] - h.c[0]) * FIT, (q[1] - h.c[1]) * FIT]; }));
        var cs = Math.cos(R.yaw), sn = Math.sin(R.yaw), x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
        ring.forEach(function (q) {
          [0, p.b.th].forEach(function (yy) {
            var a0 = projPx(R.tx + q[0] * cs + q[1] * sn, yy, R.tz - q[0] * sn + q[1] * cs), zx = OX + (a0[0] - OX) * 1.06, zy = OY + (a0[1] - OY) * 1.06;
            x0 = Math.min(x0, zx); x1 = Math.max(x1, zx); y0 = Math.min(y0, zy); y1 = Math.max(y1, zy);
          });
        });
        p.box = { x0: x0, y0: y0, x1: x1, y1: y1 };
      });
      // Placement: every tag picks a slot (a row, 0 = right above its piece, 1 and 2 = lifted one or two tag heights, and a sideways shift), all tags together are
      // chosen by a small exhaustive search for the least cost: tags never touch each other (at least TGAP px between them, shadow included), never cover a piece, never
      // sit in the headline zone, and no pointer runs through another tag or another piece; shorter pointers and less sideways shift are cheaper. Pure function of the data.
      var TGAP = 14, ROWSTEP = TAGH + TGAP, HEADZONE = 548, SHIFTS = [0, -40, 40, -80, 80, -130, 130, -190, 190, -260, 260];
      function tagRect(p, o) { return { x0: o.cx - p.w / 2, x1: o.cx + p.w / 2 + 5, y0: o.cy - TAGH / 2, y1: o.cy + TAGH / 2 + 5 }; }
      function hit(a, b, m) { return a.x0 < b.x1 + m && b.x0 < a.x1 + m && a.y0 < b.y1 + m && b.y0 < a.y1 + m; }
      function ptHit(p, o, rect, m) {                                  // does the pointer of tag p (placed at o) pass through the rectangle?
        var px0 = o.cx + clamp(p.ax - o.cx, -p.w / 2 + 44, p.w / 2 - 44), py0 = o.cy + TAGH / 2 - 8, x1 = p.ax, y1 = p.ay - 10;
        for (var q = 1; q < 28; q++) {
          var u = q / 28, x = px0 + (x1 - px0) * u, y = py0 + (y1 - py0) * u;
          if (x > rect.x0 - m && x < rect.x1 + m && y > rect.y0 - m && y < rect.y1 + m) return true;
        }
        return false;
      }
      var OPT = L.map(function (p) {
        var list = [], row, s;
        for (row = 0; row < 3; row++) for (s = 0; s < SHIFTS.length; s++) {
          var cx = clamp(p.ax + SHIFTS[s], 24 + p.w / 2, 1056 - p.w / 2), cy = p.ay - 98 - row * ROWSTEP, o = { cx: cx, cy: cy, row: row }, rc = tagRect(p, o);
          var cost = row * 6 + Math.abs(cx - p.ax) * 0.12 + (p.ay - cy) * 0.05, bad = false;
          if (rc.y0 < HEADZONE) cost += 4000;
          for (k = 0; k < L.length; k++) {
            if (L[k] === p) { if (hit(rc, L[k].box, 0)) bad = true; continue; }
            if (hit(rc, L[k].box, 4)) bad = true;
            if (ptHit(p, o, L[k].box, 2)) cost += 600;
          }
          o.rect = rc; o.cost = cost; if (!bad) list.push(o);
        }
        list.sort(function (a, b) { return a.cost - b.cost; });
        return list;
      });
      var bestCost = 1e18, bestPick = null, pick = [];
      (function dfs(n, cost) {
        if (cost >= bestCost) return;
        if (n === L.length) { bestCost = cost; bestPick = pick.slice(); return; }
        for (var oi = 0; oi < OPT[n].length; oi++) {
          var o = OPT[n][oi], add = o.cost, ok = true, m;
          if (cost + o.cost >= bestCost) break;                        // options are sorted by cost
          for (m = 0; m < n; m++) {
            if (hit(pick[m].rect, o.rect, TGAP)) { ok = false; break; }
            if (ptHit(L[m], pick[m], o.rect, 2)) add += 600;
            if (ptHit(L[n], o, pick[m].rect, 2)) add += 600;
          }
          if (!ok) continue;
          pick.push(o); dfs(n + 1, cost + add); pick.pop();
        }
      })(0, 0);
      if (!bestPick) bestPick = OPT.map(function (l, q) { var o = l[0] || { cx: L[q].cx, cy: L[q].cy }; return o; });      // cannot happen with the data, kept so a layout always exists
      L.forEach(function (p, q) { p.cx = bestPick[q].cx; p.cy = bestPick[q].cy; });
      L.forEach(function (p) {
        var box = el("div", "position:absolute;left:" + p.cx.toFixed(1) + "px;top:" + p.cy.toFixed(1) + "px;width:0;height:0;transform-origin:0 0", data);
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


    // hand-drawn soft shadows: every block's outline (all of its vertices, projected along the light on to the box top) is filled solid on a scratch
    // canvas and then drawn blurred; the higher the block, the softer and paler. Pure function of t.
    var VW = ok ? new T3.Vector3() : null;
    function drawShadows(t) {
      shG.setTransform(1, 0, 0, 1, 0, 0); shG.globalCompositeOperation = "source-over"; shG.fillStyle = "#000"; shG.fillRect(0, 0, SHN, SHN);   // grey levels = how dark the shadow is (the texture is used as an alpha map)
      var kx = SUN[0] / SUN[1], kz = SUN[2] / SUN[1];
      B.forEach(function (b) {
        var m = b.mesh; if (!m.visible) return;
        var y = m.position.y, a = smooth(clamp((y + 0.05) / 0.22, 0, 1)); if (a <= 0.01) return;
        m.updateMatrixWorld(true);
        shUg.setTransform(1, 0, 0, 1, 0, 0); shUg.clearRect(0, 0, SHN, SHN); shUg.fillStyle = "#fff";
        var n2 = b.ring.length, top = [], bot = [], j, th = b.th / 2;
        for (j = 0; j < n2; j++) {
          [[th, top], [-th, bot]].forEach(function (pr) {
            VW.set(b.ring[j][0], pr[0], b.ring[j][1]).applyMatrix4(m.matrixWorld);
            pr[1].push([(VW.x - VW.y * kx + 1) * SHN / 2, (VW.z - VW.y * kz + 1) * SHN / 2]);
          });
        }
        function poly(P) { shUg.beginPath(); P.forEach(function (p, i) { if (i) shUg.lineTo(p[0], p[1]); else shUg.moveTo(p[0], p[1]); }); shUg.closePath(); shUg.fill(); }
        poly(top); poly(bot);
        for (j = 0; j < n2; j++) poly([top[j], top[(j + 1) % n2], bot[(j + 1) % n2], bot[j]]);
        var h = Math.max(0, y), blur = 4 + 26 * Math.min(1, h), al = 0.95 * (1 - 0.4 * Math.min(1, h / 0.9)) * a * clamp(m.scale.x, 0, 1);
        shG.save(); shG.globalCompositeOperation = "lighter"; shG.shadowColor = "rgba(255,255,255," + al.toFixed(3) + ")"; shG.shadowBlur = blur; shG.shadowOffsetX = SHN * 2; shG.shadowOffsetY = 0;
        shG.drawImage(shUn, -SHN * 2, 0); shG.restore();
      });
      shG.globalCompositeOperation = "multiply"; shG.drawImage(shMask, 0, 0); shG.globalCompositeOperation = "source-over";
      shTex.needsUpdate = true;
    }

    function drawGL(t) {
      if (!ok) return;
      sizeGL();
      var cw = gl.canvas.width, ch = gl.canvas.height;
      if (cw !== lastW || ch !== lastH) { renderer.setPixelRatio(1); renderer.setSize(cw, ch, false); lastW = cw; lastH = ch; }
      B.forEach(function (b) { placeBlock(b, t); });
      drawShadows(t);
      renderer.render(scene, camera);
    }
    bg.addEventListener("load", function () { /* the photo is a DOM image: nothing to redraw */ });


    ctx.onDraw(function (t) {
      lastT = t;
      var rNow = roundOf(t), ltNow = t - rNow * RD;
      var k = smooth(seg(t, 0, DUR));
      var bump = 0;
      B.forEach(function (b) { var u = ltNow - b.R[rNow].land; if (u > 0 && u < 0.25) bump = Math.max(bump, Math.sin(u / 0.25 * Math.PI) * 0.005); });
      world.style.transform = "scale(" + (1.02 + 0.06 * k + bump).toFixed(4) + ")";

      // the beat's small title: pops in at the start, stays
      var su = seg(t, 0.05, 0.45);
      sub.style.opacity = su > 0 ? 1 : 0;
      sub.style.transform = "scale(" + (su <= 0 ? 0 : outBack(su)).toFixed(3) + ")";

      // the round's heading: letters pop in one by one, leave quickly when the round clears
      HEADS.forEach(function (h, r) {
        var rt = t - r * RD, on = rt >= 0 && (r === NR - 1 || rt < TM.OUT0 + TM.OUTD);               // the last round holds to the end
        h.host.style.display = on ? "flex" : "none";
        if (!on) return;
        h.letters.forEach(function (l, i) {
          var u = seg(rt, TM.HEAD0 + i * 0.04, TM.HEAD0 + i * 0.04 + 0.34);
          var bob = Math.sin(t * 3 + i * 0.6) * 4 * seg(rt, TM.HEAD0 + 1.0, TM.HEAD0 + 1.6);
          var out = r < NR - 1 ? smooth(seg(rt, TM.OUT0 + i * 0.006, TM.OUT0 + i * 0.006 + 0.3)) : 0;
          l.style.transform = "translateY(" + (((1 - Math.min(1, u * 1.4)) * 60 + bob) - out * 50).toFixed(1) + "px) scale(" + ((u <= 0 ? 0 : outBack(u)) * (1 - out)).toFixed(3) + ")";
        });
      });

      drawGL(t);

      // puffs (dust at a rim, sparkle at a hole), placed for the piece's state in the current round
      B.forEach(function (b, i) {
        var R = b.R[rNow], pf = puffs[i], key = rNow + R.state;
        if (pf.key !== key) {
          pf.key = key;
          var sp = puffSpot(b, rNow);
          if (sp) { pf.box.style.left = sp[0].toFixed(1) + "px"; pf.box.style.top = sp[1].toFixed(1) + "px"; }
          pf.dots.forEach(function (d, j) {
            d.style.background = R.state === "miss" ? (j % 2 ? "#f6ead2" : "#e2c79a") : (j % 2 ? "#fff6dc" : GOLD);
            d.style.boxShadow = R.state === "miss" ? "0 0 8px rgba(255,244,222,0.9)" : "0 0 6px rgba(255,240,200,0.8)";
          });
        }
        var pu = seg(ltNow, R.land - 0.05, R.land + 0.55), big = R.state === "miss" ? 0.9 : 1;
        pf.dots.forEach(function (d, j) {
          var a = j / pf.dots.length * Math.PI * 2 + 0.3, dist = (14 + 80 * smooth(pu)) * big;
          d.style.opacity = pu > 0 && pu < 1 ? (0.9 * (1 - pu)).toFixed(3) : 0;
          d.style.transform = "translate(" + (Math.cos(a) * dist).toFixed(1) + "px," + (Math.sin(a) * dist * 0.4 - (R.state === "miss" ? 14 : 30) * pu).toFixed(1) + "px) scale(" + ((1.2 - pu * 0.7) * big).toFixed(3) + ")";
        });
      });

      // counters: one card per round, built by that round's landings, ending on the exact number in the data
      var cn = countersAt(t);
      CARDS.forEach(function (cd, i) {
        var cu = seg(t, i * RD + 0.2, i * RD + 0.6);
        cd.box.style.opacity = cu > 0 ? 1 : 0;
        cd.box.style.transform = "scale(" + (cu <= 0 ? 0 : outBack(cu)).toFixed(3) + ")";
        var rd = PL.rounds[i], val = cn.v[i], bg2, fg = "#fff";
        if (i === 0) {
          cd.num.textContent = val + " " + c.of + " " + daysTotal;
          bg2 = (val === daysTotal || t < rd.endAt) ? GREEN : "#b8770f";
        } else {
          cd.num.textContent = String(val);
          if (PL.units[i] > 0) { bg2 = val > 0 ? GOLD : "#8fa0bd"; if (val > 0) fg = INK; }
          else bg2 = rd.present > 0 ? GREEN : "#8fa0bd";                // a clean round: the 0 is the good news
        }
        cd.num.style.background = bg2; cd.num.style.color = fg;
        var joy = rd.perfect ? seg(t, i * RD + rd.endAt - 0.7, i * RD + rd.endAt + 0.3) : 0;
        cd.num.style.transform = "scale(" + (popNum(cd.num, cn.last[i], t) + 0.1 * Math.sin(joy * Math.PI)).toFixed(3) + ")";
        SPARKS[i].forEach(function (e, j) {
          // an arc over the top of the card (from 150 to 30 degrees above the horizontal), always outside the card, so the number stays readable
          var a = -(150 - 120 * j / (SPARKS[i].length - 1)) * Math.PI / 180, rx = 205 + 10 * smooth(joy), ry = 112 + 90 * smooth(joy);
          e.style.opacity = joy > 0 && joy < 1 ? (1 - joy * joy).toFixed(3) : 0;
          e.style.transform = "translate(" + (Math.cos(a) * rx).toFixed(1) + "px," + (Math.sin(a) * ry).toFixed(1) + "px) rotate(" + (joy * 120).toFixed(0) + "deg) scale(1.3)";
        });
      });

      // tags: pop up when the piece lands, leave with the round
      TAGLIST.forEach(function (g) {
        var rt = t - g.r * RD, tu = seg(rt, g.at, g.at + 0.35), to = g.r < NR - 1 ? smooth(seg(rt, TM.OUT0 + 0.02, TM.OUT0 + 0.3)) : 0;
        var sc = (tu <= 0 ? 0 : outBack(tu)) * (1 - to);
        g.el.style.opacity = tu > 0 && sc > 0.001 ? 1 : 0;
        g.el.style.transform = "scale(" + Math.max(0, sc).toFixed(3) + ")";
        g.tg.style.transform = "rotate(" + (Math.sin(t * 2 + g.i) * 2 * seg(rt, g.at + 0.4, g.at + 0.8)).toFixed(2) + "deg)";
      });
    });
    if (c.debug) window.__p2s = { B: B, ok: ok, PL: PL, shCan: shCan, camera: camera, renderer: renderer, scene: scene };
    // a remount (Replay, or the window changing shape) must free this WebGL context, or the browser runs out of them after about 16
    return { destroy: function () { try { if (renderer) { renderer.dispose(); renderer.forceContextLoss(); } } catch (e) { /* already gone */ } } };
  }
});
})();
