// Simple HSL to Hex converter and color theory utilities

export interface ColorPalette {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
}

export function generateRandomPalette(baseHue?: number): ColorPalette {
    const hue = baseHue ?? Math.floor(Math.random() * 360);

    // Helper to convert HSL to Hex
    const hslToHex = (h: number, s: number, l: number) => {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = (n: number) => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    };

    // Complementary or Analogous strategy
    const primary = hslToHex(hue, 70, 50);
    const secondary = hslToHex((hue + 30) % 360, 60, 50); // Analogous
    const accent = hslToHex((hue + 180) % 360, 70, 50); // Complementary
    const background = hslToHex(hue, 10, 95); // Very light tint
    const surface = hslToHex(hue, 10, 98); // Almost white
    const text = hslToHex(hue, 10, 10); // Very dark shade

    return {
        primary,
        secondary,
        accent,
        background,
        surface,
        text
    };
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

/**
 * Calculate relative luminance according to WCAG guidelines
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
function getLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
        const val = c / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Get contrasting text color (light or dark) based on background color
 * Returns a color that ensures good readability
 * @param backgroundColor - hex color string (e.g., '#ffffff')
 * @param lightColor - color to use on dark backgrounds (default: '#ffffff')
 * @param darkColor - color to use on light backgrounds (default: '#000000')
 * @returns the appropriate contrasting color
 */
export function getContrastColor(
    backgroundColor: string,
    lightColor: string = '#ffffff',
    darkColor: string = '#000000'
): string {
    const rgb = hexToRgb(backgroundColor);
    if (!rgb) return darkColor; // fallback to dark if parsing fails

    const luminance = getLuminance(rgb.r, rgb.g, rgb.b);

    // WCAG threshold: 0.5 is roughly the middle point
    // For luminance > 0.5, use dark text (light background)
    // For luminance <= 0.5, use light text (dark background)
    return luminance > 0.5 ? darkColor : lightColor;
}

/**
 * Get muted version of contrast color for secondary text
 * @param backgroundColor - hex color string
 * @returns rgba color with reduced opacity
 */
export function getContrastMutedColor(backgroundColor: string): string {
    const rgb = hexToRgb(backgroundColor);
    if (!rgb) return 'rgba(0, 0, 0, 0.6)';

    const luminance = getLuminance(rgb.r, rgb.g, rgb.b);

    // Return muted versions based on background
    return luminance > 0.5
        ? 'rgba(0, 0, 0, 0.6)'  // dark text with opacity
        : 'rgba(255, 255, 255, 0.6)';  // light text with opacity
}

/**
 * Convert hex color to HSL
 */
function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

/**
 * Convert HSL to hex
 */
function hslToHex(h: number, s: number, l: number): string {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Adjust text color for readability based on background color
 * Automatically adjusts text brightness when contrast with background is too low
 * 
 * @param backgroundColor - background color in hex format
 * @param textColor - optional text color in hex format
 * @param minLightnessDiff - minimum lightness difference required (default: 30)
 * @param darkBgMinLightness - minimum lightness for text on dark backgrounds (default: 70)
 * @param lightBgMaxLightness - maximum lightness for text on light backgrounds (default: 30)
 * @returns adjusted text color in hex format
 */
export function adjustTextColorForReadability(
    backgroundColor: string,
    textColor?: string,
    minLightnessDiff: number = 30,
    darkBgMinLightness: number = 70,
    lightBgMaxLightness: number = 30
): string {
    const bgRgb = hexToRgb(backgroundColor);
    if (!bgRgb) return '#ffffff'; // fallback to white

    const bgLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    const isDarkBackground = bgLuminance <= 0.5;

    // If no text color provided, return appropriate contrast color
    if (!textColor) {
        return getContrastColor(backgroundColor);
    }

    // Convert both background and text to HSL
    const bgHsl = hexToHsl(backgroundColor);
    const textHsl = hexToHsl(textColor);

    if (!bgHsl || !textHsl) {
        return getContrastColor(backgroundColor); // fallback
    }

    // Calculate lightness difference
    const lightnessDiff = Math.abs(bgHsl.l - textHsl.l);

    // If contrast is already good, return original text color
    if (lightnessDiff >= minLightnessDiff) {
        return textColor;
    }

    // Contrast is too low - adjust based on background brightness
    if (isDarkBackground) {
        // Dark background: increase text lightness
        const targetLightness = Math.max(
            bgHsl.l + minLightnessDiff,
            darkBgMinLightness
        );

        // Clamp to valid range (0-100)
        const adjustedLightness = Math.min(targetLightness, 100);

        // Slightly desaturate very dark colors to make them more readable
        const adjustedSaturation = textHsl.l < 30 ? Math.min(textHsl.s, 50) : textHsl.s;

        return hslToHex(textHsl.h, adjustedSaturation, adjustedLightness);
    } else {
        // Light background: decrease text lightness
        const targetLightness = Math.min(
            bgHsl.l - minLightnessDiff,
            lightBgMaxLightness
        );

        // Clamp to valid range (0-100)
        const adjustedLightness = Math.max(targetLightness, 0);

        // Optionally increase saturation for very light colors to maintain visibility
        const adjustedSaturation = textHsl.l > 70 ? Math.max(textHsl.s, 40) : textHsl.s;

        return hslToHex(textHsl.h, adjustedSaturation, adjustedLightness);
    }
}
