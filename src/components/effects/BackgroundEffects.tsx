import React, { useEffect, useRef, useState } from 'react';
import styles from './BackgroundEffects.module.css';
import { useDesignStore } from '@/store/designStore';

// Helper function to adjust color brightness
const adjustBrightness = (color: string, amount: number): string => {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Adjust brightness
    const newR = Math.min(255, Math.max(0, r + amount));
    const newG = Math.min(255, Math.max(0, g + amount));
    const newB = Math.min(255, Math.max(0, b + amount));

    // Convert back to hex
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

// Get brightness of a color (0-255)
const getBrightness = (color: string): number => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
};

export const BackgroundEffects: React.FC = () => {
    const { theme, conceptColors } = useDesignStore();
    const { backgroundEffect, colors } = theme;
    const { type, animation, interactive, enabled, colorMode, particleCount, param1, param2 } = backgroundEffect;
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    // Handle Mouse Move for Interactive Effects
    useEffect(() => {
        if (!interactive || !enabled) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setMousePos({ x, y });

                // Update CSS variables for spotlight
                containerRef.current.style.setProperty('--mouse-x', `${x}%`);
                containerRef.current.style.setProperty('--mouse-y', `${y}%`);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [interactive, enabled]);

    // Generate effect colors based on color mode
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.setProperty('--bg-color', colors.background);
            containerRef.current.style.setProperty('--primary-color', colors.primary);
            containerRef.current.style.setProperty('--accent-color', colors.accent);
            containerRef.current.style.setProperty('--text-color', colors.text);

            let effectColors: string[] = [];
            const bgBrightness = getBrightness(colors.background);

            if (colorMode === 'light') {
                // Generate lighter colors based on background
                const lightenAmount = bgBrightness > 128 ? 30 : 80; // More lightening for dark backgrounds
                effectColors = [
                    adjustBrightness(colors.background, lightenAmount),
                    adjustBrightness(colors.primary, lightenAmount),
                    adjustBrightness(colors.secondary, lightenAmount),
                    adjustBrightness(colors.accent, lightenAmount),
                    adjustBrightness(colors.surface, lightenAmount),
                ];
            } else if (colorMode === 'dark') {
                // Generate darker colors based on background
                const darkenAmount = bgBrightness > 128 ? -80 : -30; // More darkening for light backgrounds
                effectColors = [
                    adjustBrightness(colors.background, darkenAmount),
                    adjustBrightness(colors.primary, darkenAmount),
                    adjustBrightness(colors.secondary, darkenAmount),
                    adjustBrightness(colors.accent, darkenAmount),
                    adjustBrightness(colors.surface, darkenAmount),
                ];
            } else {
                // Use concept colors (unused colors from the concept palette)
                const usedColors = new Set([
                    colors.background,
                    colors.text,
                    colors.primary,
                    colors.secondary,
                    colors.accent,
                    colors.surface
                ]);

                if (conceptColors && conceptColors.length >= 5) {
                    effectColors = conceptColors.filter(color => !usedColors.has(color));

                    // If we filtered out too many colors, fall back to all concept colors
                    if (effectColors.length < 3) {
                        effectColors = conceptColors;
                    }
                } else {
                    // Fallback: use theme colors with adjusted opacity
                    effectColors = [
                        colors.primary,
                        colors.secondary,
                        colors.accent,
                        colors.background,
                        colors.text
                    ];
                }
            }

            // Set CSS variables for the first 5 effect colors
            effectColors.slice(0, 5).forEach((color, index) => {
                containerRef.current?.style.setProperty(`--concept-${index}`, color);
            });

            // Fill remaining slots if we have less than 5 colors
            for (let i = effectColors.length; i < 5; i++) {
                const fallbackColor = effectColors[i % effectColors.length] || colors.primary;
                containerRef.current?.style.setProperty(`--concept-${i}`, fallbackColor);
            }

            // Set particle count as a CSS variable
            containerRef.current?.style.setProperty('--particle-count', particleCount.toString());

            // Set effect-specific parameters as CSS variables
            containerRef.current?.style.setProperty('--param1', param1.toString());
            containerRef.current?.style.setProperty('--param2', param2.toString());
        }
    }, [colors, conceptColors, colorMode, particleCount, param1, param2]);

    // If type is none, don't render
    if (type === 'none') return null;

    const animationClass = animation ? styles[`animate-${type}`] : '';

    const renderEffect = () => {
        switch (type) {
            case 'gradient':
                return <div className={`${styles.gradient} ${animationClass}`} />;
            case 'pattern':
                return <div className={`${styles.pattern} ${animationClass}`} />;
            case 'shapes':
                // Use param1 for particle count, param2 for duration
                const shapeCount = Math.floor(param1 / 5); // param1 is particle count
                return (
                    <div className={`${styles.shapes} ${animationClass}`}>
                        {Array.from({ length: shapeCount }).map((_, index) => (
                            <div key={index} className={styles.shape} />
                        ))}
                    </div>
                );
            case 'glow':
                return <div className={`${styles.glow} ${animationClass}`} />;
            case 'blobs':
                // Use multiple symmetrical blobs for better balance
                return (
                    <svg className={`${styles.blobs} ${animationClass}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        {/* Blob 1 - Top Left */}
                        <path className={styles['blob-path']}
                            d="M25,15 Q20,10 15,15 Q10,20 15,25 Q20,30 25,25 Q30,20 25,15 Z"
                            fill="var(--concept-0)" opacity="0.3" />

                        {/* Blob 2 - Top Right */}
                        <path className={styles['blob-path']}
                            d="M75,20 Q70,15 65,20 Q60,25 65,30 Q70,35 75,30 Q80,25 75,20 Z"
                            fill="var(--concept-1)" opacity="0.25" />

                        {/* Blob 3 - Center */}
                        <path className={styles['blob-path']}
                            d="M50,40 Q43,35 38,42 Q33,49 40,54 Q47,59 54,54 Q61,49 56,42 Q51,35 50,40 Z"
                            fill="var(--concept-2)" opacity="0.35" />

                        {/* Blob 4 - Bottom Left */}
                        <path className={styles['blob-path']}
                            d="M20,75 Q15,70 10,75 Q5,80 10,85 Q15,90 20,85 Q25,80 20,75 Z"
                            fill="var(--concept-3)" opacity="0.28" />

                        {/* Blob 5 - Bottom Right */}
                        <path className={styles['blob-path']}
                            d="M80,70 Q75,65 70,70 Q65,75 70,80 Q75,85 80,80 Q85,75 80,70 Z"
                            fill="var(--concept-4)" opacity="0.3" />
                    </svg>
                );
            case 'lines':
                return (
                    <svg className={`${styles.lines} ${animationClass}`} viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path className={styles['line-path']} d="M0,50 Q25,0 50,50 T100,50" vectorEffect="non-scaling-stroke" />
                        <path className={styles['line-path']} d="M0,30 Q25,80 50,30 T100,30" vectorEffect="non-scaling-stroke" style={{ animationDelay: '1s' }} />
                        <path className={styles['line-path']} d="M0,70 Q25,20 50,70 T100,70" vectorEffect="non-scaling-stroke" style={{ animationDelay: '2s' }} />
                    </svg>
                );
            case 'waves':
                return (
                    <svg className={`${styles.waves} ${animationClass}`} viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path className={styles['wave-path']} fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                );
            case 'spotlight':
                return <div className={`${styles.spotlight}`} />;
            case 'parallax':
                return (
                    <div className={`${styles.parallax}`} style={{
                        transform: interactive ? `translate(${(mousePos.x - 50) * 0.05}px, ${(mousePos.y - 50) * 0.05}px)` : 'none'
                    }}>
                        <div className={styles['parallax-layer']} />
                    </div>
                );
            case 'noise':
                return <div className={`${styles.noise} ${animationClass}`} />;
            default:
                return null;
        }
    };

    return (
        <div ref={containerRef} className={`${styles.container} ${interactive ? styles.interactive : ''}`}>
            {renderEffect()}
        </div>
    );
};
