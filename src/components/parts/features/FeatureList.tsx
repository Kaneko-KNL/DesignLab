import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Heading } from '../base/Heading';
import { Text } from '../base/Text';
import { Image } from '../base/Image';

interface FeatureListItem {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
}

interface FeatureListProps {
    features?: FeatureListItem[];
    alternate?: boolean;
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

export const FeatureList: React.FC<FeatureListProps> = ({
    features = [
        { title: 'Feature A', description: 'Detailed description for feature A.', imageSrc: 'https://placehold.co/600x400', imageAlt: 'Feature A' },
        { title: 'Feature B', description: 'Detailed description for feature B.', imageSrc: 'https://placehold.co/600x400', imageAlt: 'Feature B' },
    ],
    alternate = true,
}) => {
    const { theme } = useDesignStore();

    const adjustedBgColor = getAdjustedBackgroundColor(theme.colors.background);

    const containerStyle: React.CSSProperties = {
        padding: '60px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '60px',
        backgroundColor: adjustedBgColor,
        border: `1px solid ${isColorDark(theme.colors.background) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
    };

    return (
        <div style={containerStyle}>
            {features.map((feature, index) => {
                const isEven = index % 2 === 0;
                const isReversed = alternate ? !isEven : false;

                return (
                    <div
                        key={index}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '40px',
                            alignItems: 'center'
                        }}
                        className="md:grid-cols-2 grid-cols-1"
                    >
                        <div style={{ order: isReversed ? 2 : 1 }}>
                            <Image src={feature.imageSrc} alt={feature.imageAlt} aspectRatio="4/3" />
                        </div>
                        <div style={{ order: isReversed ? 1 : 2 }}>
                            <Heading text={feature.title} level={3} style={{ marginBottom: '16px' }} />
                            <Text text={feature.description} style={{ opacity: 0.8 }} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
