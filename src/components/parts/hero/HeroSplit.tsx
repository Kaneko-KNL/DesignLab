import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Heading } from '../base/Heading';
import { Button } from '../base/Button';
import { Text } from '../base/Text';
import { Image } from '../base/Image';

interface HeroSplitProps {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    imageSrc?: string;
    imageAlt?: string;
    reverse?: boolean;
}

// Helper function to determine if a color is dark
function isColorDark(color: string): boolean {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
}

// Helper function to adjust background color for better visibility
function getAdjustedBackgroundColor(baseColor: string): string {
    if (isColorDark(baseColor)) {
        // If dark, make it lighter
        return `color-mix(in srgb, ${baseColor} 90%, white 10%)`;
    } else {
        // If light, make it darker
        return `color-mix(in srgb, ${baseColor} 90%, black 10%)`;
    }
}

export const HeroSplit: React.FC<HeroSplitProps> = ({
    title = 'Transform Your Workflow',
    subtitle = 'Streamline your process with our cutting-edge tools designed for modern teams.',
    ctaText = 'Learn More',
    imageSrc = 'https://placehold.co/600x400',
    imageAlt = 'Hero Image',
    reverse = false,
}) => {
    const { theme } = useDesignStore();

    const adjustedBgColor = getAdjustedBackgroundColor(theme.colors.background);

    const containerStyle: React.CSSProperties = {
        padding: '60px 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center',
        backgroundColor: adjustedBgColor,
        color: theme.colors.text,
        border: `1px solid ${isColorDark(theme.colors.background) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
    };

    const contentOrder = reverse ? 2 : 1;
    const imageOrder = reverse ? 1 : 2;

    return (
        <div style={containerStyle} className="md:grid-cols-2 grid-cols-1">
            <div style={{ order: contentOrder, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Heading
                    text={title}
                    level={1}
                    align="left"
                    style={{ marginBottom: '16px' }}
                />
                <Text
                    text={subtitle}
                    size="18px"
                    align="left"
                    style={{ marginBottom: '32px', opacity: 0.8 }}
                />
                <Button
                    text={ctaText}
                    variant="primary"
                    size="lg"
                />
            </div>
            <div style={{ order: imageOrder }}>
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    aspectRatio="4/3"
                    fit="cover"
                    style={{ borderRadius: theme.radius, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
            </div>
        </div>
    );
};
