import React from 'react';
import { useDesignStore } from '@/store/designStore';

interface ButtonProps {
    text?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
    text = 'Button',
    variant = 'primary',
    size = 'md',
    onClick,
    style,
}) => {
    const { theme } = useDesignStore();

    const baseStyles: React.CSSProperties = {
        padding: size === 'sm' ? '8px 16px' : size === 'lg' ? '16px 32px' : '12px 24px',
        fontSize: size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px',
        borderRadius: theme.radius,
        border: 'none',
        cursor: 'pointer',
        fontFamily: theme.fontBody,
        transition: 'all 0.2s ease',
        ...style,
    };

    const variantStyles: Record<string, React.CSSProperties> = {
        primary: {
            backgroundColor: theme.colors.primary,
            color: '#ffffff',
        },
        secondary: {
            backgroundColor: theme.colors.secondary,
            color: '#ffffff',
        },
        outline: {
            backgroundColor: 'transparent',
            border: `2px solid ${theme.colors.primary}`,
            color: theme.colors.primary,
        },
    };

    return (
        <button
            style={{ ...baseStyles, ...variantStyles[variant] }}
            onClick={onClick}
        >
            {text}
        </button>
    );
};
