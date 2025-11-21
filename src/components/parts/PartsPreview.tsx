"use client";

import React, { useMemo } from 'react';
import { PARTS_CATALOG } from '@/lib/parts/PartsCatalog';
import { useDesignStore } from '@/store/designStore';
import { getContrastMutedColor } from '@/lib/colors';
import { PartRenderer } from '@/components/parts/PartRenderer';

type Category = 'basic' | 'layout' | 'media' | 'form' | 'sections' | 'content' | 'footer' | 'navigation' | 'feedback' | 'commerce' | 'content-display' | 'social' | 'cta' | 'other';

const CATEGORY_LABELS: Record<Category, string> = {
    basic: '基本',
    layout: 'レイアウト',
    media: 'メディア',
    form: 'フォーム',
    sections: 'セクション',
    content: 'コンテンツ',
    footer: 'フッター',
    navigation: 'ナビゲーション',
    feedback: 'フィードバック',
    commerce: 'コマース',
    'content-display': 'コンテンツ表示',
    social: 'ソーシャル',
    cta: 'CTA',
    other: 'その他',
};

export function PartsPreview() {
    const { theme } = useDesignStore();

    // Group parts by category
    const partsByCategory = useMemo(() => {
        const grouped: Record<string, typeof PARTS_CATALOG> = {};

        Object.entries(PARTS_CATALOG).forEach(([key, part]) => {
            const category = part.category;
            if (!grouped[category]) {
                grouped[category] = {};
            }
            grouped[category][key] = part;
        });

        return grouped;
    }, []);

    const mutedColor = getContrastMutedColor(theme.colors.background);

    return (
        <div style={{
            width: '100%',
            padding: '24px'
        }}>
            {Object.entries(partsByCategory).map(([category, parts]) => (
                <CategorySection
                    key={category}
                    category={category as Category}
                    parts={parts}
                    mutedColor={mutedColor}
                />
            ))}
        </div>
    );
}

function CategorySection({
    category,
    parts,
    mutedColor
}: {
    category: Category;
    parts: typeof PARTS_CATALOG;
    mutedColor: string;
}) {
    const { theme } = useDesignStore();

    return (
        <div style={{
            marginBottom: '48px'
        }}>
            {/* Category Header */}
            <h3 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: theme.colors.text,
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
            }}>
                {CATEGORY_LABELS[category] || category}
            </h3>
            <div style={{
                fontSize: '13px',
                color: mutedColor,
                marginBottom: '24px',
                fontWeight: '500'
            }}>
                {Object.keys(parts).length}個のパーツ
            </div>

            {/* Parts - Direct rendering without cards */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px'
            }}>
                {Object.entries(parts).map(([key, part]) => (
                    <div key={key} style={{ marginBottom: '16px' }}>
                        {/* Small label */}
                        <div style={{
                            marginBottom: '8px',
                            fontSize: '12px',
                            color: mutedColor,
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <span>{part.label}</span>
                            <span style={{
                                fontSize: '10px',
                                opacity: 0.6,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                ({part.type})
                            </span>
                        </div>

                        {/* Direct component rendering */}
                        <PartRenderer
                            part={{
                                id: key,
                                type: part.type,
                                label: part.label,
                                areaId: 'mainContent',
                                props: {
                                    ...part.defaultProps,
                                    // Inject previewMode for specific components that need it for gallery display
                                    ...(part.type === 'toast' || part.type === 'modal' ? { previewMode: true } : {})
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
