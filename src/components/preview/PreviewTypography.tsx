"use client";

import React from 'react';
import { useDesignStore, DesignTheme } from '@/store/designStore';

const TypographyItem = ({
    label,
    size,
    text,
    font,
    theme
}: {
    label: string;
    size: string;
    text: string;
    font: string;
    theme: DesignTheme;
}) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '16px'
    }}>
        <span style={{
            fontSize: '11px',
            color: theme.colors.primary,
            backgroundColor: `${theme.colors.primary}15`,
            padding: '6px 12px',
            borderRadius: theme.radius,
            fontWeight: 600,
            minWidth: '60px',
            textAlign: 'center',
            border: `1px solid ${theme.colors.primary}30`,
            transition: 'all 0.3s ease'
        }}>
            {label}
        </span>
        <span style={{
            fontSize: size,
            fontFamily: font,
            fontWeight: label.includes('H') || label.includes('見出し') ? 600 : 400,
            color: theme.colors.text,
            flex: 1
        }}>
            {text}
        </span>
    </div>
);

export function PreviewTypography() {
    const { typography, theme } = useDesignStore();

    return (
        <div style={{
            width: '100%',
            maxWidth: '900px',
            padding: '32px',
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius,
            border: `1px solid ${theme.colors.primary}20`,
            boxShadow: theme.shadow,
            transition: 'all 0.3s ease'
        }}>
            {typography.languages.ja.enabled && (
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: theme.colors.primary,
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        borderBottom: `2px solid ${theme.colors.primary}30`,
                        paddingBottom: '8px'
                    }}>
                        日本語 Typography
                    </h3>

                    <TypographyItem
                        label="見出し1"
                        size="32px"
                        text="デザインシステムの構築"
                        font={typography.languages.ja.font}
                        theme={theme}
                    />
                    <TypographyItem
                        label="見出し2"
                        size="28px"
                        text="ユーザー体験の向上"
                        font={typography.languages.ja.font}
                        theme={theme}
                    />
                    <TypographyItem
                        label="見出し3"
                        size="24px"
                        text="一貫性のあるインターフェース"
                        font={typography.languages.ja.font}
                        theme={theme}
                    />
                    <TypographyItem
                        label="見出し4"
                        size="20px"
                        text="アクセシビリティへの配慮"
                        font={typography.languages.ja.font}
                        theme={theme}
                    />
                    <TypographyItem
                        label="見出し5"
                        size="18px"
                        text="レスポンシブデザイン"
                        font={typography.languages.ja.font}
                        theme={theme}
                    />
                    <TypographyItem
                        label="本文"
                        size="16px"
                        text="デザインシステムは、一貫性のあるUIコンポーネントとガイドラインを提供し、効率的な開発を実現します。"
                        font={typography.languages.ja.font}
                        theme={theme}
                    />
                </div>
            )}

            {typography.languages.en.enabled && (
                <div>
                    <h3 style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: theme.colors.primary,
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        borderBottom: `2px solid ${theme.colors.primary}30`,
                        paddingBottom: '8px'
                    }}>
                        English Typography
                    </h3>

                    <TypographyItem
                        label="H1"
                        size="32px"
                        text="Building a Design System"
                        font={typography.languages.en.font}
                        theme={theme}
                    />
                    <TypographyItem
                        label="H2"
                        size="28px"
                        text="Improving User Experience"
                        font={typography.languages.en.font}
                        theme={theme}
                    />
                    <TypographyItem
                        label="H3"
                        size="24px"
                        text="Consistent User Interface"
                        font={typography.languages.en.font}
                        theme={theme}
                    />
                    <TypographyItem
                        label="H4"
                        size="20px"
                        text="Accessibility Considerations"
                        font={typography.languages.en.font}
                        theme={theme}
                    />
                    <TypographyItem
                        label="H5"
                        size="18px"
                        text="Responsive Design Approach"
                        font={typography.languages.en.font}
                        theme={theme}
                    />
                    <TypographyItem
                        label="Body"
                        size="16px"
                        text="A design system provides consistent UI components and guidelines to enable efficient development."
                        font={typography.languages.en.font}
                        theme={theme}
                    />
                </div>
            )}
        </div>
    );
}
