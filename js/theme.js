const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) themeToggle.style.display = 'block';

function setTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute('data-theme', 'dark');
    try { window.localStorage.setItem('theme', 'dark'); } catch (_) {}
  } else {
    document.documentElement.setAttribute('data-theme', '');
    try { window.localStorage.setItem('theme', 'light'); } catch (_) {}
  }
}

function modeSwitcher() {
  let currentMode = document.documentElement.getAttribute('data-theme');

  if (currentMode === "dark") {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}