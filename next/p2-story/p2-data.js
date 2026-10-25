/* P-2 shared helper · p2-data
 * Turns what the parent page gets from the app (the `fetch-student-data` response for a parent link:
 * {student, years, defaultYear, dataAsOf, dataAsOfByYear}) into the content the P-2 story plays.
 * One place for the numbers, so every beat shows exactly what the primary parent page shows:
 *   - the child's 26/27 record (`years["2627"]`, falling back to `student`) is the one used, like the page's default;
 *   - period totals come from `student.periods.{week,term,year}` (the page's PeriodTotals);
 *   - attendance % and punctuality % = Math.round(attendancePercent(...)) from src/lib/attendance.ts, copied here;
 *   - time not at school = late minutes + days absent x 330 (primary) or 315 (secondary), hours = Math.round(min / 60),
 *     lessons = Math.floor(min / 30 (primary) or 35 (secondary)), exactly as PrimaryParentDashboard.tsx works them out;
 *   - `perfect` is PrimaryParentDashboard.hasPerfectWeek, copied rule for rule (including its 26/27 empty-week rule).
 * Plain JS, no build step. Browser: window.P2Data. Node: globalThis.P2Data (and module.exports).
 * P2Data.toStory(response) -> content for p2-story (and for every beat):
 *   { response (the raw input), child:{name,form,grade}, weekEnding:"2026-10-15", weekNumber:7, episode:"Week 7", termNumber, perfect, dataAsOf, years:["2627",...],
 *     lastWeek / term / year: { daysOpen, absent, lateToSchool, lateMinutes, earlyLeave,
 *                               attendancePct, punctualityPct, minutes, hours, lessons } }
 * Week numbers and labels (D2 and D3 of the app, 22 Oct 2026): the SERVER numbers the weeks (SPEA term starts and lengths, week
 * number = whole weeks since the term's start Monday + 1, Term 1 week 1 never counted) and sends them as `weekList`
 * [{weekEnding, term, weekInTerm}] (only the weeks this child has a row in). Nothing is worked out here: the story's "Week N" is the
 * weekInTerm of the child's newest week, exactly the number the page's Term / Week picker shows for it. The page's week helpers
 * (weekEndingText, weekOptionLabel, groupWeeksByTerm, newestWeekEnding, weekHeading, periodForWeek, studentForWeek) are copied below
 * from src/lib/attendance.ts and p2-data.test.mjs runs the app's own copy against them.
 */
(function (root) {
"use strict";

// ---- copied from src/lib/attendance.ts -------------------------------------------------------------------------------
/** Attendance % = (days open - days absent) / days open, kept inside 0..100. No open days = 100. */
function attendancePercent(daysOpen, absentDays) {
  if (!(daysOpen > 0)) return 100;
  var pct = ((daysOpen - absentDays) / daysOpen) * 100;
  return Math.max(0, Math.min(100, pct));
}
function punctualityPercent(daysOpen, lateDays) { return attendancePercent(daysOpen, lateDays); }

// ---- copied from src/lib/attendance.ts (D3: Term / Week picker) --------------------------------------------------------
var MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "15 Oct" from "2026-10-15" (a plain calendar date). */
function formatShortDate(iso) {
  var m = String(iso == null ? "" : iso).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return "";
  return Number(m[3]) + " " + MONTHS_SHORT[Number(m[2]) - 1];
}
/** "Week ending 15 Oct". Empty when there is no date. */
function weekEndingText(iso) { var d = formatShortDate(iso); return d ? "Week ending " + d : ""; }
/** The option text of the Term / Week picker: "Term 1 \u00b7 Week 7 \u00b7 Week ending 15 Oct". */
function weekOptionLabel(w) { return "Term " + w.term + " \u00b7 Week " + w.weekInTerm + " \u00b7 " + weekEndingText(w.weekEnding); }
/** The weeks grouped term by term, in the order given (the server sends oldest first). */
function groupWeeksByTerm(weeks) {
  var out = [];
  for (var i = 0; i < weeks.length; i++) {
    var w = weeks[i], last = out[out.length - 1];
    if (last && last.term === w.term) last.weeks.push(w); else out.push({ term: w.term, weeks: [w] });
  }
  return out;
}
/** The newest stored week (a week_ending string), or null. */
function newestWeekEnding(weeks) {
  var best = null;
  for (var i = 0; i < weeks.length; i++) if (!best || weeks[i].weekEnding > best) best = weeks[i].weekEnding;
  return best;
}
/** What the screens call the chosen week: the newest is "Last Week", any other is "Term 1 \u00b7 Week 5"; sub = "Week ending 8 Oct". Null in 25/26. */
function weekHeading(year, chosen, newest, weeks) {
  if (year !== "2627") return null;
  var week = chosen != null ? chosen : (newest != null ? newest : null);
  if (!week) return { name: "Last Week", sub: "" };
  if (week === (newest != null ? newest : null)) return { name: "Last Week", sub: weekEndingText(week) };
  var info = null;
  for (var i = 0; i < weeks.length; i++) if (weeks[i].weekEnding === week) { info = weeks[i]; break; }
  return { name: info ? "Term " + info.term + " \u00b7 Week " + info.weekInTerm : "Selected week", sub: weekEndingText(week) };
}
/** The order of the numbers in one week's compact array (WEEK_FIELDS in src/lib/attendance.ts). */
var WEEK_FIELDS = ["daysOpen", "absentValid", "absentInvalid", "lateToSchool", "lateToSchoolMinutes", "earlyLeave", "lateToClass", "bathroom", "clinic", "awards"];
function periodForWeek(s, weekEnding) {
  var a = s.weekly ? s.weekly[weekEnding] : undefined, out = {};
  WEEK_FIELDS.forEach(function (f, i) { out[f] = Number(a ? a[i] : undefined) || 0; });
  return out;
}
/** The same child with the "week" numbers swapped for the chosen week (the newest week or no choice = untouched). */
function studentForWeek(s, weekEnding) {
  if (!weekEnding || !s.weekly || weekEnding === s.lastWeekEnding) return s;
  var w = periodForWeek(s, weekEnding), out = {};
  for (var k in s) if (Object.prototype.hasOwnProperty.call(s, k)) out[k] = s[k];
  out.periods = s.periods ? { year: s.periods.year, term: s.periods.term, week: w } : s.periods;
  out.lastWeekEnding = weekEnding;
  out.lateToSchoolThisWeek = w.lateToSchool;
  out.lateToSchoolMinutesThisWeek = w.lateToSchoolMinutes;
  out.lateToClassThisWeek = w.lateToSchool;
  out.validAbsenceLast7Days = w.absentValid;
  out.invalidAbsenceLast7Days = w.absentInvalid;
  out.earlyLeaveThisWeek = w.earlyLeave;
  out.totalDaysLast7Days = w.daysOpen;
  return out;
}

// ---- copied from src/pages/PrimaryParentDashboard.tsx ----------------------------------------------------------------
/** hasPerfectWeek(student): no absences, no lates, no early leave in the last 7 days; an empty week is not perfect and 25/26 never is. */
function hasPerfectWeek(student) {
  var totalAbsencesLast7Days = (student.validAbsenceLast7Days != null ? student.validAbsenceLast7Days : 0) +
    (student.invalidAbsenceLast7Days != null ? student.invalidAbsenceLast7Days : 0);
  // 25/26 has no last week (frozen June 2026 numbers), so no celebration there (D3).
  if (student.year !== "2627") return false;
  // A week with no open days is not a perfect week, just an empty one.
  var wk = student.periods && student.periods.week;
  var openDays = wk && wk.daysOpen != null ? wk.daysOpen : 0;
  if (openDays === 0) return false;
  return (
    totalAbsencesLast7Days === 0 &&
    student.lateToSchoolThisWeek === 0 &&
    student.lateToClassThisWeek === 0 &&
    student.earlyLeaveThisWeek === 0
  );
}

// Copied from the minutes-not-at-school statement of PrimaryParentDashboard.tsx (it still uses its own list, not isSecondaryStudent).
var SECONDARY_GRADES = ["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
function isSecondary(student) {
  return student.school ? student.school === "Secondary" : SECONDARY_GRADES.indexOf(student.grade) !== -1;
}

// ---- grade labels: the database stores "Grade -2" / "Grade -1" / "Grade 0" / "PREP", the app now SHOWS "Pre Kindy" / "Kindy" / "Prep"
// (displayGrade in supabase/functions/_shared/attendanceView.ts). ONE mapping here, used by the code and every test.
var P2_BANDS = ["Pre Kindy", "Kindy", "Prep", "Grade 1", "Grade 2"];
var P2_BAND_STORED = { "Pre Kindy": "Grade -2", "Kindy": "Grade -1", "Prep": "Grade 0", "Grade 1": "Grade 1", "Grade 2": "Grade 2" };
/** band(grade) -> "Pre Kindy" | "Kindy" | "Prep" | "Grade 1" | "Grade 2" for a P-2 child (stored OR displayed label), else null. */
function band(grade) {
  var g = String(grade == null ? "" : grade).trim().toLowerCase().replace(/\s+/g, " ");
  if (g === "grade -2" || g === "pre kindy") return "Pre Kindy";
  if (g === "grade -1" || g === "kindy") return "Kindy";
  if (g === "grade 0" || g === "prep") return "Prep";
  if (g === "grade 1") return "Grade 1";
  if (g === "grade 2") return "Grade 2";
  return null;
}
function isP2(grade) { return band(grade) !== null; }

// ---- the Grade 3-6 band (24 Oct 2026): same story, a different game scene (jigsaw for girls, football for boys). P-2 results above are untouched.
var G36_BANDS = ["Grade 3", "Grade 4", "Grade 5", "Grade 6"];
/** g36Band(grade) -> "Grade 3" | "Grade 4" | "Grade 5" | "Grade 6" for a Grade 3-6 child, else null. */
function g36Band(grade) {
  var g = String(grade == null ? "" : grade).trim().toLowerCase().replace(/\s+/g, " ");
  for (var i = 0; i < G36_BANDS.length; i++) if (g === G36_BANDS[i].toLowerCase()) return G36_BANDS[i];
  return null;
}
function isG36(grade) { return g36Band(grade) !== null; }
/** storyGrade(grade): does this child get the animated story (P-2 or Grade 3-6)? */
function storyGrade(grade) { return isP2(grade) || isG36(grade); }
/** storyBand(grade) -> "p2" | "g36" | null: which story band the grade plays. */
function storyBand(grade) { return isP2(grade) ? "p2" : isG36(grade) ? "g36" : null; }

function nz(x) { return x != null ? x : 0; }

/** One period (week / term / year) in the story's names, plus the numbers the page works out from it. */
function period(student, p) {
  var absent = nz(p.absentValid) + nz(p.absentInvalid);
  var late = nz(p.lateToSchool), lateMin = nz(p.lateToSchoolMinutes), open = nz(p.daysOpen);
  var sec = isSecondary(student);
  var perDay = sec ? 315 : 330, lessonLen = sec ? 35 : 30;
  var minutes = lateMin + absent * perDay;
  return {
    daysOpen: open,
    absent: absent,
    lateToSchool: late,
    lateMinutes: lateMin,
    earlyLeave: nz(p.earlyLeave),
    attendancePct: Math.round(attendancePercent(open, absent)),
    punctualityPct: Math.round(punctualityPercent(open, late)),
    minutes: minutes,
    hours: Math.round(minutes / 60),
    lessons: Math.floor(minutes / lessonLen)
  };
}

/** When the response has no `periods` (old shape), fall back to the old field names the page also carries. */
function legacyPeriods(s) {
  return {
    week: { daysOpen: s.totalDaysLast7Days, absentValid: s.validAbsenceLast7Days, absentInvalid: s.invalidAbsenceLast7Days,
      lateToSchool: s.lateToSchoolThisWeek, lateToSchoolMinutes: s.lateToSchoolMinutesThisWeek, earlyLeave: s.earlyLeaveThisWeek },
    term: { daysOpen: s.totalDaysThisTerm, absentValid: s.validAbsenceThisTerm, absentInvalid: s.invalidAbsenceThisTerm,
      lateToSchool: s.lateToSchoolThisTerm, lateToSchoolMinutes: s.lateToSchoolMinutesThisTerm, earlyLeave: s.earlyLeaveThisTerm },
    year: { daysOpen: s.totalDaysInSchool, absentValid: s.validAbsenceThisYear, absentInvalid: s.invalidAbsenceThisYear,
      lateToSchool: s.lateToSchoolThisYear, lateToSchoolMinutes: s.lateToSchoolMinutes, earlyLeave: s.earlyLeaveThisYear }
  };
}

// The week number is the app's own: the server sends weekList = [{weekEnding, term, weekInTerm}] and the Term / Week picker on
// the page names a week "Term 1 \u00b7 Week 7". The story shows the same weekInTerm. No weekList (older server, 25/26 only): null,
// never a guessed number.
function weekNumberOf(iso, weekList) {
  var key = String(iso || "").slice(0, 10);
  if (!key || !weekList || !weekList.length) return null;
  for (var i = 0; i < weekList.length; i++) {
    var w = weekList[i];
    if (w && String(w.weekEnding || "").slice(0, 10) === key && w.weekInTerm != null) return Number(w.weekInTerm);
  }
  return null;
}

function toStory(response) {
  var years = (response && response.years) || {};
  var student = years["2627"] || (response && response.student);
  if (!student) throw new Error("P2Data.toStory: the response has no student");
  var per = student.periods || legacyPeriods(student);
  var n = weekNumberOf(student.lastWeekEnding, response && response.weekList);
  var asOfBy = (response && response.dataAsOfByYear) || {};
  var keys = Object.keys(years);
  return {
    child: { name: student.forename != null && student.forename !== "" ? student.forename : student.name, form: student.form, grade: student.grade },
    weekEnding: student.lastWeekEnding || null,
    weekEndingText: weekEndingText(student.lastWeekEnding),          // "Week ending 15 Oct", the page's own label
    weekNumber: n,
    episode: n != null ? "Week " + n : "Last week",
    termNumber: student.termNumber != null ? student.termNumber : null,
    perfect: hasPerfectWeek(student),
    dataAsOf: asOfBy["2627"] != null ? asOfBy["2627"] : (response && response.dataAsOf != null ? response.dataAsOf : null),
    years: keys.length ? keys : (student.year ? [student.year] : []),
    lastWeek: period(student, per.week),
    term: period(student, per.term),
    year: period(student, per.year),
    response: response                  // the raw response, kept so the last beat (P2Page) can show the whole page from it
  };
}

// ---- the whole parent page (P2Page): both years, the Last Week block and the three charts ---------------------------------
/** The page's "Late to School" ring in the Last Week block reads `lateToClassThisWeek` (PrimaryParentDashboard.tsx), the charts
 *  read `lateToSchoolThisWeek`; for primary children they are equal (checked on every child in the preview). */
function pickOld(v, fallback) { return v != null ? v : fallback; }

/** One year's record in the shape P2Page draws. Rules copied from PrimaryParentDashboard.tsx (current year = 26/27).
 *  weekList = the response's weeks (26/27); picked = the week the viewer chose in the Term / Week picker (null = the newest).
 *  The page's own order: the chosen week's numbers replace the "week" ones (studentForWeek), the heading names the week
 *  (weekHeading: "Last Week" for the newest, else "Term 1 \u00b7 Week 5"), 25/26 has no week at all (weekLabel null). */
function pageYear(student, key, dataAsOf, weekList, picked) {
  var cur = key === "2627";
  var weeks = cur && weekList ? weekList : [];
  var newest = cur ? (student.lastWeekEnding != null ? student.lastWeekEnding : newestWeekEnding(weeks)) : null;
  var inList = false;
  for (var i = 0; i < weeks.length; i++) if (weeks[i].weekEnding === picked) inList = true;
  var chosen = cur ? (picked && inList ? picked : newest) : null;
  var st = cur ? studentForWeek(student, chosen) : student;
  var heading = weekHeading(key, chosen, newest, weeks);
  var per = st.periods || legacyPeriods(st);
  var wk = per.week || {}, tm = per.term || {}, yr = per.year || {};
  var weekAbsent = nz(pickOld(st.validAbsenceLast7Days, wk.absentValid)) + nz(pickOld(st.invalidAbsenceLast7Days, wk.absentInvalid));
  var termAbsent = nz(pickOld(st.validAbsenceThisTerm, tm.absentValid)) + nz(pickOld(st.invalidAbsenceThisTerm, tm.absentInvalid));
  var yearAbsent = nz(pickOld(st.validAbsenceThisYear, yr.absentValid)) + nz(pickOld(st.invalidAbsenceThisYear, yr.absentInvalid));
  var lateWeek = nz(pickOld(st.lateToSchoolThisWeek, wk.lateToSchool));
  return {
    year: key,
    current: cur,
    weekLabel: heading ? heading.name : null,                                  // null in 25/26: no week button, no week block, two bars per chart
    weekSub: heading ? heading.sub : "",                                       // "Week ending 15 Oct"
    weekEnding: cur ? chosen : null,
    newestWeek: newest,
    // the Term / Week picker (26/27 only, and only when the server sent weeks): groups term by term, option text as the page writes it
    picker: cur && weeks.length ? { value: chosen, groups: groupWeeksByTerm(weeks).map(function (g) { return { term: g.term, options: g.weeks.map(function (w) { return { value: w.weekEnding, label: weekOptionLabel(w), term: w.term, weekInTerm: w.weekInTerm }; }) }; }) } : null,
    dataAsOf: dataAsOf != null ? dataAsOf : null,
    action: !!student.action,
    child: { name: student.forename != null && student.forename !== "" ? student.forename : student.name, form: student.form, grade: student.grade },
    perfect: hasPerfectWeek(student),                                          // the page decides this once, on the newest week
    periods: { week: period(st, per.week), term: period(st, per.term), year: period(st, per.year) },
    // the Last Week block (three rings): days absent, late to school (the page reads lateToClassThisWeek), early leave
    lastWeek: { absent: weekAbsent, lateToSchool: nz(pickOld(st.lateToClassThisWeek, lateWeek)), earlyLeave: nz(pickOld(st.earlyLeaveThisWeek, wk.earlyLeave)) },
    // the three charts, each Last Week (or the chosen week) / This Term / This Year (the page's MetricChart data; 25/26 has no week bar)
    charts: {
      absence: { week: weekAbsent, term: termAbsent, year: yearAbsent },
      late: { week: lateWeek, term: nz(pickOld(st.lateToSchoolThisTerm, tm.lateToSchool)), year: nz(pickOld(st.lateToSchoolThisYear, yr.lateToSchool)) },
      early: { week: nz(pickOld(st.earlyLeaveThisWeek, wk.earlyLeave)), term: nz(pickOld(st.earlyLeaveThisTerm, tm.earlyLeave)), year: nz(pickOld(st.earlyLeaveThisYear, yr.earlyLeave)) }
    }
  };
}

/** A response-like object built from toStory content (so the last beat still draws something when it is mounted without a response). */
function responseFromStory(c) {
  function per(p) { return { daysOpen: p.daysOpen, absentValid: p.absent, absentInvalid: 0, lateToSchool: p.lateToSchool, lateToSchoolMinutes: p.lateMinutes, earlyLeave: p.earlyLeave }; }
  var student = {
    year: "2627", grade: (c.child && c.child.grade) || "", form: (c.child && c.child.form) || "", school: "Primary",
    name: c.child && c.child.name, forename: c.child && c.child.name,
    lastWeekEnding: c.weekEnding || null, termNumber: c.termNumber != null ? c.termNumber : null,
    periods: { week: per(c.lastWeek), term: per(c.term), year: per(c.year) },
    lateToClassThisWeek: c.lastWeek.lateToSchool, earlyLeaveThisWeek: c.lastWeek.earlyLeave,
    validAbsenceLast7Days: c.lastWeek.absent, invalidAbsenceLast7Days: 0
  };
  return { student: student, defaultYear: "2627", years: { "2627": student }, dataAsOf: c.dataAsOf != null ? c.dataAsOf : null, dataAsOfByYear: { "2627": c.dataAsOf != null ? c.dataAsOf : null } };
}

/** P2Data.toPage(response | story content) -> { defaultYear, years:["2627","2526"] (those present), byYear:{ "2627": pageYear, ... } }.
 *  Same year rules as the page: default = defaultYear (else 26/27), a year switch only when more than one year is present,
 *  data note date per year (dataAsOfByYear, else dataAsOf for the default year). byYear[k].atWeek(weekEnding) gives the same record
 *  for another week of the Term / Week picker (26/27; 25/26 ignores it). */
function toPage(input) {
  var response = input && input.response ? input.response : input && input.student ? input : input && input.years && !Array.isArray(input.years) ? input : responseFromStory(input);
  var yrs = response.years || (response.student ? (function () { var o = {}; o[response.student.year || "2627"] = response.student; return o; })() : {});
  var keys = ["2627", "2526"].filter(function (k) { return !!yrs[k]; });
  if (!keys.length) throw new Error("P2Data.toPage: the response has no student");
  var first = response.defaultYear && yrs[response.defaultYear] ? response.defaultYear : keys[0];
  var asOfBy = response.dataAsOfByYear || (function () { var o = {}; o[first] = response.dataAsOf != null ? response.dataAsOf : null; return o; })();
  var weekList = Array.isArray(response.weekList) ? response.weekList : [];
  var byYear = {};
  keys.forEach(function (k) {
    var cache = {};
    var rec = pageYear(yrs[k], k, asOfBy[k], weekList, null);
    rec.atWeek = function (w) {
      if (!rec.current || w == null) return rec;
      if (!cache[w]) cache[w] = pageYear(yrs[k], k, asOfBy[k], weekList, w);
      return cache[w];
    };
    byYear[k] = rec;
  });
  return { defaultYear: first, years: keys, byYear: byYear };
}

var API = { toStory: toStory, toPage: toPage, hasPerfectWeek: hasPerfectWeek, attendancePercent: attendancePercent, punctualityPercent: punctualityPercent, weekNumberOf: weekNumberOf,
  weekEndingText: weekEndingText, weekOptionLabel: weekOptionLabel, groupWeeksByTerm: groupWeeksByTerm, newestWeekEnding: newestWeekEnding, weekHeading: weekHeading, periodForWeek: periodForWeek, studentForWeek: studentForWeek, band: band, isP2: isP2, g36Band: g36Band, isG36: isG36, storyGrade: storyGrade, storyBand: storyBand, G36_BANDS: G36_BANDS, P2_BANDS: P2_BANDS, P2_BAND_STORED: P2_BAND_STORED };
root.P2Data = API;
if (typeof module !== "undefined" && module.exports) module.exports = API;
})(typeof window !== "undefined" ? window : globalThis);
