"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';

export interface DividerProps {
    text?: string;
    variant?: 'solid' | 'dashed' | 'dotted';
    spacing?: 'sm' | 'md' | 'lg';
}

export function Divider({
    text,
    variant = 'solid',
    spacing = 'md'
}: DividerProps) {
    const { theme } = useDesignStore();

    const spacingMap = {
        sm: '16px',
        md: '32px',
        lg: '48px'
    };

    const borderStyle = variant === 'solid' ? 'solid' : variant === 'dashed' ? 'dashed' : 'dotted';

    if (text) {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: `${spacingMap[spacing]} 0`,
                    width: '100%'
                }}
            >
                <div
                    style={{
                        flex: 1,
                        height: '1px',
                        borderTop: `1px ${borderStyle} ${theme.colors.text}20`
                    }}
                />
                <span
                    style={{
                        padding: '0 16px',
                        fontSize: '14px',
                        color: `${theme.colors.text}60`,
                        fontWeight: '500'
                    }}
                >
                    {text}
                </span>
                <div
                    style={{
                        flex: 1,
                        height: '1px',
                        borderTop: `1px ${borderStyle} ${theme.colors.text}20`
                    }}
                />
            </div>
        );
    }

    return (
        <hr
            style={{
                width: '100%',
                margin: `${spacingMap[spacing]} 0`,
                border: 'none',
                borderTop: `1px ${borderStyle} ${theme.colors.text}20`
            }}
        />
    );
}
