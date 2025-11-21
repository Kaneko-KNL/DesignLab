"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
    title: string;
    content: string | React.ReactNode;
}

export interface AccordionProps {
    items?: AccordionItem[];
    allowMultiple?: boolean;
}

export function Accordion({
    items = [
        { title: 'What is included?', content: 'All features are included in the basic plan.' },
        { title: 'Can I cancel anytime?', content: 'Yes, you can cancel your subscription at any time.' },
        { title: 'Is there a free trial?', content: 'We offer a 14-day free trial with all features.' }
    ],
    allowMultiple = false
}: AccordionProps) {
    const { theme } = useDesignStore();
    const [openItems, setOpenItems] = React.useState<Set<number>>(new Set([0]));

    const toggleItem = (index: number) => {
        const newOpen = new Set(openItems);
        if (newOpen.has(index)) {
            newOpen.delete(index);
        } else {
            if (!allowMultiple) {
                newOpen.clear();
            }
            newOpen.add(index);
        }
        setOpenItems(newOpen);
    };

    return (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            {items.map((item, index) => {
                const isOpen = openItems.has(index);
                return (
                    <div
                        key={index}
                        style={{
                            marginBottom: '8px',
                            border: `1px solid ${theme.colors.text}10`,
                            borderRadius: theme.radius,
                            overflow: 'hidden'
                        }}
                    >
                        <button
                            onClick={() => toggleItem(index)}
                            style={{
                                width: '100%',
                                padding: '16px 20px',
                                backgroundColor: isOpen ? `${theme.colors.primary}10` : theme.colors.surface,
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: isOpen ? theme.colors.primary : theme.colors.text
                                }}
                            >
                                {item.title}
                            </span>
                            <ChevronDown
                                size={20}
                                style={{
                                    color: isOpen ? theme.colors.primary : theme.colors.text,
                                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                                    transition: 'transform 0.2s'
                                }}
                            />
                        </button>

                        {isOpen && (
                            <div
                                style={{
                                    padding: '16px 20px',
                                    backgroundColor: theme.colors.surface,
                                    borderTop: `1px solid ${theme.colors.text}10`,
                                    color: theme.colors.text,
                                    lineHeight: '1.6'
                                }}
                            >
                                {item.content}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
