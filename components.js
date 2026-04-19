(function () {
  'use strict';

  // ── Fragment includes ────────────────────────────────────────────────────────
  // Fetches header.html / footer.html and replaces the placeholder elements.
  // The active nav link is set based on the current page after header loads.

  function loadFragment(id, url, onLoad) {
    var el = document.getElementById(id);
    if (!el) return;
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        el.outerHTML = html;
        if (onLoad) onLoad();
      })
      .catch(function () {}); // fail silently; page still renders without include
  }

  function setActiveNav() {
    var page = window.location.pathname.split('/').pop();
    var navKey = null;
    if (page === 'kettlebell.html') navKey = 'training';
    else if (page === 'projects.html') navKey = 'projects';
    if (navKey) {
      var link = document.querySelector('[data-nav="' + navKey + '"]');
      if (link) link.classList.add('active');
    }
  }

  function initHamburger() {
    var toggle = document.querySelector('.nav-toggle');
    if (!toggle) return;
    var nav = document.querySelector('.nav-bar');

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    // Close when a nav link is clicked
    var navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.addEventListener('click', function (e) {
        if (e.target.closest('.nav-link')) {
          nav.classList.remove('nav-open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-label', 'Open navigation');
        }
      });
    }

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('nav-open') && !nav.contains(e.target)) {
        nav.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
      }
    });
  }

  function onHeaderLoad() {
    setActiveNav();
    initHamburger();
  }

  loadFragment('site-header', 'header.html', onHeaderLoad);
  loadFragment('site-footer', 'footer.html');

  // ── Tab switcher ─────────────────────────────────────────────────────────────
  // Handles .tab[data-panel] / .panel components.

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

  // ── CSV export ───────────────────────────────────────────────────────────────
  // Exports the three workout day tables to a structured CSV file.

  var exportBtn = document.getElementById('exportCsvBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', function () {
      var days = [
        { id: 'day1', label: 'Day 1 - Power & Lower Body' },
        { id: 'day2', label: 'Day 2 - Balance & Core' },
        { id: 'day3', label: 'Day 3 - Mobility & Upper Body' }
      ];
      var phases = ['Wks 1-4 Foundation', 'Wks 5-8 Build', 'Wks 9-12 Progress', 'Wks 13-16 Challenge', 'Wks 17-20 Peak'];
      var rows = [];

      days.forEach(function (day, di) {
        if (di > 0) rows.push([]);
        rows.push([day.label]);
        rows.push(['Exercise'].concat(phases));
        var table = document.querySelector('#' + day.id + ' table');
        if (!table) return;
        table.querySelectorAll('tbody tr').forEach(function (tr) {
          var cells = tr.querySelectorAll('td');
          if (cells.length < 2) return;
          var row = [cells[0].textContent.trim()];
          for (var i = 1; i < cells.length; i++) row.push(cells[i].textContent.trim());
          rows.push(row);
        });
      });

      var csv = rows.map(function (r) {
        return r.map(function (cell) {
          return '"' + cell.replace(/"/g, '""') + '"';
        }).join(',');
      }).join('\r\n');

      var blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'kettlebell-program.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
})();
