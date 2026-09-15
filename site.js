(() => {
  'use strict';
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');

  function updateThemeControl() {
    if (!toggle) return;
    const dark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  }
  if (toggle) {
    toggle.hidden = false;
    updateThemeControl();
    toggle.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      updateThemeControl();
      try { localStorage.setItem('tyler-site-theme', root.dataset.theme); }
      catch (_) { /* Persistence is optional. */ }
    });
  }

  function closeMenu(restoreFocus = false) {
    if (!menu || !nav) return;
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.textContent = 'Menu';
    if (restoreFocus) menu.focus();
  }
  if (menu && nav) {
    menu.hidden = false;
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      menu.textContent = open ? 'Close' : 'Menu';
      nav.classList.toggle('is-open', open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.header-inner')) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 620) closeMenu();
    });
  }

  // Optional résumé. Empty or unsafe paths never create a visible link.
  const path = window.SITE_CONFIG && window.SITE_CONFIG.resumePdf;
  if (typeof path === 'string' && path.trim()) {
    try {
      const url = new URL(path.trim(), document.baseURI);
      const local = location.protocol === 'file:' && url.protocol === 'file:';
      if (local || url.protocol === 'https:' || url.protocol === 'http:') {
        document.querySelectorAll('.resume-link').forEach(link => {
          link.href = url.href;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.setAttribute('aria-label', 'Open Tyler Seils’s résumé PDF');
          link.hidden = false;
        });
      }
    } catch (_) { /* Leave the link hidden if its path is malformed. */ }
  }

  // Clipboard enhancement. The normal mailto link works without JavaScript.
  const copy = document.querySelector('.copy-email');
  const status = document.querySelector('.copy-status');
  let statusTimer;
  function legacyCopy(text) {
    const input = document.createElement('textarea');
    input.value = text;
    input.readOnly = true;
    input.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0;';
    document.body.appendChild(input);
    let copied = false;
    try {
      input.select();
      copied = document.execCommand('copy');
    } finally {
      input.remove();
    }
    if (!copied) throw new Error('Clipboard is unavailable.');
  }
  if (copy && status) {
    copy.parentElement.hidden = false;
    copy.addEventListener('click', async () => {
      const email = 'tmseils@wisc.edu';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          try { await navigator.clipboard.writeText(email); }
          catch (_) { legacyCopy(email); }
        } else {
          legacyCopy(email);
        }
        status.textContent = 'Copied!';
      } catch (_) {
        status.textContent = 'Please select the email above to copy it.';
      }
      copy.focus({ preventScroll: true });
      window.clearTimeout(statusTimer);
      statusTimer = window.setTimeout(() => { status.textContent = ''; }, 5000);
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Mark the current section without depending on a framework or network request.
  const links = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  let ticking = false;
  function updateNavigation() {
    const header = document.querySelector('.site-header');
    const boundary = (header ? header.getBoundingClientRect().height : 90) + 100;
    let current = null;
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= boundary) current = section;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) {
      current = sections[sections.length - 1];
    }
    links.forEach(link => {
      if (current && link.getAttribute('href') === '#' + current.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateNavigation);
    }
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  updateNavigation();
})();
