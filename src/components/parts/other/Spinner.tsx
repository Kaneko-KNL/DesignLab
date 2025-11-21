"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';

export interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
}

export function Spinner({
    size = 'md',
    color
}: SpinnerProps) {
    const { theme } = useDesignStore();

    const getSizeValue = () => {
        switch (size) {
            case 'sm': return '20px';
            case 'md': return '40px';
            case 'lg': return '60px';
        }
    };

    const spinnerColor = color || theme.colors.primary;

    return (
        <div
            style={{
                width: getSizeValue(),
                height: getSizeValue(),
                border: `3px solid ${spinnerColor}20`,
                borderTop: `3px solid ${spinnerColor}`,
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
            }}
        >
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
