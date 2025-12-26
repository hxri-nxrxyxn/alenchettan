# FabricStudio / PatternPlay

An open-source fashion design engine enabling users to explore patterns, design custom garments via a "Paper Doll" layering system, and order fabrics.

## 🚀 Project Status
**Phase:** Engineering MVP / Prototype
**Stack:** SvelteKit (Svelte 5), SQLite, Drizzle ORM.

## 📚 Documentation
*   [**App Flow & Analysis**](./docs/flow.md) - Overview of user journey and features.
*   [**System Architecture**](./docs/architecture.md) - Tech stack and data model.
*   [**Code Rules**](./docs/code_rules.md) - Coding standards (No TS, Svelte 5 Runes).
*   [**Asset Workflow**](./docs/asset_workflow.md) - How to create SVG components.
*   [**Visual Style Guide**](./docs/style_guide.md) - Design system (Ultra Minimalist White).
*   [**Component Rules**](./docs/components.md) - The 20x20x20 combination logic.

## 🛠 Setup & Run
1.  **Install:** `npm install`
2.  **Dev Server:** `npm run dev`
3.  **Database:** `npm run db:push` (Set up SQLite)

## 🎨 Asset Management
Place your base mannequin image at:
`static/assets/master/mannequin_base.png`

Place SVGs at:
`static/assets/svg/[category]/[file].svg`
(See [Instructions](./docs/instructions.md) for naming conventions).
