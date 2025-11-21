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

export const FeatureList: React.FC<FeatureListProps> = ({
    features = [
        { title: 'Feature A', description: 'Detailed description for feature A.', imageSrc: 'https://placehold.co/600x400', imageAlt: 'Feature A' },
        { title: 'Feature B', description: 'Detailed description for feature B.', imageSrc: 'https://placehold.co/600x400', imageAlt: 'Feature B' },
    ],
    alternate = true,
}) => {
    const { theme } = useDesignStore();

    const containerStyle: React.CSSProperties = {
        padding: '60px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '60px',
        backgroundColor: theme.colors.background,
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
