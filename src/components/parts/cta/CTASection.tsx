"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { ArrowRight } from 'lucide-react';

export interface CTASectionProps {
    title?: string;
    description?: string;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    variant?: 'centered' | 'split';
}

export function CTASection({
    title = 'Ready to Get Started?',
    description = 'Join thousands of satisfied customers and transform your workflow today.',
    primaryButtonText = 'Start Free Trial',
    secondaryButtonText = 'Contact Sales',
    variant = 'centered'
}: CTASectionProps) {
    const { theme } = useDesignStore();

    if (variant === 'split') {
        return (
            <div
                style={{
                    padding: '60px 40px',
                    backgroundColor: theme.colors.surface,
                    borderRadius: theme.radius,
                    border: `1px solid ${theme.colors.text}10`
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '32px',
                        maxWidth: '1200px',
                        margin: '0 auto',
                        flexWrap: 'wrap'
                    }}
                >
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: theme.colors.text, marginBottom: '12px' }}>
                            {title}
                        </h2>
                        <p style={{ fontSize: '16px', color: `${theme.colors.text}70`, lineHeight: '1.6' }}>
                            {description}
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button
                            style={{
                                padding: '16px 32px',
                                backgroundColor: theme.colors.primary,
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: theme.radius,
                                fontSize: '16px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'opacity 0.2s'
                            }}
                        >
                            {primaryButtonText}
                            <ArrowRight size={18} />
                        </button>

                        {secondaryButtonText && (
                            <button
                                style={{
                                    padding: '16px 32px',
                                    backgroundColor: 'transparent',
                                    color: theme.colors.text,
                                    border: `2px solid ${theme.colors.text}20`,
                                    borderRadius: theme.radius,
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {secondaryButtonText}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                padding: '80px 40px',
                backgroundColor: theme.colors.primary,
                borderRadius: theme.radius,
                textAlign: 'center'
            }}
        >
            <h2 style={{ fontSize: '40px', fontWeight: 'bold', color: '#ffffff', marginBottom: '16px' }}>
                {title}
            </h2>

            <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.6', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
                {description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <button
                    style={{
                        padding: '16px 32px',
                        backgroundColor: '#ffffff',
                        color: theme.colors.primary,
                        border: 'none',
                        borderRadius: theme.radius,
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'opacity 0.2s'
                    }}
                >
                    {primaryButtonText}
                    <ArrowRight size={18} />
                </button>

                {secondaryButtonText && (
                    <button
                        style={{
                            padding: '16px 32px',
                            backgroundColor: 'transparent',
                            color: '#ffffff',
                            border: '2px solid rgba(255, 255, 255, 0.5)',
                            borderRadius: theme.radius,
                            fontSize: '16px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {secondaryButtonText}
                    </button>
                )}
            </div>
        </div>
    );
}
