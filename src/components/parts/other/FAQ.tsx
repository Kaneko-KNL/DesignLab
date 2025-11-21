"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
    question: string;
    answer: string;
}

export interface FAQProps {
    items?: FAQItem[];
    title?: string;
}

export function FAQ({
    items = [
        { question: 'What are your support hours?', answer: 'We provide 24/7 customer support via email and chat.' },
        { question: 'Do you offer refunds?', answer: 'Yes, we offer a 30-day money-back guarantee.' },
        { question: 'How secure is my data?', answer: 'We use industry-standard encryption and security measures.' }
    ],
    title = 'Frequently Asked Questions'
}: FAQProps) {
    const { theme } = useDesignStore();
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);

    return (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
            {title && (
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: theme.colors.text, marginBottom: '32px', textAlign: 'center' }}>
                    {title}
                </h2>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {items.map((item, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div
                            key={index}
                            style={{
                                border: `1px solid ${theme.colors.text}10`,
                                borderRadius: theme.radius,
                                overflow: 'hidden'
                            }}
                        >
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    backgroundColor: isOpen ? `${theme.colors.primary}05` : theme.colors.surface,
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'background-color 0.2s',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: theme.colors.text
                                }}
                            >
                                <span>{item.question}</span>
                                <ChevronDown
                                    size={20}
                                    style={{
                                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                                        transition: 'transform 0.2s',
                                        flexShrink: 0,
                                        marginLeft: '16px'
                                    }}
                                />
                            </button>

                            {isOpen && (
                                <div
                                    style={{
                                        padding: '20px',
                                        backgroundColor: theme.colors.surface,
                                        borderTop: `1px solid ${theme.colors.text}10`,
                                        color: `${theme.colors.text}80`,
                                        lineHeight: '1.6'
                                    }}
                                >
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
