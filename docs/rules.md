# Technical Rules & Architecture for Modular Fashion Engine

## 1. Asset Creation Standards (The "SVG Protocol")
To ensure 10,000+ combinations work without manual adjustment, every SVG asset must strictly adhere to these rules.

### 1.1. The Master ViewBox
*   **Rule:** All components must use the **exact same ViewBox dimensions** (e.g., `0 0 1000 1000`).
*   **Why:** You never position a sleeve manually. You simply stack the "Sleeve SVG" on top of the "Body SVG" at `(0,0)`. If the sleeve was drawn in the correct position relative to the shoulder in the design file, it will snap perfectly into place in code.

### 1.2. Anchor Points & Registration
*   **Rule:** Define a universal "Shoulder Seam" point and "Neck Center" point.
*   **Constraint:** A "Round Neck" and a "V-Neck" must intersect the shoulder line at the exact same pixel coordinate. If the V-neck is wider, it cuts into the shoulder, but the *outer* anchor must match.

### 1.3. SVG Structure
*   **Fill vs. Stroke:** Components should generally use `fill` for fabric and `stroke` for outlines.
*   **ID Naming:** Use consistent IDs for recoloring.
    *   `#base_shape` (The part that gets the fabric pattern)
    *   `#outline` (The black stroke/sketch line)
    *   `#shading` (Semi-transparent black/white overlays for folds/shadows)
*   **Transparency:** The background of every asset must be transparent.

## 2. The Rendering Stack (Z-Index Logic)
The browser/engine must render layers in this specific order (Bottom to Top) to ensure correct visual occlusion.

1.  **Level 0: Mannequin/Skin** (The base body)
2.  **Level 1: Back Hair/Back Features** (If visible)
3.  **Level 2: Back Fabric** (The inside back of the shirt, visible through the neck hole)
4.  **Level 3: Sleeves (Back)** (For poses where arms are behind)
5.  **Level 4: Main Body / Silhouette** (The Torso)
6.  **Level 5: Sleeves (Front)** (Standard arms)
7.  **Level 6: Neckline Mask** (This "cuts" the hole in the Body layer)
8.  **Level 7: Collar (Back)** (The part of the collar wrapping around the neck)
9.  **Level 8: Head/Neck** (The mannequin's neck sits *inside* the collar)
10. **Level 9: Collar (Front)** (The lapels/points sitting on the chest)
11. **Level 10: Plackets / Fasteners** (Button strips)
12. **Level 11: Details** (Pockets, Embroidery)
13. **Level 12: Accessories** (Scarves, Jewelry)

## 3. Compatibility Matrix (The Rules Engine)
Not every component fits every other component. The app must enforce these constraints to prevent "broken" visuals.

### 3.1. Hard Exclusions (Invalid)
*   *Rule:* If `Component A` is selected, disable `Component B`.
*   *Example:* `Collars: Mandarin` cannot be paired with `Neckline: Deep V-Neck` (There is no structure to hold the collar).
*   *Example:* `Sleeves: Raglan` cannot be paired with `Silhouette: Set-in Shoulder`.

### 3.2. Soft Adaptations (Auto-Switching)
*   *Rule:* If User selects `Collar: Peter Pan`, the app should automatically force `Neckline` to `Round` or `Jewel`.
*   *Logic:* Don't show an error; just fix the dependency.

### 3.3. Dependency Injection
*   *Rule:* Some items require children.
*   *Example:* If `Detail: Button Placket` is added, the underlying `Silhouette` must have a `Center Front Seam`.

## 4. Pattern & Fabric Logic
How to make flat colors look like real clothes.

### 4.1. Masking
*   Use SVG `<clipPath>` or CSS `mask-image`.
*   The Pattern Image is a large square tile. It is "masked" by the `#base_shape` of the component (e.g., the Sleeve shape).

### 4.2. Directionality (Grain Line)
*   **Body:** Pattern runs vertical (0 deg).
*   **Sleeves:** Pattern often needs to rotate (e.g., 45 deg or 90 deg) to follow the arm direction.
*   **Collars:** Pattern usually follows the curve. *Advanced:* Use "Puppet Warp" or SVG meshes. *MVP:* Simple rotation is usually enough.

### 4.3. Scale
*   Patterns must have a `scale` multiplier. A small floral print looks different from a large floral print. Allow users to adjust this.

## 5. Data Structure (JSON Schema)
How to save a user's creation.

```json
{
  "designId": "12345",
  "baseModel": "female_standard",
  "components": {
    "silhouette": "kurta_straight_cut",
    "neckline": "round_deep",
    "sleeves": "three_quarter",
    "collar": "mandarin_split",
    "details": ["pocket_left_chest", "side_slits"]
  },
  "materials": {
    "body_fabric": {
      "id": "cotton_print_04",
      "scale": 1.2,
      "rotation": 0
    },
    "collar_fabric": {
      "id": "solid_red_silk",
      "scale": 1.0,
      "rotation": 90
    }
  }
}
```
