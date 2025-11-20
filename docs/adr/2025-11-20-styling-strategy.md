# ADR: Adoption of Vanilla CSS (CSS Modules)

## Meta
- **Date:** 2025-11-20
- **Status:** Accepted
- **Context:** DesignLab UI Implementation

## 1. Context
The project aims to build a "Premium" IDE-like interface for DesignLab. The user explicitly requested a high-quality, detailed design aesthetic and specifically requested to avoid Tailwind CSS unless necessary.

## 2. Decision
We decided to use **Vanilla CSS with CSS Modules and CSS Variables** instead of a utility-first framework like Tailwind CSS.

## 3. Rationale
- **Granular Control:** Vanilla CSS allows for more precise control over animations, transitions, and complex selectors which are often required for "premium" feel micro-interactions.
- **Semantics:** CSS Modules keep the markup clean (`<div className={styles.container}>` vs `<div className="flex flex-col p-4 bg-gray-100...">`), separating concerns between structure and style.
- **User Preference:** Direct alignment with the user's request to avoid Tailwind.
- **Themeability:** CSS Variables (`var(--color-primary)`) provide a robust foundation for the dynamic theming engine required by the application (changing themes on the fly).

## 4. Consequences
- **Positive:** Cleaner JSX, easier to implement complex animations, highly portable CSS.
- **Negative:** Slower development speed for simple layouts compared to Tailwind's shorthand. Requires manual management of class names.
- **Mitigation:** We established a global `variables.css` (in `globals.css`) to maintain consistency in spacing and colors, mimicking a design system token approach.
