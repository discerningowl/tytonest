(function () {
  'use strict';

  // Fetch an HTML fragment and replace the placeholder element with it.
  function loadComponent(placeholderId, url, callback) {
    var el = document.getElementById(placeholderId);
    if (!el) return;
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        el.insertAdjacentHTML('afterend', html);
        el.remove();
        if (callback) callback();
      });
  }

  // Add .active to the nav link whose href exactly matches the current page
  // (hash-only anchors are intentionally excluded).
  function markActiveNav() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      var parts = href.split('#');
      var linkFile = parts[0].split('/').pop();
      if (linkFile === page && parts.length === 1) {
        link.classList.add('active');
      }
    });
  }

  loadComponent('site-header', 'header.html', markActiveNav);
  loadComponent('site-footer', 'footer.html');

  // Tab switcher for pages that include .tab / .panel components.
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.tab[data-panel]');
    if (!tab) return;
    var panelId = tab.dataset.panel;
    var panel = document.getElementById(panelId);
    if (!panel) return;

    document.querySelectorAll('.panel').forEach(function (p) { p.classList.remove('active'); });
    document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
    panel.classList.add('active');
    tab.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
