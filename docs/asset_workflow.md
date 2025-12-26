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

## Phase 2: AI Generation (The Creative Engine)
**Goal:** Use AI to generate the *shapes* and *styles* so you don't have to imagine them.

1.  **Prompting:** Use Google AI Studio / Gemini / Midjourney.
    *   *Prompt:* "Flat fashion technical sketch of a [Mandarin Collar] for a women's kurta, front view, black outline, white background, minimalist line art."
2.  **Curating:** Generate all 20 variations. Don't worry about them fitting perfectly yet. Just get clear lines.
3.  **Processing:**
    *   Take the AI output (PNG/JPG).
    *   (Optional) Run it through a free vectorizer like `vectorizer.ai` (if free trial exists) or generic "bitmap to svg" converters. *Warning: These auto-vectors are usually "messy" and hard to animate.*

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
