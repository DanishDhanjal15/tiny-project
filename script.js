(() => {
  const countEl = document.getElementById('count');
  const incBtn = document.getElementById('increment');
  const decBtn = document.getElementById('decrement');
  const resetBtn = document.getElementById('reset');
  const themeToggle = document.getElementById('themeToggle');

  const STORAGE_KEYS = {
    count: 'tinyCounter:value',
    theme: 'tinyCounter:theme'
  };

  function readCount() {
    const saved = Number(localStorage.getItem(STORAGE_KEYS.count));
    return Number.isFinite(saved) ? saved : 0;
  }

  function writeCount(value) {
    localStorage.setItem(STORAGE_KEYS.count, String(value));
  }

  function setCount(value) {
    countEl.textContent = String(value);
    writeCount(value);
  }

  function readTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    if (saved === 'dark' || saved === 'light') return saved;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    themeToggle.checked = theme === 'dark';
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }

  // Initialize
  setCount(readCount());
  applyTheme(readTheme());

  // Events
  incBtn.addEventListener('click', () => {
    setCount(Number(countEl.textContent) + 1);
  });

  decBtn.addEventListener('click', () => {
    setCount(Math.max(0, Number(countEl.textContent) - 1));
  });

  resetBtn.addEventListener('click', () => {
    setCount(0);
  });

  themeToggle.addEventListener('change', (e) => {
    applyTheme(e.target.checked ? 'dark' : 'light');
  });
})();


