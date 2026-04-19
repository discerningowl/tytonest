/**
 * SASE Codex — Edge Solutions
 * back-to-top.js — Self-contained floating "back to top" button
 *
 * Usage: add <script src="../assets/js/back-to-top.js"></script> before </body>
 *        (use "assets/js/back-to-top.js" for root-level pages like _index.html)
 *
 * Behavior:
 *   - Auto-injects a floating button into <body> — no HTML markup required per page
 *   - Hidden until the user scrolls more than 400px from the top
 *   - Smooth scroll to top on click, with prefers-reduced-motion respected
 *   - Uses Edge brand tokens (--edge-blue, --edge-green) via inline styles so
 *     the script works even if main.css hasn't loaded yet
 */
(function () {
  'use strict';

  // Don't inject twice if the script is loaded more than once.
  if (document.getElementById('edge-back-to-top')) return;

  var SCROLL_THRESHOLD = 400; // px — start showing the button after this

  // ── Inject styles (scoped via #edge-back-to-top) ──────────────
  var style = document.createElement('style');
  style.textContent = [
    '#edge-back-to-top {',
    '  position: fixed;',
    '  right: 24px;',
    '  bottom: 24px;',
    '  width: 44px;',
    '  height: 44px;',
    '  border: 0.5px solid rgba(255, 255, 255, 0.35);',
    '  border-radius: 50%;',
    '  background: var(--edge-blue, #486D87);',
    '  color: #FFFFFF;',
    '  cursor: pointer;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  padding: 0;',
    '  box-shadow: 0 4px 14px rgba(72, 109, 135, 0.32);',
    '  opacity: 0;',
    '  visibility: hidden;',
    '  transform: translateY(8px);',
    '  transition: opacity 220ms ease, transform 220ms ease, visibility 220ms ease, background-color 180ms ease, box-shadow 180ms ease;',
    '  z-index: 9999;',
    '  font-family: inherit;',
    '}',
    '#edge-back-to-top.is-visible {',
    '  opacity: 1;',
    '  visibility: visible;',
    '  transform: translateY(0);',
    '}',
    '#edge-back-to-top:hover {',
    '  background: #3d5e75;',
    '  box-shadow: 0 6px 18px rgba(72, 109, 135, 0.42);',
    '}',
    '#edge-back-to-top:focus-visible {',
    '  outline: 2px solid var(--edge-green, #C6D219);',
    '  outline-offset: 3px;',
    '}',
    '#edge-back-to-top svg {',
    '  width: 18px;',
    '  height: 18px;',
    '  display: block;',
    '  stroke: currentColor;',
    '  stroke-width: 2.25;',
    '  stroke-linecap: round;',
    '  stroke-linejoin: round;',
    '  fill: none;',
    '}',
    '@media (max-width: 640px) {',
    '  #edge-back-to-top { right: 16px; bottom: 16px; width: 40px; height: 40px; }',
    '  #edge-back-to-top svg { width: 16px; height: 16px; }',
    '}',
    '@media print {',
    '  #edge-back-to-top { display: none !important; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // ── Inject the button ─────────────────────────────────────────
  var btn = document.createElement('button');
  btn.id = 'edge-back-to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.title = 'Back to top';
  btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><polyline points="6 14 12 8 18 14"></polyline></svg>';

  // Click handler — smooth scroll (respect reduced-motion)
  btn.addEventListener('click', function () {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  // Append once the body exists
  if (document.body) {
    document.body.appendChild(btn);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.appendChild(btn);
    });
  }

  // ── Scroll visibility toggle (throttled via rAF) ──────────────
  var ticking = false;
  function update() {
    ticking = false;
    var scrolled = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (scrolled > SCROLL_THRESHOLD) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Initial state in case the page loads pre-scrolled (anchor link, reload, etc.)
  update();
})();
