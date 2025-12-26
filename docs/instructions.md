# Asset Instructions & Protocol

This file details how to name and format the SVG assets for the FabricStudio engine.

## 1. File Naming Convention
All assets must be placed in `static/assets/svg/[category]/`.
Format: `[category]_[style]_[variant].svg`

### Categories & Examples:
*   **Body:** `body_female_01.svg`
*   **Necklines:**
    *   `neckline_round_deep.svg`
    *   `neckline_v_shallow.svg`
*   **Collars:**
    *   `collar_mandarin_plain.svg`
    *   `collar_peterpan_rounded.svg`
*   **Sleeves:**
    *   `sleeve_full_straight.svg`
    *   `sleeve_half_puff.svg`

## 2. SVG Technical Specs
*   **ViewBox:** MUST be `0 0 1000 1000`.
*   **Background:** Transparent.
*   **Layering:**
    *   The SVG must contain a group or path with `id="base"` (this is what gets recolored).
    *   The outline must be a separate path with `id="outline"` (stroke only).

## 3. Placeholder Text
Until you have the real SVGs, use simple colored squares or circles labeled with text in the SVG.
Example:
```xml
<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
  <rect id="base" x="400" y="200" width="200" height="100" fill="#ccc" />
  <text x="500" y="250" text-anchor="middle">Mandarin Collar</text>
</svg>
```
