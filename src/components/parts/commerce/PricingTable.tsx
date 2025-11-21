"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Check } from 'lucide-react';

export interface PricingPlan {
    name: string;
    price: string;
    period?: string;
    features: string[];
    highlighted?: boolean;
    buttonText?: string;
}

export interface PricingTableProps {
    plans?: PricingPlan[];
    title?: string;
    subtitle?: string;
}

export function PricingTable({
    plans = [
        {
            name: 'Basic',
            price: '$9',
            period: '/month',
            features: ['Feature 1', 'Feature 2', 'Feature 3'],
            buttonText: 'Get Started'
        },
        {
            name: 'Pro',
            price: '$29',
            period: '/month',
            features: ['All Basic features', 'Feature 4', 'Feature 5', 'Feature 6'],
            highlighted: true,
            buttonText: 'Get Started'
        },
        {
            name: 'Enterprise',
            price: '$99',
            period: '/month',
            features: ['All Pro features', 'Feature 7', 'Feature 8', 'Priority Support'],
            buttonText: 'Contact Sales'
        }
    ],
    title = 'Choose Your Plan',
    subtitle = 'Select the perfect plan for your needs'
}: PricingTableProps) {
    const { theme } = useDesignStore();

    return (
        <div style={{ width: '100%', padding: '40px 24px' }}>
            {title && (
                <h2
                    style={{
                        fontSize: '36px',
                        fontWeight: 'bold',
                        color: theme.colors.text,
                        textAlign: 'center',
                        marginBottom: '12px'
                    }}
                >
                    {title}
                </h2>
            )}

            {subtitle && (
                <p
                    style={{
                        fontSize: '18px',
                        color: `${theme.colors.text}70`,
                        textAlign: 'center',
                        marginBottom: '48px'
                    }}
                >
                    {subtitle}
                </p>
            )}

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
                    gap: '24px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}
            >
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        style={{
                            padding: '32px',
                            backgroundColor: theme.colors.surface,
                            border: plan.highlighted
                                ? `2px solid ${theme.colors.primary}`
                                : `1px solid ${theme.colors.text}10`,
                            borderRadius: theme.radius,
                            boxShadow: plan.highlighted ? theme.shadow : 'none',
                            position: 'relative',
                            transform: plan.highlighted ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 0.2s'
                        }}
                    >
                        {plan.highlighted && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    padding: '4px 16px',
                                    backgroundColor: theme.colors.primary,
                                    color: '#ffffff',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    borderRadius: '12px',
                                    textTransform: 'uppercase'
                                }}
                            >
                                Most Popular
                            </div>
                        )}

                        <h3
                            style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: theme.colors.text,
                                marginBottom: '16px',
                                textAlign: 'center'
                            }}
                        >
                            {plan.name}
                        </h3>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'baseline',
                                justifyContent: 'center',
                                marginBottom: '24px'
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '48px',
                                    fontWeight: 'bold',
                                    color: theme.colors.primary
                                }}
                            >
                                {plan.price}
                            </span>
                            {plan.period && (
                                <span
                                    style={{
                                        fontSize: '16px',
                                        color: `${theme.colors.text}70`,
                                        marginLeft: '4px'
                                    }}
                                >
                                    {plan.period}
                                </span>
                            )}
                        </div>

                        <ul
                            style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: '0 0 32px 0'
                            }}
                        >
                            {plan.features.map((feature, fIndex) => (
                                <li
                                    key={fIndex}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        marginBottom: '12px',
                                        fontSize: '15px',
                                        color: theme.colors.text
                                    }}
                                >
                                    <Check
                                        size={20}
                                        style={{
                                            color: theme.colors.primary,
                                            flexShrink: 0
                                        }}
                                    />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            style={{
                                width: '100%',
                                padding: '14px',
                                backgroundColor: plan.highlighted
                                    ? theme.colors.primary
                                    : 'transparent',
                                color: plan.highlighted ? '#ffffff' : theme.colors.primary,
                                border: `2px solid ${theme.colors.primary}`,
                                borderRadius: theme.radius,
                                fontSize: '16px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                if (!plan.highlighted) {
                                    e.currentTarget.style.backgroundColor = theme.colors.primary;
                                    e.currentTarget.style.color = '#ffffff';
                                } else {
                                    e.currentTarget.style.opacity = '0.9';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!plan.highlighted) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = theme.colors.primary;
                                } else {
                                    e.currentTarget.style.opacity = '1';
                                }
                            }}
                        >
                            {plan.buttonText || 'Get Started'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
