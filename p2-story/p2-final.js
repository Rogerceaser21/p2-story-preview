/* P-2 final beat · p2-final  (3D living storybook; the last screen, it stays)
 * Mounts P2Page (p2-page.js) in the stage: the real, live parent page in the story's 3D look (the page IS the last slide, one renderer
 * for the story and, later, the app). The 390 CSS px wide page is scaled by 1080 / 390 into the 1080 x 1920 stage, so the top 693 px of
 * the page fill the frame. Its entrance (cards rise one after another, rings fill, numbers count up, bars grow) is a pure function of t
 * (kit rule 1) through P2Page.seek(t); after about 3 s it holds still and is complete, tappable and scrollable inside the stage.
 * Content: `response` (the raw fetch-student-data response, kept by P2Data.toStory) is what the page draws; with no response it is
 * built from the story's lastWeek / term / year period records, so every earlier caller still works.
 * The page carries its own wall picture, so the story's badge and week pill fade out when this beat starts (p2-story).
 */
(function () {
MotionIgor.define({
  id: "p2-final",
  duration: 4,
  size: [1080, 1920],
  kind: "scene",
  title: "P-2 report · parent page",
  style: "3D living storybook",
  engine: "dom",
  theme: "ais",
  defaults: {
    art: "final-layers/",
    response: null,                    // the raw fetch-student-data response (P2Data.toStory(response).response)
    child: { name: "Noor", grade: "Grade 0", form: "PREP A" },
    dataAsOf: "2026-10-20",
    weekEnding: "2026-10-15",
    weekNumber: 7,
    // fallback period totals (P2Data.toStory). Default = sample-100.
    lastWeek: { daysOpen: 2, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    term: { daysOpen: 22, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    year: { daysOpen: 22, absent: 0, lateToSchool: 0, lateMinutes: 0, earlyLeave: 0, attendancePct: 100, punctualityPct: 100, minutes: 0, hours: 0, lessons: 0 },
    pxScale: 0,                        // css px of the screen per stage px (the story passes it): 0 = the old phone size
    chrome: true                       // kept for the story's contract; the page draws no badge
  },
  build: function (ctx) {
    var c = ctx.content, st = ctx.stage;
    st.style.background = "#e1d6cd";
    // The page is drawn at its REAL size on the screen: ps = css px of the screen per stage px (the story passes it as content.pxScale), so
    // the page box is as wide as the screen shows the stage (a phone: about 375 to 430 px, a laptop: the window) and its own container
    // queries pick the same layout as the live page (cards side by side on a laptop). Without it: the old 390 px phone page.
    var ps = c.pxScale > 0 ? c.pxScale : (ctx.W > 1080 ? 0.5 : 390 / 1080);
    var box = document.createElement("div");
    box.style.cssText = "position:absolute;left:0;top:0;width:" + (ctx.W * ps) + "px;height:" + (1920 * ps) + "px;transform-origin:0 0;transform:scale(" + (1 / ps) + ")";
    st.appendChild(box);
    var input = c.response || c;                                    // no response: P2Data.toPage builds one from lastWeek / term / year
    var page = P2Page.mount(box, input, { scroll: "self", driven: true, wall: c.art + "wall-tall.jpg", bannerWidth: c.pxScale > 0 ? window.innerWidth : 0 });   // in the app the page after the story is as wide as the screen: its banner choice must match (a portrait iPad plays the narrow portrait stage)
    ctx.onDraw(function (t) { page.seek(t); });
    return { destroy: function () { page.destroy(); } };
  }
});
})();
