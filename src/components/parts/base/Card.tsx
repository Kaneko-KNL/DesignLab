import React from 'react';
import { useDesignStore } from '@/store/designStore';

interface CardProps {
    children?: React.ReactNode;
    padding?: string;
    style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
    children,
    padding = '24px',
    style,
}) => {
    const { theme } = useDesignStore();

    return (
        <div
            style={{
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radius,
                boxShadow: theme.shadow,
                padding,
                color: theme.colors.text,
                fontFamily: theme.fontBody,
                ...style,
            }}
        >
            {children}
        </div>
    );
};
