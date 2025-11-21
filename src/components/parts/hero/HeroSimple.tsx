import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Heading } from '../base/Heading';
import { Button } from '../base/Button';
import { Text } from '../base/Text';

interface HeroSimpleProps {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    align?: 'left' | 'center' | 'right';
    backgroundImage?: string;
    textColor?: string;
}

export const HeroSimple: React.FC<HeroSimpleProps> = ({
    title = 'Welcome to Our Service',
    subtitle = 'We provide the best solutions for your business growth.',
    ctaText = 'Get Started',
    align = 'center',
    backgroundImage,
    textColor,
}) => {
    const { theme } = useDesignStore();

    const containerStyle: React.CSSProperties = {
        padding: '80px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        justifyContent: 'center',
        textAlign: align,
        backgroundColor: backgroundImage ? 'transparent' : theme.colors.background,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '400px',
        color: textColor || theme.colors.text,
        position: 'relative',
    };

    const overlayStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: backgroundImage ? 'rgba(0,0,0,0.5)' : 'transparent',
        zIndex: 1,
    };

    const contentStyle: React.CSSProperties = {
        position: 'relative',
        zIndex: 2,
        maxWidth: '800px',
        width: '100%',
    };

    const effectiveTextColor = backgroundImage ? '#ffffff' : (textColor || theme.colors.text);

    return (
        <div style={containerStyle}>
            {backgroundImage && <div style={overlayStyle} />}
            <div style={contentStyle}>
                <Heading
                    text={title}
                    level={1}
                    align={align}
                    style={{ marginBottom: '16px', color: effectiveTextColor }}
                />
                <Text
                    text={subtitle}
                    size="20px"
                    align={align}
                    color={effectiveTextColor}
                    style={{ marginBottom: '32px', opacity: 0.9 }}
                />
                <Button
                    text={ctaText}
                    variant="primary"
                    size="lg"
                />
            </div>
        </div>
    );
};
