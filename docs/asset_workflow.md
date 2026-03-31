# Ghost Mannequin Asset Workflow
# Strategy: "Product-First Layering"

## 1. The Core Concept
We have removed the human mannequin. The **Silhouette** (Base Garment) is now the canvas.
*   **Old Way:** Human -> Shirt -> Collar.
*   **New Way:** Shirt (Silhouette) -> Collar.

## 2. Naming Convention (Strict)
All base body images must go into: `static/assets/silhouettes/`

**Format:** `[silhouette_name]_[view].png`
*   `straight_front.png`
*   `straight_back.png`
*   `a-line_front.png`
*   `shirt-hem_front.png`

## 3. How to Create the "Base"
1.  **AI Generation:** "Flat lay white t-shirt, straight cut, crew neck, white background, minimalist."
2.  **Processing:**
    *   Remove background (Transparent PNG).
    *   **Crop & Center:** Ensure the neck opening is always in a consistent position (e.g., center X=500, Y=200).
    *   **Resize:** Save as 1000x1000 PNG.

## 4. How to Create Attachments (Collars/Sleeves)
They must "fit" your base silhouettes.
*   **The "Universal Neck" Rule:** Even if you have 5 silhouettes (T-shirt, Kurta, Blouse), try to keep the *neckline curve* identical in all of them. This allows one "Peter Pan Collar" to fit all 5 shirts perfectly.

## 5. Summary of Folder Structure
```
static/
  assets/
    silhouettes/
       straight_front.png
       straight_back.png
    collars/
       mandarin_front.svg
    sleeves/
       ...
```
