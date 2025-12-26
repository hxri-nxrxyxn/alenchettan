# System Architecture

## 1. High-Level Stack (The "Zero Budget" Monolith)
*   **Runtime:** Node.js (via SvelteKit `adapter-node`).
*   **Framework:** **SvelteKit** (Full Stack).
    *   *Frontend:* Svelte components for UI and SVG composition.
    *   *Backend:* SvelteKit Server Loaders (`+page.server.ts`) and API Endpoints (`+server.ts`).
*   **Database:** **SQLite**.
    *   *Driver:* `better-sqlite3` (High performance synchronous I/O).
    *   *ORM:* **Drizzle ORM** (Lightweight, type-safe, no code generation step).
*   **Authentication:** **Lucia Auth** (Session-based, stores sessions in SQLite).

## 2. Why this Stack?
### The "SVG First" Approach
Svelte is uniquely suited for the **Combinatorial Engine**:
*   **Direct DOM Manipulation:** No Virtual DOM overhead when updating 50+ SVG layers.
*   **Scoped Styling:** CSS works inside SVGs, allowing class-based theming for patterns.
*   **Server-Side Rendering (SSR):** SvelteKit renders the initial "Paper Doll" on the server, sending a complete HTML image to the client (great for SEO and low-end devices).

## 3. Data Model (Schema Design)

### 3.1. Core Tables
*   **Users:** `id`, `email`, `hashed_password`, `role` (admin/customer).
*   **Sessions:** `id`, `user_id`, `expires_at` (for Lucia).
*   **Components:** (The Asset Library)
    *   `id`, `category` (collar, sleeve, body), `name`, `svg_path_data` (or file url), `compatibility_tags`, `price_modifier`.
*   **Fabrics:**
    *   `id`, `name`, `image_url`, `scale_factor`, `price_per_meter`.
*   **Designs:** (User Saved Creations)
    *   `id`, `user_id`, `config_json` (stores the combination state), `preview_image_url`.
*   **Orders:**
    *   `id`, `user_id`, `status`, `total_price`, `shipping_address`.

## 4. Codebase Structure (SvelteKit)
```
src/
├── lib/
│   ├── components/
│   │   ├── ui/           # Buttons, Inputs (Atomic Design)
│   │   ├── mannequin/    # The Core Visualizer
│   │   │   ├── Torso.svelte
│   │   │   ├── Sleeve.svelte
│   │   │   └── LayerEngine.svelte
│   ├── server/
│   │   ├── db.ts         # Drizzle/SQLite connection
│   │   ├── schema.ts     # DB Tables definition
│   │   └── auth.ts       # Lucia configuration
│   └── stores/           # Svelte Stores for "Current Design" state
├── routes/
│   ├── +layout.svelte    # Main Nav (Explore, Design, Account)
│   ├── explore/
│   │   └── +page.svelte
│   ├── design/
│   │   ├── +page.svelte  # The Editor Canvas
│   │   └── +page.server.ts # Load asset manifest
│   └── api/              # Internal APIs (if needed for AJAX)
└── static/
    └── assets/           # Raw pattern images
```

## 5. Deployment Strategy
*   **Platform:** Docker container or simple Node process on a VPS (Hetzner/DigitalOcean/Railway).
*   **Database:** `sqlite.db` file resides on the persistent volume of the server.
*   **CI/CD:** GitHub Actions -> SSH into VPS -> `git pull` -> `pnpm build` -> `pm2 restart`.

## 6. The "Engine" Logic (Client-Side)
The `design` page will use a **State Machine** (using Svelte Stores) to track:
1.  **Current Selection:** `{ collar: 'peter_pan_01', sleeve: 'puff_04' }`
2.  **Constraints:** When `collar` changes, check `compatibility_tags` against `neckline`. If invalid, trigger "Conflict Resolver" UI.
