// Simple HSL to Hex converter and color theory utilities

export interface ColorPalette {
    primary: string;
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
    const accent = hslToHex((hue + 180) % 360, 70, 50); // Complementary
    const background = hslToHex(hue, 10, 95); // Very light tint
    const surface = hslToHex(hue, 10, 98); // Almost white
    const text = hslToHex(hue, 10, 10); // Very dark shade

    return {
        primary,
        accent,
        background,
        surface,
        text
    };
}
