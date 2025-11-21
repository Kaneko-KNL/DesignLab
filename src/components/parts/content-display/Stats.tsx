"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';

export interface StatItem {
    label: string;
    value: string;
    icon?: React.ReactNode;
}

export interface StatsProps {
    stats?: StatItem[];
    columns?: 2 | 3 | 4;
}

export function Stats({
    stats = [
        { label: 'Active Users', value: '10K+' },
        { label: 'Projects Completed', value: '500+' },
        { label: 'Customer Satisfaction', value: '98%' },
        { label: 'Years Experience', value: '15+' }
    ],
    columns = 4
}: StatsProps) {
    const { theme } = useDesignStore();

    return (
        <div style={{ width: '100%', padding: '40px 24px' }}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(auto-fit, minmax(${columns === 4 ? '200px' : columns === 3 ? '250px' : '300px'}, 1fr))`,
                    gap: '24px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}
            >
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        style={{
                            padding: '32px 24px',
                            backgroundColor: theme.colors.surface,
                            border: `1px solid ${theme.colors.text}10`,
                            borderRadius: theme.radius,
                            textAlign: 'center',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        {stat.icon && (
                            <div
                                style={{
                                    marginBottom: '16px',
                                    color: theme.colors.primary,
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                {stat.icon}
                            </div>
                        )}

                        <div
                            style={{
                                fontSize: '36px',
                                fontWeight: 'bold',
                                color: theme.colors.primary,
                                marginBottom: '8px',
                                lineHeight: 1
                            }}
                        >
                            {stat.value}
                        </div>

                        <div
                            style={{
                                fontSize: '14px',
                                color: `${theme.colors.text}70`,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                fontWeight: '500'
                            }}
                        >
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
