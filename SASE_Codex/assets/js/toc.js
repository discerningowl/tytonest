/**
 * SASE Codex — Edge Solutions
 * toc.js — Auto-generating left sidebar Table of Contents
 *
 * Behavior:
 *   - Reads all h2 and h3 elements inside <main>
 *   - Injects a .toc-sidebar element into .page-body before <main>
 *   - Injects a floating .toc-open-btn and .toc-overlay for mobile
 *   - Highlights the active section via IntersectionObserver
 *   - Collapses on mobile (hamburger toggle)
 *
 * Requirements:
 *   - body must have class "has-toc"
 *   - <main> must be wrapped in a <div class="page-body">
 *   - CSS from assets/css/toc.css must be loaded
 */

(function buildTOC() {
  'use strict';

  /* ----------------------------------------------------------
     Wait for DOM ready
  ---------------------------------------------------------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const main = document.querySelector('main');
    if (!main) return;

    // Collect headings
    const headings = Array.from(main.querySelectorAll('h2, h3')).filter(function(h) {
      return h.textContent.trim().length > 0;
    });
    if (headings.length < 2) return; // Don't show TOC for very short pages

    // Ensure every heading has an id for anchor linking
    const slugCount = {};
    headings.forEach(function(h) {
      if (!h.id) {
        let slug = h.textContent.trim()
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .substring(0, 60);
        if (slugCount[slug] !== undefined) {
          slugCount[slug]++;
          slug = slug + '-' + slugCount[slug];
        } else {
          slugCount[slug] = 0;
        }
        h.id = slug;
      }
    });

    /* ----------------------------------------------------------
       Build sidebar HTML
    ---------------------------------------------------------- */
    const sidebar = document.createElement('nav');
    sidebar.className = 'toc-sidebar';
    sidebar.setAttribute('aria-label', 'Page contents');

    // Header strip
    const hdr = document.createElement('div');
    hdr.className = 'toc-sidebar__header';
    hdr.innerHTML = '<span class="toc-sidebar__title">Contents</span>' +
      '<button class="toc-toggle-btn" aria-label="Close table of contents">✕</button>';
    sidebar.appendChild(hdr);

    // List
    const list = document.createElement('ul');
    list.className = 'toc-sidebar__list';
    const links = [];

    headings.forEach(function(h) {
      const li = document.createElement('li');
      li.className = 'toc-sidebar__item toc-sidebar__item--' + h.tagName.toLowerCase();
      const a = document.createElement('a');
      a.className = 'toc-sidebar__link';
      a.href = '#' + h.id;
      a.textContent = h.textContent.trim();
      // Suppress default jump and smooth-scroll instead
      a.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.getElementById(h.id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Close mobile drawer on click
        if (window.innerWidth <= 900) closeSidebar();
      });
      li.appendChild(a);
      list.appendChild(li);
      links.push({ el: a, heading: h });
    });

    sidebar.appendChild(list);

    /* ----------------------------------------------------------
       Inject into .page-body before <main>
    ---------------------------------------------------------- */
    const pageBody = document.querySelector('.page-body');
    if (pageBody) {
      pageBody.insertBefore(sidebar, pageBody.firstChild);
    }

    /* ----------------------------------------------------------
       Mobile: floating open button + overlay
    ---------------------------------------------------------- */
    const openBtn = document.createElement('button');
    openBtn.className = 'toc-open-btn';
    openBtn.setAttribute('aria-label', 'Open table of contents');
    openBtn.textContent = '☰';
    document.body.appendChild(openBtn);

    const overlay = document.createElement('div');
    overlay.className = 'toc-overlay';
    document.body.appendChild(overlay);

    function openSidebar() {
      sidebar.classList.add('is-open');
      overlay.classList.add('is-active');
      openBtn.classList.add('is-hidden');
    }
    function closeSidebar() {
      sidebar.classList.remove('is-open');
      overlay.classList.remove('is-active');
      openBtn.classList.remove('is-hidden');
    }

    openBtn.addEventListener('click', openSidebar);
    overlay.addEventListener('click', closeSidebar);
    hdr.querySelector('.toc-toggle-btn').addEventListener('click', closeSidebar);

    /* ----------------------------------------------------------
       IntersectionObserver — active section highlight
    ---------------------------------------------------------- */
    let activeLink = null;

    function setActive(link) {
      if (activeLink) activeLink.classList.remove('is-active');
      activeLink = link;
      if (activeLink) {
        activeLink.classList.add('is-active');
        // Scroll the active link into view within the sidebar
        const sidebarRect = sidebar.getBoundingClientRect();
        const linkRect    = activeLink.getBoundingClientRect();
        if (linkRect.top < sidebarRect.top || linkRect.bottom > sidebarRect.bottom) {
          activeLink.scrollIntoView({ block: 'nearest' });
        }
      }
    }

    // Build a mapping from heading id → link element
    const idToLink = {};
    links.forEach(function(item) {
      idToLink[item.heading.id] = item.el;
    });

    const observer = new IntersectionObserver(function(entries) {
      // Find the topmost visible heading
      const visible = [];
      entries.forEach(function(entry) {
        if (entry.isIntersecting) visible.push(entry.target);
      });

      if (visible.length > 0) {
        // Sort by vertical position, pick topmost
        visible.sort(function(a, b) {
          return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
        });
        const topHeading = visible[0];
        if (idToLink[topHeading.id]) {
          setActive(idToLink[topHeading.id]);
        }
      }
    }, {
      root: null,
      rootMargin: '0px 0px -60% 0px',
      threshold: 0
    });

    headings.forEach(function(h) { observer.observe(h); });

    // Set initial active link based on scroll position
    function setInitialActive() {
      const viewportMid = window.innerHeight * 0.4;
      let closest = null;
      let closestDist = Infinity;
      headings.forEach(function(h) {
        const rect = h.getBoundingClientRect();
        const dist = Math.abs(rect.top - viewportMid);
        if (dist < closestDist) {
          closestDist = dist;
          closest = h;
        }
      });
      if (closest && idToLink[closest.id]) {
        setActive(idToLink[closest.id]);
      }
    }
    setTimeout(setInitialActive, 100);
  }

})();
