(function () {
  'use strict';

  // Tab switcher for pages that include .tab[data-panel] / .panel components.
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.tab[data-panel]');
    if (!tab) return;
    var panel = document.getElementById(tab.dataset.panel);
    if (!panel) return;

    document.querySelectorAll('.panel').forEach(function (p) { p.classList.remove('active'); });
    document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
    panel.classList.add('active');
    tab.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
