/**
 * SASE Codex — Edge Solutions
 * nav.js — Shared navigation component
 *
 * Responsibilities:
 *   1. Detect current page location (components/ vs working-docs/)
 *   2. Build the canonical doc-nav link list with correct relative paths
 *   3. Inject the nav into any page that has a <nav class="doc-nav"></nav> element
 *   4. Mark the active page link automatically from window.location.pathname
 *
 * Usage: Every component and working-doc page includes this script.
 *        Pages at root (_index.html) have no .doc-nav element — this script
 *        returns early and does nothing for them.
 *
 * Nav link order:
 *   Index › Benchmark › ZTNA › SSE › SD-WAN › AIOps › Sovereignty › Emerging › Scorecard
 */

(function buildNav() {
  var navEl = document.querySelector('.doc-nav');
  if (!navEl) return; // Skip pages without a nav (e.g. _index.html)

  var path     = window.location.pathname;
  var filename = path.split('/').pop() || '';

  // Determine path context
  var inComponents = path.indexOf('/components/') !== -1;
  // Both components/ and working-docs/ are one level deep — root prefix is always ../
  var rootPrefix = '../';
  // Component page links use bare filenames; working-doc page links need ../components/ prefix
  var compPrefix = inComponents ? '' : '../components/';

  var links = [
    { href: rootPrefix + '_index.html',          text: 'Index'       },
    { href: compPrefix + 'sase_benchmark.html',  text: 'Benchmark'   },
    { href: compPrefix + 'sase_ztna.html',       text: 'ZTNA'        },
    { href: compPrefix + 'sase_sse.html',        text: 'SSE'         },
    { href: compPrefix + 'sase_sdwan.html',      text: 'SD-WAN'      },
    { href: compPrefix + 'sase_aiops.html',      text: 'AIOps'       },
    { href: compPrefix + 'sase_sovereignty.html',text: 'Sovereignty'  },
    { href: compPrefix + 'sase_emerging.html',   text: 'Emerging'    },
    { href: compPrefix + 'sase_scorecard.html',  text: 'Scorecard'   }
  ];

  var html = '';
  links.forEach(function(link, i) {
    var linkFile = link.href.split('/').pop();
    var isActive = (linkFile && linkFile === filename);
    html += '<a href="' + link.href + '"' + (isActive ? ' class="active"' : '') + '>'
         + link.text + '</a>';
    if (i < links.length - 1) {
      html += '<span class="doc-nav__sep">›</span>';
    }
  });

  navEl.innerHTML = html;
})();
