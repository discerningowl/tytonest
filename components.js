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

  // CSV export for kettlebell workout tables.
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
          var s = cell.replace(/"/g, '""');
          return /[",\n]/.test(s) ? '"' + s + '"' : s;
        }).join(',');
      }).join('\r\n');

      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
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
