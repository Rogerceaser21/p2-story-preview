/* P-2 page · p2-page   (the primary parent page in the story's 3D storybook look; the last story beat AND the page itself)
 *
 * P2Page.mount(el, response, opts) -> { setYear(key), setView("term"|"year"), setWeek(weekEnding), goToWeek(), seek(t), getState(), destroy() }
 *
 * One renderer, two places. Today the story's last beat mounts it inside the 1080 x 1920 stage (scaled by 1080 / 390); later the
 * app mounts the same file as /primary-parent/<token> itself. It is real, responsive DOM (design width 390 CSS px, fine from 360 to
 * 430 and wider), plain JS, no React, no build step.
 *
 * Content (what PrimaryParentDashboard.tsx shows a primary family, same order, same wording and rules):
 *   title "Student Attendance Report"; 26/27 | 25/26 year switch (only when the child has both); the Term / Week picker (26/27, a native
 *   select grouped term by term, "Term 1 \u00b7 Week 7 \u00b7 Week ending 15 Oct"; it follows D3 of the app: the chosen week replaces "Last
 *   Week" in the week button, the week block and the charts); the data note "This data is our most accurate data as of <date>.";
 *   the child's first name and class; This Year / This Term / <week name> buttons (the first two switch the three cards, the week button
 *   scrolls to the week block); Absences card (total days absent, attendance %); Total Time not at School (minutes, hours, lessons);
 *   Lateness (total days late, punctuality %); the week block with its "Week ending 15 Oct" label (days absent, late to school, early
 *   leave); three charts (Absence, Late to School, Early Leave), each with week / This Term / This Year bars; the data note again at
 *   the bottom. 25/26 follows the page: no week button, no week block, no Term / Week picker, two bars per chart.
 * Left off on purpose (primary does not track them): Late to Class, Bathroom Visits, Clinic Visits, Recognition awards, "More about this year".
 * Never red: a miss is gold, a zero is a green tick.
 *
 * Layout (22 Oct, Igor's points 4 and 6): order is title, 26/27 button + Term / Week picker, data note, then the clock wall as a modest banner (480 px wide at most,
 * about 20% of a phone screen, fading into the page on wide screens), then the child card and cards. The page scales by its OWN width (container queries, so the
 * story stage, a phone and a laptop all work): under 600 px one column; 600 and up two columns; 960 and up the three summary cards and the three charts side by
 * side, content never wider than 1200 px.
 *
 * Numbers come from P2Data.toPage(response) (p2-data.js), which copies the page's own rules; nothing is worked out here.
 * Every number element carries data-m="<name>" and data-v="<number>" (the check script and later tests read those).
 *
 * opts: { wall: "final-layers/wall-tall.jpg"   the wall picture behind the page (scrolls with it)
 *         font: "Fredoka-normal.woff2"          the font file (declared as P2Fredoka)
 *         scroll: "self" | "window"             who scrolls: the host element itself (story stage) or the document (default "window")
 *         entrance: true | false                standalone only: play the entrance by itself (default true; the story drives seek(t) instead)
 *         driven: true                          the caller drives the entrance through seek(t) (the story does) }
 *
 * seek(t): the ENTRANCE as a pure function of t (cards rise one after another, rings fill, numbers count up, bars grow), t in seconds,
 * done at P2Page.END (3 s). From END on the page is complete and live: tappable and scrollable. Seeking back before END shows the
 * entrance of the default view again (this resets the year and view). After END, seek() does nothing, so a running story clock never
 * undoes what a parent has tapped. Taps after the entrance re-fill the rings with a short live tween (not part of the story clock).
 */
(function (root) {
"use strict";

var GOLD = "#f2b632", BLUE = "#2f6fe0", GREEN = "#2fa84f", INK = "#10203f", GOLDD = "#a86a00";
var END = 3.0;
var YEAR_LABEL = { "2627": "26/27 Attendance", "2526": "25/26 Attendance" };
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
function outCubic(x) { return 1 - Math.pow(1 - x, 3); }
function longDate(iso) { var m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? Number(m[3]) + " " + MONTHS[Number(m[2]) - 1] + " " + m[1] : ""; }   // as lib/attendance.ts formatLongDate
function className(child) {
  if (root.P2Class) return root.P2Class(child);
  var f = child && child.form != null && String(child.form).trim() !== "" ? String(child.form).trim() : null;
  if (f === null) return child && child.grade != null ? String(child.grade) : "";
  return f.indexOf("PREP ") === 0 ? "Prep " + f.slice(5) : f;
}

// ---------------------------------------------------------------------------------------------------------------------------
var WIDE_T = ".p2pg-hero{margin:4px 0 8px}.p2pg-art{display:none}.p2pg-artw{display:block;aspect-ratio:2400/571}.p2pg-artw img{width:142.2917%;left:-21.1667%;top:-21.0158%}";
var WIDE_L = ".p2pg-artw{aspect-ratio:2800/560}.p2pg-artw img{width:121.9286%;left:-11%;top:-25%}";
function prefix(rules, pre) { return rules.replace(/(^|\})([^{}]+)\{/g, function (m, a, sel) { return a + pre + sel + "{"; }); }
var CSS = [
  ".p2pg-host{-webkit-text-size-adjust:100%;touch-action:pan-y;overscroll-behavior:contain}",
  ".p2pg-host.p2pg-self{overflow-y:auto;overflow-x:hidden;scrollbar-width:none;-ms-overflow-style:none}",
  ".p2pg-host.p2pg-self::-webkit-scrollbar{display:none}",
  ".p2pg,.p2pg *{box-sizing:border-box}",
  ".p2pg{position:relative;width:100%;min-height:100%;container-type:inline-size;container-name:p2pg;font-family:P2Fredoka,Fredoka,'Trebuchet MS',system-ui,sans-serif;font-weight:500;color:" + INK + ";line-height:1.2;overflow-x:hidden}",
  ".p2pg button{font:inherit;color:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}",
  ".p2pg-back{position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;background:#e1d6cd;filter:saturate(1.15);pointer-events:none}",
  // the clock wall: a modest banner under the title and the controls (never a giant picture); on wide screens it stays banner size, centred, its sides fading into the page
  ".p2pg-hero{margin:0 calc(var(--pad) * -1);display:flex;justify-content:center}",
  ".p2pg-art{position:relative;width:min(100%,480px);aspect-ratio:100/42;overflow:hidden;filter:saturate(1.15);background:#e1d6cd}",
  ".p2pg-art img{position:absolute;left:0;top:0;width:100%;height:100%;max-width:none;display:block;object-fit:cover;object-position:50% 4.8%}",
  ".p2pg-art::before{content:'';position:absolute;left:0;right:0;top:0;height:10%;background:linear-gradient(to top,rgba(225,214,205,0),#e1d6cd)}",
  ".p2pg-art::after{content:'';position:absolute;left:0;right:0;bottom:0;height:16%;background:linear-gradient(to bottom,rgba(225,214,205,0),#e1d6cd)}",
  // wide banner (container 700 px and up, Igor 23 Oct "extend it, tailored for tablet"): the wide wall picture (3414 x 1920, both cork boards and the clock sit in its top 40%) as a rounded rectangle the full content width (the column caps at 1200 px), no side fade.
  // Crop = a window of the picture; the img is sized and offset in percent of the box so the window is exact. Tablet (700 to 959): window x 508..2908, y 120..691 (2400 x 571, box 4.2:1). Laptop (960 and up): window x 308..3108, y 140..700 (2800 x 560, box 5:1).
  // Boards + clock span x 879..2538, y 180..640 of the picture, so both stay whole with margin on every side. Under 700 the old banner stays exactly as it was.
  ".p2pg-artw{display:none;position:relative;width:100%;overflow:hidden;border-radius:22px;background:#e1d6cd;box-shadow:0 0 0 3px " + INK + ",0 7px 0 3px rgba(16,32,63,.38);filter:saturate(1.15)}",
  ".p2pg-artw img{position:absolute;max-width:none;height:auto;display:block}",
  ".p2pg-col{--pad:16px;position:relative;max-width:1200px;margin:0 auto;padding:16px var(--pad) 32px;display:flex;flex-direction:column;gap:16px}",
  ".p2pg-col>div:empty{display:none}",
  ".p2pg-kpis,.p2pg-charts{display:grid;grid-template-columns:minmax(0,1fr);gap:16px}",
  // title banner
  ".p2pg-title{margin:0 auto;width:100%;max-width:520px;padding:14px 12px 15px;text-align:center;background:" + INK + ";color:#fff;border-radius:22px;border:3px solid " + INK + ";box-shadow:0 6px 0 rgba(16,32,63,.38),0 16px 28px rgba(40,30,20,.22);font-weight:700;font-size:25px;letter-spacing:.005em}",
  ".p2pg-title i{display:block;width:54px;height:5px;border-radius:3px;background:" + GOLD + ";margin:8px auto 0}",
  // year switch + notes
  ".p2pg-years{display:flex;flex-direction:column;align-items:center;gap:12px}",
  ".p2pg-years>*{max-width:100%}",
  ".p2pg-seg{display:flex;gap:4px;padding:4px;border-radius:999px;background:#fff;border:3px solid " + INK + ";box-shadow:0 4px 0 rgba(16,32,63,.3)}",
  ".p2pg-seg button{min-height:42px;padding:0 16px;border:0;border-radius:999px;background:transparent;font-weight:600;font-size:15px;color:" + INK + "}",
  ".p2pg-seg button[aria-pressed=true]{background:" + INK + ";color:#fff}",
  ".p2pg-pick{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px 10px;max-width:100%;font-weight:600;font-size:15px;color:" + INK + "}",
  ".p2pg-pick select{-webkit-appearance:none;appearance:none;min-height:44px;max-width:100%;padding:0 38px 0 16px;border-radius:999px;border:3px solid " + INK + ";background:#fff url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='10' viewBox='0 0 16 10'><path d='M2 2l6 6 6-6' fill='none' stroke='%2310203f' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/></svg>\") no-repeat right 14px center;font:inherit;font-weight:600;font-size:15px;color:" + INK + ";box-shadow:0 4px 0 rgba(16,32,63,.3);cursor:pointer;text-overflow:ellipsis}",
  ".p2pg-note{margin:0 auto;width:fit-content;max-width:100%;text-align:center;font-weight:500;font-size:14px;line-height:1.35;color:#3a4766;background:rgba(255,255,255,.86);border-radius:14px;padding:8px 12px;box-shadow:0 2px 10px rgba(40,30,20,.1)}",
  // cards
  ".p2pg-card{position:relative;background:#fff;border:3px solid " + INK + ";border-radius:26px;padding:16px;box-shadow:0 6px 0 rgba(16,32,63,.34),0 18px 30px rgba(40,30,20,.2)}",
  ".p2pg-chip{display:inline-block;padding:5px 13px;border-radius:999px;background:#fff1c7;border:2px solid " + INK + ";font-weight:600;font-size:14px;line-height:1.15;color:" + INK + "}",
  ".p2pg-chip.is-week{background:" + GOLD + "}",
  ".p2pg-chip.is-act{position:absolute;right:14px;top:14px;background:#fff1c7}",
  // child card
  ".p2pg-who{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px}",
  ".p2pg-name{margin:0;font-weight:700;font-size:28px;line-height:1.1;color:" + INK + "}",
  ".p2pg-class{padding:4px 12px;border-radius:999px;background:#e3edff;border:2px solid " + INK + ";color:" + BLUE + ";font-weight:700;font-size:16px}",
  ".p2pg-views{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}",
  ".p2pg-views button{min-height:44px;padding:0 6px;border-radius:999px;border:2px solid #9aa6c3;background:#fff;font-weight:600;font-size:15px;color:#33415f;white-space:nowrap}",
  ".p2pg-views.is-two{grid-template-columns:repeat(2,1fr)}",
  ".p2pg-views button[aria-pressed=true]{background:" + GOLD + ";border-color:" + INK + ";color:" + INK + ";box-shadow:inset 0 0 0 1px " + INK + "}",
  ".p2pg-views button.is-go{border-color:" + GOLDD + ";color:" + GOLDD + ";white-space:normal;line-height:1.1;font-size:14px;padding:4px 6px}",
  // two-column card (icon number + ring)
  ".p2pg-two{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding-top:12px}",
  ".p2pg-cell{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:8px}",
  ".p2pg-cap{margin:0;text-align:center;font-weight:600;font-size:15px;line-height:1.2;min-height:36px;display:flex;flex-direction:column;justify-content:center;color:" + INK + "}",
  ".p2pg-cap small{font-size:14px;font-weight:500;color:#44516f}",
  ".p2pg-icon{position:relative;width:96px;height:96px}",
  ".p2pg-icon svg{display:block}",
  ".p2pg-ringbox{position:relative}",
  ".p2pg-ringbox svg{display:block}",
  ".p2pg-num{position:absolute;left:0;right:0;top:0;bottom:0;display:flex;align-items:center;justify-content:center;font-weight:700;color:" + INK + ";letter-spacing:-.01em;white-space:nowrap;font-variant-numeric:tabular-nums}",
  ".p2pg-num i{font-style:normal;font-size:.7em;margin-left:1px}",
  ".p2pg-num.is-good{color:" + GREEN + "}",
  ".p2pg-num.is-miss{color:" + GOLDD + "}",
  ".p2pg-icon .p2pg-num{top:36px;bottom:6px;font-size:30px}",
  ".p2pg-icon.is-clock .p2pg-num{top:24px;bottom:12px}",
  ".p2pg-tick{width:44%;height:44%}",
  // rings rows (time card, last week)
  ".p2pg-trio{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding-top:14px}",
  ".p2pg-trio .p2pg-cell{justify-content:flex-start}",
  ".p2pg-trio .p2pg-cap{min-height:0;font-weight:700}",
  ".p2pg-weekhead{display:flex;align-items:center;flex-wrap:wrap;gap:6px 12px}",
  ".p2pg-weekhead span.p2pg-when{font-size:14px;font-weight:500;color:#44516f}",
  // charts
  ".p2pg-h3{margin:0 0 6px;font-weight:700;font-size:19px;color:" + INK + "}",
  ".p2pg-bars{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;height:176px;align-items:end;border-bottom:3px solid " + INK + ";padding:0 4px}",
  ".p2pg-bars.is-flat{height:100px}",
  ".p2pg-bcol{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%}",
  ".p2pg-bv{font-weight:700;font-size:22px;line-height:1.1;margin-bottom:4px;color:" + INK + ";font-variant-numeric:tabular-nums}",
  ".p2pg-bv.is-zero{color:" + GREEN + "}",
  ".p2pg-bar{width:58px;border-radius:12px 12px 0 0;border:3px solid " + INK + ";border-bottom:0;min-height:6px}",
  ".p2pg-bar.is-zero{background:#cfe9d5 !important;border-color:" + GREEN + "}",
  ".p2pg-lbls{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:8px 4px 0}",
  ".p2pg-lbls span{text-align:center;font-weight:600;font-size:14px;line-height:1.15;color:#33415f}",
  ".p2pg-foot{padding-bottom:4px}",
  // scaling (container queries on the page's own width, so the story stage, a phone and a laptop all pick the right layout): 1 column on a phone,
  // 2 on a tablet, the summary cards and the charts 3 in a row on a laptop (as the app's md:grid-cols-3), content never wider than 1200 px
  "@container p2pg (min-width:500px){.p2pg-art{-webkit-mask-image:linear-gradient(to right,transparent,#000 14%,#000 86%,transparent);mask-image:linear-gradient(to right,transparent,#000 14%,#000 86%,transparent)}}",
  "@container p2pg (min-width:700px){" + WIDE_T + "}",
  "@container p2pg (min-width:960px){" + WIDE_L + "}",
  // the same two rules keyed on data-bw (opts.bannerWidth): the story's last slide draws the page in a box narrower than the screen it will have after the story
  // (a portrait iPad plays the narrow portrait stage), so it takes its banner from the screen's width, not from its own box
  prefix(WIDE_T, '.p2pg[data-bw="t"] ') + prefix(WIDE_T, '.p2pg[data-bw="l"] ') + prefix(WIDE_L, '.p2pg[data-bw="l"] '),
  "@container p2pg (min-width:600px){.p2pg-col{--pad:24px;gap:20px}.p2pg-years{flex-direction:row;flex-wrap:wrap;justify-content:center;gap:12px 20px}.p2pg-kpis,.p2pg-charts{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}" +
    ".p2pg-childcard{display:flex;align-items:center;justify-content:space-between;gap:16px}.p2pg-childcard .p2pg-who{margin-bottom:0}.p2pg-childcard .p2pg-views,.p2pg-childcard .p2pg-views.is-two{display:flex;gap:10px}.p2pg-childcard .p2pg-views button{padding:0 22px}.p2pg-childcard .p2pg-views button.is-go{padding:4px 22px}" +
    ".p2pg-weekcard .p2pg-trio{max-width:560px;margin:0 auto}}",
  "@container p2pg (min-width:600px) and (max-width:959.98px){.p2pg-kpis>:last-child:nth-child(odd),.p2pg-charts>:last-child:nth-child(odd){grid-column:1/-1}}",
  "@container p2pg (min-width:960px){.p2pg-kpis,.p2pg-charts{grid-template-columns:repeat(3,minmax(0,1fr))}}"
].join("\n");

function ensureStyle(font) {
  var doc = document;
  if (!doc.getElementById("p2pg-style")) {
    var st = doc.createElement("style");
    st.id = "p2pg-style";
    st.textContent = "@font-face{font-family:P2Fredoka;src:url(" + (font || "Fredoka-normal.woff2") + ") format('woff2');font-weight:300 700;font-display:block}\n" + CSS;
    doc.head.appendChild(st);
  }
}

// ---------------------------------------------------------------------------------------------------------------------------
// SVG pieces
var TICK = '<svg class="p2pg-tick" viewBox="0 0 38 38" aria-hidden="true"><path d="M8 20 L16 28 L31 10" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var R = 36, CIRC = 2 * Math.PI * R;
function ringSVG(size, color) {
  return '<svg width="' + size + '" height="' + size + '" viewBox="-48 -48 96 96" aria-hidden="true"><circle r="' + R + '" fill="#f4f6fb" stroke="#e3e8f2" stroke-width="12"/>' +
    '<circle class="arc" r="' + R + '" fill="none" stroke="' + color + '" stroke-width="12" stroke-linecap="round" transform="rotate(-90)" stroke-dasharray="' + CIRC.toFixed(2) + '" stroke-dashoffset="' + CIRC.toFixed(2) + '"/>' +
    '<circle r="44.5" fill="none" stroke="' + INK + '" stroke-width="3.5"/></svg>';
}
function numSize(len, size) {
  var k = size / 96;
  var px = len <= 2 ? 32 : len === 3 ? 27 : len === 4 ? 22 : 18;
  return Math.max(14, Math.round(px * k));
}
var CAL = '<svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true"><rect x="10" y="16" width="76" height="72" rx="14" fill="#fff" stroke="' + INK + '" stroke-width="4"/>' +
  '<path d="M10 32a16 16 0 0 1 16-16h44a16 16 0 0 1 16 16v10H10z" fill="' + GOLD + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/><path d="M30 6v18M66 6v18" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/></svg>';
var CLOCK = '<svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true"><rect x="38" y="4" width="20" height="9" rx="4" fill="' + INK + '"/><path d="M48 12v8" stroke="' + INK + '" stroke-width="5"/>' +
  '<circle cx="48" cy="56" r="34" fill="#fff" stroke="' + INK + '" stroke-width="4"/><circle cx="48" cy="56" r="27" fill="none" stroke="' + BLUE + '" stroke-width="3" stroke-dasharray="3 7" stroke-linecap="round"/>' +
  '<path d="M76 24l7-7" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/></svg>';

// ---------------------------------------------------------------------------------------------------------------------------
function mount(el, response, opts) {
  opts = opts || {};
  var model = root.P2Data.toPage(response);
  ensureStyle(opts.font);
  var scrollSelf = opts.scroll === "self";
  var state = { year: model.defaultYear, view: "term", week: null };      // week: the Term / Week choice (null = the newest week, "Last Week")
  var mode = opts.driven ? "entrance" : (opts.entrance === false ? "final" : "entrance");
  var items = [];                         // value animations: { sec, s, d, set(f) }
  var live = null, raf = 0, selfRaf = 0, destroyed = false;
  var reduce = !!(root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches);

  el.classList.add("p2pg-host");
  if (scrollSelf) el.classList.add("p2pg-self");
  el.innerHTML = '<div class="p2pg">' +
    '<div class="p2pg-back"></div>' +
    '<div class="p2pg-col">' +
    '<div class="p2pg-rise" data-r="0.05" data-w="head"></div>' +
    '<div class="p2pg-rise p2pg-years" data-r="0.2" data-w="years"></div>' +
    '<div class="p2pg-rise" data-r="0.3" data-w="note"></div>' +
    '<div class="p2pg-hero" aria-hidden="true"><div class="p2pg-art"><img alt="" draggable="false" src="' + esc(opts.wall || "final-layers/wall-tall.jpg") + '"></div><div class="p2pg-artw"><img alt="" draggable="false"></div></div>' +
    '<div class="p2pg-rise" data-r="0.4" data-w="child"></div>' +
    '<div class="p2pg-kpis" data-w="kpis"></div>' +
    '<div class="p2pg-rise" data-r="1.25" data-w="week"></div>' +
    '<div class="p2pg-charts" data-w="charts"></div>' +
    '<div class="p2pg-rise p2pg-foot" data-r="1.95" data-w="note2"></div>' +
    '</div></div>';
  var page = el.firstChild;
  // the wide wall picture loads only once the page is 700 px wide or more (a phone never fetches it); its path is the page's own wall path with the last
  // folder + file swapped for wide/wall.jpg (final-layers/wall-tall.jpg -> wide/wall.jpg), or opts.wallWide
  var wideImg = page.querySelector(".p2pg-artw img"), ro = null;
  var wideSrc = opts.wallWide || (opts.wall && opts.wall.indexOf("data:") !== 0 ? String(opts.wall).replace(/(?:[^\/]*\/)?[^\/]*$/, "wide/wall.jpg") : (opts.wall ? "" : "wide/wall.jpg"));
  // opts.bannerWidth = the screen width the page will really have (the story's last slide passes it): the banner follows it instead of the slide's own box
  var bw = Number(opts.bannerWidth) || 0;
  if (bw >= 700) page.setAttribute("data-bw", bw >= 960 ? "l" : "t");
  function checkWide() { if (wideSrc && wideImg && !wideImg.getAttribute("src") && (bw || page.clientWidth) >= 700) wideImg.setAttribute("src", wideSrc); }
  checkWide();
  if (root.ResizeObserver && wideSrc) { ro = new root.ResizeObserver(checkWide); ro.observe(page); }
  function W(name) { return page.querySelector('[data-w="' + name + '"]'); }
  var wrap = { head: W("head"), years: W("years"), note: W("note"), child: W("child"), kpis: W("kpis"), week: W("week"), charts: W("charts"), note2: W("note2") };

  function Y() { return model.byYear[state.year].atWeek(state.week); }
  function drop(sec) { items = items.filter(function (it) { return it.sec !== sec; }); }
  function base(entranceBase) { return mode === "entrance" ? entranceBase : 0; }

  // ------------------------------------------------------------------------------ sections
  function buildHead() {
    wrap.head.innerHTML = '<h1 class="p2pg-title">Student Attendance Report<i></i></h1>';
  }
  function buildControls() {
    var y = Y(), two = model.years.length > 0, pk = y.picker;   // the page always draws the year switch, a lone "26/27 Attendance" button included
    if (!two && !pk) { wrap.years.innerHTML = ""; wrap.years.style.display = "none"; return; }
    wrap.years.style.display = "";
    var h = "";
    if (two) {
      h += '<div class="p2pg-seg" role="group" aria-label="School year">' + model.years.map(function (k) {
        return '<button type="button" data-testid="year-' + k + '" data-year="' + k + '" aria-pressed="' + (k === state.year) + '">' + YEAR_LABEL[k] + "</button>";
      }).join("") + "</div>";
    }
    if (pk) {   // the page's Term / Week drop-down: a native select, grouped term by term
      h += '<label class="p2pg-pick"><span>Term / Week</span><select data-testid="week-picker" aria-label="Term and week">' + pk.groups.map(function (g) {
        return '<optgroup label="Term ' + g.term + '">' + g.options.map(function (o) {
          return '<option value="' + esc(o.value) + '"' + (o.value === pk.value ? " selected" : "") + ">" + esc(o.label) + "</option>";
        }).join("") + "</optgroup>";
      }).join("") + "</select></label>";
    }
    wrap.years.innerHTML = h;
  }
  function noteHTML() {
    var d = longDate(Y().dataAsOf);
    return d ? '<p class="p2pg-note" data-testid="data-note">This data is our most accurate data as of ' + esc(d) + ".</p>" : "";
  }
  function buildNotes() { wrap.note.innerHTML = noteHTML(); wrap.note2.innerHTML = noteHTML(); }
  function buildChild() {
    var y = Y(), v = state.view;
    wrap.child.innerHTML = '<section class="p2pg-card p2pg-childcard"><div class="p2pg-who"><h2 class="p2pg-name" data-testid="child-name">' + esc(y.child.name) + '</h2>' +
      '<span class="p2pg-class" data-testid="child-class">' + esc(className(y.child)) + '</span></div>' +
      '<div class="p2pg-views' + (y.weekLabel == null ? " is-two" : "") + '" role="group" aria-label="Show">' +
      '<button type="button" data-view="year" aria-pressed="' + (v === "year") + '">This Year</button>' +
      '<button type="button" data-view="term" aria-pressed="' + (v === "term") + '">This Term</button>' +
      (y.weekLabel != null ? '<button type="button" data-go="week" class="is-go">' + esc(y.weekLabel) + "</button>" : "") + "</div></section>";
  }

  // a ring with its number: spec -> html; bind() later gives it its animation
  var seq = 0;
  function ringHTML(o) {      // { size, frac, color, val, unit, key, good }
    var id = "r" + (seq++), len = String(o.val).length + (o.unit ? 1 : 0);
    return '<div class="p2pg-ringbox" data-i="' + id + '" style="width:' + o.size + 'px;height:' + o.size + 'px">' + ringSVG(o.size, o.color) +
      '<span class="p2pg-num ' + (o.good ? "is-good" : "") + '" data-m="' + o.key + '" data-v="' + o.val + '" style="font-size:' + numSize(len, o.size) + 'px">' + o.val + (o.unit ? "<i>" + o.unit + "</i>" : "") + "</span></div>";
  }
  function tickRingHTML(o) {  // a zero: full green ring and a tick; data-v stays 0
    return '<div class="p2pg-ringbox" data-i="t" data-tick="1" style="width:' + o.size + 'px;height:' + o.size + 'px">' + ringSVG(o.size, GREEN) +
      '<span class="p2pg-num" data-m="' + o.key + '" data-v="0" style="background:none"><span style="display:grid;place-items:center;width:46%;height:46%;border-radius:50%;background:' + GREEN + ';border:3px solid ' + INK + '">' + TICK + "</span></span></div>";
  }
  function iconHTML(svg, o, cls) {
    return '<div class="p2pg-icon ' + (cls || "") + '" data-i="c" data-count="1">' + svg + '<span class="p2pg-num ' + (o.val === 0 ? "is-good" : "is-miss") + '" data-m="' + o.key + '" data-v="' + o.val + '" style="font-size:' + numSize(String(o.val).length, 96) + 'px">' + o.val + "</span></div>";
  }

  /** Give every [data-i] under `scope` its animation. b = start of this group (entrance seconds, or 0 when live). */
  function bind(scope, sec, b, spec) {
    var k = 0;
    [].forEach.call(scope.querySelectorAll("[data-i]"), function (box) {
      var num = box.querySelector(".p2pg-num"), s = b + 0.06 * k++, d = 0.9;
      var val = Number(num.getAttribute("data-v"));
      if (box.hasAttribute("data-count")) {
        items.push({ sec: sec, s: s, d: d, set: function (f) { num.textContent = String(Math.round(val * f)); } });
      } else if (box.hasAttribute("data-tick")) {
        var arc0 = box.querySelector(".arc"), inner = num.firstChild;
        items.push({ sec: sec, s: s, d: d, set: function (f) { arc0.setAttribute("stroke-dashoffset", (CIRC * (1 - f)).toFixed(2)); inner.style.opacity = f > 0.55 ? 1 : 0; inner.style.transform = "scale(" + (f > 0.55 ? 1 : 0.4) + ")"; } });
      } else {
        var arc = box.querySelector(".arc"), frac = Number(box.getAttribute("data-frac")), unit = box.getAttribute("data-unit") || "";
        var from = unit ? Math.min(val, 80) : 0;   // a percentage counts up from 80, never a scary low number
        items.push({ sec: sec, s: s, d: d, set: function (f) {
          arc.setAttribute("stroke-dashoffset", (CIRC * (1 - frac * f)).toFixed(2));
          num.innerHTML = String(Math.round(from + (val - from) * f)) + (unit ? "<i>" + unit + "</i>" : "");
        } });
      }
    });
  }

  function pctRing(key, val) {
    return { size: 96, frac: val / 100, color: val >= 95 ? GREEN : GOLD, val: val, unit: "%", key: key, good: val >= 95 };
  }
  function withFrac(html, f, unit) { return html.replace('data-i="', 'data-frac="' + clamp(f, 0, 1) + '" ' + (unit ? 'data-unit="' + unit + '" ' : "") + 'data-i="'); }

  function buildKpis() {
    var y = Y(), v = state.view, p = y.periods[v], T = v === "term" ? "Term" : "Year";
    var allZero = p.minutes === 0 && p.hours === 0 && p.lessons === 0;
    var celebrate = v === "term" && allZero;                        // the page shows tick rings for a clean term
    function cap(a, b) { return '<p class="p2pg-cap">' + a + "<small>" + b + "</small></p>"; }
    var absentCard = '<section class="p2pg-card p2pg-rise" data-r="0.65" data-k="abs"><span class="p2pg-chip">Absences This ' + T + '</span><div class="p2pg-two">' +
      '<div class="p2pg-cell">' + iconHTML(CAL, { val: p.absent, key: "abs-total" }) + cap("Total Days", "Absent") + "</div>" +
      '<div class="p2pg-cell">' + withFrac(ringHTML(pctRing("att-pct", p.attendancePct)), p.attendancePct / 100, "%") + cap("Attendance", "Percentage") + "</div></div></section>";
    function timeRing(key, val, max, label) {
      var o = { size: 84, frac: val / max, color: allZero ? GREEN : GOLD, val: val, key: key, good: allZero };
      var h = celebrate ? tickRingHTML({ size: 84, key: key }) : withFrac(ringHTML(o), val / max, "");
      return '<div class="p2pg-cell">' + h + '<p class="p2pg-cap">' + label + "</p></div>";
    }
    var timeCard = '<section class="p2pg-card p2pg-rise" data-r="0.85" data-k="time"><span class="p2pg-chip">Total Time not at School This ' + T + "</span>" +
      (y.action ? '<span class="p2pg-chip is-act" style="position:static;margin-left:8px">Action Taken</span>' : "") +
      '<div class="p2pg-trio">' + timeRing("time-min", p.minutes, Math.ceil(p.minutes / 500) * 500 || 500, "Minutes") + timeRing("time-hrs", p.hours, Math.ceil(p.hours / 10) * 10 || 10, "Hours") +
      timeRing("time-les", p.lessons, Math.ceil(p.lessons / 20) * 20 || 20, "Lessons") + "</div></section>";
    var lateCard = '<section class="p2pg-card p2pg-rise" data-r="1.05" data-k="late"><span class="p2pg-chip">Total Days Late This ' + T + '</span><div class="p2pg-two">' +
      '<div class="p2pg-cell">' + iconHTML(CLOCK, { val: p.lateToSchool, key: "late-total" }, "is-clock") + cap("Total Days", "Late") + "</div>" +
      '<div class="p2pg-cell">' + withFrac(ringHTML(pctRing("punct-pct", p.punctualityPct)), p.punctualityPct / 100, "%") + cap("Punctuality", "Percentage") + "</div></div></section>";
    wrap.kpis.innerHTML = absentCard + timeCard + lateCard;
    drop("kpis");
    [].forEach.call(wrap.kpis.querySelectorAll("[data-k]"), function (card) { bind(card, "kpis", base(parseFloat(card.getAttribute("data-r")) + 0.3)); });
    if (mode !== "entrance") [].forEach.call(wrap.kpis.querySelectorAll(".p2pg-rise"), function (c) { c.classList.remove("p2pg-rise"); });
  }

  function buildWeek() {
    var y = Y(), lw = y.lastWeek;
    drop("week");
    if (y.weekLabel == null) { wrap.week.innerHTML = ""; return; }                // 25/26: no week block (the page hides it)
    function cell(key, val, max, label) {
      var h = val === 0 ? tickRingHTML({ size: 88, key: key }) : withFrac(ringHTML({ size: 88, frac: val / max, color: GOLD, val: val, key: key }), val / max, "");
      return '<div class="p2pg-cell">' + h + '<p class="p2pg-cap">' + label + "</p></div>";
    }
    wrap.week.innerHTML = '<section class="p2pg-card p2pg-weekcard" id="p2pg-last-week" data-testid="week-card"><div class="p2pg-weekhead"><span class="p2pg-chip is-week">' + esc(y.weekLabel) + "</span>" +
      (y.weekSub ? '<span class="p2pg-when" data-testid="week-ending-label">' + esc(y.weekSub) + "</span>" : "") + "</div>" +
      '<div class="p2pg-trio">' + cell("lw-abs", lw.absent, 7, "Days Absent") + cell("lw-late", lw.lateToSchool, 8, "Late to School") + cell("lw-early", lw.earlyLeave, 4, "Early Leave") + "</div></section>";
    bind(wrap.week, "week", base(1.25 + 0.3));
  }

  function buildCharts() {
    var y = Y();
    var defs = [["absence", "Absence", "abs"], ["late", "Late to School", "late"], ["early", "Early Leave", "early"]];
    var cols = [["term", "This Term", GOLD], ["year", "This Year", "#3b4d7a"]];
    if (y.weekLabel != null) cols.unshift(["week", y.weekLabel, BLUE]);            // 25/26 has no week bar
    var grid = "grid-template-columns:repeat(" + cols.length + ",1fr)";
    var allFlat = defs.every(function (d) { var c = y.charts[d[0]]; return Math.max.apply(null, cols.map(function (k) { return c[k[0]]; })) === 0; });   // flat style only when every chart is flat, so cards in one row share a baseline
    wrap.charts.innerHTML = defs.map(function (d, i) {
      var c = y.charts[d[0]], max = Math.max.apply(null, cols.map(function (k) { return c[k[0]]; }));
      var bars = cols.map(function (k) {
        var v = c[k[0]], h = v === 0 ? 6 : Math.max(14, Math.round(v / max * 118));
        return '<div class="p2pg-bcol"><span class="p2pg-bv ' + (v === 0 ? "is-zero" : "") + '" data-m="ch-' + d[0] + "-" + k[0] + '" data-v="' + v + '">' + v + "</span>" +
          '<i class="p2pg-bar ' + (v === 0 ? "is-zero" : "") + '" data-bar="' + h + '" data-val="' + v + '" style="height:' + h + "px;background:" + k[2] + '"></i></div>';
      }).join("");
      var lbls = cols.map(function (k) { return "<span>" + esc(k[1]) + "</span>"; }).join("");
      return '<section class="p2pg-card p2pg-rise" data-r="' + (1.45 + i * 0.15) + '" data-testid="chart-' + d[0] + '"><h3 class="p2pg-h3">' + d[1] + '</h3><div class="p2pg-bars' + (allFlat ? " is-flat" : "") + '" style="' + grid + '">' + bars + '</div><div class="p2pg-lbls" style="' + grid + '">' + lbls + "</div></section>";
    }).join("");
    drop("charts");
    [].forEach.call(wrap.charts.querySelectorAll("[data-r]"), function (card) {
      var b = base(parseFloat(card.getAttribute("data-r")) + 0.3), n = 0;
      [].forEach.call(card.querySelectorAll(".p2pg-bar"), function (bar) {
        var h = Number(bar.getAttribute("data-bar")), val = Number(bar.getAttribute("data-val")), lab = bar.previousSibling;
        items.push({ sec: "charts", s: b + 0.08 * n++, d: 0.9, set: function (f) { bar.style.height = Math.max(0, h * f).toFixed(1) + "px"; lab.textContent = String(Math.round(val * f)); } });
      });
    });
    if (mode !== "entrance") [].forEach.call(wrap.charts.querySelectorAll(".p2pg-rise"), function (c) { c.classList.remove("p2pg-rise"); });
  }

  function buildAll() { buildHead(); buildControls(); buildNotes(); buildChild(); buildKpis(); buildWeek(); buildCharts(); }

  // ------------------------------------------------------------------------------ painting
  function riseEls() { return page.querySelectorAll(".p2pg-rise[data-r]"); }
  function paintItems(tt, only) {
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (only && !only[it.sec]) continue;
      it.set(outCubic(seg(tt, it.s, it.s + it.d)));
    }
  }
  function paintEntrance(t) {
    var r = riseEls();
    for (var i = 0; i < r.length; i++) {
      var u = outCubic(seg(t, parseFloat(r[i].getAttribute("data-r")), parseFloat(r[i].getAttribute("data-r")) + 0.55));
      r[i].style.opacity = u.toFixed(3);
      r[i].style.transform = "translateY(" + ((1 - u) * 34).toFixed(1) + "px)";
    }
    paintItems(t);
  }
  function paintFinal() {
    var r = page.querySelectorAll("[data-r]");
    for (var i = 0; i < r.length; i++) { r[i].style.opacity = ""; r[i].style.transform = ""; }
    for (var j = 0; j < items.length; j++) items[j].set(1);
  }
  function setMode(m) { mode = m; page.style.pointerEvents = m === "final" ? "" : "none"; }

  /** After the entrance: re-fill the rings, counts and bars of the sections just rebuilt, over about a second (a live tween, not the story clock). */
  function runLive(secs) {
    if (raf) { root.cancelAnimationFrame(raf); raf = 0; }
    var only = {}; secs.forEach(function (s) { only[s] = 1; });
    if (reduce) { paintItems(99, only); return; }
    paintItems(0, only);
    var t0 = null;
    function step(now) {
      if (destroyed) return;
      if (t0 == null) t0 = now;
      var tt = (now - t0) / 1000;
      paintItems(tt, only);
      raf = tt < 1.4 ? root.requestAnimationFrame(step) : 0;
    }
    raf = root.requestAnimationFrame(step);
  }

  // ------------------------------------------------------------------------------ interaction
  function rebuildAfterChange(full) {
    if (full) { buildControls(); buildNotes(); buildChild(); buildKpis(); buildWeek(); buildCharts(); }
    else { buildChild(); buildKpis(); }
    if (mode === "final") runLive(full ? ["kpis", "week", "charts"] : ["kpis"]);
    else paintEntrance(lastT);
  }
  function setYear(k) {
    if (!model.byYear[k]) return;
    if (k === state.year) { setView("term"); return; }              // the page: a click on the pressed year button (the lone one too) still goes back to This Term
    state.year = k; state.view = "term";                           // the page: switching year goes back to This Term
    rebuildAfterChange(true);
  }
  /** The Term / Week picker: show another week where the page shows "Last Week" (week button, week block, three charts). */
  function setWeek(w) {
    var b = model.byYear[state.year];
    if (!b.current || !b.picker) return;
    var known = b.picker.groups.some(function (g) { return g.options.some(function (o) { return o.value === w; }); });
    if (!known) return;
    var next = w === b.newestWeek ? null : w;
    var sel = wrap.years.querySelector("select");
    if (next === state.week) { if (sel) sel.value = w; return; }
    state.week = next;
    if (sel) sel.value = w;                                          // the drop-down itself is never rebuilt while it is in use
    buildChild(); buildWeek(); buildCharts();
    if (mode === "final") runLive(["week", "charts"]);
    else paintEntrance(lastT);
  }
  function setView(v) {
    if ((v !== "term" && v !== "year") || v === state.view) return;
    state.view = v;
    rebuildAfterChange(false);
  }
  function offsetWithin(node, anc) { var y = 0; while (node && node !== anc) { y += node.offsetTop; node = node.offsetParent; } return y; }
  function goToWeek() {
    var card = page.querySelector("#p2pg-last-week");
    if (!card) return;
    var top = offsetWithin(card, page) - 12, beh = reduce ? "auto" : "smooth";
    if (scrollSelf) el.scrollTo({ top: top, behavior: beh });
    else root.scrollTo({ top: page.getBoundingClientRect().top + (root.pageYOffset || 0) + top, behavior: beh });
  }
  function onClick(e) {
    var b = e.target.closest && e.target.closest("button");
    if (!b || !page.contains(b)) return;
    if (b.hasAttribute("data-year")) setYear(b.getAttribute("data-year"));
    else if (b.hasAttribute("data-view")) setView(b.getAttribute("data-view"));
    else if (b.hasAttribute("data-go")) goToWeek();
  }
  function onChange(e) {
    var t = e.target;
    if (t && t.getAttribute && t.getAttribute("data-testid") === "week-picker") setWeek(t.value);
  }
  page.addEventListener("click", onClick);
  page.addEventListener("change", onChange);

  // ------------------------------------------------------------------------------ the entrance, driven from outside (the story)
  var lastT = -1;
  function seek(t) {
    if (destroyed) return;
    t = +t;
    if (!(t < END)) {                                              // done: complete and live; a running clock never undoes a parent's taps
      if (mode !== "final") { setMode("final"); if (state.year !== model.defaultYear || state.view !== "term" || state.week !== null) { state.year = model.defaultYear; state.view = "term"; state.week = null; buildAll(); } paintFinal(); }
      lastT = t; return;
    }
    if (mode === "final") {                                        // seeking back before the end: the entrance of the default view again
      if (raf) { root.cancelAnimationFrame(raf); raf = 0; }
      state.year = model.defaultYear; state.view = "term"; state.week = null;
      setMode("entrance"); buildAll();
    }
    lastT = t;
    paintEntrance(Math.max(0, t));
  }

  buildAll();
  setMode(mode);
  if (opts.driven) paintEntrance(0);                                 // the story drives seek(t)
  else if (opts.entrance !== false && !reduce) {                     // standalone: play the entrance by itself
    paintEntrance(0);
    var s0 = null;
    selfRaf = root.requestAnimationFrame(function step(now) {
      if (destroyed) return;
      if (s0 == null) s0 = now;
      var t = (now - s0) / 1000;
      seek(Math.min(t, END));
      selfRaf = t < END ? root.requestAnimationFrame(step) : 0;
    });
  } else { setMode("entrance"); seek(END); }                         // standalone without the entrance (still / reduced motion)

  return {
    setYear: setYear, setView: setView, setWeek: setWeek, goToWeek: goToWeek, seek: seek,
    getState: function () { return { year: state.year, view: state.view, week: Y().weekEnding, mode: mode }; },
    destroy: function () {
      destroyed = true;
      if (ro) ro.disconnect();
      if (raf) root.cancelAnimationFrame(raf);
      if (selfRaf) root.cancelAnimationFrame(selfRaf);
      page.removeEventListener("click", onClick);
      page.removeEventListener("change", onChange);
      el.classList.remove("p2pg-host", "p2pg-self");
      el.innerHTML = "";
    }
  };
}

root.P2Page = { mount: mount, END: END };
if (typeof module !== "undefined" && module.exports) module.exports = root.P2Page;
})(typeof window !== "undefined" ? window : globalThis);
