# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the app

No build step required. Open `index.html` directly in any browser:

```bash
open index.html
# or serve locally to avoid any browser file:// restrictions with speech synthesis:
python3 -m http.server 8080
```

## Architecture

This is a zero-dependency vanilla JS/CSS/HTML app. Four files, loaded in order by `index.html`:

1. **`words.js`** — loaded first (no imports). Exports nothing; defines globals `TRICKY_WORDS`, `EASY_WORDS`, `PHONETIC_WORDS`, and the `pickWords(n)` function that `app.js` calls.
2. **`app.js`** — loaded second. Calls `pickWords()` from `words.js`. All game logic lives here as module-level state (not a class).
3. **`style.css`** — no preprocessor.
4. **`index.html`** — three `<div id="screen-*">` elements that are shown/hidden via `.hidden` class. No routing.

## Word data model

Each word object flowing through the game has this shape after `pickWords()` enriches it:

```js
{
  word: string,
  emoji: string | null,   // null = no clear visual representation
  hint: string | null,
  type: "easy" | "phonetic" | "tricky",
  showPicture: boolean,   // false → audio card (ear icon + speech)
}
```

`words.js` stores the three raw pools (`TRICKY_WORDS`, `EASY_WORDS`, `PHONETIC_WORDS`). Tricky words always get `showPicture: false`. Phonetic words default to `showPicture: true` unless `emoji` is null or `showPicture: false` is set inline.

## Card display logic

`showWord()` in `app.js` is the central dispatcher:
- **Picture card** (`showPicture: true`): renders emoji + hint, starts the 20-second timer immediately.
- **Audio card** (`showPicture: false`): shows ear icon 🦻, calls `playWordTimes(word, 3, callback)` which speaks the word 3× via the Web Speech API (`lang: "en-AU"`, `rate: 0.75`), then the callback starts the timer. Timer shows a grey "waiting" state until audio finishes.
- **Tricky word banner**: `#tricky-banner` (CSS marquee animation) is shown/hidden based on `entry.type === "tricky"`. The `.word-card` gets class `solo` (full border-radius) when there is no banner.

## Timer

SVG circle with `r=54`, circumference `≈339.3`. `strokeDashoffset` is updated each second: `CIRCUMFERENCE * (1 - timeLeft/ROUND_SECONDS)`. Colour transitions: green (>10s) → orange (>5s) → red (≤5s). When it hits zero it flashes then calls `advanceWord()`.

## Adding words

- Add to `EASY_WORDS` for basic CVC words (always picture cards).
- Add to `PHONETIC_WORDS` for digraph/vowel-team words. Set `showPicture: false` and `emoji: null` for abstract words.
- Add to `TRICKY_WORDS` for sight words (always audio, no emoji needed).

The `pickWords()` function always selects 2–3 tricky, 2–3 easy, and fills the rest from phonetic words, then shuffles the combined set.

## Key constants (app.js)

| Constant | Default | Purpose |
|---|---|---|
| `TOTAL_WORDS` | 10 | Words per game |
| `ROUND_SECONDS` | 20 | Timer duration per word |
| `AUDIO_REPEATS` | 3 | Times word is spoken on audio cards |
| `AUDIO_PAUSE_MS` | 600 | Gap between spoken repetitions (ms) |
