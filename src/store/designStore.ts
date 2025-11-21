import { create } from 'zustand';
import { generateRandomPalette, ColorPalette } from '@/lib/colors';
import { ColorGenerator } from '@/lib/color-generator';

export type DesignType =
    | 'modern' | 'classic' | 'nature' | 'cyber' | 'minimal'
    | 'glass' | 'restaurant' | 'hotel' | 'medical' | 'nursery'
    | 'news' | 'paper' | 'wiki';

export type BackgroundEffectType =
    | 'none'
    | 'gradient'
    | 'pattern'
    | 'shapes'
    | 'glow'
    | 'blobs'
    | 'lines'
    | 'waves'
    | 'spotlight'
    | 'parallax'
    | 'noise';

export type EffectColorMode = 'light' | 'dark' | 'concept';

export interface BackgroundEffect {
    enabled: boolean;
    type: BackgroundEffectType;
    animation: boolean;
    interactive: boolean;
    colorMode: EffectColorMode;
    particleCount: number; // Legacy - will be replaced by param1/param2
    param1: number; // Effect-specific parameter 1
    param2: number; // Effect-specific parameter 2
}

export interface DesignTheme {
    colors: ColorPalette;
    radius: string;
    shadow: string;
    fontHeading: string;
    fontBody: string;
    backgroundEffect: BackgroundEffect;
}

export interface DesignState {
    type: DesignType;
    theme: DesignTheme;
    meta: {
        name: string;
        author: string;
        isDirty: boolean;
    };
    typography: {
        languages: {
            ja: { enabled: boolean; font: string };
            en: { enabled: boolean; font: string };
        };
    };
    conceptColors: string[];
    setDesignType: (type: DesignType) => void;
    setColors: (colors: ColorPalette) => void;
    setColor: (key: keyof ColorPalette, value: string) => void;
    setTypography: (lang: 'ja' | 'en', field: 'enabled' | 'font', value: boolean | string) => void;
    setBackgroundEffect: (effect: Partial<BackgroundEffect>) => void;
    randomizeColors: (locked?: Partial<Record<keyof ColorPalette, boolean>>) => void;
    setName: (name: string) => void;
}

const PRESETS: Record<DesignType, Partial<DesignTheme>> = {
    modern: { radius: '8px', shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
    classic: { radius: '2px', shadow: '0 2px 4px rgba(0,0,0,0.1)' },
    nature: { radius: '12px', shadow: '0 8px 16px rgba(0,0,0,0.05)' },
    cyber: { radius: '0px', shadow: '0 0 10px rgba(0, 255, 0, 0.5)' },
    minimal: { radius: '4px', shadow: 'none' },
    glass: { radius: '16px', shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' },
    restaurant: { radius: '24px', shadow: '0 10px 20px rgba(0,0,0,0.15)' },
    hotel: { radius: '0px', shadow: '0 4px 20px rgba(0,0,0,0.08)' },
    medical: { radius: '6px', shadow: '0 2px 8px rgba(0,0,0,0.05)' },
    nursery: { radius: '20px', shadow: '0 4px 12px rgba(0,0,0,0.1)' },
    news: { radius: '0px', shadow: '0 1px 3px rgba(0,0,0,0.1)' },
    paper: { radius: '1px', shadow: '1px 1px 3px rgba(0,0,0,0.2)' },
    wiki: { radius: '3px', shadow: 'none' },
};

const GRAYSCALE_PALETTE: ColorPalette = {
    background: '#ffffff',
    text: '#333333',
    primary: '#888888',
    secondary: '#999999',
    accent: '#aaaaaa',
    surface: '#f5f5f5',
};

export const useDesignStore = create<DesignState>((set, get) => ({
    type: 'modern',
    theme: {
        colors: {
            background: '#f3f1f4',
            text: '#1a171c',
            primary: '#9d26d9',
            secondary: '#d9269d',
            accent: '#62d926',
            surface: '#faf9fa',
        },
        radius: '8px',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        fontHeading: 'Inter, sans-serif',
        fontBody: 'Inter, sans-serif',
        backgroundEffect: {
            enabled: false,
            type: 'none',
            animation: true,
            interactive: false,
            colorMode: 'concept',
            particleCount: 20,
            param1: 20, // Default for most effects
            param2: 10, // Default for most effects
        },
    },
    meta: {
        name: 'Untitled Design',
        author: 'User',
        isDirty: false,
    },
    typography: {
        languages: {
            ja: { enabled: true, font: 'Noto Sans JP, sans-serif' },
            en: { enabled: true, font: 'Inter, sans-serif' },
        },
    },
    conceptColors: ['#f3f1f4', '#1a171c', '#9d26d9', '#d9269d', '#62d926'],

    setDesignType: (type) => set((state) => ({
        type,
        theme: {
            ...state.theme,
            ...PRESETS[type],
            // Keep existing colors when switching design type, or reset? 
            // Usually better to keep colors unless user explicitly resets.
            // But original code reset to grayscale. Let's keep it for now but maybe reconsider.
            // colors: GRAYSCALE_PALETTE, 
        },
        meta: { ...state.meta, isDirty: true }
    })),

    setColors: (colors) => set((state) => ({
        theme: { ...state.theme, colors },
        meta: { ...state.meta, isDirty: true }
    })),

    setColor: (key, value) => set((state) => ({
        theme: {
            ...state.theme,
            colors: { ...state.theme.colors, [key]: value }
        },
        meta: { ...state.meta, isDirty: true }
    })),

    setTypography: (lang, field, value) => set((state) => ({
        typography: {
            ...state.typography,
            languages: {
                ...state.typography.languages,
                [lang]: {
                    ...state.typography.languages[lang as keyof typeof state.typography.languages],
                    [field]: value
                }
            }
        },
        meta: { ...state.meta, isDirty: true }
    })),

    setBackgroundEffect: (effect) => set((state) => ({
        theme: {
            ...state.theme,
            backgroundEffect: { ...state.theme.backgroundEffect, ...effect }
        },
        meta: { ...state.meta, isDirty: true }
    })),

    randomizeColors: (locked: Partial<Record<keyof ColorPalette, boolean>> = {}) => {
        const currentColors = get().theme.colors;
        const currentConcept = get().conceptColors;
        const { colors, concept } = ColorGenerator.generate(currentColors, locked, currentConcept);

        set((state) => ({
            theme: { ...state.theme, colors },
            conceptColors: concept,
            meta: { ...state.meta, isDirty: true }
        }));
    },

    setName: (name) => set((state) => ({
        meta: { ...state.meta, name }
    })),
}));

// Selector utilities for optimized subscriptions
export const selectTheme = (state: DesignState) => state.theme;
export const selectMeta = (state: DesignState) => state.meta;
export const selectType = (state: DesignState) => state.type;
export const selectTypography = (state: DesignState) => state.typography;
export const selectConceptColors = (state: DesignState) => state.conceptColors;
