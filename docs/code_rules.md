# Codebase Rules & Standards (Svelte 5 + JavaScript)

This document governs the coding style for the "FabricStudio" MVP. All contributors (AI and Human) must adhere to these rules to ensure the codebase remains readable, simple, and transferrable.

## 1. Technology Stack Constraints
*   **Framework:** Svelte 5 (Runes mode).
*   **Language:** JavaScript (ESNext). **NO TypeScript syntax** in source files.
*   **Database:** SQLite + Drizzle ORM.
*   **Styling:** Scoped CSS (Svelte default) or Standard CSS Variables. Avoid complex CSS-in-JS libraries.

## 2. Svelte 5 Patterns (The "Runes" Standard)
### 2.1. State Management
*   **DO NOT** use Svelte Stores (`writable`, `readable`) unless interacting with a legacy package.
*   **USE** `$state()` for all local and global state.
    ```javascript
    // GOOD
    let count = $state(0);
    let double = $derived(count * 2);

    // BAD
    import { writable } from 'svelte/store';
    let count = writable(0);
    ```

### 2.2. Components
*   Keep logic inside the `<script>` tag.
*   Use `$props()` for receiving data.
    ```javascript
    // Component.svelte
    <script>
      let { name, price } = $props();
    </script>
    ```

## 3. Readability & Simplicity
### 3.1. "No Magic" Policy
*   **Avoid** complex one-liners, regex golf, or obscure bitwise operations.
*   **Avoid** "Clever" abstractions. If a function is used twice, just copy it or write a simple helper. Don't build a generic factory factory.
*   **Explicit is better than implicit.**
    ```javascript
    // BAD
    const isValid = (u) => !!u?.name;

    // GOOD
    function isUserValid(user) {
      if (user && user.name) {
        return true;
      }
      return false;
    }
    ```

### 3.2. JSDoc over TypeScript
*   Use JSDoc comments to document complex functions or data structures. This provides IDE hints without the build-time complexity of TS.
    ```javascript
    /**
     * Calculates the total price of the garment.
     * @param {Object} basePrice - The price of the fabric.
     * @param {Array} accessories - List of added items.
     * @returns {number} The final cost.
     */
    function calculateTotal(basePrice, accessories) { ... }
    ```

## 4. Architecture Standards
### 4.1. The "Vanilla" Logic Layer
*   Business logic (e.g., "Can this collar fit this neck?") should be written in **Pure JavaScript functions** in `.js` files (`lib/logic/compatibility.js`).
*   **UI Components** should strictly handle *presentation*. They import the logic functions and call them.
*   *Why?* This makes it easy to port the logic to a different framework later if needed.

### 4.2. File Naming
*   **Components:** PascalCase (`ProductCard.svelte`).
*   **Utilities/Logic:** camelCase (`priceCalculator.js`).
*   **Routes:** SvelteKit standard (`+page.svelte`).

## 5. Commenting Strategy
*   **Explain WHY, not WHAT.**
*   The code shows what is happening. The comment should explain the business rule or the edge case being handled.
*   *Example:* `// We add 5% buffer to fabric calculation because patterns need alignment.`

## 6. MVP to Production Handoff
*   Assume the person reading this code in 6 months knows JavaScript but does not know Svelte 5 perfectly.
*   Avoid obscure Svelte-specific shortcuts where a standard JS approach works just as well.
