# Zero-Budget Asset Creation Workflow
# "The Hybrid AI-Tracer Method"

## Phase 1: The Setup (Do this ONCE)
**Goal:** Create the "Truth" geometry that all future assets must obey.

1.  **Get a Vector Tool:** Download **Inkscape** (Open Source) or use **Figma** (Free tier is sufficient).
2.  **Create the Master Mannequin:**
    *   Find a royalty-free vector of a fashion croquis (mannequin).
    *   Import it into your tool.
    *   **CRITICAL STEP:** Lock this layer. This is your coordinate origin (0,0).
    *   Draw a specific "Neckline Curve" and "Shoulder Seam" path. **Every single future component must align with these lines.**

## Phase 2: AI Generation Strategy
**Can I use AI to generate a 3x3 grid of icons?**
Yes, but with a major warning: **AI generates pixels, not physics.**
*   **The Trap:** If you ask Midjourney/DALL-E for a "grid of 9 collars," they will all be at slightly different angles. Collar #1 might be "top-down," Collar #2 might be "perspective."
*   **The Fix:** Use AI for **Texture & Style**, not Geometry.

### Recommended Workflow:
1.  **Prompting:** "Flat lay fashion design, isolated collar styles, white background, high contrast, 3x3 grid."
2.  **Processing (Python/Manual):**
    *   Crop the grid into individual images.
    *   Remove background (transparent PNG).
3.  **The "Paper Doll" alignment step (Crucial):**
    *   Do **NOT** just convert these to SVG and dump them in. They won't fit the neck hole.
    *   **Option A (Easy):** Use the AI image as a "Pattern Fill" inside a pre-made SVG shape that fits your mannequin.
    *   **Option B (Hard):** Import the AI image into Figma/Inkscape, place it over your Master Mannequin, and warp/distort it until the neck points match your master anchors.

## Phase 3: The Integration (The "Engineering" Step)
**Goal:** Standardize the AI art to fit your code's coordinate system.

1.  **Import to Master File:**
    *   Bring your AI-generated image (or auto-vector) into your Figma/Inkscape project.
2.  **Scale & Position:**
    *   Resize the AI image so it roughly fits over your **Master Mannequin**.
3.  **The "Trace" (The Secret Sauce):**
    *   Use the **Pen Tool** (Bezier curves).
    *   **Trace the outer shape** of the collar/sleeve.
    *   **Snap to Anchors:** When you reach the neck/shoulder, *stop following the AI image* and **snap your points to your Master Mannequin's lines**.
    *   *Result:* A unique collar shape that mathematically matches your body mesh perfectly.
4.  **Layer Separation:**
    *   Create a shape for the "Fill" (Fabric color).
    *   Create a stroke for the "Outline" (Black border).
    *   (Advanced) Draw simple black shapes with 20% opacity for "Shadows/Folds".

## Phase 4: Export Pipeline
1.  **Select Constraints:** Select your new traced component.
2.  **Export as SVG:**
    *   Ensure "ViewBox" is set to the full canvas size (same as the mannequin), NOT just the size of the collar.
    *   *Why?* This ensures that when you load `<img src="collar.svg" />` in HTML, it automatically lands in the right spot without needing CSS `top: 250px`.

## Summary
*   **AI's Job:** Imagination, variety, rough sketches.
*   **Your Job:** Logic, alignment, tracing the anchor points.
*   **Cost:** $0.
*   **Time:** ~5 minutes per asset once you get the hang of it. (20 collars = ~2 hours).