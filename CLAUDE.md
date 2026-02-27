# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the app

No build step required. Open `index.html` directly in any browser:

```bash
open index.html
# or serve locally to avoid any browser file:// restrictions with speech synthesis:
python3 -m http.server 8080
```

## Repository

`https://github.com/chconwayz/spelling-game` — branch `master`.

## Architecture

Zero-dependency vanilla JS/CSS/HTML. Four files, loaded in order by `index.html`:

1. **`words.js`** — loaded first. Defines globals `TRICKY_WORDS`, `EASY_WORDS`, `PHONETIC_WORDS`, and `pickWords(n)`.
2. **`app.js`** — loaded second. All game logic as module-level state (no class). Calls `pickWords()` from `words.js`.
3. **`style.css`** — no preprocessor.
4. **`index.html`** — three `<div id="screen-*">` elements shown/hidden via `.hidden` class. No routing.

## Word data model

Each word object after `pickWords()` enriches it:

```js
{
  word: string,
  emoji: string | null,     // null = no clear visual representation
  hint: string | null,
  sentence: string,         // used in the audio sequence: "The cat sat on the mat."
  type: "easy" | "phonetic" | "tricky",
  showPicture: boolean,     // false → audio card (SVG ear + speech synthesis)
}
```

`TRICKY_WORDS` only need `word` and `sentence` — they always get `showPicture: false`. `PHONETIC_WORDS` entries default to `showPicture: true` unless `emoji` is null or `showPicture: false` is set inline on the entry.

## Per-game word selection

`pickWords()` always produces 10 words: 2–3 tricky, 2–3 easy, rest phonetic. All three pools are shuffled before slicing, and the combined result is shuffled again.

## Card display logic

`showWord()` in `app.js` is the central dispatcher:

**Picture card** (`showPicture: true`):
- Renders large emoji + hint text + a `🔊 Listen` button
- Timer starts immediately (20 seconds)
- Clicking Listen: pauses timer, speaks word once at rate 0.6, resumes timer from remaining time. Uses an 80ms delay between `cancelSpeech()` and `speak()` to avoid Safari's silent-drop bug. A 6-second safety timeout restarts the timer if no speech events fire.

**Audio card** (`showPicture: false`):
- Shows an inline SVG ear (no emoji — the 🦻 emoji was replaced to remove the hearing aid)
- Calls `playWordSequence(entry, onDone)` which speaks three steps via Web Speech API:
  1. Word at rate 0.6 — `"Listen to the word…"`
  2. Sentence at rate 0.78 — `"Now in a sentence…"`
  3. Word at rate 0.6 — `"One more time…"`
- Timer only starts after all three steps complete

**Tricky word treatment** (audio cards only):
- `playTrickyJingle()` fires immediately — a 6-note rising arpeggio (E5→G5→C6→E6→D6→E6) using Web Audio API triangle oscillators
- 150ms later the `#tricky-badge` (pink circle, top-right corner of card) spins in with a 540° CSS rotation + bounce, then rocks continuously
- Audio sequence is delayed 1500ms to let the jingle and badge land first

## Voice selection

`getBestVoice()` walks `FEMALE_VOICE_NAMES` (Karen, Catherine, Serena, Kate, Hazel, Moira, Samantha, Victoria, Allison, Ava, Zira…) and returns the first match from `cachedVoices`. Falls back to any English voice. Voices are cached via the `voiceschanged` event. `makeUtterance(text, rate)` applies the voice, rate, and `pitch: 1.1`.

## Speech synthesis reliability

`cancelSpeech()` always calls both `speechSynthesis.cancel()` and `speechSynthesis.resume()` unconditionally — the conditional `resume()` caused Safari/macOS to silently drop subsequent `speak()` calls when the engine was in a stuck-paused state.

## Timer

SVG circle `r=54`, circumference `≈339.3`. `strokeDashoffset` updates each second: `CIRCUMFERENCE * (1 - timeLeft/ROUND_SECONDS)`. Colour: green (>10s) → orange (>5s) → red (≤5s). Flashes on zero then calls `advanceWord()`. Shows a grey "waiting" state while audio is playing.

## Adding words

- `EASY_WORDS` — basic CVC words, always picture cards. Needs `word`, `emoji`, `hint`, `sentence`.
- `PHONETIC_WORDS` — digraph/vowel-team words. Set `emoji: null, showPicture: false` for abstract words. Needs `sentence` on every entry.
- `TRICKY_WORDS` — sight words, always audio. Only needs `word` and `sentence`.

## Key constants (app.js)

| Constant | Default | Purpose |
|---|---|---|
| `TOTAL_WORDS` | 10 | Words per game |
| `ROUND_SECONDS` | 20 | Timer duration per word |
| `AUDIO_PAUSE_MS` | 700 | Gap between steps in `playWordSequence` (ms) |
