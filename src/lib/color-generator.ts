import { ColorPalette } from './colors';

// HSL Color representation
interface HSL {
    h: number; // 0-360
    s: number; // 0-100
    l: number; // 0-100
}

// Helper: Hex to HSL
function hexToHSL(hex: string): HSL {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt("0x" + hex[1] + hex[1]);
        g = parseInt("0x" + hex[2] + hex[2]);
        b = parseInt("0x" + hex[3] + hex[3]);
    } else if (hex.length === 7) {
        r = parseInt("0x" + hex[1] + hex[2]);
        g = parseInt("0x" + hex[3] + hex[4]);
        b = parseInt("0x" + hex[5] + hex[6]);
    }
    r /= 255;
    g /= 255;
    b /= 255;
    const cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin;
    let h = 0, s = 0, l = 0;

    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
}

// Helper: HSL to Hex
function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    const toHex = (n: number) => {
        const hex = n.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    return "#" + toHex(r) + toHex(g) + toHex(b);
}

// Helper: Adjust HSL
function adjustHSL(hsl: HSL, hAdj: number, sAdj: number, lAdj: number): string {
    let h = (hsl.h + hAdj) % 360;
    if (h < 0) h += 360;
    let s = Math.max(0, Math.min(100, hsl.s + sAdj));
    let l = Math.max(0, Math.min(100, hsl.l + lAdj));
    return hslToHex(h, s, l);
}

// Helper: Get Random Int
function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper: Get Random Item
function randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export type LockedColors = Partial<Record<keyof ColorPalette, boolean>>;

export class ColorGenerator {
    /**
     * Generate a 5-color Concept Palette (Adobe Color style)
     * If baseColor is provided, it will be included in the palette.
     */
    public static generateConceptPalette(baseColor?: string): string[] {
        let hue: number;
        let baseSaturation: number;
        let baseLightness: number;

        if (baseColor) {
            const hsl = hexToHSL(baseColor);
            hue = hsl.h;
            baseSaturation = hsl.s;
            baseLightness = hsl.l;
        } else {
            hue = randomInt(0, 360);
            baseSaturation = randomInt(40, 90);
            baseLightness = randomInt(30, 70);
        }

        const strategy = randomItem(['analogous', 'monochromatic', 'triadic', 'complementary', 'split-complementary', 'compound', 'shades']);
        const palette: HSL[] = [];

        // Base color is always the first one
        palette.push({ h: hue, s: baseSaturation, l: baseLightness });

        switch (strategy) {
            case 'analogous':
                palette.push({ h: (hue + 30) % 360, s: baseSaturation, l: baseLightness });
                palette.push({ h: (hue + 60) % 360, s: baseSaturation, l: baseLightness });
                palette.push({ h: (hue - 30 + 360) % 360, s: baseSaturation, l: baseLightness });
                palette.push({ h: (hue - 60 + 360) % 360, s: baseSaturation, l: baseLightness });
                break;
            case 'monochromatic':
                palette.push({ h: hue, s: baseSaturation, l: Math.max(10, baseLightness - 30) });
                palette.push({ h: hue, s: baseSaturation, l: Math.max(10, baseLightness - 15) });
                palette.push({ h: hue, s: baseSaturation, l: Math.min(95, baseLightness + 15) });
                palette.push({ h: hue, s: baseSaturation, l: Math.min(95, baseLightness + 30) });
                break;
            case 'triadic':
                palette.push({ h: (hue + 120) % 360, s: baseSaturation, l: baseLightness });
                palette.push({ h: (hue + 240) % 360, s: baseSaturation, l: baseLightness });
                palette.push({ h: hue, s: Math.max(0, baseSaturation - 20), l: Math.min(95, baseLightness + 20) }); // Neutral
                palette.push({ h: (hue + 120) % 360, s: Math.max(0, baseSaturation - 20), l: Math.max(10, baseLightness - 20) }); // Darker variant
                break;
            case 'complementary':
                palette.push({ h: (hue + 180) % 360, s: baseSaturation, l: baseLightness });
                palette.push({ h: hue, s: Math.max(0, baseSaturation - 10), l: Math.min(90, baseLightness + 20) }); // Lighter base
                palette.push({ h: (hue + 180) % 360, s: Math.max(0, baseSaturation - 10), l: Math.max(10, baseLightness - 20) }); // Darker comp
                palette.push({ h: hue, s: 10, l: 90 }); // Neutral light
                break;
            case 'split-complementary':
                palette.push({ h: (hue + 150) % 360, s: baseSaturation, l: baseLightness });
                palette.push({ h: (hue + 210) % 360, s: baseSaturation, l: baseLightness });
                palette.push({ h: hue, s: Math.max(0, baseSaturation - 20), l: Math.min(90, baseLightness + 20) });
                palette.push({ h: hue, s: Math.max(0, baseSaturation - 20), l: Math.max(10, baseLightness - 20) });
                break;
            default: // shades or compound
                palette.push({ h: hue, s: baseSaturation, l: 20 });
                palette.push({ h: hue, s: baseSaturation, l: 40 });
                palette.push({ h: hue, s: baseSaturation, l: 60 });
                palette.push({ h: hue, s: baseSaturation, l: 80 });
                break;
        }

        return palette.map(c => hslToHex(c.h, c.s, c.l));
    }

    /**
     * Generate UI Theme Colors from Concept Palette
     * Flow:
     * 1. Map Concept Colors to UI Roles (Background, Primary, Accent)
     * 2. Adjust shades/tints for visibility and hierarchy (Surface, Text)
     */
    public static generateThemeFromConcept(
        conceptPalette: string[],
        locked: LockedColors,
        currentColors: ColorPalette
    ): ColorPalette {
        const newPalette: ColorPalette = { ...currentColors };
        const conceptHSL = conceptPalette.map(hexToHSL);

        // 1. Background
        // Use the first concept color as the base for background
        if (!locked.background) {
            const base = conceptHSL[0];
            const isDark = base.l < 50;

            // Adjust to be suitable for background (subtle)
            if (isDark) {
                // Dark theme: very dark, low saturation
                newPalette.background = adjustHSL(base, 0, -30, -base.l + 10);
            } else {
                // Light theme: very light, low saturation
                newPalette.background = adjustHSL(base, 0, -30, 97 - base.l);
            }
        }
        const bgHsl = hexToHSL(newPalette.background);
        const isBgDark = bgHsl.l < 50;

        // 2. Surface
        // Surface is derived from Background to ensure harmony and hierarchy
        if (!locked.surface) {
            if (isBgDark) {
                // On dark bg, surface is slightly lighter
                newPalette.surface = adjustHSL(bgHsl, 0, 5, 8);
            } else {
                // On light bg, surface is pure white or slightly darker/tinted
                if (bgHsl.l > 95) {
                    // If bg is almost white, make surface pure white (card style) or slightly darker
                    newPalette.surface = '#ffffff';
                    // Ensure background has enough contrast if surface is white
                    if (newPalette.background === '#ffffff') {
                        newPalette.background = '#f5f5f5';
                    }
                } else {
                    newPalette.surface = '#ffffff';
                }
            }
        }
        const surfaceHsl = hexToHSL(newPalette.surface);
        const isSurfaceDark = surfaceHsl.l < 50;

        // 3. Primary
        // Use the most vibrant color from the remaining concept palette
        if (!locked.primary) {
            // Filter out the color used for background (concept[0]) if possible
            const candidates = conceptHSL.slice(1);
            // Sort by saturation
            candidates.sort((a, b) => b.s - a.s);

            let primary = candidates.length > 0 ? candidates[0] : conceptHSL[0];

            // Adjust visibility against Surface
            if (isSurfaceDark) {
                // On dark surface, primary should be bright enough
                if (primary.l < 40) primary = { ...primary, l: 60 };
            } else {
                // On light surface, primary should not be too light
                if (primary.l > 60) primary = { ...primary, l: 50 };
            }
            newPalette.primary = hslToHex(primary.h, primary.s, primary.l);
        }

        // 4. Accent
        // Use another vibrant color or complementary
        if (!locked.accent) {
            const currentPrimary = hexToHSL(newPalette.primary);
            // Find a color in concept that is different from primary
            const candidates = conceptHSL.filter(c => {
                const hex = hslToHex(c.h, c.s, c.l);
                return hex !== newPalette.primary && hex !== newPalette.background;
            });

            let accent = candidates.length > 0 ? candidates[0] : { ...currentPrimary, h: (currentPrimary.h + 180) % 360 };

            // Make accent pop (high saturation)
            newPalette.accent = adjustHSL(accent, 0, 20, 0);
        }

        // 5. Text
        // High contrast against Surface
        if (!locked.text) {
            if (isSurfaceDark) {
                newPalette.text = '#ffffff';
            } else {
                // Try to use a very dark version of the primary hue for text, instead of pure black
                const primaryHsl = hexToHSL(newPalette.primary);
                newPalette.text = hslToHex(primaryHsl.h, 20, 10); // Very dark, slightly tinted
            }
        }

        return newPalette;
    }

    /**
     * Main generation function
     */
    public static generate(
        currentColors: ColorPalette,
        locked: LockedColors,
        currentConcept?: string[]
    ): { colors: ColorPalette; concept: string[] } {
        // Determine base color from locked colors
        let baseColor: string | undefined;

        // Priority: Primary > Background > Accent > Secondary > Surface
        if (locked.primary) baseColor = currentColors.primary;
        else if (locked.background) baseColor = currentColors.background;
        else if (locked.accent) baseColor = currentColors.accent;
        else if (locked.secondary) baseColor = currentColors.secondary;
        else if (locked.surface) baseColor = currentColors.surface;

        // Generate Concept Palette using the locked color as base
        const concept = this.generateConceptPalette(baseColor);

        // Generate Theme
        const colors = this.generateThemeFromConcept(concept, locked, currentColors);

        return { colors, concept };
    }
}
