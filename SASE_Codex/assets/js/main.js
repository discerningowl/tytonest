/**
 * SASE Codex — Edge Solutions
 * main.js — Score renderer + nav active state
 *
 * Responsibilities:
 *   1. Mark the correct doc-nav link as .active based on current page filename
 *   2. Provide scoreBadge(), weightBadge(), renderScoringTable() used by all pillar pages
 *   3. Fetch scores.json and call each page's renderPage(data) hook if defined
 */

/* ============================================================
   1. NAV ACTIVE STATE
   ============================================================ */
(function setNavActive() {
  const filename = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.doc-nav a').forEach(function(a) {
    const href = a.getAttribute('href') || '';
    if (href === filename || href.split('/').pop() === filename) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
})();

/* ============================================================
   2. SCORE RENDERING UTILITIES
   ============================================================ */

/**
 * Returns an HTML string for a circular score badge.
 * @param {number|null} score  1–5 or null
 */
function scoreBadge(score) {
  if (score === null || score === undefined) {
    return '<span class="score-badge score-null">–</span>';
  }
  const n = Math.min(5, Math.max(1, Math.round(score)));
  return '<span class="score-badge score-' + n + '">' + n + '</span>';
}

/**
 * Returns an HTML string for a weight badge (CRITICAL / HIGH / MEDIUM).
 * @param {string} weight  'critical' | 'high' | 'medium'
 */
function weightBadge(weight) {
  return '<span class="weight-badge weight-' + weight + '">' + weight.toUpperCase() + '</span>';
}

/**
 * Renders a full vendor-scoring table into a container element.
 *
 * @param {Object} pillar   - A pillar object from scores.json (e.g. data.pillars.ztna)
 *                            OR a plain criteria array (legacy fallback format)
 * @param {Array}  vendors  - Array of vendor objects with at least { id, name }
 * @param {string} containerId - The id of the DOM element to write into
 */
function renderScoringTable(pillar, vendors, containerId) {
  containerId = containerId || 'score-container';
  const el = document.getElementById(containerId);
  if (!el) return;

  // Accept either {criteria:[...]} or the array directly (fallback data format)
  const criteria = Array.isArray(pillar) ? pillar : (pillar.criteria || []);

  let html = '<div style="overflow-x:auto;">';
  html += '<table class="edge-table"><thead><tr>';
  html += '<th style="min-width:220px;">Criterion</th>';
  vendors.forEach(function(v) {
    const shortName = v.name.replace('Palo Alto Networks', 'Palo Alto');
    html += '<th class="vendor-col" style="min-width:110px;">' + shortName + '</th>';
  });
  html += '</tr></thead><tbody>';

  criteria.forEach(function(c) {
    html += '<tr>';
    html += '<td>';
    html += '<div class="criterion-label">' + c.label + '</div>';
    html += weightBadge(c.weight);
    if (c.scale) {
      html += '<div class="criterion-scale">' + c.scale + '</div>';
    }
    html += '</td>';
    vendors.forEach(function(v) {
      const sd    = c.scores && c.scores[v.id];
      const score = sd ? sd.score : null;
      const note  = sd ? (sd.note || '') : '';
      html += '<td class="score-cell">';
      html += scoreBadge(score);
      if (note) {
        html += '<div class="score-note">' + note + '</div>';
      }
      html += '</td>';
    });
    html += '</tr>';
  });

  html += '</tbody></table></div>';

  // Score legend
  html += '<div style="display:flex;gap:14px;margin-top:10px;flex-wrap:wrap;font-size:11px;align-items:center;color:var(--light-blue2);">Score legend: ';
  [
    ['5', '#1A7A4A', 'Best-in-Class'],
    ['4', '#2E86AB', 'Strong'],
    ['3', '#E67E22', 'Adequate'],
    ['2', '#C0392B', 'Below Avg'],
    ['1', '#7F0000', 'Poor/Missing']
  ].forEach(function(item) {
    html += '<span style="display:inline-flex;align-items:center;gap:4px;">';
    html += '<span style="background:' + item[1] + ';color:#fff;border-radius:50%;width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;">' + item[0] + '</span>';
    html += '<span style="color:var(--slate);">' + item[2] + '</span>';
    html += '</span>';
  });
  html += '</div>';

  el.innerHTML = html;
}

/* ============================================================
   3. SCORES.JSON LOADER
   Fetches scores.json and calls window.renderPage(data) if defined.
   Falls back to window.FALLBACK_DATA if fetch fails.
   ============================================================ */
(function loadScores() {
  // Derive scores.json path from the current page URL — works regardless
  // of how scripts are loaded (Cloudflare Rocket Loader, async, defer, etc.)
  var pathname  = window.location.pathname;
  var dir       = pathname.substring(0, pathname.lastIndexOf('/') + 1);
  var scoresUrl = dir + 'scores.json';

  function showError(msg) {
    var banner = document.createElement('div');
    banner.style.cssText = 'position:fixed;bottom:16px;right:16px;z-index:9999;background:#C44536;color:#fff;font-family:monospace;font-size:12px;padding:10px 14px;border-radius:6px;max-width:420px;box-shadow:0 4px 12px rgba(0,0,0,.3);';
    banner.textContent = 'scores.json: ' + msg;
    document.body.appendChild(banner);
    console.error('SASE Codex scores.json error:', msg);
  }

  function doFetch() {
    fetch(scoresUrl)
      .then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status + ' — ' + scoresUrl);
        return r.json();
      })
      .then(function(data) {
        if (typeof window.renderPage === 'function') {
          window.renderPage(data);
        }
      })
      .catch(function(err) {
        showError(err.message || String(err));
        if (typeof window.FALLBACK_DATA !== 'undefined' && typeof window.renderPage === 'function') {
          window.renderPage(window.FALLBACK_DATA);
        }
      });
  }

  // Wait for DOM so inline renderPage definitions are guaranteed to exist
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', doFetch);
  } else {
    doFetch();
  }
})();
