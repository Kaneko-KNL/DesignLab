import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Heading } from '../base/Heading';
import { Text } from '../base/Text';
import { Card } from '../base/Card';
import { Zap, Shield, Star, Layout, Settings, Users, BarChart, Globe, Smartphone } from 'lucide-react';

interface FeatureItem {
    title: string;
    description: string;
    icon?: string;
}

interface FeatureGridProps {
    title?: string;
    subtitle?: string;
    features?: FeatureItem[];
    columns?: 2 | 3 | 4;
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

const getIcon = (name?: string) => {
    switch (name) {
        case 'zap': return <Zap size={32} />;
        case 'shield': return <Shield size={32} />;
        case 'star': return <Star size={32} />;
        case 'layout': return <Layout size={32} />;
        case 'settings': return <Settings size={32} />;
        case 'users': return <Users size={32} />;
        case 'chart': return <BarChart size={32} />;
        case 'globe': return <Globe size={32} />;
        case 'mobile': return <Smartphone size={32} />;
        default: return <Star size={32} />;
    }
};

export const FeatureGrid: React.FC<FeatureGridProps> = ({
    title = 'Our Features',
    subtitle = 'Explore what makes us unique.',
    features = [
        { title: 'Feature 1', description: 'Description for feature 1.', icon: 'zap' },
        { title: 'Feature 2', description: 'Description for feature 2.', icon: 'shield' },
        { title: 'Feature 3', description: 'Description for feature 3.', icon: 'star' },
    ],
    columns = 3,
}) => {
    const { theme } = useDesignStore();

    const adjustedBgColor = getAdjustedBackgroundColor(theme.colors.background);

    const containerStyle: React.CSSProperties = {
        padding: '60px 24px',
        backgroundColor: adjustedBgColor,
        border: `1px solid ${isColorDark(theme.colors.background) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
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
                    <div key={index} style={{ height: '100%', transition: 'transform 0.2s ease-in-out' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        <Card padding="24px" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div style={{
                                color: theme.colors.primary,
                                marginBottom: '16px',
                                padding: '12px',
                                backgroundColor: `color-mix(in srgb, ${theme.colors.primary} 10%, transparent)`,
                                borderRadius: '12px'
                            }}>
                                {getIcon(feature.icon)}
                            </div>
                            <Heading text={feature.title} level={4} style={{ marginBottom: '12px' }} />
                            <Text text={feature.description} size="14px" style={{ opacity: 0.8, lineHeight: '1.6' }} />
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};
