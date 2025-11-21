/**
 * Application-wide constants
 * Centralizes magic numbers and strings for better maintainability
 */

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
} as const;

// Responsive breakpoints (in pixels)
export const BREAKPOINTS = {
    MOBILE: 375,
    TABLET: 768,
    DESKTOP: 1024,
    WIDE: 1440,
} as const;

// Viewport sizes for responsive preview
export const VIEWPORT_WIDTHS = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
} as const;

// Debounce delays (in milliseconds)
export const DEBOUNCE_DELAY = {
    SEARCH: 300,
    PROPERTY_UPDATE: 500,
    RESIZE: 150,
} as const;

// Grid specifications
export const GRID_DEFAULTS = {
    GAP: '16px',
    COLUMNS: 12,
    MIN_COLUMN_WIDTH: '60px',
} as const;

// Color palette defaults
export const DEFAULT_COLORS = {
    BACKGROUND: '#ffffff',
    TEXT: '#1a1a1a',
    PRIMARY: '#4f46e5',
    SECONDARY: '#06b6d4',
    ACCENT: '#f59e0b',
    SURFACE: '#f3f4f6',
} as const;

// Typography defaults
export const DEFAULT_FONTS = {
    HEADING: 'Inter, system-ui, sans-serif',
    BODY: 'Inter, system-ui, sans-serif',
} as const;

// Styling defaults
export const DEFAULT_STYLES = {
    RADIUS: '8px',
    SHADOW: '0 1px 3px rgba(0, 0, 0, 0.1)',
} as const;

// Undo/Redo limits
export const HISTORY_LIMITS = {
    MAX_PAST: 50,
    MAX_FUTURE: 50,
} as const;

// File export
export const EXPORT_FORMATS = {
    YAML: 'text/yaml',
    REACT: 'text/plain',
    CSS: 'text/css',
} as const;

// Toast notification durations (in milliseconds)
export const TOAST_DURATION = {
    SUCCESS: 3000,
    ERROR: 5000,
    INFO: 4000,
} as const;

// Z-index layers
export const Z_INDEX = {
    DROPDOWN: 50,
    MODAL: 100,
    TOAST: 200,
    DRAG_OVERLAY: 1000,
} as const;
