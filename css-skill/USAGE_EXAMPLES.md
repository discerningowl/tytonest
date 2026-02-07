# Usage Examples

## Example 1: Corporate Website

**Prompt:**
```
Generate a design system with navy blue (#1e3a8a), coral (#fb7185), 
and gold (#fbbf24) for a corporate website
```

**What you get:**
- Navy as primary color
- Coral as secondary color
- Gold as accent color
- Professional, corporate-appropriate styling
- Complete CSS file ready to use

## Example 2: Tech Startup

**Prompt:**
```
Create a design system for a SaaS dashboard with purple (#7c3aed) 
as the main color. Make it modern and mobile-friendly.
```

**What you get:**
- Purple as primary with auto-generated light/dark variants
- Dashboard-appropriate components
- Mobile-responsive utilities
- Modern aesthetic

## Example 3: Portfolio Site

**Prompt:**
```
I need a design system for my portfolio. I like teal.
```

**What happens:**
- Skill prompts you for specific teal hex code
- Suggests complementary colors
- Generates portfolio-appropriate styles

## Example 4: Minimal Request

**Prompt:**
```
Generate a design system
```

**What happens:**
- Skill asks: "What colors would you like?"
- Skill asks: "What type of project?"
- Provides color suggestions based on project type
- Generates after you provide information

## Using the Generated CSS

### In HTML:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Site</title>
  <link rel="stylesheet" href="design-system.css">
</head>
<body>
  <div class="container">
    <h1>Welcome</h1>
    <button class="btn btn-primary">Get Started</button>
  </div>
</body>
</html>
```

### Component Examples:

**Button:**
```html
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>
```

**Card:**
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
  </div>
  <div class="card-body">
    <p>Your content here</p>
  </div>
</div>
```

**Form:**
```html
<form>
  <div class="form-group">
    <label class="label" for="email">Email</label>
    <input type="email" id="email" class="input" placeholder="you@example.com">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

**Grid Layout:**
```html
<div class="container">
  <div class="grid grid-cols-3 gap-6">
    <div class="card">Item 1</div>
    <div class="card">Item 2</div>
    <div class="card">Item 3</div>
  </div>
</div>
```

## Customizing Colors

Override CSS variables in your own stylesheet:

```css
/* custom.css - load after design-system.css */
:root {
  --color-primary: #your-new-color;
  --color-accent: #another-color;
}
```

## Adding Dark Mode

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1f2937;
    --color-text: #f9fafb;
    --color-surface: #374151;
    --color-border: #4b5563;
  }
}
```

## Tips

1. **Start simple** - Provide just the colors you want
2. **Be specific** - Use hex codes for exact colors
3. **Trust the defaults** - Font stacks and spacing are optimized
4. **Customize after** - Override CSS variables as needed
5. **Test mobile** - Resize your browser to see responsive behavior

## Common Patterns

**Landing Page:**
```
Generate a design system with deep blue and bright orange for a 
tech startup landing page
```

**Blog:**
```
Create a design system for a personal blog with warm, readable colors
```

**Dashboard:**
```
Design system for an analytics dashboard - needs professional colors 
and good data visualization support
```

**E-commerce:**
```
Generate a design system with green and gold for an organic products 
e-commerce site
```
