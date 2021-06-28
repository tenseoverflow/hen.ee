document.getElementById('theme-toggle').style.display='block';

function setTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute('data-theme', 'dark');
    window.localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', '');
    window.localStorage.setItem('theme', 'light');
  }
}

let theme = localStorage.getItem('theme');

theme = theme || (window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : 'light');

setTheme(theme);

function modeSwitcher() {
  let currentMode = document.documentElement.getAttribute('data-theme');

  if (currentMode === "dark") {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}