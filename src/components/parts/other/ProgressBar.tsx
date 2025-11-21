"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';

export interface ProgressBarProps {
    value?: number;
    max?: number;
    showLabel?: boolean;
    variant?: 'default' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({
    value = 50,
    max = 100,
    showLabel = true,
    variant = 'default',
    size = 'md'
}: ProgressBarProps) {
    const { theme } = useDesignStore();

    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const getColor = () => {
        switch (variant) {
            case 'default': return theme.colors.primary;
            case 'success': return '#10b981';
            case 'warning': return '#f59e0b';
            case 'error': return '#ef4444';
        }
    };

    const getHeight = () => {
        switch (size) {
            case 'sm': return '6px';
            case 'md': return '10px';
            case 'lg': return '16px';
        }
    };

    return (
        <div style={{ width: '100%' }}>
            {showLabel && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                        fontSize: '14px',
                        color: theme.colors.text
                    }}
                >
                    <span>Progress</span>
                    <span style={{ fontWeight: '600' }}>{Math.round(percentage)}%</span>
                </div>
            )}

            <div
                style={{
                    width: '100%',
                    height: getHeight(),
                    backgroundColor: `${theme.colors.text}10`,
                    borderRadius: '999px',
                    overflow: 'hidden'
                }}
            >
                <div
                    style={{
                        height: '100%',
                        width: `${percentage}%`,
                        backgroundColor: getColor(),
                        borderRadius: '999px',
                        transition: 'width 0.3s ease-in-out'
                    }}
                />
            </div>
        </div>
    );
}
