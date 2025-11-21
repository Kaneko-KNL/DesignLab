import React from 'react';
import { useDesignStore } from '@/store/designStore';

interface CardProps {
    children?: React.ReactNode;
    padding?: string;
    style?: React.CSSProperties;
    title?: string;
    description?: string;
}

export const Card: React.FC<CardProps> = ({
    children,
    padding = '24px',
    style,
    title = 'Card Title',
    description = 'This is a sample card component with customizable content.'
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
            {children || (
                <div>
                    <h3 style={{
                        margin: '0 0 12px 0',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: theme.colors.text
                    }}>
                        {title}
                    </h3>
                    <p style={{
                        margin: 0,
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: theme.colors.text,
                        opacity: 0.8
                    }}>
                        {description}
                    </p>
                </div>
            )}
        </div>
    );
};
