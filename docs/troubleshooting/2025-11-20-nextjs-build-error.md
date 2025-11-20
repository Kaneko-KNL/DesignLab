# Troubleshooting Report: Next.js Build Error (Missing 'use client')

## Meta
- **Date:** 2025-11-20
- **Author:** Antigravity
- **Status:** Resolved

## 1. Symptom
`npm run build` failed with an error indicating that `useState` (or other hooks) could not be used in a Server Component.
The error occurred in `Sidebar.tsx` and `Header.tsx` during the build process, although `npm run lint` did not explicitly block it as a critical error in the earlier configuration.

## 2. Causal Mechanism
Next.js App Router defaults to **Server Components**.
- **Trigger:** I introduced React Hooks (`useState`, `useLanguageStore`) into `Header.tsx` and `Sidebar.tsx` to implement the language switching feature.
- **Root Cause:** I failed to add the `"use client";` directive at the top of these files.
- **Why it wasn't caught earlier:** The development server (`npm run dev`) is often more lenient or handles HMR differently, sometimes masking strict Server/Client boundary violations until a full build is attempted.

## 3. Solution
Added `"use client";` to the first line of:
- `src/components/layout/Header.tsx`
- `src/components/layout/Sidebar.tsx`

## 4. Prevention
- **Linting:** Ensure ESLint is configured to strictly catch Client Component features in Server Component files (Next.js default linting usually catches this, but explicit checks are better).
- **Workflow:** Always run `npm run build` locally before marking a task as complete, not just `npm run lint`.
- **Mental Model:** When using `zustand` hooks or `onClick` handlers, immediately associate them with "Client Component" requirements.
