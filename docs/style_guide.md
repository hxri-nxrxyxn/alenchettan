# Visual Style Guide: "Ultra Minimalist White"

## 1. Core Philosophy
*   **Reduced Noise:** No unnecessary borders, no heavy shadows, no saturated backgrounds.
*   **Typography First:** Structure is defined by font weight and size, not colored boxes.
*   **Rich White:** Use a spectrum of whites (Paper, Snow, Alabaster) to create depth without color.

## 2. Color Palette
### Primary Surfaces
*   **White (`#ffffff`):** Main cards, active tab backgrounds.
*   **Soft White (`#f9f9f9`):** Page backgrounds, canvas areas.
*   **Off-White (`#f0f0f0`):** Secondary buttons, inactive states.

### Typography
*   **Rich Black (`#121212`):** Primary headings (High contrast but not harsh `#000`).
*   **Charcoal Gray (`#666666`):** Body text, secondary labels.
*   **Silver (`#eaeaea`):** Subtle dividers, borders.

## 3. Typography System
### Headings: "Playfair Display" (Serif)
*   Used for Page Titles and Section Headers.
*   *Feel:* Editorial, Elegant, Fashion-forward.
*   *Weights:* 400 (Regular), 700 (Bold - use sparingly).

### Body/UI: "IBM Plex Sans" (Sans-Serif)
*   Used for Buttons, Inputs, Labels, Navigation.
*   *Feel:* Technical, Clean, Modern.
*   *Weights:* 300 (Light), 400 (Regular), 500 (Medium).

## 4. UI Components

### Buttons
*   **Primary:** Solid Rich Black (`#121212`) background, White text. Square corners or slightly rounded (2px).
*   **Secondary:** White background, thin Silver border, Charcoal text.
*   **Tabs:** Text-only. Active state indicated by bold weight or a minimal underline.

### Cards
*   Flat white background.
*   **Shadow:** `box-shadow: 0 4px 20px rgba(0,0,0,0.03);` (Very diffuse, barely visible).
*   **Border:** Optional 1px solid `#eaeaea`.

## 5. CSS Variables Reference
```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f9f9f9;
  
  --text-primary: #121212;
  --text-secondary: #666666;
  
  --border-subtle: #eaeaea;
  --shadow-soft: 0 4px 20px rgba(0,0,0,0.03);
  
  --font-display: 'Playfair Display', serif;
  --font-body: 'IBM Plex Sans', sans-serif;
}
```
