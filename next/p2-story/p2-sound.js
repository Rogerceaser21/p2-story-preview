/* P-2 report story · p2-sound
 * The sound layer of the story. It makes no pictures and the animation never waits for it: it watches the STORY CLOCK (the p2-story timeline) and plays
 *   - the effects of the cue list MotionIgor.registry["p2-story"].cues(content) = [{ t, name, beat }] (story seconds) when the clock passes each cue, and
 *   - the music bed (music.m4a, 55 s, baked to cover the 54.5 s story) from the clock's own second, so a pause, a picture wait, a seek, a resize remount or a
 *     Replay all stay in sync (the bed restarts at the clock's second if it ever drifts by more than 1 s).
 * A cue is played only when the clock passes it during normal play: after a jump of the clock (a seek, a tab switch that froze the clock) nothing is
 * re-fired, and while the clock is paused or stalled nothing plays and the music stops. Effects are scheduled on the audio clock up to 0.5 s ahead (so a late
 * timer tick on a busy frame never delays one); a pause, a jump, Skip or mute cancels the ones that have not started yet.
 * Web Audio: the files are fetched at once (effects first, music last) and decoded when the person taps (the tap creates and resumes the AudioContext, which
 * is what iPhone Safari and Chrome require). Sound blocked, unsupported or a file missing = the story plays exactly the same, silently, no errors.
 * Igor's picks (23 Oct 2026): swoosh = whoosh at every wipe, bell when the lesson begins, pop = a good piece goes in its hole, thud = absent, clank = late to
 * school, switch = early leave, tap = a counter goes up, a quiet bed under it all; NO footsteps, cheering or clapping. The claw machine sounds (claw-move,
 * claw-grab, toy-drop, toy-slip) play in the girls' claw scene (p2-claw): they are fetched only when the story's cue list has them (snd.run), never for the peg sorter.
 * Levels: the files are levelled in tools/encode-audio.sh (music -21 LUFS, effects about -16 dB RMS with a peak limit), so the effects sit clearly above the bed.
 * The last beat (the report) and the page are silent: cues stop before it and the bed is gone by 52.5 s.
 * Silent switch (iPhone): Web Audio follows the ringer switch, media playback does not. The Tap to play click calls P2Sound.unlockMedia() FIRST (synchronously, in the
 * gesture): it sets navigator.audioSession.type = "playback" (iOS 17+ / Safari 16.4+) and starts a looping, truly silent HTML <audio> element (a 0.6 s mp3 as a data URI;
 * the trick older iOS needs to move the audio session to "playback"). P2Sound.releaseMedia() undoes both (Skip, the end, mute, leaving the page). Where those APIs
 * do not exist nothing happens. The silent loop is silent: the sound on/off button only needs the Web Audio master gain.
 * Decoding: the files are fetched and DECODED at once when the story is mounted (before the tap, on an OfflineAudioContext, which needs no gesture, so there is
 * still no AudioContext before the tap); the tap then only creates and resumes the real one, so no decode work lands on the title animation.
 * Debug: snd.log holds every sound the layer triggered ({ kind: "cue", name, sound, cueT, t, played } and music-start / music-stop); P2Sound.current is the live layer.
 */
(function () {
var SOUNDS = {                       // sound name -> file in audio/ (gain = extra gain on top of the levelled file, 1 = as encoded)
  whoosh: { file: "whoosh.m4a", gain: 1 },
  bell: { file: "bell.m4a", gain: 1 },
  pop: { file: "pop.m4a", gain: 1 },
  thud: { file: "thud.m4a", gain: 1 },
  clank: { file: "clank.m4a", gain: 1 },
  "switch": { file: "switch.m4a", gain: 1 },
  tap: { file: "tap.m4a", gain: 1 },
  "claw-move": { file: "claw-move.m4a", gain: 0.25 },      // the claw machine scene (girls)
  "claw-grab": { file: "claw-grab.m4a", gain: 0.25 },
  "toy-drop": { file: "toy-drop.m4a", gain: 0.25 },
  "toy-slip": { file: "toy-slip.m4a", gain: 0.25 },
  music: { file: "music.m4a", gain: 1 }
};
var CUE_SOUND = {                    // story cue name -> sound name; cue names not listed here make no sound (round-start, wrong-hole, round-clear)
  swoosh: "whoosh", bell: "bell", "drop-in": "pop", "tag-absent": "thud", "tag-late": "clank", "tag-early": "switch", "counter-tick": "tap",
  "claw-move": "claw-move", "claw-grab": "claw-grab", "toy-drop": "toy-drop", "toy-slip": "toy-slip"      // the girls' claw machine (p2-claw), only fetched when the story has them
};
var CLAW_SOUNDS = { "claw-move": 1, "claw-grab": 1, "toy-drop": 1, "toy-slip": 1 };
var MUSIC = { fadeInEnd: 0.8, fadeOutFrom: 50.0, fadeOutTo: 52.5, resync: 2.0 };
var LOOKAHEAD = 0.5;
var JUMP = 0.8;                      // a forward step of the story clock bigger than the time that passed by more than this (seconds) is a seek, not time passing                // seconds of story clock: effects are handed to the audio clock this far ahead, so a late timer tick (a busy frame) never delays one
var PREF_KEY = "p2story:sound";       // "off" = the person turned the sound off on this device; anything else (or storage blocked) = sound on

function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
function envelope(t) {               // music level for story second t (a pure function of t, so a seek lands on the right level)
  var up = clamp(t / MUSIC.fadeInEnd, 0, 1), down = 1 - clamp((t - MUSIC.fadeOutFrom) / (MUSIC.fadeOutTo - MUSIC.fadeOutFrom), 0, 1);
  return up * up * (3 - 2 * up) * down * down * (3 - 2 * down);
}
function nowMs() { return (window.performance && performance.now) ? performance.now() : Date.now(); }

function create(opts) {
  opts = opts || {};
  var base = opts.base || "";
  var muted = !!opts.muted;
  var ctx = null, master = null, fxBus = null, musicBus = null;
  var raw = {}, buffers = {}, decoding = {};
  var log = [], suppressed = 0;
  var clock = null, timer = 0, lastT = 0, lastSched = 0, lastWall = 0, still = 0;
  var pending = [];                  // effects handed to the audio clock that have not started yet: { src, at (ctx time), entry }
  var music = null;                  // { src, gain, off, at }: off = story second the source started at, at = ctx time it started
  var snd = {};

  function note(e) { log.push(e); if (log.length > 600) log.shift(); }
  var wanted = {};                   // claw sounds the current story asks for (set by run() from its cue list): they are fetched only then, never for the peg sorter
  function usedNames() { var o = {}; Object.keys(CUE_SOUND).forEach(function (k) { if (!CLAW_SOUNDS[CUE_SOUND[k]] || wanted[CUE_SOUND[k]]) o[CUE_SOUND[k]] = 1; }); o.music = 1; return Object.keys(o); }

  // ------------------------------------------------------------------ loading
  function fetchRaw(name) {
    if (!raw[name]) {
      raw[name] = (typeof fetch === "function" && SOUNDS[name])
        ? fetch(base + SOUNDS[name].file).then(function (r) { if (!r.ok) throw new Error("audio " + r.status); return r.arrayBuffer(); }).catch(function () { return null; })
        : Promise.resolve(null);
    }
    return raw[name];
  }
  /** fetch every sound the story uses: the effects together, then the music bed (so the small files are never queued behind the big one) */
  snd.preload = function () {
    var names = usedNames().filter(function (n) { return n !== "music"; });
    Promise.all(names.map(fetchRaw)).then(function () { return fetchRaw("music"); }).then(decodeAll, function () {});
  };
  var offline = null;                // OfflineAudioContext used only to decode before the tap (an AudioBuffer plays in any context; the source node resamples)
  function decoder() {
    if (ctx) return ctx;
    if (offline === null) {
      offline = false;
      try { var O = window.OfflineAudioContext || window.webkitOfflineAudioContext; if (O) offline = new O(1, 1, 44100); } catch (e) { offline = false; }
    }
    return offline || null;
  }
  function decode(ab) {
    return new Promise(function (ok, no) {
      var r, d = decoder();
      if (!d) { no(new Error("no decoder")); return; }
      try { r = d.decodeAudioData(ab, ok, no); } catch (e) { no(e); return; }
      if (r && typeof r.then === "function") r.then(ok, no);
    });
  }
  function decodeNow(name) {
    if (buffers[name] || decoding[name]) return decoding[name] || null;
    if (!decoder()) return null;
    decoding[name] = fetchRaw(name).then(function (ab) { return ab ? decode(ab) : null; }).then(function (b) { if (b) buffers[name] = b; else delete decoding[name]; }, function () { delete decoding[name]; });
    return decoding[name];
  }
  function decodeAll() { if (decoder()) usedNames().forEach(decodeNow); }
  /** load (and decode) one registered sound on demand, e.g. the claw machine's; resolves when it is ready or failed */
  snd.load = function (name) { return fetchRaw(name).then(function () { return decodeNow(name); }); };

  // ------------------------------------------------------------------ the tap: create / resume the AudioContext
  snd.unlock = function () {
    if (!ctx) {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) return false;
      try { ctx = new C(); } catch (e) { ctx = null; return false; }
      master = ctx.createGain(); master.gain.value = muted ? 0 : 1;
      var comp = ctx.createDynamicsCompressor();                  // catches the odd peak when an effect lands on the bed
      comp.threshold.value = -10; comp.knee.value = 10; comp.ratio.value = 3; comp.attack.value = 0.004; comp.release.value = 0.2;
      master.connect(comp); comp.connect(ctx.destination);
      fxBus = ctx.createGain(); fxBus.connect(master);
      musicBus = ctx.createGain(); musicBus.gain.value = 0; musicBus.connect(master);
    }
    try { var p = ctx.resume(); if (p && typeof p.catch === "function") p.catch(function () {}); } catch (e) { /* stays silent */ }
    try { var sb = ctx.createBufferSource(); sb.buffer = ctx.createBuffer(1, 1, 22050); sb.connect(ctx.destination); sb.start(0); } catch (e) { /* iOS output unlock only */ }
    snd.preload();
    decodeAll();
    return true;
  };

  // ------------------------------------------------------------------ effects
  /** hand one cue to the audio clock, to start `wait` seconds from now (0 = now). The log's t is the story second the sound actually starts at. */
  function trigger(cue, t, wait) {
    var name = CUE_SOUND[cue.name];
    if (!name) return;
    if (muted) { suppressed++; return; }
    var buf = buffers[name], src = null, at = 0;
    if (buf && ctx && ctx.state === "running") {
      try {
        src = ctx.createBufferSource(); var g = ctx.createGain();
        src.buffer = buf; g.gain.value = SOUNDS[name].gain;
        src.connect(g); g.connect(fxBus);
        at = ctx.currentTime + Math.max(0, wait);
        src.start(at);
      } catch (e) { src = null; }
    }
    var entry = { kind: "cue", name: cue.name, sound: name, cueT: cue.t, t: +(Math.max(t + Math.max(0, wait), cue.t)).toFixed(3), played: !!src };
    note(entry);
    if (src) pending.push({ src: src, at: at, entry: entry });
  }
  /** cancel every effect that has been handed over but has not started (a pause, a jump, Skip, mute): it is also taken out of the log, as it never sounded */
  function cancelPending() {
    var now = ctx ? ctx.currentTime : 0;
    pending.forEach(function (p) {
      if (p.at > now) { try { p.src.stop(); } catch (e) { /* ignore */ } var i = log.indexOf(p.entry); if (i >= 0) log.splice(i, 1); }
    });
    pending = [];
  }

  // ------------------------------------------------------------------ music
  function stopMusic(fade, t) {
    if (!music) return;
    var m = music; music = null;
    try {
      var now = ctx.currentTime;
      m.gain.gain.cancelScheduledValues(now); m.gain.gain.setValueAtTime(m.gain.gain.value, now); m.gain.gain.linearRampToValueAtTime(0, now + fade);
      m.src.stop(now + fade + 0.03);
    } catch (e) { /* already ended */ }
    note({ kind: "music-stop", t: t == null ? null : +t.toFixed(3) });
  }
  function startMusic(t) {
    var buf = buffers.music;
    if (!buf) return;
    var off = clamp(t, 0, Math.max(0, buf.duration - 0.1));
    try {
      var src = ctx.createBufferSource(), g = ctx.createGain(), now = ctx.currentTime;
      src.buffer = buf; g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(SOUNDS.music.gain, now + 0.06);
      src.connect(g); g.connect(musicBus);
      src.start(0, off);
      music = { src: src, gain: g, off: off, at: now };
      note({ kind: "music-start", t: +t.toFixed(3), off: +off.toFixed(3) });
    } catch (e) { music = null; }
  }
  function musicTick(playing, t, jumped) {
    if (!ctx) return;
    var env = envelope(t);
    var want = playing && !muted && env > 0.001 && !!buffers.music && ctx.state === "running";
    if (!want) { if (music) stopMusic(0.08, t); return; }
    if (music && (jumped || Math.abs(music.off + (ctx.currentTime - music.at) - t) > MUSIC.resync)) stopMusic(0.05, t);
    if (!music) startMusic(t);
    try { musicBus.gain.setTargetAtTime(env, ctx.currentTime, 0.04); } catch (e) { /* ignore */ }
  }

  // ------------------------------------------------------------------ the clock
  function tick() {
    if (!clock) return;
    var t, playing;
    try { t = clock.time(); playing = clock.playing(); } catch (e) { return; }
    var now = nowMs(), wall = (now - lastWall) / 1000; lastWall = now;
    var adv = t - lastT, rate = Math.max(1, clock.rate ? clock.rate() : 1);
    if (ctx && pending.length) { var ct = ctx.currentTime; pending = pending.filter(function (p) { return p.at > ct; }); }
    if (!playing) { cancelPending(); lastT = lastSched = t; still = 0; musicTick(false, t, false); return; }
    // a clock that has not moved for 0.3 s although it "plays" is frozen (hidden tab): treat it as paused until it moves again
    still = Math.abs(adv) < 0.0005 ? still + wall : 0;
    if (still > 0.3) { cancelPending(); lastT = lastSched = t; musicTick(false, t, false); return; }
    // a seek, not time passing: re-fire nothing. A busy frame can hold the story clock back and then let it catch up in one step (up to about 0.5 s on a slow
    // machine), so only a step well beyond that counts as a jump.
    var jumped = adv < -0.02 || adv > wall * rate + JUMP;
    if (jumped) { cancelPending(); lastSched = t; }
    else if (ctx) {
      var cues = clock.cues || [], upTo = t + LOOKAHEAD * rate;
      for (var i = 0; i < cues.length; i++) if (cues[i].t > lastSched && cues[i].t <= upTo) trigger(cues[i], t, Math.max(0, (cues[i].t - t) / rate));
      lastSched = Math.max(lastSched, upTo);
    } else lastSched = t;
    lastT = t;
    musicTick(true, t, jumped);
  }
  /** follow this clock { time(), playing(), rate(), cues } (story seconds). Calling it again (a remount of the story at the same second) swaps the clock and keeps the bed going. */
  snd.run = function (c) {
    clock = c; lastT = lastSched = c.time(); lastWall = nowMs(); still = 0;
    (c.cues || []).forEach(function (q) { var nm = CUE_SOUND[q.name]; if (nm && CLAW_SOUNDS[nm] && !wanted[nm]) { wanted[nm] = 1; snd.load(nm); } });
    if (fxBus) { try { fxBus.gain.cancelScheduledValues(ctx.currentTime); fxBus.gain.setValueAtTime(1, ctx.currentTime); } catch (e) { /* ignore */ } }
    if (!timer) timer = window.setInterval(tick, 25);
  };
  /** the story is over, skipped or left: stop following the clock, fade the bed and the effects out */
  snd.halt = function (fadeMs) {
    clock = null; cancelPending(); releaseMedia();
    if (timer) { window.clearInterval(timer); timer = 0; }
    var f = (fadeMs == null ? 150 : fadeMs) / 1000;
    if (ctx) { stopMusic(f, null); try { fxBus.gain.setTargetAtTime(0, ctx.currentTime, f / 3 || 0.01); } catch (e) { /* ignore */ } }
  };
  /** forget the log (a new play of the story) */
  snd.reset = function () { log.length = 0; suppressed = 0; };
  snd.setMuted = function (m) {
    muted = !!m;
    if (muted) releaseMedia();
    if (ctx) { try { master.gain.setTargetAtTime(muted ? 0 : 1, ctx.currentTime, 0.02); } catch (e) { /* ignore */ } if (muted) { cancelPending(); stopMusic(0.06, null); } }
  };
  snd.isMuted = function () { return muted; };
  snd.destroy = function () { snd.halt(0); if (ctx) { try { ctx.close(); } catch (e) { /* ignore */ } } ctx = null; if (P2Sound.current === snd) P2Sound.current = null; };
  snd.log = log;
  snd.stats = function () {
    return { state: ctx ? ctx.state : "none", muted: muted, suppressed: suppressed, decoded: Object.keys(buffers), musicOn: !!music, cuesPlayed: log.filter(function (e) { return e.kind === "cue" && e.played; }).length };
  };
  P2Sound.current = snd;
  return snd;
}

// ------------------------------------------------------------------ silent switch (see the header): both calls are safe anywhere (no API = nothing happens)
// Short silent mp3 (0.6 s, 8 kHz mono, 1 KB), played in a loop.
var SILENT_MP3 = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjYyLjEyLjEwMQAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAACwAAA/AASUlJSUlJSUlJW1tbW1tbW1tbbW1tbW1tbW1tgICAgICAgICAkpKSkpKSkpKSpKSkpKSkpKSktra2tra2tra2ycnJycnJycnJ29vb29vb29vb7e3t7e3t7e3t////////////AAAAAExhdmM2Mi4yOAAAAAAAAAAAAAAAACQDwAAAAAAAAAPw41AMlwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVV/+MYxDsAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVV/+MYxHYAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVV/+MYxLEAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVV/+MYxMQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVV/+MYxMQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVV/+MYxMQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVV/+MYxMQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxMQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxMQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxMQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
var media = null, mediaSessionBefore = null;
/** call SYNCHRONOUSLY inside the Tap to play / sound-on click, before the AudioContext is created or resumed */
function unlockMedia() {
  try {
    var as = navigator.audioSession;
    if (as && "type" in as) { if (mediaSessionBefore === null) mediaSessionBefore = as.type; as.type = "playback"; }
  } catch (e) { /* not supported: the audio element below does the job on older iOS */ }
  try {
    if (!media) {
      var a = document.createElement("audio");
      a.setAttribute("playsinline", ""); a.setAttribute("webkit-playsinline", ""); a.setAttribute("x-webkit-airplay", "deny");
      a.setAttribute("aria-hidden", "true");
      a.disableRemotePlayback = true;
      a.preload = "auto"; a.loop = true; a.src = SILENT_MP3;
      a.style.cssText = "position:absolute;width:0;height:0;opacity:0;pointer-events:none";
      (document.body || document.documentElement).appendChild(a);
      media = a;
    }
    var p = media.play();
    if (p && typeof p.catch === "function") p.catch(function () { /* blocked: Web Audio still works with the ringer on */ });
  } catch (e) { /* no media element: ringer-on behaviour */ }
}
function releaseMedia() {
  if (media) { try { media.pause(); media.removeAttribute("src"); media.load(); if (media.parentNode) media.parentNode.removeChild(media); } catch (e) { /* ignore */ } media = null; }
  try { var as = navigator.audioSession; if (as && mediaSessionBefore !== null) as.type = mediaSessionBefore; } catch (e) { /* ignore */ }
  mediaSessionBefore = null;
}

function readMuted() { try { return window.localStorage.getItem(PREF_KEY) === "off"; } catch (e) { return false; } }
function saveMuted(m) { try { window.localStorage.setItem(PREF_KEY, m ? "off" : "on"); } catch (e) { /* blocked storage: sound stays on next time */ } }

var P2Sound = window.P2Sound = { create: create, unlockMedia: unlockMedia, releaseMedia: releaseMedia, SOUNDS: SOUNDS, CUE_SOUND: CUE_SOUND, MUSIC: MUSIC, envelope: envelope, readMuted: readMuted, saveMuted: saveMuted, current: null };
})();
