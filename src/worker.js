/**
 * TytoNest.xyz - Cloudflare Worker Landing Page
 * A fictional barn owl enthusiast community site
 */

export default {
  async fetch(request) {
    return new Response(getHTML(), {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
      },
    });
  },
};

function getHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TytoNest &mdash; Where Barn Owls Come Home</title>
  <meta name="description" content="TytoNest is a community for barn owl enthusiasts. Discover the quiet beauty of Tyto alba through field notes, seasonal observations, and a shared love of these extraordinary creatures.">
  <style>
` + getCSS() + `
  </style>
</head>
<body>

  <!-- Navigation -->
  <header class="site-header">
    <div class="container">
      <nav class="nav-bar">
        <a href="/" class="logo" aria-label="TytoNest Home">
          <svg class="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="20" cy="18" r="16" fill="var(--color-cream)" stroke="var(--color-brown)" stroke-width="1.5"/>
            <ellipse cx="14" cy="16" rx="4" ry="5" fill="var(--color-linen)" stroke="var(--color-brown)" stroke-width="1"/>
            <ellipse cx="26" cy="16" rx="4" ry="5" fill="var(--color-linen)" stroke="var(--color-brown)" stroke-width="1"/>
            <circle cx="14" cy="16" r="2" fill="var(--color-amber)"/>
            <circle cx="26" cy="16" r="2" fill="var(--color-amber)"/>
            <circle cx="14" cy="15.5" r="0.8" fill="var(--color-twilight)"/>
            <circle cx="26" cy="15.5" r="0.8" fill="var(--color-twilight)"/>
            <path d="M18 21 L20 24 L22 21" stroke="var(--color-brown)" stroke-width="1.2" fill="var(--color-tan)" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="logo-text">TytoNest</span>
        </a>
        <div class="nav-links">
          <a href="#about" class="nav-link">About</a>
          <a href="#field-notes" class="nav-link">Field Notes</a>
          <a href="#seasons" class="nav-link">Seasons</a>
          <a href="#community" class="nav-link">Community</a>
        </div>
      </nav>
    </div>
  </header>

  <!-- Hero -->
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">Where Barn Owls<br>Come Home</h1>
        <p class="hero-subtitle">A quiet corner of the web dedicated to <em>Tyto alba</em> &mdash; the barn owl. Field notes, seasonal observations, and a community that listens for the soft call in the night.</p>
        <div class="hero-actions">
          <a href="#field-notes" class="btn btn-primary">Read Field Notes</a>
          <a href="#about" class="btn btn-outline">Learn More</a>
        </div>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="owl-silhouette">
          <svg viewBox="0 0 280 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Owl body -->
            <ellipse cx="140" cy="200" rx="85" ry="110" fill="var(--color-tan)"/>
            <!-- Chest/face disc -->
            <ellipse cx="140" cy="170" rx="60" ry="75" fill="var(--color-cream)"/>
            <!-- Heart-shaped face -->
            <path d="M140 100 C100 100, 80 130, 85 160 C88 180, 110 200, 140 210 C170 200, 192 180, 195 160 C200 130, 180 100, 140 100Z" fill="var(--color-linen)" stroke="var(--color-warm-gray)" stroke-width="1"/>
            <!-- Eyes -->
            <ellipse cx="118" cy="145" rx="16" ry="18" fill="white" stroke="var(--color-warm-gray)" stroke-width="0.5"/>
            <ellipse cx="162" cy="145" rx="16" ry="18" fill="white" stroke="var(--color-warm-gray)" stroke-width="0.5"/>
            <circle cx="118" cy="145" r="10" fill="var(--color-amber)"/>
            <circle cx="162" cy="145" r="10" fill="var(--color-amber)"/>
            <circle cx="118" cy="143" r="5" fill="var(--color-twilight)"/>
            <circle cx="162" cy="143" r="5" fill="var(--color-twilight)"/>
            <circle cx="120" cy="141" r="2" fill="white" opacity="0.8"/>
            <circle cx="164" cy="141" r="2" fill="white" opacity="0.8"/>
            <!-- Beak -->
            <path d="M134 162 L140 175 L146 162" fill="var(--color-tan)" stroke="var(--color-brown)" stroke-width="1" stroke-linejoin="round"/>
            <!-- Wing suggestion left -->
            <path d="M55 180 C60 160, 75 200, 80 240 C82 260, 70 280, 65 290" stroke="var(--color-brown)" stroke-width="1.5" fill="none" opacity="0.4"/>
            <!-- Wing suggestion right -->
            <path d="M225 180 C220 160, 205 200, 200 240 C198 260, 210 280, 215 290" stroke="var(--color-brown)" stroke-width="1.5" fill="none" opacity="0.4"/>
            <!-- Feather speckles -->
            <circle cx="110" cy="220" r="2" fill="var(--color-brown)" opacity="0.15"/>
            <circle cx="130" cy="240" r="1.5" fill="var(--color-brown)" opacity="0.12"/>
            <circle cx="155" cy="230" r="2" fill="var(--color-brown)" opacity="0.15"/>
            <circle cx="170" cy="250" r="1.5" fill="var(--color-brown)" opacity="0.12"/>
            <circle cx="125" cy="260" r="1.5" fill="var(--color-brown)" opacity="0.1"/>
            <circle cx="150" cy="265" r="2" fill="var(--color-brown)" opacity="0.1"/>
            <!-- Ear tufts (subtle) -->
            <path d="M108 105 C105 90, 110 88, 115 100" fill="var(--color-tan)" opacity="0.6"/>
            <path d="M172 105 C175 90, 170 88, 165 100" fill="var(--color-tan)" opacity="0.6"/>
          </svg>
        </div>
      </div>
    </div>
  </section>

  <!-- About -->
  <section id="about" class="section section-cream">
    <div class="container">
      <div class="section-header">
        <h2>About the Nest</h2>
        <p class="section-lead">TytoNest began as a simple idea: create a welcoming space for people who find peace in watching barn owls glide silently through the dusk.</p>
      </div>
      <div class="card-grid">
        <div class="card">
          <div class="card-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" stroke="var(--color-amber)" stroke-width="2"/><circle cx="16" cy="16" r="4" fill="var(--color-amber)"/></svg>
          </div>
          <h3 class="card-title">Observe</h3>
          <p>We believe the best way to appreciate barn owls is through patient, quiet observation. No flash photography, no disruption &mdash; just the art of being still.</p>
        </div>
        <div class="card">
          <div class="card-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none"><path d="M6 26 L6 10 L16 4 L26 10 L26 26" stroke="var(--color-amber)" stroke-width="2" stroke-linejoin="round"/><rect x="12" y="18" width="8" height="8" stroke="var(--color-amber)" stroke-width="2"/></svg>
          </div>
          <h3 class="card-title">Shelter</h3>
          <p>Every owl needs a home. We share plans for nest boxes, habitat tips, and restoration projects that help barn owl populations thrive across the countryside.</p>
        </div>
        <div class="card">
          <div class="card-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none"><path d="M4 28 C8 20, 12 12, 16 16 C20 20, 24 8, 28 4" stroke="var(--color-amber)" stroke-width="2" stroke-linecap="round"/></svg>
          </div>
          <h3 class="card-title">Record</h3>
          <p>Careful field notes turn fleeting moments into lasting knowledge. We maintain observation logs, migration patterns, and seasonal behavior archives.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Field Notes -->
  <section id="field-notes" class="section">
    <div class="container">
      <div class="section-header">
        <h2>Field Notes</h2>
        <p class="section-lead">Recent observations from the community. Each note captures a moment of connection with these remarkable creatures.</p>
      </div>
      <div class="notes-grid">
        <article class="note-card">
          <div class="note-date">
            <span class="note-day">12</span>
            <span class="note-month">Jan</span>
          </div>
          <div class="note-content">
            <h3>Silent Wings at Dusk</h3>
            <p>Spotted a pair hunting the meadow edge at sunset. The lead bird made three passes along the hedgerow before dropping into the grass. Successful catch on the third attempt. The second owl watched from the oak post, waiting its turn.</p>
            <span class="note-author">&mdash; M. Calloway, Wiltshire</span>
          </div>
        </article>
        <article class="note-card">
          <div class="note-date">
            <span class="note-day">28</span>
            <span class="note-month">Dec</span>
          </div>
          <div class="note-content">
            <h3>Winter Roost Check</h3>
            <p>Visited the old stone barn off Hollow Lane. Found pellets and whitewash below the southeast beam &mdash; the pair is back for their fourth consecutive winter. Nest box still intact. Left undisturbed.</p>
            <span class="note-author">&mdash; R. Ashworth, Devon</span>
          </div>
        </article>
        <article class="note-card">
          <div class="note-date">
            <span class="note-day">15</span>
            <span class="note-month">Dec</span>
          </div>
          <div class="note-content">
            <h3>First Snow Sighting</h3>
            <p>Barn owl quartering the field in light snowfall just after 4pm. Extraordinary to see the white plumage against the snow &mdash; almost invisible until it banked and caught the last of the light. Pure gold.</p>
            <span class="note-author">&mdash; J. Fenn, Yorkshire</span>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Seasons -->
  <section id="seasons" class="section section-dark">
    <div class="container">
      <div class="section-header">
        <h2>The Owl&rsquo;s Year</h2>
        <p class="section-lead">Barn owls live in rhythm with the seasons. Each brings its own behaviors, challenges, and quiet wonders.</p>
      </div>
      <div class="seasons-grid">
        <div class="season-card">
          <div class="season-name">Spring</div>
          <p>Courtship flights begin. Males call from established territories, offering prey to prospective mates. Nest sites are chosen and the first eggs appear by late April.</p>
        </div>
        <div class="season-card">
          <div class="season-name">Summer</div>
          <p>The busiest season. Parents hunt through the short nights to feed growing broods of 4&ndash;7 owlets. Fledglings make their first awkward flights by August.</p>
        </div>
        <div class="season-card">
          <div class="season-name">Autumn</div>
          <p>Young owls disperse, searching for territories of their own. This is the most perilous time &mdash; and when barn owls are most often seen in unexpected places.</p>
        </div>
        <div class="season-card">
          <div class="season-name">Winter</div>
          <p>Survival mode. Established pairs roost together for warmth. Short days mean early hunting. A harsh winter can decimate populations, making shelter vital.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Community -->
  <section id="community" class="section">
    <div class="container">
      <div class="section-header">
        <h2>Join the Roost</h2>
        <p class="section-lead">TytoNest is built by people who look up at old barns and wonder. Whether you&rsquo;re a seasoned birder or simply owl-curious, there&rsquo;s a perch here for you.</p>
      </div>
      <div class="cta-box">
        <div class="cta-content">
          <h3>Stay in the Loop</h3>
          <p>Get seasonal updates, new field notes, and community highlights. We send one quiet email per month &mdash; no more, no less.</p>
        </div>
        <div class="cta-form" aria-label="Newsletter signup">
          <div class="input-group">
            <input type="email" class="input" placeholder="your@email.com" aria-label="Email address" disabled>
            <button class="btn btn-primary" disabled>Subscribe</button>
          </div>
          <p class="cta-note">Coming soon. For now, just enjoy the view.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="logo-text">TytoNest</span>
          <p class="footer-tagline">Where barn owls come home.</p>
        </div>
        <div class="footer-links">
          <a href="#about">About</a>
          <a href="#field-notes">Field Notes</a>
          <a href="#seasons">Seasons</a>
          <a href="#community">Community</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 TytoNest. Made with patience and a love of silent wings.</p>
      </div>
    </div>
  </footer>

</body>
</html>`;
}

function getCSS() {
  return `
/**
 * TytoNest Design System
 * Color Palette: Barn Owl (Tyto alba) inspired
 * Primary: Warm Brown #5C4033 (back plumage)
 * Secondary: Creamy White #F5F0E8 (face disc)
 * Accent: Golden Amber #D4A03C (owl eyes)
 * Design: Mobile-first, responsive, accessible
 */

/* ============================================
   RESET & BASE
   ============================================ */

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--color-text);
  background-color: var(--color-background);
  min-height: 100vh;
}

/* ============================================
   DESIGN TOKENS
   ============================================ */

:root {
  /* === Barn Owl Color Palette === */

  /* Primary - Warm Brown (back plumage) */
  --color-brown: #5C4033;
  --color-brown-light: #7A5D4F;
  --color-brown-dark: #3D2A21;
  --color-brown-rgb: 92, 64, 51;

  /* Accent - Golden Amber (owl eyes) */
  --color-amber: #D4A03C;
  --color-amber-light: #E4BD6B;
  --color-amber-dark: #B8872A;
  --color-amber-rgb: 212, 160, 60;

  /* Warm Naturals */
  --color-cream: #F5F0E8;
  --color-linen: #FAF7F2;
  --color-tan: #C4A882;
  --color-warm-gray: #A89585;

  /* Twilight (dark backgrounds) */
  --color-twilight: #2C2418;
  --color-twilight-light: #3D3427;
  --color-twilight-rgb: 44, 36, 24;

  /* Semantic mapping */
  --color-primary: var(--color-brown);
  --color-primary-light: var(--color-brown-light);
  --color-primary-dark: var(--color-brown-dark);
  --color-primary-rgb: var(--color-brown-rgb);
  --color-accent: var(--color-amber);
  --color-accent-light: var(--color-amber-light);
  --color-accent-dark: var(--color-amber-dark);

  /* Neutrals */
  --color-gray-50: #FAF8F6;
  --color-gray-100: #F0ECE6;
  --color-gray-200: #E0D8CE;
  --color-gray-300: #CCC1B3;
  --color-gray-500: #8C7E70;
  --color-gray-700: #504438;
  --color-gray-800: #3A3028;
  --color-gray-900: #2A2119;

  /* Surfaces */
  --color-background: var(--color-linen);
  --color-surface: #FFFFFF;
  --color-surface-dark: var(--color-cream);
  --color-border: var(--color-gray-200);
  --color-text: var(--color-gray-800);
  --color-text-light: var(--color-gray-500);
  --color-text-muted: var(--color-warm-gray);

  /* === Typography === */
  --font-primary: 'Georgia', 'Times New Roman', 'Noto Serif', serif;
  --font-heading: 'Trebuchet MS', 'Gill Sans', 'Avenir', 'Segoe UI', sans-serif;
  --font-mono: 'Fira Code', 'SF Mono', Monaco, monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;

  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  --leading-tight: 1.25;
  --leading-normal: 1.6;
  --leading-relaxed: 1.75;

  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.04em;
  --tracking-wider: 0.08em;

  /* === Spacing (8pt grid) === */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  /* === Border Radius === */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;

  /* === Shadows (warm tinted) === */
  --shadow-sm: 0 1px 2px rgba(44, 36, 24, 0.06);
  --shadow-base: 0 1px 3px rgba(44, 36, 24, 0.08), 0 1px 2px rgba(44, 36, 24, 0.04);
  --shadow-md: 0 4px 6px -1px rgba(44, 36, 24, 0.08), 0 2px 4px -1px rgba(44, 36, 24, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(44, 36, 24, 0.08), 0 4px 6px -2px rgba(44, 36, 24, 0.03);
  --shadow-xl: 0 20px 25px -5px rgba(44, 36, 24, 0.1), 0 10px 10px -5px rgba(44, 36, 24, 0.03);

  /* === Transitions === */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}

/* ============================================
   BASE ELEMENTS
   ============================================ */

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--color-text);
  letter-spacing: var(--tracking-tight);
}

h1 { font-size: var(--text-5xl); }
h2 { font-size: var(--text-4xl); }
h3 { font-size: var(--text-xl); }

p {
  line-height: var(--leading-normal);
  color: var(--color-text-light);
}

a {
  color: var(--color-brown);
  text-decoration: none;
  transition: color var(--transition-base);
}

a:hover {
  color: var(--color-amber);
}

img { max-width: 100%; height: auto; }

:focus-visible {
  outline: 2px solid var(--color-amber);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ============================================
   LAYOUT
   ============================================ */

.container {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 640px) {
  .container { padding: 0 var(--space-6); }
}

@media (min-width: 1024px) {
  .container { padding: 0 var(--space-8); }
}

.section {
  padding: var(--space-16) 0;
}

.section-cream {
  background-color: var(--color-cream);
}

.section-dark {
  background-color: var(--color-twilight);
  color: var(--color-cream);
}

.section-dark h2,
.section-dark h3 {
  color: var(--color-cream);
}

.section-dark p {
  color: var(--color-warm-gray);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-12);
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

.section-header h2 {
  margin-bottom: var(--space-4);
}

.section-lead {
  font-size: var(--text-lg);
  color: var(--color-text-light);
}

.section-dark .section-lead {
  color: var(--color-warm-gray);
}

/* ============================================
   HEADER & NAVIGATION
   ============================================ */

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(250, 247, 242, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-gray-200);
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
}

.logo:hover { text-decoration: none; }

.logo-icon {
  width: 36px;
  height: 36px;
}

.logo-text {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-brown);
  letter-spacing: var(--tracking-tight);
}

.nav-links {
  display: flex;
  gap: var(--space-1);
}

.nav-link {
  padding: var(--space-2) var(--space-3);
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-light);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.nav-link:hover {
  color: var(--color-brown);
  background-color: var(--color-gray-100);
  text-decoration: none;
}

@media (max-width: 639px) {
  .nav-links { display: none; }
}

/* ============================================
   HERO
   ============================================ */

.hero {
  padding: var(--space-16) 0 var(--space-20);
  overflow: hidden;
}

.hero > .container {
  display: flex;
  align-items: center;
  gap: var(--space-12);
}

.hero-content {
  flex: 1;
  min-width: 0;
}

.hero-title {
  font-size: var(--text-5xl);
  color: var(--color-brown-dark);
  margin-bottom: var(--space-6);
  line-height: 1.1;
}

.hero-subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-light);
  margin-bottom: var(--space-8);
  max-width: 520px;
  line-height: var(--leading-relaxed);
}

.hero-subtitle em {
  font-style: italic;
  color: var(--color-brown);
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.hero-art {
  flex: 0 0 280px;
}

.owl-silhouette svg {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 4px 12px rgba(44, 36, 24, 0.1));
}

@media (max-width: 767px) {
  .hero > .container {
    flex-direction: column-reverse;
    text-align: center;
  }

  .hero-title {
    font-size: var(--text-3xl);
  }

  .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-art {
    flex: none;
    width: 180px;
  }
}

/* ============================================
   BUTTONS
   ============================================ */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  line-height: 1;
  border-radius: var(--radius-lg);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--transition-base);
  text-decoration: none;
  min-height: 44px;
  letter-spacing: var(--tracking-wide);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  text-decoration: none;
}

.btn:active {
  transform: translateY(0);
}

.btn-primary {
  background-color: var(--color-brown);
  color: var(--color-cream);
}

.btn-primary:hover {
  background-color: var(--color-brown-dark);
  color: var(--color-cream);
}

.btn-outline {
  background-color: transparent;
  border-color: var(--color-brown);
  color: var(--color-brown);
}

.btn-outline:hover {
  background-color: var(--color-brown);
  color: var(--color-cream);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

@media (max-width: 639px) {
  .btn {
    padding: var(--space-3) var(--space-5);
    font-size: var(--text-sm);
  }
}

/* ============================================
   CARDS
   ============================================ */

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

@media (max-width: 767px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

.card {
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-base);
  transition: box-shadow var(--transition-slow), transform var(--transition-slow);
  border: 1px solid var(--color-border);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card-icon {
  width: 48px;
  height: 48px;
  margin-bottom: var(--space-4);
}

.card-icon svg {
  width: 100%;
  height: 100%;
}

.card-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  margin-bottom: var(--space-3);
  color: var(--color-brown);
}

.card p {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
}

/* ============================================
   FIELD NOTES
   ============================================ */

.notes-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  max-width: 780px;
  margin: 0 auto;
}

.note-card {
  display: flex;
  gap: var(--space-6);
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: box-shadow var(--transition-base);
}

.note-card:hover {
  box-shadow: var(--shadow-md);
}

.note-date {
  flex: 0 0 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-cream);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
  text-align: center;
  min-height: 64px;
}

.note-day {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-brown);
  line-height: 1;
}

.note-month {
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
}

.note-content h3 {
  font-size: var(--text-lg);
  color: var(--color-brown);
  margin-bottom: var(--space-2);
}

.note-content p {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-3);
}

.note-author {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  font-style: italic;
}

@media (max-width: 639px) {
  .note-card {
    flex-direction: column;
    gap: var(--space-3);
  }

  .note-date {
    flex-direction: row;
    gap: var(--space-2);
    min-height: auto;
    width: fit-content;
  }
}

/* ============================================
   SEASONS
   ============================================ */

.seasons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

.season-card {
  background-color: var(--color-twilight-light);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  border: 1px solid rgba(196, 168, 130, 0.15);
  transition: border-color var(--transition-base);
}

.season-card:hover {
  border-color: rgba(212, 160, 60, 0.3);
}

.season-name {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-amber);
  margin-bottom: var(--space-3);
  letter-spacing: var(--tracking-wide);
}

.season-card p {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-warm-gray);
}

@media (max-width: 1023px) {
  .seasons-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 639px) {
  .seasons-grid {
    grid-template-columns: 1fr;
  }
}

/* ============================================
   CTA / COMMUNITY
   ============================================ */

.cta-box {
  display: flex;
  align-items: center;
  gap: var(--space-10);
  background-color: var(--color-cream);
  border-radius: var(--radius-2xl);
  padding: var(--space-10);
  border: 1px solid var(--color-border);
}

.cta-content {
  flex: 1;
}

.cta-content h3 {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  color: var(--color-brown);
  margin-bottom: var(--space-3);
}

.cta-content p {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
}

.cta-form {
  flex: 0 0 340px;
}

.input-group {
  display: flex;
  gap: var(--space-2);
}

.input {
  flex: 1;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  font-family: var(--font-primary);
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  min-height: 44px;
  transition: border-color var(--transition-base);
}

.input:focus {
  outline: none;
  border-color: var(--color-amber);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cta-note {
  margin-top: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  font-style: italic;
}

@media (max-width: 767px) {
  .cta-box {
    flex-direction: column;
    padding: var(--space-6);
    text-align: center;
  }

  .cta-form {
    flex: none;
    width: 100%;
  }

  .input-group {
    flex-direction: column;
  }
}

/* ============================================
   FOOTER
   ============================================ */

.site-footer {
  background-color: var(--color-twilight);
  padding: var(--space-10) 0 var(--space-6);
  color: var(--color-warm-gray);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: var(--space-8);
  border-bottom: 1px solid rgba(196, 168, 130, 0.15);
  margin-bottom: var(--space-6);
}

.footer-brand .logo-text {
  color: var(--color-cream);
  font-size: var(--text-lg);
}

.footer-tagline {
  font-size: var(--text-sm);
  color: var(--color-warm-gray);
  margin-top: var(--space-1);
}

.footer-links {
  display: flex;
  gap: var(--space-6);
}

.footer-links a {
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  color: var(--color-warm-gray);
  transition: color var(--transition-base);
  letter-spacing: var(--tracking-wide);
}

.footer-links a:hover {
  color: var(--color-amber);
  text-decoration: none;
}

.footer-bottom p {
  font-size: var(--text-sm);
  color: var(--color-warm-gray);
  text-align: center;
  opacity: 0.7;
}

@media (max-width: 639px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-6);
  }

  .footer-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-4);
  }
}

@media (max-width: 639px) {
  .section {
    padding: var(--space-10) 0;
  }

  h2 { font-size: var(--text-2xl); }
  h3 { font-size: var(--text-lg); }

  .section-header {
    margin-bottom: var(--space-8);
  }
}
`;
}
