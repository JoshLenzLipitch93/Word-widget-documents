// Linguease landing page — widget rotation + theme strip.
// All 24 themes from the design system (WidgetTheme.swift).

const WIDGET_THEMES = [
  { name: 'Beige',        bg: '#FFFFFF', word: '#434446', trans: '#C4BEBB' },
  { name: 'Dark Gray',    bg: '#303133', word: '#FFFFFF', trans: '#C1C1C2' },
  { name: 'Coral',        bg: '#DC624F', word: '#FFFFFF', trans: '#F4D0CA' },
  { name: 'Sage',         bg: '#67917C', word: '#FFFFFF', trans: '#D1DED8' },
  { name: 'Blue',         bg: '#4F8FF4', word: '#FFFFFF', trans: '#CADDFC' },
  { name: 'Lime',         bg: '#E2F8A5', word: '#373F1F', trans: '#67773A' },
  { name: 'Orange',       bg: '#FFC66F', word: '#5D4520', trans: '#9C7336' },
  { name: 'Purple',       bg: '#7973F5', word: '#FFFFFF', trans: '#D7D5FC' },
  { name: 'Mint',         bg: '#E6FAD6', word: '#4D7A3C', trans: '#82B370' },
  { name: 'Peach',        bg: '#FFE6CF', word: '#D96A0B', trans: '#EB974E' },
  { name: 'Lavender',     bg: '#E6E5FF', word: '#605CAF', trans: '#8783D2' },
  { name: 'Sky Blue',     bg: '#E1F1FF', word: '#3F7FBA', trans: '#7AACDA' },
  { name: 'Dark Green',   bg: '#01421F', word: '#FFFFFF', trans: '#B3C6BC' },
  { name: 'Navy',         bg: '#183669', word: '#FFFFFF', trans: '#BAC3D2' },
  { name: 'Maroon',       bg: '#62170D', word: '#FFFFFF', trans: '#D0B9B6' },
  { name: 'Red',          bg: '#E84127', word: '#FFFFFF', trans: '#F8C6BE' },
  { name: 'Magenta',      bg: '#C00C66', word: '#FFFFFF', trans: '#ECB6D1' },
  { name: 'Royal Blue',   bg: '#4B3BFF', word: '#FFFFFF', trans: '#C9C4FF' },
  { name: 'Violet',       bg: '#7F25E6', word: '#FFFFFF', trans: '#D9BEF8' },
  { name: 'Teal',         bg: '#03A1A9', word: '#FFFFFF', trans: '#B3E3E5' },
  { name: 'Red/Yellow',   bg: '#F04242', word: '#FFE96A', trans: '#FBB75E' },
  { name: 'Yellow/Pink',  bg: '#FFFA95', word: '#F4449F', trans: '#F77B9C' },
  { name: 'Green/Lime',   bg: '#065242', word: '#CEFF2F', trans: '#92CB35' },
  { name: 'Blue/Cyan',    bg: '#3C7DF5', word: '#7EFDFF', trans: '#71E3FD' },
];

// Words for the scrolling strip and hero — Brazilian Portuguese.
// Deliberately the same words the social posts teach, so an ad and this page
// show the identical vocabulary. See 02_projects/linguease/word-sets-draft.md.
const SAMPLE_WORDS = [
  { word: 'saudade',   trans: 'the ache of missing' },
  { word: 'cafuné',    trans: 'stroking someone\u2019s hair' },
  { word: 'legal',     trans: 'cool' },
  { word: 'puxar',     trans: 'to pull' },
  { word: 'massa',     trans: 'awesome' },
  { word: 'maneiro',   trans: 'nice' },
  { word: 'madrugada', trans: 'small hours' },
  { word: 'anteontem', trans: 'the day before yesterday' },
  { word: 'friorento', trans: 'always cold' },
  { word: 'mozão',     trans: 'babe' },
  { word: 'chopp',     trans: 'draught beer' },
  { word: 'rodízio',   trans: 'all you can eat' },
  { word: 'saideira',  trans: 'one for the road' },
  { word: 'canga',     trans: 'beach wrap' },
  { word: 'pasta',     trans: 'folder' },
  { word: 'balcão',    trans: 'counter' },
  { word: 'livraria',  trans: 'bookshop' },
  { word: 'assistir',  trans: 'to watch' },
  { word: 'caraca',    trans: 'bloody hell' },
  { word: 'eita',      trans: 'whoa' },
  { word: 'chamego',   trans: 'cosy affection' },
  { word: 'gostoso',   trans: 'delicious' },
  { word: 'pertinho',  trans: 'just up here' },
  { word: 'enfim',     trans: 'anyway' },
];

/* ---------- Theme strip ---------- */
(function buildThemeStrip() {
  const strip = document.getElementById('theme-strip');
  if (!strip) return;

  // Duplicate once so the CSS scroll loops seamlessly.
  const loops = 2;
  for (let i = 0; i < loops; i++) {
    WIDGET_THEMES.forEach((theme, idx) => {
      const w = SAMPLE_WORDS[(idx + i * 3) % SAMPLE_WORDS.length];
      const tile = document.createElement('div');
      tile.className = 'theme-tile';
      tile.style.background = theme.bg;
      tile.style.color = theme.word;
      tile.innerHTML = `
        <div class="theme-tile__word">${w.word}</div>
        <div class="theme-tile__translation" style="color:${theme.trans};">${w.trans}</div>
      `;
      strip.appendChild(tile);
    });
  }
})();

/* ---------- Hero widget rotation ---------- */
(function rotateHeroWidgets() {
  const tiles = document.querySelectorAll('.hero__stage .widget-tile');
  if (!tiles.length) return;

  // Seed with distinct starting themes so the first paint has variety.
  const state = Array.from(tiles).map((_, i) => ({
    themeIdx: (i * 7) % WIDGET_THEMES.length,
    wordIdx:  (i * 11) % SAMPLE_WORDS.length,
  }));

  function paint(i) {
    const tile = tiles[i];
    const theme = WIDGET_THEMES[state[i].themeIdx];
    const w = SAMPLE_WORDS[state[i].wordIdx];
    tile.style.background = theme.bg;
    const wordEl = tile.querySelector('[data-slot="word"]');
    const transEl = tile.querySelector('[data-slot="trans"]');
    const phonEl = tile.querySelector('[data-slot="phon"]');
    if (wordEl) { wordEl.textContent = w.word; wordEl.style.color = theme.word; }
    if (transEl) { transEl.textContent = w.trans; transEl.style.color = theme.trans; }
    if (phonEl) phonEl.style.color = theme.trans;
  }
  tiles.forEach((_, i) => paint(i));

  // Rotate one tile at a time — feels calmer than all three flipping together.
  let cursor = 0;
  setInterval(() => {
    state[cursor].themeIdx = (state[cursor].themeIdx + 1 + Math.floor(Math.random() * 3)) % WIDGET_THEMES.length;
    state[cursor].wordIdx  = (state[cursor].wordIdx + 1 + Math.floor(Math.random() * 2)) % SAMPLE_WORDS.length;
    paint(cursor);
    cursor = (cursor + 1) % tiles.length;
  }, 2400);
})();

/* ---------- Step 3 colour demo — fade through a few themes ---------- */
(function stepThree() {
  const el = document.getElementById('step-color-demo');
  if (!el) return;
  const wordEl = el.querySelector('div > div:nth-child(1)');
  const transEl = el.querySelector('div > div:nth-child(2)');
  const sequence = [3, 4, 7, 9, 11, 19, 21]; // sage, blue, purple, peach, lavender, violet, yellow/pink
  let i = 0;
  setInterval(() => {
    i = (i + 1) % sequence.length;
    const theme = WIDGET_THEMES[sequence[i]];
    el.style.background = theme.bg;
    el.style.color = theme.word;
    if (wordEl) wordEl.style.color = theme.word;
    if (transEl) transEl.style.color = theme.trans;
  }, 2800);
})();
