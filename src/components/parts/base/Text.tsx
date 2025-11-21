import React from 'react';
import { useDesignStore } from '@/store/designStore';

interface TextProps {
    text?: string;
    size?: string;
    align?: 'left' | 'center' | 'right';
    color?: string;
    style?: React.CSSProperties;
}

export const Text: React.FC<TextProps> = ({
    text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    size = '16px',
    align = 'left',
    color,
    style,
}) => {
    const { theme } = useDesignStore();

    return (
        <p
            style={{
                fontSize: size,
                fontFamily: theme.fontBody,
                color: color || theme.colors.text,
                textAlign: align,
                margin: 0,
                lineHeight: 1.6,
                ...style,
            }}
        >
            {text}
        </p>
    );
};
