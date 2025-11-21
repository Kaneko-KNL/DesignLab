"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';

export interface BadgeProps {
    text?: string;
    variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md' | 'lg';
}

export function Badge({
    text = 'Badge',
    variant = 'primary',
    size = 'md'
}: BadgeProps) {
    const { theme } = useDesignStore();

    const getColor = () => {
        switch (variant) {
            case 'primary': return theme.colors.primary;
            case 'success': return '#10b981';
            case 'warning': return '#f59e0b';
            case 'error': return '#ef4444';
            case 'info': return '#3b82f6';
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'sm': return { padding: '2px 8px', fontSize: '12px' };
            case 'md': return { padding: '4px 12px', fontSize: '13px' };
            case 'lg': return { padding: '6px 16px', fontSize: '14px' };
        }
    };

    return (
        <span
            style={{
                ...getSizeStyles(),
                backgroundColor: `${getColor()}15`,
                color: getColor(),
                border: `1px solid ${getColor()}`,
                borderRadius: '12px',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
            }}
        >
            {text}
        </span>
    );
}
