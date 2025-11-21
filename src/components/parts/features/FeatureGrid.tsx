import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Heading } from '../base/Heading';
import { Text } from '../base/Text';
import { Card } from '../base/Card';

interface FeatureItem {
    title: string;
    description: string;
    icon?: string; // Placeholder for icon name
}

interface FeatureGridProps {
    title?: string;
    subtitle?: string;
    features?: FeatureItem[];
    columns?: 2 | 3 | 4;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
    title = 'Our Features',
    subtitle = 'Explore what makes us unique.',
    features = [
        { title: 'Feature 1', description: 'Description for feature 1.' },
        { title: 'Feature 2', description: 'Description for feature 2.' },
        { title: 'Feature 3', description: 'Description for feature 3.' },
    ],
    columns = 3,
}) => {
    const { theme } = useDesignStore();

    const containerStyle: React.CSSProperties = {
        padding: '60px 24px',
        backgroundColor: theme.colors.background,
    };

    const gridStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '24px',
        marginTop: '40px',
    };

    return (
        <div style={containerStyle}>
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <Heading text={title} level={2} align="center" />
                <Text text={subtitle} align="center" style={{ marginTop: '16px', opacity: 0.7 }} />
            </div>
            <div style={gridStyle} className={`grid-cols-1 md:grid-cols-${columns}`}>
                {features.map((feature, index) => (
                    <Card key={index} padding="medium" style={{ height: '100%' }}>
                        <Heading text={feature.title} level={4} style={{ marginBottom: '12px' }} />
                        <Text text={feature.description} size="14px" style={{ opacity: 0.8 }} />
                    </Card>
                ))}
            </div>
        </div>
    );
};
