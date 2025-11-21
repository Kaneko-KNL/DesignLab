import React, { useState } from 'react';
import { Dices, Lock, Unlock } from 'lucide-react';
import styles from './DesignPanel.module.css';
import { useDesignStore, DesignType, BackgroundEffectType } from '@/store/designStore';
import { useLanguageStore } from '@/store/languageStore';
import { ColorPalette } from '@/lib/colors';

const DESIGN_TYPES: DesignType[] = [
    'modern', 'classic', 'nature', 'cyber', 'minimal',
    'glass', 'restaurant', 'hotel', 'medical', 'nursery',
    'news', 'paper', 'wiki'
];

const EFFECT_TYPES: BackgroundEffectType[] = [
    'none', 'gradient', 'pattern', 'shapes', 'glow', 'blobs', 'lines', 'waves', 'spotlight', 'parallax', 'noise'
];

// Effect-specific parameter configurations
type EffectParamConfig = {
    label: string;
    min: number;
    max: number;
    step: number;
    default: number;
    unit?: string;
};

type EffectParams = {
    param1?: EffectParamConfig;
    param2?: EffectParamConfig;
};

const EFFECT_PARAMS: Record<BackgroundEffectType, EffectParams> = {
    none: {},
    shapes: {
        param1: { label: 'Particle Count', min: 5, max: 50, step: 5, default: 20 },
        param2: { label: 'Duration', min: 5, max: 30, step: 1, default: 15, unit: 's' }
    },
    gradient: {
        param1: { label: 'Speed', min: 5, max: 30, step: 1, default: 15, unit: 's' }
    },
    pattern: {
        param1: { label: 'Size', min: 20, max: 100, step: 5, default: 40, unit: 'px' }
    },
    glow: {
        param1: { label: 'Position', min: 0, max: 100, step: 5, default: 50, unit: '%' },
        param2: { label: 'Speed', min: 3, max: 15, step: 1, default: 8, unit: 's' }
    },
    blobs: {
        param1: { label: 'Scale', min: 0.5, max: 2, step: 0.1, default: 1 },
        param2: { label: 'Position', min: 0, max: 100, step: 5, default: 50, unit: '%' }
    },
    lines: {
        param1: { label: 'Line Count', min: 1, max: 10, step: 1, default: 3 },
        param2: { label: 'Direction', min: 0, max: 360, step: 15, default: 45, unit: '°' }
    },
    waves: {
        param1: { label: 'Speed', min: 5, max: 30, step: 1, default: 12, unit: 's' },
        param2: { label: 'Scale', min: 0.5, max: 2, step: 0.1, default: 1 }
    },
    spotlight: {
        param1: { label: 'Follow Speed', min: 0.1, max: 1, step: 0.1, default: 0.5 },
        param2: { label: 'Size', min: 200, max: 1000, step: 50, default: 500, unit: 'px' }
    },
    parallax: {
        param1: { label: 'Spacing', min: 20, max: 100, step: 10, default: 50, unit: 'px' },
        param2: { label: 'Angle', min: 0, max: 360, step: 15, default: 45, unit: '°' }
    },
    noise: {
        param1: { label: 'Grain Size', min: 0.5, max: 2, step: 0.1, default: 1 },
        param2: { label: 'Density', min: 0.05, max: 0.2, step: 0.01, default: 0.1 }
    }
};

export default function DesignPanel() {
    const { theme, conceptColors, type: currentType, typography, setDesignType, setColor, setTypography, randomizeColors, setBackgroundEffect } = useDesignStore();
    const { t } = useLanguageStore();
    const [lockedColors, setLockedColors] = useState<Partial<Record<keyof ColorPalette, boolean>>>({});

    const toggleLock = (key: keyof ColorPalette) => {
        setLockedColors(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleRandomize = () => {
        randomizeColors(lockedColors);
    };

    return (
        <aside className={styles.panel}>
            <Section title={t.panel.designType}>
                <div className={styles.grid}>
                    {DESIGN_TYPES.map((t) => (
                        <button
                            key={t}
                            className={`${styles.typeBtn} ${currentType === t ? styles.active : ''}`}
                            onClick={() => setDesignType(t)}
                        >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>
            </Section>

            <Section title={t.panel.typography}>
                <div className={styles.typographySection}>
                    <div className={styles.typographyRow}>
                        <div className={styles.typographyHeader}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    checked={typography.languages.ja.enabled}
                                    onChange={(e) => setTypography('ja', 'enabled', e.target.checked)}
                                />
                                Japanese
                            </label>
                        </div>
                        {typography.languages.ja.enabled && (
                            <select
                                className={styles.fontInput}
                                value={typography.languages.ja.font}
                                onChange={(e) => setTypography('ja', 'font', e.target.value)}
                            >
                                <option value="Noto Sans JP, sans-serif">Noto Sans JP</option>
                                <option value="Zen Kaku Gothic New, sans-serif">Zen Kaku Gothic</option>
                                <option value="Shippori Mincho, serif">Shippori Mincho</option>
                                <option value="BIZ UDPGothic, sans-serif">BIZ UDPGothic</option>
                            </select>
                        )}
                    </div>

                    <div className={styles.typographyRow}>
                        <div className={styles.typographyHeader}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    checked={typography.languages.en.enabled}
                                    onChange={(e) => setTypography('en', 'enabled', e.target.checked)}
                                />
                                English
                            </label>
                        </div>
                        {typography.languages.en.enabled && (
                            <select
                                className={styles.fontInput}
                                value={typography.languages.en.font}
                                onChange={(e) => setTypography('en', 'font', e.target.value)}
                            >
                                <option value="Inter, sans-serif">Inter</option>
                                <option value="Roboto, sans-serif">Roboto</option>
                                <option value="Playfair Display, serif">Playfair Display</option>
                                <option value="Montserrat, sans-serif">Montserrat</option>
                                <option value="Open Sans, sans-serif">Open Sans</option>
                                <option value="Lato, sans-serif">Lato</option>
                            </select>
                        )}
                    </div>
                </div>
            </Section>

            <Section title={t.panel.colorPalette}>
                <div className={styles.row}>
                    <span className={styles.label}>{t.panel.randomize}</span>
                    <button className={styles.randomBtn} onClick={handleRandomize} title={t.panel.randomize}>
                        <Dices size={18} />
                    </button>
                </div>

                {/* Concept Colors Display */}
                <div className={styles.row} style={{ marginBottom: '12px' }}>
                    <span className={styles.label}>Concept Palette</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {conceptColors?.map((color, i) => (
                            <div
                                key={i}
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    backgroundColor: color,
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                                title={`Concept Color ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
                <ColorInput
                    label={t.panel.colors.background}
                    value={theme.colors.background}
                    onChange={(val) => setColor('background', val)}
                    isLocked={!!lockedColors.background}
                    onToggleLock={() => toggleLock('background')}
                />
                <ColorInput
                    label={t.panel.colors.text}
                    value={theme.colors.text}
                    onChange={(val) => setColor('text', val)}
                    isLocked={!!lockedColors.text}
                    onToggleLock={() => toggleLock('text')}
                />
                <ColorInput
                    label={t.panel.colors.primary}
                    value={theme.colors.primary}
                    onChange={(val) => setColor('primary', val)}
                    isLocked={!!lockedColors.primary}
                    onToggleLock={() => toggleLock('primary')}
                />
                <ColorInput
                    label={t.panel.colors.accent}
                    value={theme.colors.accent}
                    onChange={(val) => setColor('accent', val)}
                    isLocked={!!lockedColors.accent}
                    onToggleLock={() => toggleLock('accent')}
                />
                <ColorInput
                    label={t.panel.colors.surface}
                    value={theme.colors.surface}
                    onChange={(val) => setColor('surface', val)}
                    isLocked={!!lockedColors.surface}
                    onToggleLock={() => toggleLock('surface')}
                />
            </Section>

            <Section title="Background Effects">
                <div className={styles.typographySection}>
                    <div className={styles.typographyRow}>
                        <select
                            className={styles.fontInput}
                            value={theme.backgroundEffect?.type || 'none'}
                            onChange={(e) => {
                                const newType = e.target.value as BackgroundEffectType;
                                setBackgroundEffect({
                                    type: newType,
                                    enabled: newType !== 'none'
                                });
                            }}
                            style={{ width: '100%', marginBottom: '8px' }}
                        >
                            {EFFECT_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    {theme.backgroundEffect?.type !== 'none' && (
                        <>
                            <div className={styles.typographyRow} style={{ gap: '16px' }}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={theme.backgroundEffect?.animation ?? false}
                                        onChange={(e) => setBackgroundEffect({ animation: e.target.checked })}
                                    />
                                    Animation
                                </label>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={theme.backgroundEffect?.interactive ?? false}
                                        onChange={(e) => setBackgroundEffect({ interactive: e.target.checked })}
                                    />
                                    Interactive
                                </label>
                            </div>

                            <div className={styles.typographyRow}>
                                <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                                    Color Mode
                                </label>
                                <select
                                    className={styles.fontInput}
                                    value={theme.backgroundEffect?.colorMode || 'concept'}
                                    onChange={(e) => setBackgroundEffect({ colorMode: e.target.value as 'light' | 'dark' | 'concept' })}
                                    style={{ width: '100%' }}
                                >
                                    <option value="concept">Concept</option>
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                </select>
                            </div>

                            {/* Dynamic parameter sliders based on effect type */}
                            {EFFECT_PARAMS[theme.backgroundEffect?.type || 'none'].param1 && (
                                <div className={styles.typographyRow}>
                                    <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                                        {EFFECT_PARAMS[theme.backgroundEffect.type].param1!.label}: {theme.backgroundEffect?.param1 || EFFECT_PARAMS[theme.backgroundEffect.type].param1!.default}{EFFECT_PARAMS[theme.backgroundEffect.type].param1!.unit || ''}
                                    </label>
                                    <input
                                        type="range"
                                        min={EFFECT_PARAMS[theme.backgroundEffect.type].param1!.min}
                                        max={EFFECT_PARAMS[theme.backgroundEffect.type].param1!.max}
                                        step={EFFECT_PARAMS[theme.backgroundEffect.type].param1!.step}
                                        value={theme.backgroundEffect?.param1 || EFFECT_PARAMS[theme.backgroundEffect.type].param1!.default}
                                        onChange={(e) => setBackgroundEffect({ param1: Number(e.target.value) })}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            )}
                            {EFFECT_PARAMS[theme.backgroundEffect?.type || 'none'].param2 && (
                                <div className={styles.typographyRow}>
                                    <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                                        {EFFECT_PARAMS[theme.backgroundEffect.type].param2!.label}: {theme.backgroundEffect?.param2 || EFFECT_PARAMS[theme.backgroundEffect.type].param2!.default}{EFFECT_PARAMS[theme.backgroundEffect.type].param2!.unit || ''}
                                    </label>
                                    <input
                                        type="range"
                                        min={EFFECT_PARAMS[theme.backgroundEffect.type].param2!.min}
                                        max={EFFECT_PARAMS[theme.backgroundEffect.type].param2!.max}
                                        step={EFFECT_PARAMS[theme.backgroundEffect.type].param2!.step}
                                        value={theme.backgroundEffect?.param2 || EFFECT_PARAMS[theme.backgroundEffect.type].param2!.default}
                                        onChange={(e) => setBackgroundEffect({ param2: Number(e.target.value) })}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </Section>
        </aside>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{title}</h3>
            {children}
        </div>
    );
}

function TypographyRow({ label, enabled, font, onToggle, onFontChange }: {
    label: string;
    enabled: boolean;
    font: string;
    onToggle: (val: boolean) => void;
    onFontChange: (val: string) => void;
}) {
    // Font options based on language
    const isJapanese = label.includes('Japanese') || label.includes('日本語');
    const fontOptions = isJapanese
        ? [
            'Noto Sans JP, sans-serif',
            'Hiragino Sans, sans-serif',
            'Yu Gothic, sans-serif',
            'Meiryo, sans-serif',
            'MS PGothic, sans-serif'
        ]
        : [
            'Inter, sans-serif',
            'Roboto, sans-serif',
            'Open Sans, sans-serif',
            'Lato, sans-serif',
            'Montserrat, sans-serif',
            'Arial, sans-serif',
            'Helvetica, sans-serif'
        ];

    return (
        <div className={styles.typographyRow}>
            <div className={styles.typographyHeader}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => onToggle(e.target.checked)}
                    />
                    {label}
                </label>
            </div>
            {enabled && (
                <select
                    className={styles.fontInput}
                    value={font}
                    onChange={(e) => onFontChange(e.target.value)}
                >
                    {fontOptions.map((fontOption) => (
                        <option key={fontOption} value={fontOption}>
                            {fontOption.split(',')[0]}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}

function ColorInput({ label, value, onChange, isLocked, onToggleLock }: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    isLocked: boolean;
    onToggleLock: () => void;
}) {
    return (
        <div className={styles.colorRow}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <button
                    onClick={onToggleLock}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        color: isLocked ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    title={isLocked ? "Unlock color" : "Lock color"}
                >
                    {isLocked ? <Lock size={14} /> : <Unlock size={14} />}
                </button>
                <span className={styles.colorLabel}>{label}</span>
            </div>
            <div className={styles.colorValue}>
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={styles.colorPicker}
                />
                <span className={styles.hex}>{value}</span>
            </div>
        </div>
    );
}
