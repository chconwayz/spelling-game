// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_WORDS    = 10;
const ROUND_SECONDS  = 20;
const CIRCUMFERENCE  = 339.3; // 2 * π * 54 (SVG circle radius)
const AUDIO_PAUSE_MS = 700;   // gap between steps in the word sequence

// ─── Tricky word jingle (Web Audio API) ──────────────────────────────────────
function playTrickyJingle() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();

    // Rising sparkle fanfare: E5 → G5 → C6 → E6 → D6 → E6 (held)
    const notes = [
      { f: 659.3,  t: 0.00, d: 0.14 },
      { f: 783.9,  t: 0.11, d: 0.14 },
      { f: 1046.5, t: 0.22, d: 0.18 },
      { f: 1318.5, t: 0.34, d: 0.14 },
      { f: 1174.7, t: 0.44, d: 0.12 },
      { f: 1318.5, t: 0.54, d: 0.55 },
    ];

    notes.forEach(({ f, t, d }) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "triangle"; // warm, soft timbre
      osc.frequency.value = f;
      const s = ctx.currentTime + t;
      gain.gain.setValueAtTime(0, s);
      gain.gain.linearRampToValueAtTime(0.22, s + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, s + d);
      osc.start(s);
      osc.stop(s + d + 0.05);
    });

    setTimeout(() => ctx.close(), 2500);
  } catch (e) { /* audio not available — skip silently */ }
}

// ─── Speech voices ────────────────────────────────────────────────────────────
// Voices load asynchronously; cache them once ready.
let cachedVoices = [];

function loadVoices() {
  cachedVoices = speechSynthesis.getVoices();
}
speechSynthesis.addEventListener("voiceschanged", loadVoices);
loadVoices(); // populate immediately in browsers that load synchronously

// Known female voice names, ordered by preference (AU accent first)
const FEMALE_VOICE_NAMES = [
  "Karen",      // macOS en-AU female  ← ideal
  "Catherine",  // iOS / Windows en-AU female
  "Lee",        // en-AU female
  "Serena",     // macOS en-GB female
  "Kate",       // macOS en-GB female (older)
  "Hazel",      // Windows en-GB female
  "Moira",      // macOS en-IE female
  "Tessa",      // macOS en-ZA female
  "Samantha",   // macOS en-US female
  "Victoria",   // macOS en-US female
  "Allison",    // macOS en-US female
  "Ava",        // macOS en-US female
  "Zira",       // Windows en-US female
];

function getBestVoice() {
  for (const name of FEMALE_VOICE_NAMES) {
    const voice = cachedVoices.find(v => v.name.includes(name));
    if (voice) return voice;
  }
  // Fall back to any English voice
  return cachedVoices.find(v => v.lang.startsWith("en")) || null;
}

// ─── State ────────────────────────────────────────────────────────────────────
let gameWords   = [];
let wordIndex   = 0;
let timeLeft    = ROUND_SECONDS;
let timerHandle = null;
let timerActive = false;
let results     = [];

// ─── DOM references ───────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

const screens = {
  welcome : $("screen-welcome"),
  game    : $("screen-game"),
  results : $("screen-results"),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    el.classList.toggle("hidden", key !== name);
  });
}

function setTimerWaiting(waiting) {
  $("timer-container").classList.toggle("waiting", waiting);
}

// ─── Game start ───────────────────────────────────────────────────────────────
function startGame() {
  gameWords   = pickWords(TOTAL_WORDS);
  wordIndex   = 0;
  results     = Array(TOTAL_WORDS).fill(false);
  showScreen("game");
  showWord(0);
}

// ─── Show a word ──────────────────────────────────────────────────────────────
function showWord(index) {
  clearInterval(timerHandle);
  timerActive = false;

  const entry = gameWords[index];

  // Header
  $("word-counter").textContent = `Word ${index + 1} of ${TOTAL_WORDS}`;
  renderDots(index);

  // Card entrance pop
  const card = $("word-card");
  card.classList.remove("card-enter");
  void card.offsetWidth; // force reflow
  card.classList.add("card-enter");

  // Tricky word badge + jingle
  const badge = $("tricky-badge");
  badge.classList.add("hidden");
  badge.classList.remove("badge-entering", "badge-rocking");
  if (entry.type === "tricky") {
    playTrickyJingle();
    setTimeout(() => {
      badge.classList.remove("hidden");
      badge.classList.add("badge-entering");
      badge.addEventListener("animationend", () => {
        badge.classList.remove("badge-entering");
        badge.classList.add("badge-rocking");
      }, { once: true });
    }, 150);
  }

  if (entry.showPicture) {
    showPictureCard(entry);
    resetTimer();
    startTimer();
  } else {
    showAudioCard(entry);
    resetTimer();
    setTimerWaiting(true);
    // Give tricky words a moment for the jingle + badge to land before speaking
    const speakDelay = entry.type === "tricky" ? 1500 : 0;
    setTimeout(() => {
      playWordSequence(entry, () => {
        setTimerWaiting(false);
        $("btn-hear-again").classList.remove("hidden");
        startTimer();
      });
    }, speakDelay);
  }
}

// ─── Picture card ─────────────────────────────────────────────────────────────
function showPictureCard(entry) {
  $("card-picture").classList.remove("hidden");
  $("card-audio").classList.add("hidden");
  $("card-emoji").textContent = entry.emoji;
  $("card-hint").textContent  = entry.hint;
}

// ─── Audio card ───────────────────────────────────────────────────────────────
function showAudioCard(entry) {
  $("card-audio").classList.remove("hidden");
  $("card-picture").classList.add("hidden");
  $("btn-hear-again").classList.add("hidden");
  $("audio-status").textContent = "Listen carefully…";
}

// ─── Play word N times, then call onDone ─────────────────────────────────────
function makeUtterance(text, rate) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate  = rate;
  utter.pitch = 1.1;
  const voice = getBestVoice();
  if (voice) {
    utter.voice = voice;
    utter.lang  = voice.lang;
  } else {
    utter.lang = "en-AU";
  }
  return utter;
}

// Play: word (slow) → sentence → word (slow), then call onDone
function playWordSequence(entry, onDone) {
  cancelSpeech();

  const steps = [
    { text: entry.word,     rate: 0.6,  label: "🔊  Listen to the word…"   },
    { text: entry.sentence, rate: 0.78, label: "🔊  Now in a sentence…"     },
    { text: entry.word,     rate: 0.6,  label: "🔊  One more time…"         },
  ];
  let stepIndex = 0;

  function next() {
    if (stepIndex >= steps.length) {
      $("audio-status").textContent = "Now write the word! ✏️";
      onDone();
      return;
    }

    const { text, rate, label } = steps[stepIndex++];
    $("audio-status").textContent = label;

    const utter = makeUtterance(text, rate);

    let advanced = false;
    const advance = () => {
      if (advanced) return;
      advanced = true;
      clearTimeout(safetyTimer);
      setTimeout(next, AUDIO_PAUSE_MS);
    };
    utter.onend  = advance;
    utter.onerror = advance;
    // Safety net: if browser never fires onend/onerror (e.g. file:// blocks speech),
    // advance anyway so the game doesn't hang indefinitely.
    const safetyTimer = setTimeout(advance, 8000);

    speechSynthesis.speak(utter);
  }

  next();
}

function cancelSpeech() {
  speechSynthesis.cancel();
  // Always resume — Safari/macOS can be left in a stuck paused state after
  // cancel(), even when .speaking and .pending both read as false.
  speechSynthesis.resume();
}

// ─── Progress dots ────────────────────────────────────────────────────────────
function renderDots(activeIndex) {
  const container = $("progress-dots");
  container.innerHTML = "";
  for (let i = 0; i < TOTAL_WORDS; i++) {
    const dot = document.createElement("span");
    dot.className = "dot" +
      (i < activeIndex ? " done" : i === activeIndex ? " active" : "");
    container.appendChild(dot);
  }
}

// ─── Timer ────────────────────────────────────────────────────────────────────
function resetTimer() {
  clearInterval(timerHandle);
  timerActive = false;
  timeLeft    = ROUND_SECONDS;
  updateTimerDisplay();
}

function startTimer() {
  timerActive = true;
  timerHandle = setInterval(() => {
    if (!timerActive) return;
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerHandle);
      timerActive = false;
      $("timer-container").classList.add("flash");
      setTimeout(() => {
        $("timer-container").classList.remove("flash");
        advanceWord();
      }, 900);
    }
  }, 1000);
}

function updateTimerDisplay() {
  $("timer-number").textContent = timeLeft;

  const fraction = timeLeft / ROUND_SECONDS;
  $("timer-progress").style.strokeDashoffset = CIRCUMFERENCE * (1 - fraction);

  let colour;
  if (timeLeft > 10)     colour = "#4ade80"; // green
  else if (timeLeft > 5) colour = "#fb923c"; // orange
  else                   colour = "#f87171"; // red

  $("timer-progress").style.stroke = colour;
  $("timer-number").style.color    = colour;
}

// ─── Advance to next word ─────────────────────────────────────────────────────
function advanceWord() {
  cancelSpeech();
  clearInterval(timerHandle);
  timerActive = false;
  wordIndex++;

  if (wordIndex < TOTAL_WORDS) {
    showWord(wordIndex);
  } else {
    showResults();
  }
}

// ─── Results ──────────────────────────────────────────────────────────────────
function showResults() {
  showScreen("results");
  renderResultsGrid();
  updateScore();
}

function renderResultsGrid() {
  const grid = $("results-grid");
  grid.innerHTML = "";

  gameWords.forEach((entry, i) => {
    const item = document.createElement("div");
    item.className = "result-item";

    // For tricky/audio-only words with no emoji, show a speaker icon
    const display = entry.emoji || "🔊";

    item.innerHTML = `
      <div class="result-emoji">${display}</div>
      <div class="result-word">${entry.word}</div>
      <button class="result-check" data-index="${i}" aria-pressed="false">
        ?
      </button>
    `;
    grid.appendChild(item);
  });
}

function updateScore() {
  const correct = results.filter(Boolean).length;
  $("score-display").textContent = `${correct} / ${TOTAL_WORDS}`;

  let msg = "";
  if (correct === 10)    msg = "Amazing! Perfect score! 🌟🌟🌟";
  else if (correct >= 8) msg = "Fantastic work! Nearly perfect! 🌟🌟";
  else if (correct >= 6) msg = "Great effort! Keep practising! 🌟";
  else if (correct >= 4) msg = "Good try — you can do it! 💪";
  else if (correct >= 1) msg = "Keep practising — you'll get there! 📖";

  $("score-message").textContent = msg;
}

// ─── Event: tap result checkbox ───────────────────────────────────────────────
$("results-grid").addEventListener("click", e => {
  const btn = e.target.closest(".result-check");
  if (!btn) return;

  const i    = parseInt(btn.dataset.index, 10);
  results[i] = !results[i];

  btn.classList.toggle("checked", results[i]);
  btn.textContent      = results[i] ? "✓" : "?";
  btn.setAttribute("aria-pressed", results[i]);

  btn.closest(".result-item").classList.toggle("correct", results[i]);

  updateScore();
});

// ─── Event: Next word button ──────────────────────────────────────────────────
$("btn-next").addEventListener("click", () => {
  clearInterval(timerHandle);
  timerActive = false;
  advanceWord();
});

// ─── Event: Hear again ────────────────────────────────────────────────────────
$("btn-hear-again").addEventListener("click", () => {
  $("btn-hear-again").classList.add("hidden");
  setTimerWaiting(true);
  clearInterval(timerHandle);
  timerActive = false;
  playWordSequence(gameWords[wordIndex], () => {
    setTimerWaiting(false);
    $("btn-hear-again").classList.remove("hidden");
    startTimer();
  });
});

// ─── Event: Listen button on picture cards ───────────────────────────────────
$("btn-listen-picture").addEventListener("click", () => {
  clearInterval(timerHandle);
  timerActive = false;
  setTimerWaiting(true);
  const btn = $("btn-listen-picture");
  btn.disabled = true;
  btn.textContent = "🔊 Playing…";

  // Cancel first, then speak on the next tick — doing both in the same
  // synchronous block causes Safari to silently drop the new utterance.
  cancelSpeech();
  setTimeout(() => {
    playWordSequence(gameWords[wordIndex], () => {
      setTimerWaiting(false);
      btn.disabled = false;
      btn.textContent = "🔊 Listen";
      startTimer();
    });
  }, 80);
});

// ─── Event: Start & Play Again ───────────────────────────────────────────────
$("btn-start").addEventListener("click", startGame);

$("btn-play-again").addEventListener("click", () => {
  showScreen("welcome");
});

// ─── Boot ─────────────────────────────────────────────────────────────────────
showScreen("welcome");
