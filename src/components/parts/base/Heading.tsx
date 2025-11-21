import React from 'react';
import { useDesignStore } from '@/store/designStore';

interface HeadingProps {
    text?: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    align?: 'left' | 'center' | 'right';
    style?: React.CSSProperties;
}

export const Heading: React.FC<HeadingProps> = ({
    text = 'Heading',
    level = 2,
    align = 'left',
    style,
}) => {
    const { theme } = useDesignStore();
    const Tag = `h${level}` as React.ElementType;

    const sizes = {
        1: '48px',
        2: '36px',
        3: '24px',
        4: '20px',
        5: '18px',
        6: '16px',
    };

    return (
        <Tag
            style={{
                fontSize: sizes[level],
                fontFamily: theme.fontHeading,
                color: theme.colors.text,
                textAlign: align,
                margin: 0,
                fontWeight: 700,
                ...style,
            }}
        >
            {text}
        </Tag>
    );
};
