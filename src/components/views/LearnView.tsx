"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { BookOpen, ExternalLink } from 'lucide-react';

const LEARN_CONTENT = [
    {
        id: '1',
        title: 'The 60-30-10 Rule',
        category: 'Color Theory',
        description: 'A classic decor rule that helps create a balanced color palette. 60% is your dominant color, 30% is your secondary color, and 10% is your accent color.',
        link: '#'
    },
    {
        id: '2',
        title: 'Color Psychology',
        category: 'Theory',
        description: 'How colors affect human behavior and emotion. Blue for trust, Red for urgency, Green for growth.',
        link: '#'
    },
    {
        id: '3',
        title: 'Contrast & Accessibility',
        category: 'Accessibility',
        description: 'Ensuring your text is readable against your background. WCAG guidelines for contrast ratios.',
        link: '#'
    },
    {
        id: '4',
        title: 'Complementary Colors',
        category: 'Color Wheel',
        description: 'Colors that are opposite each other on the color wheel. They create high contrast and high impact.',
        link: '#'
    }
];

export default function LearnView() {
    const { theme } = useDesignStore();

    return (
        <div style={{ padding: '40px', height: '100%', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '32px', color: theme.colors.text }}>Learn Design Theory</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px'
            }}>
                {LEARN_CONTENT.map((item) => (
                    <div key={item.id} style={{
                        backgroundColor: theme.colors.surface,
                        borderRadius: theme.radius,
                        padding: '24px',
                        boxShadow: theme.shadow,
                        border: `1px solid ${theme.colors.text}10`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '4px 12px',
                            backgroundColor: `${theme.colors.primary}10`,
                            color: theme.colors.primary,
                            borderRadius: '100px',
                            fontSize: '12px',
                            width: 'fit-content'
                        }}>
                            <BookOpen size={14} />
                            {item.category}
                        </div>

                        <div>
                            <h3 style={{ margin: '0 0 8px 0', color: theme.colors.text }}>{item.title}</h3>
                            <p style={{ margin: 0, fontSize: '14px', color: theme.colors.text, opacity: 0.8, lineHeight: '1.5' }}>
                                {item.description}
                            </p>
                        </div>

                        <button style={{
                            marginTop: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'none',
                            border: 'none',
                            color: theme.colors.accent,
                            cursor: 'pointer',
                            padding: 0,
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}>
                            Read More <ExternalLink size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
