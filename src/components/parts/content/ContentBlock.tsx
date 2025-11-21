import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Text } from '../base/Text';

interface ContentBlockProps {
    content?: string;
    align?: 'left' | 'center' | 'right';
}

export const ContentBlock: React.FC<ContentBlockProps> = ({
    content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    align = 'left',
}) => {
    const { theme } = useDesignStore();

    const containerStyle: React.CSSProperties = {
        padding: '40px 24px',
        backgroundColor: theme.colors.background,
        maxWidth: '800px',
        margin: '0 auto',
    };

    return (
        <div style={containerStyle}>
            <Text
                text={content}
                align={align}
                style={{ fontSize: '18px', lineHeight: 1.8 }}
            />
        </div>
    );
};
