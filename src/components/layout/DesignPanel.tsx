"use client";

import React from 'react';
import { Dices } from 'lucide-react';
import styles from './DesignPanel.module.css';
import { useDesignStore, DesignType } from '@/store/designStore';
import { useLanguageStore } from '@/store/languageStore';

const DESIGN_TYPES: DesignType[] = [
    'modern', 'classic', 'nature', 'cyber', 'minimal',
    'glass', 'restaurant', 'hotel', 'medical', 'nursery',
    'news', 'paper', 'wiki'
];

export default function DesignPanel() {
    const { theme, type: currentType, typography, setDesignType, setColor, setTypography, randomizeColors } = useDesignStore();
    const { t } = useLanguageStore();

    return (
        <aside className={styles.panel}>
            <Section title={t.panel.designType}>
                <div className={styles.grid}>
                    {DESIGN_TYPES.map((type) => (
                        <button
                            key={type}
                            className={`${styles.typeBtn} ${currentType === type ? styles.active : ''}`}
                            onClick={() => setDesignType(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </Section>

            <Section title="Typography">
                <div className={styles.typographySection}>
                    <TypographyRow
                        label="Japanese"
                        enabled={typography.languages.ja.enabled}
                        font={typography.languages.ja.font}
                        onToggle={(val) => setTypography('ja', 'enabled', val)}
                        onFontChange={(val) => setTypography('ja', 'font', val)}
                    />
                    <TypographyRow
                        label="English"
                        enabled={typography.languages.en.enabled}
                        font={typography.languages.en.font}
                        onToggle={(val) => setTypography('en', 'enabled', val)}
                        onFontChange={(val) => setTypography('en', 'font', val)}
                    />
                </div>
            </Section>

            <Section title={t.panel.colorPalette}>
                <div className={styles.row}>
                    <label className={styles.label}>{t.panel.randomize}</label>
                    <button className={styles.randomBtn} onClick={randomizeColors} title={t.panel.randomize}>
                        <Dices size={20} />
                    </button>
                </div>

                <ColorInput
                    label={t.panel.colors.background}
                    value={theme.colors.background}
                    onChange={(val) => setColor('background', val)}
                />
                <ColorInput
                    label={t.panel.colors.text}
                    value={theme.colors.text}
                    onChange={(val) => setColor('text', val)}
                />
                <ColorInput
                    label={t.panel.colors.primary}
                    value={theme.colors.primary}
                    onChange={(val) => setColor('primary', val)}
                />
                <ColorInput
                    label={t.panel.colors.accent}
                    value={theme.colors.accent}
                    onChange={(val) => setColor('accent', val)}
                />
                <ColorInput
                    label={t.panel.colors.surface}
                    value={theme.colors.surface}
                    onChange={(val) => setColor('surface', val)}
                />
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

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (val: string) => void }) {
    return (
        <div className={styles.colorRow}>
            <span className={styles.colorLabel}>{label}</span>
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
