"use client";

import React, { useState, useMemo } from 'react';
import {
    Plus,
    Square,
    Type,
    Image as ImageIcon,
    Layout,
    FileText,
    Menu,
    CreditCard,
    ShoppingCart,
    Star,
    MessageSquare,
    Bell,
    Mail,
    Navigation as NavIcon,
    MousePointer,
    Award,
    Zap
} from 'lucide-react';
import { PARTS_CATALOG, PartDefinition } from '@/lib/parts/PartsCatalog';
import { useDesignStore } from '@/store/designStore';
import { useLayoutStore } from '@/store/layoutStore';
import { Part } from '@/types/layout';

type Category = 'all' | 'basic' | 'layout' | 'media' | 'form' | 'sections' | 'content' | 'footer' | 'navigation' | 'feedback' | 'commerce' | 'content-display' | 'social' | 'cta' | 'other';

const CATEGORY_LABELS: Record<Category, string> = {
    all: 'すべて',
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

// Helper function to get icon and preview content for each part type
function getPartPreview(type: string, primaryColor: string) {
    const iconProps = { size: 24, color: 'rgba(255, 255, 255, 0.7)', strokeWidth: 2 };

    switch (type) {
        case 'button':
            return {
                icon: <MousePointer {...iconProps} />,
                content: (
                    <div style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
                        padding: '8px 20px',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '600'
                    }}>
                        Click Me
                    </div>
                )
            };
        case 'card':
            return {
                icon: <CreditCard {...iconProps} />,
                content: (
                    <div style={{ width: '100%', padding: '8px', textAlign: 'left' }}>
                        <div style={{ height: '3px', width: '70%', background: 'rgba(255,255,255,0.3)', borderRadius: '2px', marginBottom: '6px' }} />
                        <div style={{ height: '2px', width: '90%', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', marginBottom: '4px' }} />
                        <div style={{ height: '2px', width: '60%', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />
                    </div>
                )
            };
        case 'heading':
        case 'text-block':
            return {
                icon: <Type {...iconProps} />,
                content: (
                    <div style={{ width: '100%', padding: '8px', textAlign: 'left' }}>
                        <div style={{ height: '4px', width: '50%', background: 'rgba(255,255,255,0.4)', borderRadius: '2px', marginBottom: '6px' }} />
                        <div style={{ height: '2px', width: '85%', background: 'rgba(255,255,255,0.25)', borderRadius: '2px', marginBottom: '3px' }} />
                        <div style={{ height: '2px', width: '75%', background: 'rgba(255,255,255,0.25)', borderRadius: '2px' }} />
                    </div>
                )
            };
        case 'image':
            return {
                icon: <ImageIcon {...iconProps} />,
                content: (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ImageIcon size={20} color="rgba(255,255,255,0.3)" />
                    </div>
                )
            };
        case 'product-card':
        case 'pricing-table':
            return {
                icon: <ShoppingCart {...iconProps} />,
                content: (
                    <div style={{ width: '100%', padding: '6px', textAlign: 'center' }}>
                        <div style={{
                            width: '100%',
                            height: '20px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '4px',
                            marginBottom: '4px'
                        }} />
                        <div style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: primaryColor,
                            marginBottom: '2px'
                        }}>$99</div>
                    </div>
                )
            };
        case 'testimonial':
            return {
                icon: <MessageSquare {...iconProps} />,
                content: (
                    <div style={{ width: '100%', padding: '8px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ height: '2px', width: '80%', background: 'rgba(255,255,255,0.25)', borderRadius: '2px', marginBottom: '3px' }} />
                            <div style={{ height: '2px', width: '60%', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />
                        </div>
                    </div>
                )
            };
        case 'alert':
        case 'toast':
            return {
                icon: <Bell {...iconProps} />,
                content: (
                    <div style={{
                        width: '100%',
                        padding: '6px 10px',
                        background: `${primaryColor}30`,
                        border: `1px solid ${primaryColor}60`,
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        <Bell size={14} color={primaryColor} />
                        <div style={{ height: '2px', flex: 1, background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }} />
                    </div>
                )
            };
        case 'header':
        case 'sidebar-navigation':
        case 'tabs':
            return {
                icon: <NavIcon {...iconProps} />,
                content: (
                    <div style={{ width: '100%', padding: '6px', display: 'flex', gap: '4px', justifyContent: 'center' }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{
                                width: '20%',
                                height: '4px',
                                background: i === 2 ? primaryColor : 'rgba(255,255,255,0.25)',
                                borderRadius: '2px'
                            }} />
                        ))}
                    </div>
                )
            };
        case 'input-field':
        case 'textarea':
        case 'select-dropdown':
        case 'checkbox':
        case 'radio':
            return {
                icon: <FileText {...iconProps} />,
                content: (
                    <div style={{ width: '100%', padding: '8px' }}>
                        <div style={{
                            width: '100%',
                            height: '24px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <div style={{ height: '2px', width: '40%', background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }} />
                        </div>
                    </div>
                )
            };
        default:
            return {
                icon: <Square {...iconProps} />,
                content: (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        color: 'rgba(255,255,255,0.4)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        {type}
                    </div>
                )
            };
    }
}

export function PartsGallery() {
    const { theme } = useDesignStore();
    const { addPart, currentLayout } = useLayoutStore();
    const [selectedCategory, setSelectedCategory] = useState<Category>('all');

    // Get all unique categories from PARTS_CATALOG
    const categories = useMemo(() => {
        const cats = new Set<Category>(['all']);
        Object.values(PARTS_CATALOG).forEach(part => {
            cats.add(part.category as Category);
        });
        return Array.from(cats).sort();
    }, []);

    // Filter parts by category
    const filteredParts = useMemo(() => {
        const parts = Object.values(PARTS_CATALOG);
        if (selectedCategory === 'all') {
            return parts;
        }
        return parts.filter(part => part.category === selectedCategory);
    }, [selectedCategory]);

    const handleAddPart = (partDef: PartDefinition) => {
        if (!currentLayout) return;

        // Find the first available area to add the part
        const targetArea = currentLayout.areas.find(area => area.id === 'mainContent') || currentLayout.areas[0];
        if (!targetArea) return;

        const newPart: Part = {
            id: `${partDef.type}-${Date.now()}`,
            type: partDef.type,
            label: partDef.label,
            areaId: targetArea.id,
            props: { ...partDef.defaultProps }
        };

        addPart(newPart);
    };

    return (
        <div style={{
            width: '100%',
            padding: '24px',
            height: '100%',
            overflowY: 'auto'
        }}>
            {/* Category Filter */}
            <div style={{
                marginBottom: '24px',
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
            }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: selectedCategory === cat
                                ? `2px solid ${theme.colors.primary}`
                                : '1px solid rgba(255, 255, 255, 0.2)',
                            background: selectedCategory === cat
                                ? theme.colors.primary
                                : 'rgba(255, 255, 255, 0.05)',
                            color: selectedCategory === cat
                                ? '#ffffff'
                                : 'rgba(255, 255, 255, 0.9)',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: selectedCategory === cat ? '600' : '400',
                            transition: 'all 0.2s',
                            outline: 'none'
                        }}
                        onMouseEnter={(e) => {
                            if (selectedCategory !== cat) {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (selectedCategory !== cat) {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            }
                        }}
                    >
                        {CATEGORY_LABELS[cat] || cat}
                    </button>
                ))}
            </div>

            {/* Parts Count */}
            <div style={{
                marginBottom: '16px',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: '500'
            }}>
                {filteredParts.length}個のパーツ
            </div>

            {/* Parts Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '12px'
            }}>
                {filteredParts.map(part => (
                    <PartCard
                        key={part.type}
                        part={part}
                        onAdd={() => handleAddPart(part)}
                    />
                ))}
            </div>

            {filteredParts.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '48px 24px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '14px'
                }}>
                    このカテゴリにはパーツがありません
                </div>
            )}
        </div>
    );
}

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

// ... existing imports

// ... PartsGallery component ...

function PartCard({ part, onAdd }: { part: PartDefinition; onAdd: () => void }) {
    const { theme } = useDesignStore();
    const [isHovered, setIsHovered] = useState(false);

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `gallery-${part.type}`,
        data: part
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        position: 'relative' as const,
        border: isHovered
            ? `1px solid ${theme.colors.primary}40`
            : '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '16px',
        padding: '16px',
        cursor: 'grab',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: isHovered
            ? `linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)`
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: isHovered
            ? `0 12px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px ${theme.colors.primary}20, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
            : '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        overflow: 'hidden'
    };

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={style}
            onClick={onAdd}
        >
            {/* Gradient overlay on hover */}
            {isHovered && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at top right, ${theme.colors.primary}15, transparent 70%)`,
                    pointerEvents: 'none',
                    borderRadius: '16px'
                }} />
            )}

            <div style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '12px'
            }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                        fontSize: '15px',
                        fontWeight: '700',
                        color: 'rgba(255, 255, 255, 0.98)',
                        marginBottom: '4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        letterSpacing: '-0.01em',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}>
                        {part.label}
                    </div>
                    <div style={{
                        fontSize: '11px',
                        color: 'rgba(255, 255, 255, 0.55)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px',
                        fontWeight: '600'
                    }}>
                        {part.category}
                    </div>
                </div>
                <div
                    style={{
                        width: '32px',
                        height: '32px',
                        flexShrink: 0,
                        borderRadius: '12px',
                        background: isHovered
                            ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent || theme.colors.primary} 100%)`
                            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.08) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        marginLeft: '12px',
                        boxShadow: isHovered
                            ? `0 4px 12px ${theme.colors.primary}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
                            : '0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                        transform: isHovered ? 'rotate(90deg) scale(1.1)' : 'rotate(0deg) scale(1)'
                    }}
                >
                    <Plus
                        size={18}
                        color='#ffffff'
                        strokeWidth={2.5}
                    />
                </div>
            </div>

            {/* Preview area with gradient border */}
            <div style={{
                position: 'relative',
                height: '70px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.4)',
                fontWeight: '600',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                padding: '8px'
            }}>
                {/* Dotted pattern background */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                    opacity: isHovered ? 0.6 : 0.3,
                    transition: 'opacity 0.3s ease'
                }} />

                {/* Icon and Content */}
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                }}>
                    {(() => {
                        const preview = getPartPreview(part.type, theme.colors.primary);
                        return (
                            <>
                                <div style={{ opacity: 0.5 }}>
                                    {preview.icon}
                                </div>
                                {preview.content}
                            </>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}
