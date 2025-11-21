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

export const HeroSplit: React.FC<HeroSplitProps> = ({
    title = 'Transform Your Workflow',
    subtitle = 'Streamline your process with our cutting-edge tools designed for modern teams.',
    ctaText = 'Learn More',
    imageSrc = 'https://placehold.co/600x400',
    imageAlt = 'Hero Image',
    reverse = false,
}) => {
    const { theme } = useDesignStore();

    const containerStyle: React.CSSProperties = {
        padding: '60px 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
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
