/* Grade 3-6 jigsaw beat · p36-puzzle  (3D living storybook; the girls' game for Grade 3 to Grade 6, THREE ROUNDS of 6 s = 18 s)
 * "Last week at school" as a 12-piece jigsaw of the AIS logo on a wooden tray, seen from above. One piece per school day open (at most four per row), one ROW per round:
 *   Round 1 "Came to school"  : a day ABSENT is a miss (gold tag Absent).
 *   Round 2 "On time"         : a day LATE TO SCHOOL is a miss (gold tag Late to school). A day she was ABSENT misses again, with the tag Absent (nothing is greyed).
 *   Round 3 "Stayed all day"  : a day she LEFT EARLY is a miss (gold tag Early leave); absent days miss again with the tag Absent.
 *   Order inside a round (same rules as the P-2 sorter, p2-sorter.js): the pieces that fit go first, then the round's own misses (late / early), the absent misses LAST.
 * The board BUILDS UP across the rounds: row 1 stays when row 2 starts, so a perfect week ends on the whole AIS logo (a short gold sparkle on the finished logo).
 *   Good day : the piece comes in from above, hovers over its slot (big soft shadow), drops in and settles (the shadow tightens to nothing: it is flush). No squash.
 *   Missed day: the piece comes to its slot, turned the wrong way, bumps the edge, does NOT fit, slides off the tray and lies on the desk below it (rotated a little) with its
 *              gold tag. Missed pieces stay on the desk for the rest of the scene, small and tidy (a grid, up to 12); the slot they leave stays empty (a faint outline).
 *   Days not open that week (fewer than four): those columns' pieces are already in place when the round starts (normal colour, no animation, no tag).
 *   More misses than free pieces (odd data): the extra misses count on one tag ("Late to school x2"); if no piece is left the number just ticks on its card.
 * Three counter cards at the bottom (same as the sorter): Days at school N of M (round 1), Late to school N (round 2), Early leave N (round 3); each ends on the exact number in
 * the data (absent misses in rounds 2 and 3 carry a tag but never add to the Late / Early numbers).
 * The pieces are pictures (pieces cut from the AIS logo by src/tools/jigsaw.py, seed 36, packed by src/tools/puzzle_pack.py: p-rXcY.webp = piece with its bevel, s-rXcY.webp = its
 * soft shadow); the slot outlines are drawn from the same curves (ported from jigsaw.py). No WebGL. Every frame is a pure function of t (kit rule 1).
 * MotionIgor.registry["p36-puzzle"].cues(content) returns [{ t, name }] in beat-local seconds: round-start, piece-in (a piece drops into its slot), piece-miss (a missed piece
 * bumps the edge), tag-absent, tag-late, tag-early, round-clear.
 */
(function () {
// ---------------------------------------------------------------- timing and the plan (pure data, no DOM: cues() uses it too)
var RD = 6, NR = 3, DUR = 18;                                         // seconds per round, rounds, length of the beat
var TM = { HEAD0: 0.1, GO0: 0.75, STEP: 0.9, ENT: 0.5, HOLD: 0.65, DROP: 0.85, SETTLE: 1.0, APP: 0.72, REB: 0.95, SLIDE: 1.45, TAG: 0.1, TAGSTEP: 0.15, OUT0: RD - 0.45, OUTD: 0.4 };
var ROUND_TAG = ["absent", "late", "early"];
function makePlan(wk) {
  wk = wk || {};
  var D = Math.max(0, Math.round(wk.daysOpen || 0)), n = Math.min(4, D);
  var units = [Math.max(0, Math.round(wk.absent || 0)), Math.max(0, Math.round(wk.lateToSchool || 0)), Math.max(0, Math.round(wk.earlyLeave || 0))];
  var absPieces = Math.min(units[0], n);
  var plan = { D: D, n: n, units: units, rounds: [], target: [Math.max(0, D - units[0]), units[1], units[2]], misses: 0 };
  for (var r = 0; r < NR; r++) {
    var own = r === 0 ? 0 : Math.min(units[r], n - absPieces), m = absPieces + own, firstMiss = n - m, pieces = [], i, q;
    for (i = 0; i < n; i++) {
      var tag = i < firstMiss ? null : (i >= n - absPieces ? "absent" : ROUND_TAG[r]);
      pieces.push({ i: i, state: tag ? "miss" : "good", tag: tag, k: i, u: 0, t0: 0, land: 0, tagAt: [], cell: -1 });
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
      p.bump = p.t0 + TM.APP;
      p.land = p.t0 + (p.state === "miss" ? TM.SLIDE : TM.DROP);
      if (p.state === "miss") plan.misses++;
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
  // the desk: every missed piece gets the next free cell, round by round, left to right (the layout depends only on how many there are)
  var cell = 0;
  plan.rounds.forEach(function (rd) { rd.pieces.forEach(function (p) { if (p.state === "miss") p.cell = cell++; }); });
  plan.whole = plan.misses === 0;                                     // every piece in: the whole AIS logo
  return plan;
}
function makeCues(wk) {
  var plan = makePlan(wk), out = [];
  plan.rounds.forEach(function (R) {
    var base = R.r * RD;
    out.push({ t: +(base + 0.1).toFixed(3), name: "round-start" });
    R.pieces.forEach(function (p) {
      if (p.state === "good") out.push({ t: +(base + p.land).toFixed(3), name: "piece-in" });
      if (p.state === "miss") {
        out.push({ t: +(base + p.bump).toFixed(3), name: "piece-miss" });
        p.tagAt.forEach(function (ta) { out.push({ t: +(base + ta).toFixed(3), name: "tag-" + p.tag }); });
      }
    });
    if (R.events.length && R.r > 0 && R.events[0].p === null) out.push({ t: +(base + R.events[0].t).toFixed(3), name: "tag-" + R.tag });
    if (R.r < NR - 1) out.push({ t: +(base + TM.OUT0).toFixed(3), name: "round-clear" });
  });
  out.sort(function (a, b) { return a.t - b.t; });
  return out;
}

// ---------------------------------------------------------------- the jigsaw geometry (ported from src/tools/jigsaw.py, seed 36; packed numbers from puzzle_pack.py)
// W x H = the puzzle picture (1600 x 960), 4 x 3 pieces. h / v = the tab parameters of every shared inner edge, offsets = where each piece's picture starts (in picture pixels).
var JIG = {"W":1600,"H":960,"cols":4,"rows":3,"Q":0.72,
 "h":{"1,0":{"sign":1,"shift":-0.0618282331701372,"neck":-0.019061768664671935,"height":0.26006843899128007},"1,1":{"sign":1,"shift":0.052509327314818,"neck":-0.019981875139375528,"height":0.25134945265071673},"1,2":{"sign":-1,"shift":-0.03228194846017493,"neck":0.009355973150264658,"height":0.23822568757835336},"1,3":{"sign":1,"shift":0.005988509140050877,"neck":0.005927289265045845,"height":0.2613670578934288},"2,0":{"sign":1,"shift":-0.02162330786970333,"neck":0.01627455426606283,"height":0.2644632046831066},"2,1":{"sign":1,"shift":-0.04652770029541836,"neck":0.0031362576960209665,"height":0.2550800215321244},"2,2":{"sign":-1,"shift":0.0033873900860866,"neck":-0.01169908395314643,"height":0.25527350485075156},"2,3":{"sign":1,"shift":0.029858653277707606,"neck":0.004716069643066985,"height":0.22015811048220213}},
 "v":{"0,1":{"sign":1,"shift":0.0560976937256189,"neck":0.002256567450150307,"height":0.2578784857243719},"0,2":{"sign":-1,"shift":-0.011530571091362733,"neck":-0.0032651766676227746,"height":0.23040808255516163},"0,3":{"sign":1,"shift":0.06066844560288731,"neck":0.012725790440810496,"height":0.25762775806322},"1,1":{"sign":1,"shift":0.015575261601167484,"neck":-0.009375839954594147,"height":0.24536157498595856},"1,2":{"sign":1,"shift":-0.00662500874573467,"neck":0.012730884654844236,"height":0.26230581940517944},"1,3":{"sign":1,"shift":-0.04154930964491316,"neck":-0.012460832089281827,"height":0.2231844994892284},"2,1":{"sign":-1,"shift":0.0694350112403683,"neck":-0.0004803147743081791,"height":0.2556967261228518},"2,2":{"sign":-1,"shift":0.017473329851520544,"neck":-0.0043353681117456085,"height":0.22850724672388123},"2,3":{"sign":1,"shift":-0.05808942709979106,"neck":0.009220572899650097,"height":0.23049616456916155}},
 "pieces":{"r0c0":{"w":0,"h":0,"ox":-96,"oy":-96},"r0c1":{"ox":221,"oy":-96},"r0c2":{"ox":704,"oy":-96},"r0c3":{"ox":1021,"oy":-96},"r1c0":{"ox":-96,"oy":224},"r1c1":{"ox":225,"oy":224},"r1c2":{"ox":620,"oy":128},"r1c3":{"ox":1032,"oy":224},"r2c0":{"ox":-96,"oy":544},"r2c1":{"ox":304,"oy":544},"r2c2":{"ox":704,"oy":441},"r2c3":{"ox":1030,"oy":544}}};
var PW = JIG.W / JIG.cols, PH = JIG.H / JIG.rows;
var FLOOR = { x: 80, y: 613, k: 922 / 1600 };                         // the tray floor in the 1080 x 1920 plate: where the puzzle picture sits (jigsaw.py --floor 80,614,922,552)
function tabSegs(shift, neck, height) {
  var m = 0.5 + shift, a = 0.10 * height / 0.27, b = 0.22 * height / 0.27;
  return [[[m - 0.15, 0], [m - 0.08 + neck, 0.02], [m - 0.12 + neck, a]], [[m - 0.17 + neck, b], [m - 0.08, height], [m, height]],
          [[m + 0.08, height], [m + 0.17 - neck, b], [m + 0.12 - neck, a]], [[m + 0.08 - neck, 0.02], [m + 0.15, 0], [1, 0]]];
}
function bez(p0, p1, p2, p3, n) {
  var out = [];
  for (var i = 1; i <= n; i++) { var t = i / n, u = 1 - t; out.push([u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]]); }
  return out;
}
function edgePoints(a, b, e) {                                        // points from a to b (a excluded) along one tabbed edge
  var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L, nx = -uy * e.sign, ny = ux * e.sign, pts = [], p0 = [0, 0];
  tabSegs(e.shift, e.neck, e.height).forEach(function (s) { pts = pts.concat(bez(p0, s[0], s[1], s[2], 24)); p0 = s[2]; });
  return pts.map(function (p) { return [a[0] + (p[0] * ux + p[1] * nx) * L, a[1] + (p[0] * uy + p[1] * ny) * L]; });
}
function pieceOutline(r, c) {
  var x0 = c * PW, y0 = r * PH, x1 = (c + 1) * PW, y1 = (r + 1) * PH, pts = [[x0, y0]], f;
  pts = pts.concat(r > 0 ? edgePoints([x0, y0], [x1, y0], JIG.h[r + "," + c]) : [[x1, y0]]);
  pts = pts.concat(c < JIG.cols - 1 ? edgePoints([x1, y0], [x1, y1], JIG.v[r + "," + (c + 1)]) : [[x1, y1]]);
  if (r < JIG.rows - 1) { f = [[x0, y1]].concat(edgePoints([x0, y1], [x1, y1], JIG.h[(r + 1) + "," + c])); pts = pts.concat(f.slice().reverse().slice(1)); } else pts.push([x0, y1]);
  if (c > 0) { f = [[x0, y0]].concat(edgePoints([x0, y0], [x0, y1], JIG.v[r + "," + c])); pts = pts.concat(f.slice().reverse().slice(1)); }
  return pts;
}
function slotXY(r, c) { return [FLOOR.x + (c * PW + PW / 2) * FLOOR.k, FLOOR.y + (r * PH + PH / 2) * FLOOR.k]; }   // where the centre of piece (r, c) sits when it is in its slot

// ---------------------------------------------------------------- the desk under the tray: where the missed pieces lie
// One tidy flow layout, a pure function of the plan and the tag words: the missed pieces come in the order they were missed (round by round, left to right), each with its gold tag, packed
// in rows that are centred on the desk. Every piece gets its OWN rectangle (piece + tag, real gaps between neighbours) and the whole block must fit between the tray and the counter
// cards (DESK.top .. DESK.bot, the cards start at 1592). The tags are never smaller than 0.95 of the sorter's tag (font 34 px); the pieces are what shrinks when there are many.
// Styles, tried in this order until one fits: "big" = the piece with its tag under it (few misses, biggest pieces first), then "side" = the tag beside a small piece.
var DESK = { top: 1218, bot: 1581 };
var TAGF = 34, TAGH = 78, TGAP = 18, RGAP = 16, ROWW = 1032;   // gaps are for tags that wiggle by 1 degree (up to 4 px at the corners)
function tagWidthOf(label) { var n = String(label).length; return 112 + TAGF * (0.5 * Math.min(n, 6) + 0.44 * Math.max(0, n - 6)); }   // the natural width of a tag (measured at font 34: "Absent" 214, "Early leave \u00d74" 322, "Late to school \u00d74" 368; this is a little above each)
var BOXES = {};
function pieceBox(r, c) {                                           // the outline's box of piece (r, c) around its cell centre, in stage px at scale 1
  var k = r + "," + c;
  if (!BOXES[k]) {
    var o = pieceOutline(r, c), cx = c * PW + PW / 2, cy = r * PH + PH / 2, x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    o.forEach(function (q) { x0 = Math.min(x0, q[0]); x1 = Math.max(x1, q[0]); y0 = Math.min(y0, q[1]); y1 = Math.max(y1, q[1]); });
    BOXES[k] = { x0: (x0 - cx) * FLOOR.k, x1: (x1 - cx) * FLOOR.k, y0: (y0 - cy) * FLOOR.k, y1: (y1 - cy) * FLOOR.k };
  }
  return BOXES[k];
}
function restRot(j) { var v = (j * 37 + 11) % 21 - 10; return v === 0 ? 7 : v; }      // a small, fixed turn per cell: -10 .. +10 degrees
// items = [{ r, c, label }] in the order missed. Returns { cells: [{ x, y, rot, s, tx, ty }], ts, style, sp } (x, y = where the piece's wrapper goes; tx, ty = the centre of its tag).
function layoutDesk(items) {
  var M = items.length, avail = DESK.bot - DESK.top;
  if (!M) return { cells: [], ts: 1, style: "none", sp: 1 };
  var plans = [], q;
  [0.78, 0.7, 0.62, 0.54, 0.46, 0.4, 0.34].forEach(function (sp) { plans.push({ style: "big", sp: sp, ts: 1 }); });
  [0.54, 0.46, 0.4, 0.34, 0.3, 0.27, 0.24, 0.21, 0.18, 0.15, 0.12].forEach(function (sp) { plans.push({ style: "side", sp: sp, ts: 1 }, { style: "side", sp: sp, ts: 0.95 }); });   // below 0.21 only for weeks that cannot happen (5 early leaves in a 4 day week)
  for (q = 0; q < plans.length; q++) {
    var P = plans[q], cells = [], rows = [], row = null, j;
    for (j = 0; j < M; j++) {                                       // the footprint of every piece at this scale and its fixed turn
      var it = items[j], B = pieceBox(it.r, it.c), rot = restRot(j) * Math.PI / 180, w = (B.x1 - B.x0) * P.sp, h = (B.y1 - B.y0) * P.sp;
      var fw = w * Math.abs(Math.cos(rot)) + h * Math.abs(Math.sin(rot)) + 4, fh = h * Math.abs(Math.cos(rot)) + w * Math.abs(Math.sin(rot)) + 4;
      var tw = tagWidthOf(it.label) * P.ts, th = TAGH * P.ts;
      var cw = P.style === "big" ? Math.max(fw, tw) : fw + 10 + tw, ch = P.style === "big" ? fh + 4 + th : Math.max(fh, th);
      cells.push({ fw: fw, fh: fh, tw: tw, th: th, cw: cw, ch: ch, B: B, rot: restRot(j) });
    }
    for (j = 0; j < M; j++) {                                       // greedy rows, in order
      if (!row || row.w + (row.n ? TGAP : 0) + cells[j].cw > ROWW) { row = { w: 0, h: 0, n: 0, idx: [] }; rows.push(row); }
      row.w += (row.n ? TGAP : 0) + cells[j].cw; row.h = Math.max(row.h, cells[j].ch); row.n++; row.idx.push(j);
    }
    var H = rows.reduce(function (a, r2) { return a + r2.h; }, 0) + RGAP * (rows.length - 1);
    if (H > avail) continue;
    var y = DESK.top + (avail - H) / 2, out = [];
    rows.forEach(function (r2) {
      var x = 540 - r2.w / 2;
      r2.idx.forEach(function (jj) {
        var cl = cells[jj], rad = cl.rot * Math.PI / 180, B = cl.B, pcx, pcy, tx, ty;
        if (P.style === "big") { pcx = x + cl.cw / 2; pcy = y + cl.fh / 2; tx = pcx; ty = y + cl.fh + 4 + cl.th / 2; }
        else { pcx = x + cl.fw / 2; pcy = y + r2.h / 2; tx = x + cl.fw + 10 + cl.tw / 2; ty = pcy; }
        var bx = (B.x0 + B.x1) / 2 * P.sp, by = (B.y0 + B.y1) / 2 * P.sp;                       // the wrapper turns about the cell centre: put the piece's box centre on (pcx, pcy)
        out[jj] = { x: pcx - (bx * Math.cos(rad) - by * Math.sin(rad)), y: pcy - (bx * Math.sin(rad) + by * Math.cos(rad)), rot: cl.rot, s: P.sp, tx: tx, ty: ty, pcx: pcx, pcy: pcy };
        x += cl.cw + TGAP;
      });
      y += r2.h + RGAP;
    });
    return { cells: out, ts: P.ts, style: P.style, sp: P.sp };
  }
  return { cells: items.map(function () { return { x: 540, y: 1400, rot: 0, s: 0.2, tx: 540, ty: 1500, pcx: 540, pcy: 1400 }; }), ts: 0.95, style: "overflow", sp: 0.2 };   // cannot happen with at most 12 misses (checked for every week)
}

MotionIgor.define({
  id: "p36-puzzle",
  duration: DUR,
  size: [1080, 1920],
  kind: "scene",
  title: "Grade 3-6 report · last week at school (jigsaw)",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  cues: function (content) { return makeCues(MotionIgor.util.deepMerge(MotionIgor.registry["p36-puzzle"].defaults, content || {}).lastWeek); },
  // the desk layout of a week (for the checks): { style, sp, ts, cells: [{ x, y, rot, s, tx, ty }] } in the order the pieces are missed
  layout: function (content) {
    var c = MotionIgor.util.deepMerge(MotionIgor.registry["p36-puzzle"].defaults, content || {}), PL = makePlan(c.lastWeek), items = [];
    PL.rounds.forEach(function (rd) { rd.pieces.forEach(function (p) { if (p.state === "miss") items.push({ r: rd.r, c: p.i, label: c.tags[p.tag] + (p.u > 1 ? " \u00d7" + p.u : "") }); }); });
    return layoutDesk(items);
  },
  defaults: {
    art: "puzzle-layers/",
    subtitle: "Last week at school",
    rounds: [{ head: [["Came", "to"], ["school"]] }, { head: [["On"], ["time"]] }, { head: [["Stayed", "all"], ["day"]] }],
    counter: "Days at school",
    of: "of",
    lateLabel: "Late to school",
    earlyLabel: "Early leave",
    tags: { absent: "Absent", late: "Late to school", early: "Early leave" },
    lastWeek: { daysOpen: 4, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    badge: "Weekly report",
    episode: "Week 7",
    look: "girl",
    band: "g36",
    chrome: true
  },
  build: function (ctx) {
    var c = ctx.content, WD = P2Wide.begin(ctx), st = WD.col, esc = ctx.util.esc;
    var FONT = "Fredoka, Outfit, system-ui, sans-serif";
    var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f", GOLDD = "#d99a12";
    var ART = P2Kid.art(c, c.art);                                    // girl36/puzzle-layers/ (this scene lives in the Grade 3-6 girl folder)
    function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
    function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
    function smooth(x) { return x * x * (3 - 2 * x); }
    function outBack(x) { var k = 1.9; x = x - 1; return 1 + (k + 1) * x * x * x + k * x * x; }
    function outCubic(x) { x = 1 - x; return 1 - x * x * x; }
    function inQuad(x) { return x * x; }
    function inOut(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
    function lerp(a, b, k) { return a + (b - a) * k; }
    function el(tag, css, parent) { var e = document.createElement(tag); if (css) e.style.cssText = css; (parent || st).appendChild(e); return e; }

    var PL = makePlan(c.lastWeek), daysTotal = PL.D, n = PL.n, KS = FLOOR.k;
    var missItems = [];                                                // the missed pieces in the order they are missed: the desk layout needs their tag words
    PL.rounds.forEach(function (rd) { rd.pieces.forEach(function (p) { if (p.state === "miss") missItems.push({ r: rd.r, c: p.i, label: c.tags[p.tag] + (p.u > 1 ? " \u00d7" + p.u : "") }); }); });
    var DK = layoutDesk(missItems);
    ctx.stage.style.background = "#efe2d0";
    // ---------------------------------------------------------------- the tray plate (one picture) and the slot outlines
    var world = el("div", "position:absolute;left:0;top:0;width:1080px;height:1920px;z-index:0");     // z-index 0: the pieces' own z-indexes stay inside this layer, under the data layer
    var bg = el("img", "position:absolute;" + WD.bg(1920) + ";display:block;max-width:none", world);
    bg.src = WD.src(ART, "puzzle-bg.jpg", "bg.jpg"); bg.alt = ""; bg.draggable = false;
    var svgNS = "http://www.w3.org/2000/svg";
    var outl = document.createElementNS(svgNS, "svg");
    outl.setAttribute("width", "1080"); outl.setAttribute("height", "1920"); outl.style.cssText = "position:absolute;left:0;top:0;pointer-events:none;overflow:visible";
    world.appendChild(outl);
    for (var rr0 = 0; rr0 < 3; rr0++) for (var cc0 = 0; cc0 < 4; cc0++) {
      var pl = document.createElementNS(svgNS, "path");
      pl.setAttribute("d", "M" + pieceOutline(rr0, cc0).map(function (p) { return (FLOOR.x + p[0] * KS).toFixed(1) + " " + (FLOOR.y + p[1] * KS).toFixed(1); }).join("L") + "Z");
      pl.setAttribute("fill", "none"); pl.setAttribute("stroke", "rgba(140,104,60,0.34)"); pl.setAttribute("stroke-width", "2.2"); pl.setAttribute("stroke-linejoin", "round");
      outl.appendChild(pl);
    }

    // ---------------------------------------------------------------- the 12 pieces: a shadow and a piece picture each (all in the DOM from the start, shown by state)
    var PICS = [];                                                    // PICS[r][cIdx] = { r, c, wrap, sh, pc }
    for (var r = 0; r < 3; r++) {
      PICS[r] = [];
      for (var cI = 0; cI < 4; cI++) {
        var key = "r" + r + "c" + cI, pm = JIG.pieces[key], sc = slotXY(r, cI);
        var imgCss = function (src, kind) {
          var im = new Image(); im.src = ART + kind + "-" + key + ".webp"; im.alt = ""; im.draggable = false;
          return im;
        };
        var wrapS = el("div", "position:absolute;left:0;top:0;width:0;height:0;opacity:0;transform-origin:0 0;will-change:transform,opacity", world);
        var wrapP = el("div", "position:absolute;left:0;top:0;width:0;height:0;opacity:0;transform-origin:0 0;will-change:transform,opacity", world);
        var offx = (pm.ox - (cI * PW + PW / 2)) * KS, offy = (pm.oy - (r * PH + PH / 2)) * KS;
        [[wrapS, "s"], [wrapP, "p"]].forEach(function (pr) {
          var im = imgCss(null, pr[1]);
          im.style.cssText = "position:absolute;left:" + offx.toFixed(2) + "px;top:" + offy.toFixed(2) + "px;max-width:none;display:block;-webkit-user-drag:none;user-select:none";
          im.addEventListener("load", function () { im.style.width = (im.naturalWidth * KS / JIG.Q).toFixed(2) + "px"; im.style.height = (im.naturalHeight * KS / JIG.Q).toFixed(2) + "px"; });
          pr[0].appendChild(im);
        });
        PICS[r][cI] = { r: r, c: cI, sx: sc[0], sy: sc[1], sh: wrapS, pc: wrapP, shown: "", z: -1 };
      }
    }
    // the plan's piece for (r, c), or null when that column's day was not open (pre-placed)
    function planPiece(r, cI) { return cI < n ? PL.rounds[r].pieces[cI] : null; }
    function place(w, x, y, rot, s, extra) {
      w.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px) rotate(" + rot.toFixed(2) + "deg) scale(" + s.toFixed(4) + ")" + (extra || "");
    }
    // the piece's pose at piece-local time tt (seconds after its t0): { x, y, rot, s, hi (0 lying flat .. 1 high above), z, mode }
    function poseOf(P, p, tt) {
      var sx = P.sx, sy = P.sy, sg = p.i % 2 ? 1 : -1, hy = sy - 72, cell = p.state === "miss" ? DK.cells[p.cell] : null, wrong = sg * 16;
      var sX = sx + sg * 170, sY = -300, sR = sg * 22, sS = 1.18, hS = 1.10, u;
      if (tt < 0) return null;
      if (tt < TM.ENT) {                                              // in from above, to hover over the slot
        u = outCubic(tt / TM.ENT);
        return { x: lerp(sX, sx, u), y: lerp(sY, hy, u), rot: lerp(sR, p.state === "miss" ? wrong : 0, u), s: lerp(sS, hS, u), hi: 1, z: 60, mode: "fly" };
      }
      if (p.state === "good") {
        if (tt < TM.HOLD) return { x: sx, y: hy - 3 * Math.sin((tt - TM.ENT) / (TM.HOLD - TM.ENT) * Math.PI), rot: 0, s: hS, hi: 1, z: 60, mode: "fly" };
        if (tt < TM.DROP) { u = inQuad((tt - TM.HOLD) / (TM.DROP - TM.HOLD)); return { x: sx, y: lerp(hy, sy, u), rot: 0, s: lerp(hS, 1, u), hi: 1 - u, z: 60, mode: "fly" }; }
        if (tt < TM.SETTLE) { u = (tt - TM.DROP) / (TM.SETTLE - TM.DROP); return { x: sx, y: sy - 3.5 * Math.sin(u * Math.PI), rot: 0, s: 1, hi: 0, z: 60, mode: "fly" }; }
        return { x: sx, y: sy, rot: 0, s: 1, hi: 0, z: 10 + P.r, mode: "slot" };
      }
      // a missed day: bumps the edge, does not fit, slides off to its cell on the desk
      var bumpY = sy - 14;
      if (tt < TM.APP) { u = smooth((tt - TM.ENT) / (TM.APP - TM.ENT)); return { x: sx, y: lerp(hy, bumpY, u), rot: wrong, s: lerp(hS, 1.03, u), hi: lerp(1, 0.35, u), z: 60, mode: "fly" }; }
      if (tt < TM.REB) {
        u = (tt - TM.APP) / (TM.REB - TM.APP);
        return { x: sx + Math.sin(u * Math.PI * 4) * 9 * (1 - u), y: bumpY - 22 * Math.sin(u * Math.PI), rot: wrong * Math.cos(u * Math.PI * 2.5) * (1 - 0.5 * u) - sg * 4 * u, s: 1.03, hi: 0.35 + 0.2 * Math.sin(u * Math.PI), z: 60, mode: "fly" };
      }
      if (tt < TM.SLIDE) {
        u = inOut((tt - TM.REB) / (TM.SLIDE - TM.REB));
        var r0 = -sg * 4;
        return { x: lerp(sx, cell.x, u), y: lerp(bumpY, cell.y, u), rot: lerp(r0, cell.rot, u), s: lerp(1.03, cell.s, u), hi: lerp(0.35, 0, u), z: 60, mode: "slide" };
      }
      return { x: cell.x, y: cell.y, rot: cell.rot, s: cell.s, hi: 0, z: 20, mode: "desk" };
    }
    // ---------------------------------------------------------------- data layer (DOM over the picture): badge, week, headings, tags, counters
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

    // counter cards (identical to the sorter's)
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
    // a short gold sparkle over the finished logo (a perfect week only)
    var LOGO = [];
    if (PL.whole && n > 0) {
      var rnd = ctx.util.prng(36), bx = FLOOR.x, by = FLOOR.y, bw = JIG.W * KS, bh = JIG.H * KS;
      for (var q2 = 0; q2 < 18; q2++) {
        var s1 = el("div", "position:absolute;left:-18px;top:-18px;width:36px;height:36px;opacity:0", world);
        s1.innerHTML = '<svg viewBox="-16 -16 32 32" width="36" height="36"><path d="M0-14 L3.6-4.6 13.3-4.3 5.8 1.8 8.2 11.3 0 5.8-8.2 11.3-5.8 1.8-13.3-4.3-3.6-4.6Z" fill="' +
          (q2 % 3 === 0 ? "#fff6c9" : GOLD) + '" stroke="#b97f08" stroke-width="1.6" stroke-linejoin="round"/></svg>';
        LOGO.push({ e: s1, x: bx + (0.06 + 0.88 * rnd()) * bw, y: by + (0.08 + 0.84 * rnd()) * bh, d: q2 * 0.045, sz: 0.7 + 0.8 * rnd() });
      }
    }

    // gold tags for missed days, under the piece that carries them (never red)
    var ICON = {
      absent: '<path d="M6 6 L22 22 M22 6 L6 22" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>',
      late: '<circle cx="14" cy="14" r="10" fill="none" stroke="#fff" stroke-width="3.5"/><path d="M14 8 V14 L18 17" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>',
      early: '<path d="M7 4 H19 V24 H7 Z" fill="none" stroke="#fff" stroke-width="3.2"/><path d="M13 14 H25 M21 10 L25 14 L21 18" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round"/>'
    };
    var TAGLIST = [], TS = DK.ts;
    PL.rounds.forEach(function (rd) {
      rd.pieces.forEach(function (p) {
        if (p.state !== "miss") return;
        var cell = DK.cells[p.cell], label = c.tags[p.tag] + (p.u > 1 ? " ×" + p.u : "");
        var box = el("div", "position:absolute;left:" + cell.tx.toFixed(1) + "px;top:" + cell.ty.toFixed(1) + "px;width:0;height:0;transform-origin:0 0", data);
        var tg = el("div", "position:absolute;left:0;top:0;translate:-50% -50%;display:flex;align-items:center;gap:12px;white-space:nowrap;padding:12px 24px 12px 14px;border-radius:999px;" +
          "background:" + GOLD + ";border:5px solid " + INK + ";box-shadow:5px 5px 0 " + INK + ";font:700 " + TAGF + "px/1 " + FONT + ";color:" + INK + ";transform-origin:50% 50%", box);
        tg.innerHTML = '<span style="display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:' + GOLDD + ';border:3px solid ' + INK +
          '"><svg width="28" height="28" viewBox="0 0 28 28">' + ICON[p.tag] + "</svg></span>" + esc(label);
        box.setAttribute("data-tag", p.tag); box.setAttribute("data-round", rd.r); box.setAttribute("data-piece", p.i);
        TAGLIST.push({ el: box, tg: tg, at: p.tagAt[0], r: rd.r, i: TAGLIST.length });
      });
    });
    function roundOf(t) { return clamp(Math.floor(t / RD), 0, NR - 1); }
    function countersAt(t) {
      var v = [0, 0, 0], last = [-9, -9, -9];
      PL.rounds.forEach(function (rd) { rd.events.forEach(function (e) { var at = rd.r * RD + e.t; if (t >= at) { v[rd.r] += e.dv; last[rd.r] = Math.max(last[rd.r], at); } }); });
      return { v: v, last: last };
    }
    function popNum(el2, since, t) { return 1 + 0.2 * Math.sin(seg(t, since, since + 0.32) * Math.PI); }
    var lastLogoAt = 0;
    PL.rounds[NR - 1].pieces.forEach(function (p) { if (p.state === "good") lastLogoAt = Math.max(lastLogoAt, (NR - 1) * RD + p.land); });

    // ---------------------------------------------------------------- draw (a pure function of t)
    // the piece layers stay in the page and are shown with opacity, never display / visibility: WebKit paints a layer that is created or destroyed during an animation blank (Safari law, 2026-07-09)
    function show(w, on) { var o = on ? "1" : "0"; if (w.style.opacity !== o) w.style.opacity = o; }
    ctx.onDraw(function (t) {
      var rNow = roundOf(t);
      var su = seg(t, 0.05, 0.45);
      sub.style.opacity = su > 0 ? 1 : 0;
      sub.style.transform = "scale(" + (su <= 0 ? 0 : outBack(su)).toFixed(3) + ")";
      HEADS.forEach(function (h, r) {
        var rt = t - r * RD, on = rt >= 0 && (r === NR - 1 || rt < TM.OUT0 + TM.OUTD);
        h.host.style.display = on ? "flex" : "none";
        if (!on) return;
        h.letters.forEach(function (l, i) {
          var u = seg(rt, TM.HEAD0 + i * 0.04, TM.HEAD0 + i * 0.04 + 0.34);
          var bob = Math.sin(t * 3 + i * 0.6) * 4 * seg(rt, TM.HEAD0 + 1.0, TM.HEAD0 + 1.6);
          var out = r < NR - 1 ? smooth(seg(rt, TM.OUT0 + i * 0.006, TM.OUT0 + i * 0.006 + 0.3)) : 0;
          l.style.transform = "translateY(" + (((1 - Math.min(1, u * 1.4)) * 60 + bob) - out * 50).toFixed(1) + "px) scale(" + ((u <= 0 ? 0 : outBack(u)) * (1 - out)).toFixed(3) + ")";
        });
      });
      // the pieces
      for (var r = 0; r < 3; r++) for (var cI = 0; cI < 4; cI++) {
        var P = PICS[r][cI], p = planPiece(r, cI), rt0 = t - r * RD, ps = null;
        if (!p) ps = { x: P.sx, y: P.sy, rot: 0, s: 1, hi: 0, z: 10 + r, mode: "slot" };                  // a day that was not open: in place from the first frame of the beat, in all three rows
        else if (rt0 < 0) ps = null;
        else ps = poseOf(P, p, rt0 - p.t0);
        if (!ps) { show(P.pc, false); show(P.sh, false); continue; }
        show(P.pc, true);
        place(P.pc, ps.x, ps.y, ps.rot, ps.s);
        if (P.z !== ps.z) { P.z = ps.z; P.pc.style.zIndex = ps.z * 2 + 1; P.sh.style.zIndex = ps.z * 2; }
        var shOn = ps.mode === "desk" || ps.mode === "slide" || (ps.mode === "fly" && ps.hi > 0.01);
        show(P.sh, shOn);
        if (shOn) {
          var h = ps.hi;
          place(P.sh, ps.x + (4 + 20 * h) * ps.s, ps.y + (6 + 34 * h) * ps.s, ps.rot, ps.s * (1 + 0.05 * h));
          P.sh.style.opacity = (0.42 - 0.14 * h).toFixed(3);
        }
      }
      // the finished logo: a short gold sparkle
      LOGO.forEach(function (g) {
        var u = seg(t, lastLogoAt + 0.15 + g.d, lastLogoAt + 1.25 + g.d);
        show(g.e, u > 0 && u < 1);
        if (u > 0 && u < 1) { g.e.style.opacity = Math.sin(u * Math.PI).toFixed(3); g.e.style.transform = "translate(" + g.x.toFixed(1) + "px," + (g.y - 26 * u).toFixed(1) + "px) rotate(" + (u * 140).toFixed(0) + "deg) scale(" + (g.sz * (0.5 + 0.7 * Math.sin(u * Math.PI))).toFixed(3) + ")"; }
      });
      // counters
      var cn = countersAt(t);
      CARDS.forEach(function (cd, i) {
        var cu = seg(t, i * RD + 0.2, i * RD + 0.6);
        cd.box.style.opacity = cu > 0 ? 1 : 0;
        cd.box.style.transform = "scale(" + (cu <= 0 ? 0 : outBack(cu)).toFixed(3) + ")";
        var rd = PL.rounds[i], val = cn.v[i], bg2, fg = "#fff";
        if (i === 0) {
          cd.num.textContent = val + " " + c.of + " " + daysTotal;
          bg2 = (val === daysTotal || t < i * RD + rd.endAt) ? GREEN : "#b8770f";
        } else {
          cd.num.textContent = String(val);
          if (PL.units[i] > 0) { bg2 = val > 0 ? GOLD : "#8fa0bd"; if (val > 0) fg = INK; }
          else bg2 = rd.present > 0 ? GREEN : "#8fa0bd";
        }
        cd.num.style.background = bg2; cd.num.style.color = fg;
        var joy = rd.perfect ? seg(t, i * RD + rd.endAt - 0.7, i * RD + rd.endAt + 0.3) : 0;
        cd.num.style.transform = "scale(" + (popNum(cd.num, cn.last[i], t) + 0.1 * Math.sin(joy * Math.PI)).toFixed(3) + ")";
        SPARKS[i].forEach(function (e, j) {
          var a = -(150 - 120 * j / (SPARKS[i].length - 1)) * Math.PI / 180, rx = 205 + 10 * smooth(joy), ry = 112 + 90 * smooth(joy);
          e.style.opacity = joy > 0 && joy < 1 ? (1 - joy * joy).toFixed(3) : 0;
          e.style.transform = "translate(" + (Math.cos(a) * rx).toFixed(1) + "px," + (Math.sin(a) * ry).toFixed(1) + "px) rotate(" + (joy * 120).toFixed(0) + "deg) scale(1.3)";
        });
      });
      // tags: pop up when the piece comes to rest on the desk, then stay with it to the end of the beat
      TAGLIST.forEach(function (g) {
        var rt = t - g.r * RD, tu = seg(rt, g.at, g.at + 0.35), sc = (tu <= 0 ? 0 : outBack(tu)) * TS;
        g.el.style.opacity = tu > 0 && sc > 0.001 ? 1 : 0;
        g.el.style.transform = "scale(" + Math.max(0, sc).toFixed(3) + ")";
        g.tg.style.transform = "rotate(" + (Math.sin(t * 2 + g.i) * 1 * seg(rt, g.at + 0.4, g.at + 0.8)).toFixed(2) + "deg)";
      });
    });
    if (c.debug) window.__p36 = { PL: PL, DK: DK, TS: TS, OUT: pieceOutline, K: KS, PW: PW, PH: PH, PICS: PICS, TAGLIST: TAGLIST, CARDS: CARDS, LOGO: LOGO };
    return {};
  }
});
})();
