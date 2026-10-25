/* P-2 shared helpers · p2-form  (loaded before every p2 module)
 *
 * 1. window.P2Class(child) -> string
 *    One place for how a child's class is written on screen. The app's raw form value is shown as it is, except that
 *    "PREP A" reads "Prep A" (anything starting with "PREP " gets "Prep " + the rest). With no form, the grade is used.
 *
 * 2. window.P2Fit.create({ css, html, max }) -> { scale(), width(), destroy() }
 *    ONE shrink-to-fit helper for every name / class label (gate caption, walk caption, desk name card, cake writing).
 *    The label is measured on an OFF-SCREEN twin (position:fixed far left, visibility:hidden, in document.body; never
 *    display:none, which measures 0), at its natural size. scale() = min(1, max / natural width), re-measured after the
 *    font has loaded (a measurement of 0 is never kept). Apply it as transform: scale(...) about the label's centre.
 *    Call destroy() when the beat is destroyed.
 *    P2Fit.chars(parts) builds the twin's html for a caption made of one inline-block per letter (so it measures the same
 *    as the visible letters, which pop in one by one and cannot kern across each other): parts = [[text, fontPx, color?], ...].
 *
 * 3. window.P2Wide.begin(ctx) -> { col, sw, ox, wide, bg(art, file, h), src(art, wideFile, file) }
 *    The story stage follows the screen: 1080 x 1920 on a phone, up to 3414 x 1920 (16:9) on a laptop. Every beat keeps
 *    its own 1080-wide design in a centred COLUMN (`col`, left = ox), so figures, sorter box, cake and family stay exactly
 *    where they were; only the picture behind them is the WIDE one (centre 1080 px = the portrait picture) and the extra
 *    width on each side is background. ox = (stage width - 1080) / 2, always a whole number (the story keeps the width even).
 *    bg() gives the css box of a background picture inside the column (left -1167, 3414 wide when wide), src() the file.
 */
(function () {
window.P2Class = function (child) {
  var f = child && child.form != null && String(child.form).trim() !== "" ? String(child.form).trim() : null;
  if (f === null) return child && child.grade != null ? String(child.grade) : "";
  return f.indexOf("PREP ") === 0 ? "Prep " + f.slice(5) : f;
};

// ------------------------------------------------------------------------------------------------ shrink to fit
var fitters = [];
if (document.fonts && document.fonts.addEventListener) {
  document.fonts.addEventListener("loadingdone", function () { fitters.forEach(function (f) { f.reset(); }); });
}
window.P2Fit = {
  create: function (o) {
    var m = null, nat = -1, k = 1;
    function measure() {
      if (!m) {
        m = document.createElement("div");
        m.setAttribute("aria-hidden", "true");
        m.style.cssText = "position:fixed;left:-20000px;top:0;visibility:hidden;pointer-events:none;" + o.css;
        m.innerHTML = o.html;
        document.body.appendChild(m);
      }
      var w = m.getBoundingClientRect().width;
      if (w > 0 && w !== nat) { nat = w; k = w > o.max ? o.max / w : 1; }
    }
    var f = {
      scale: function () { measure(); return k; },
      width: function () { measure(); return nat; },
      reset: function () { nat = -1; },
      destroy: function () { if (m && m.parentNode) m.parentNode.removeChild(m); m = null; var i = fitters.indexOf(f); if (i >= 0) fitters.splice(i, 1); }
    };
    fitters.push(f);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(f.reset);
    return f;
  },
  chars: function (parts, font) {
    return parts.map(function (p) {
      return '<span style="display:inline-flex">' + String(p[0]).split("").map(function (ch) {
        return '<span style="display:inline-block;font:700 ' + p[1] + "px/1 " + font + ';white-space:pre">' + ch.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</span>";
      }).join("") + "</span>";
    }).join("");
  }
};

// ------------------------------------------------------------------------------------------------ wide stage
var WIDE_W = 3414, WIDE_LEFT = (WIDE_W - 1080) / 2;                 // the wide pictures are 3414 wide with the portrait picture exactly in the middle
window.P2Wide = {
  WIDE_W: WIDE_W, WIDE_LEFT: WIDE_LEFT,
  begin: function (ctx) {
    var sw = ctx.W, ox = Math.max(0, Math.round((sw - 1080) / 2)), wide = sw > 1080;
    var col = document.createElement("div");
    col.style.cssText = "position:absolute;left:" + ox + "px;top:0;width:1080px;height:1920px";
    ctx.stage.appendChild(col);
    return {
      col: col, sw: sw, ox: ox, wide: wide, wideLeft: wide ? WIDE_LEFT : 0,
      // css box of a background picture inside the column; h = the picture's height (1920, or 1935 for the arrival and classroom ones)
      bg: function (h, top) { return "left:" + (wide ? -WIDE_LEFT : 0) + "px;top:" + (top || 0) + "px;width:" + (wide ? WIDE_W : 1080) + "px;height:" + h + "px"; },
      // the file to load: wide pictures live in <base>wide/, next to the <something>-layers/ folders (art = "<base>x-layers/")
      src: function (art, wideFile, file) { return wide ? String(art).replace(/[^\/]*\/$/, "wide/") + wideFile : art + file; }
    };
  }
};
// ------------------------------------------------------------------------------------------------ child pictures (girl / boy)
// The pictures that show the child (walk pair, gate pair, classroom desk, party, family) exist per look in <base>girl/ and <base>boy/
// (same <x>-layers/ names, plus wide/); backgrounds without the child stay in <base>. P2Kid.art(content, art) turns "<base>walk-layers/"
// into "<base>girl/walk-layers/". ON by default since 23 Oct 2026 (all pieces of both looks built): look "girl" = the girl art, anything else
// (a boy, or a name that cannot be read = neutral child) = the boy art. Switch back to the old single-child art with content.kidArt false,
// window.P2_KID_ART false or ?kidart=0 in the address.
window.P2Kid = {
  ON: true,
  art: function (c, art) {
    var on = c.kidArt !== undefined ? !!c.kidArt : (window.P2_KID_ART !== undefined ? !!window.P2_KID_ART : (P2Kid.ON && !/[?&]kidart=0\b/.test(location.search)));
    // Grade 3-6 (content.band "g36"): the same folders with a 36 on them (girl36 = Noor's art, boy36 = the Grade 3-6 boy), see rebuild-serve.sh
    var kid = (c.look === "girl" ? "girl" : "boy") + (c.band === "g36" ? "36" : "");
    return on ? String(art).replace(/([^\/]*\/)$/, kid + "/$1") : art;
  }
};
})();
