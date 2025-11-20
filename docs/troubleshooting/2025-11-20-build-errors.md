# Troubleshooting Report: Build Errors during Component Expansion

**Date:** 2025-11-20
**Status:** Resolved

## Symptoms
The user reported terminal errors. Upon running `npm run build`, the following errors were observed:
1.  `export 'DesignState' ... was not found`
2.  `Property 'author' does not exist on type ...`
3.  `Property 'type' does not exist on type 'DesignTheme'`
4.  `Error occurred prerendering page "/"` (Runtime error during build)

## Causal Mechanism
1.  **Missing Export**: `DesignState` interface was defined in `src/store/designStore.ts` but not exported, causing import failures in `src/lib/yaml.ts`.
2.  **Missing Field**: `src/lib/yaml.ts` referenced `meta.author`, but this field was missing from the `DesignState` definition.
3.  **Incorrect Property Access**: `src/lib/yaml.ts` attempted to access `theme.type`, but `type` is a top-level property of `DesignState`, not `DesignTheme`.
4.  **Server Component Error**: `src/components/layout/MainLayout.tsx` used the `useUiStore` hook but lacked the `"use client";` directive, causing a crash during server-side rendering (SSR) of the page.

## Solution
1.  **Export Interface**: Added `export` keyword to `DesignState` in `src/store/designStore.ts`.
2.  **Add Field**: Added `author` field to `DesignState` and initial state in `src/store/designStore.ts`.
3.  **Fix Access**: Updated `src/lib/yaml.ts` to use `state.type` instead of `theme.type`.
4.  **Add Directive**: Added `"use client";` to the top of `src/components/layout/MainLayout.tsx`.

## Prevention
*   **Linting**: Ensure `npm run lint` is run frequently, though it may not catch SSR issues or missing exports if they are not used in the linted file itself (or if types are inferred loosely).
*   **Build Checks**: Run `npm run build` locally before considering a task complete, especially when modifying core layouts or stores.
*   **Type Safety**: Be strict about interface definitions and ensure all used properties are defined.
