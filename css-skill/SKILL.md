---
name: css-design-system-generator
description: Generate modern, mobile-friendly CSS design systems for web projects. Creates complete CSS files with color systems, typography, responsive utilities, and component styles. Prompts for project-specific color palettes and applies current design principles with web-optimized fonts.
---

# CSS Design System Generator

Generate production-ready CSS design systems for modern web projects with mobile-first responsive design.

## When to Use This Skill

Use this skill when:
- Starting a new web project that needs a style foundation
- Creating a consistent design language for a website
- Needing mobile-friendly, responsive CSS
- Wanting to quickly prototype with modern design patterns
- Updating an existing project with a new color scheme

## Core Principles

This skill follows modern web design best practices:

1. **Mobile-First** - Start with mobile styles, scale up with media queries
2. **Responsive by Default** - Fluid typography, flexible layouts
3. **Accessibility** - WCAG AA contrast ratios, semantic color names
4. **Performance** - Minimal CSS, leverages CSS variables for dynamic theming
5. **Modern Aesthetics** - Contemporary design patterns and spacing

## Workflow

### Step 1: Gather Requirements

**Always ask the user for:**

1. **Project Type** (if not specified)
   - Corporate website
   - Portfolio/personal site
   - Dashboard/web app
   - Blog/content site
   - E-commerce
   - Landing page

2. **Color Palette** (REQUIRED - always prompt if not provided)
   Ask: "What colors would you like for your design system?"
   
   Guide the user to provide:
   - Primary color (main brand color)
   - Secondary color (supporting brand color) - optional
   - Accent color (for CTAs, highlights) - optional
   
   Accept colors as:
   - Hex codes (#1e3a8a)
   - Color names (navy blue, coral, teal)
   - RGB values
   
   **If user is unsure:** Suggest 2-3 color combinations based on project type:
   - Corporate: Navy + gold + light blue
   - Tech/SaaS: Deep purple + cyan + lime green
   - Creative: Coral + teal + amber
   - Professional Services: Slate + emerald + sky blue

3. **Font Preferences** (optional)
   - Modern sans-serif (default)
   - Classic serif
   - Playful/rounded
   - Technical/monospace accent
   
   If not specified, use modern web-safe font stacks with system fonts

### Step 2: Generate the Design System

Create a complete CSS file (`design-system.css`) with the following structure:

#### Section 1: CSS Reset & Base Styles
```css
/* Modern CSS Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px; /* Base for rem units */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--color-text);
  background-color: var(--color-background);
}
```

#### Section 2: Design Tokens (CSS Custom Properties)

**Color System:**
- Generate from user's palette
- Create light/dark variants automatically (lighten by 15-20%, darken by 15-20%)
- Include neutral grays (8-step scale: 50, 100, 200, 300, 500, 700, 800, 900)
- Semantic colors: success (green), warning (amber), error (red), info (blue)
- Calculate and verify WCAG AA contrast ratios
- Surface colors (background, surface, border)

**Typography:**
- Font stacks (system fonts + web-safe fallbacks)
- Type scale using 1.25 ratio (minor third) for web
  - xs: 0.75rem (12px)
  - sm: 0.875rem (14px)
  - base: 1rem (16px)
  - lg: 1.125rem (18px)
  - xl: 1.25rem (20px)
  - 2xl: 1.5rem (24px)
  - 3xl: 1.875rem (30px)
  - 4xl: 2.25rem (36px)
  - 5xl: 3rem (48px)
  - 6xl: 3.75rem (60px)
- Font weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- Line heights: tight (1.25), normal (1.5), relaxed (1.75), loose (2)
- Letter spacing for headings (-0.02em to 0.05em)

**Spacing System (8pt grid):**
- 0: 0
- 1: 0.25rem (4px)
- 2: 0.5rem (8px)
- 3: 0.75rem (12px)
- 4: 1rem (16px)
- 5: 1.25rem (20px)
- 6: 1.5rem (24px)
- 8: 2rem (32px)
- 10: 2.5rem (40px)
- 12: 3rem (48px)
- 16: 4rem (64px)
- 20: 5rem (80px)
- 24: 6rem (96px)

**Border Radius:**
- none: 0
- sm: 0.125rem (2px)
- base: 0.25rem (4px)
- md: 0.375rem (6px)
- lg: 0.5rem (8px)
- xl: 0.75rem (12px)
- 2xl: 1rem (16px)
- full: 9999px

**Shadows:**
- sm: 0 1px 2px rgba(0, 0, 0, 0.05)
- base: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)
- md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
- lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
- xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
- inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)

**Transitions:**
- fast: 150ms ease
- base: 200ms ease
- slow: 300ms ease
- slower: 500ms ease

**Breakpoints (mobile-first):**
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

#### Section 3: Utility Classes

**Layout Utilities:**
```css
/* Container */
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 640px) {
  .container { padding: 0 var(--space-6); }
}

/* Flexbox */
.flex { display: flex; }
.inline-flex { display: inline-flex; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.flex-wrap { flex-wrap: wrap; }
.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }
.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
.gap-2 { gap: var(--space-2); }
.gap-4 { gap: var(--space-4); }
.gap-6 { gap: var(--space-6); }

/* Grid */
.grid { display: grid; }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 768px) {
  .grid-cols-2, .grid-cols-3, .grid-cols-4 {
    grid-template-columns: 1fr;
  }
}
```

**Spacing Utilities:**
- Padding: .p-{size}, .px-{size}, .py-{size}, .pt-{size}, .pr-{size}, .pb-{size}, .pl-{size}
- Margin: .m-{size}, .mx-{size}, .my-{size}, .mt-{size}, .mr-{size}, .mb-{size}, .ml-{size}
- Sizes: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20

**Typography Utilities:**
```css
/* Font sizes */
.text-xs { font-size: var(--text-xs); }
.text-sm { font-size: var(--text-sm); }
.text-base { font-size: var(--text-base); }
.text-lg { font-size: var(--text-lg); }
.text-xl { font-size: var(--text-xl); }
.text-2xl { font-size: var(--text-2xl); }
.text-3xl { font-size: var(--text-3xl); }
.text-4xl { font-size: var(--text-4xl); }

/* Font weights */
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }

/* Text alignment */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

/* Line height */
.leading-tight { line-height: var(--leading-tight); }
.leading-normal { line-height: var(--leading-normal); }
.leading-relaxed { line-height: var(--leading-relaxed); }
```

**Color Utilities:**
- Text colors: .text-primary, .text-secondary, .text-accent, .text-gray-{shade}
- Background colors: .bg-primary, .bg-secondary, .bg-accent, .bg-gray-{shade}
- Border colors: .border-primary, .border-secondary, etc.

**Responsive Display:**
```css
.hidden { display: none; }
.block { display: block; }
.inline-block { display: inline-block; }

@media (max-width: 768px) {
  .md\:hidden { display: none; }
  .md\:block { display: block; }
}

@media (min-width: 769px) {
  .md\:show { display: block; }
}
```

#### Section 4: Component Base Styles

**Buttons:**
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  line-height: 1;
  border-radius: var(--radius-md);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--transition-base);
  text-decoration: none;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
}

.btn-secondary {
  background-color: var(--color-secondary);
  color: white;
}

.btn-outline {
  background-color: transparent;
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn-outline:hover {
  background-color: var(--color-primary);
  color: white;
}

/* Responsive button sizing */
@media (max-width: 640px) {
  .btn {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
  }
}
```

**Cards:**
```css
.card {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-base);
  transition: box-shadow var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

@media (max-width: 640px) {
  .card {
    padding: var(--space-4);
  }
}
```

**Forms:**
```css
.input,
.textarea,
.select {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-base);
}

.input:focus,
.textarea:focus,
.select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
}

.label {
  display: block;
  margin-bottom: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text);
}
```

**Navigation:**
```css
.nav {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) 0;
}

.nav-link {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-text);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.nav-link:hover {
  background-color: var(--color-gray-100);
  color: var(--color-primary);
}

.nav-link.active {
  color: var(--color-primary);
  background-color: var(--color-primary-light);
}

/* Mobile navigation */
@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    align-items: stretch;
  }
  
  .nav-link {
    width: 100%;
  }
}
```

### Step 3: Output Format

Generate and save the file to `/mnt/user-data/outputs/design-system.css`

Include the following structure:
1. File header with generation info
2. CSS reset
3. Design tokens in :root
4. Utility classes
5. Component styles
6. Responsive media queries
7. Usage examples in CSS comments

### Step 4: Documentation

After generating the file, provide the user with:

1. **Quick Start Guide**
   - How to include the CSS in their HTML
   - Basic usage examples
   
2. **Color Palette Reference**
   - Display the colors with their variable names
   - Show contrast ratios for accessibility
   
3. **Example Components**
   - 2-3 HTML snippets showing how to use the system
   
4. **Customization Tips**
   - How to override variables
   - How to extend the system

## Best Practices

### Color Generation
- Always check contrast ratios (4.5:1 minimum for normal text, 3:1 for large text)
- Generate complementary shades automatically if only one color provided
- Use HSL internally for easier light/dark variant generation
- Provide both hex and RGB values for compatibility

### Font Selection
Default to modern system font stacks:
```css
--font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                'Helvetica Neue', Arial, sans-serif;
--font-heading: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

Web-optimized font options:
- **Sans-serif:** Inter, Poppins, DM Sans, Space Grotesk
- **Serif:** Merriweather, Lora, Playfair Display
- **Monospace:** Fira Code, JetBrains Mono, Source Code Pro

Always include fallbacks and system fonts.

### Mobile-First Approach
- Base styles target mobile
- Use `@media (min-width: X)` for larger screens
- Make touch targets at least 44x44px
- Increase spacing on mobile for better usability
- Scale font sizes appropriately (slightly smaller on mobile)

### Performance
- Use CSS custom properties for dynamic theming
- Minimize specificity (prefer classes over IDs or element selectors)
- Group media queries by component
- Keep utility classes atomic (single purpose)

### Accessibility
- Ensure sufficient color contrast
- Use semantic color names (primary, not blue)
- Include focus styles for keyboard navigation
- Make text scalable (use rem, not px)
- Test with reduced motion preferences

## Example Output

When user says: "Generate a design system with navy blue (#1e3a8a) and coral (#fb7185) for a portfolio site"

Generate a complete CSS file with:
- Navy as primary (with light/dark variants)
- Coral as accent
- Complete neutral gray scale
- Modern sans-serif fonts
- Mobile-first responsive utilities
- Component styles for buttons, cards, forms, navigation
- Usage examples in comments

Then provide:
- Quick start instructions
- Color palette visualization
- HTML example snippets
- Customization guide

## Error Handling

If the user doesn't provide colors:
- Prompt them with: "What colors would you like for your design system? (Provide a primary color, and optionally secondary and accent colors)"
- Offer suggestions based on project type
- Show examples: "For example: navy blue, coral, and gold"

If colors have poor contrast:
- Warn the user
- Suggest adjustments
- Provide alternative shades that meet accessibility standards

If project type is unclear:
- Ask: "What type of web project is this for? (e.g., corporate site, portfolio, dashboard)"
- Use defaults if user wants to skip

## Success Criteria

The generated design system should:
- ✓ Be mobile-friendly and responsive
- ✓ Use modern design patterns
- ✓ Include web-optimized fonts
- ✓ Meet WCAG AA accessibility standards
- ✓ Be easy to customize
- ✓ Include clear documentation
- ✓ Work with project-specific colors
- ✓ Include practical component examples
- ✓ Be production-ready

---

## Implementation Notes

1. Always start by gathering requirements (especially colors)
2. Generate complete, production-ready CSS
3. Verify accessibility (contrast ratios)
4. Provide clear documentation and examples
5. Save to outputs directory for easy access
6. Be helpful in explaining how to use and customize the system
