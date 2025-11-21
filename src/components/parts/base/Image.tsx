import React from 'react';
import { useDesignStore } from '@/store/designStore';

interface ImageProps {
    src?: string;
    alt?: string;
    aspectRatio?: string;
    fit?: 'cover' | 'contain' | 'fill';
    style?: React.CSSProperties;
}

export const Image: React.FC<ImageProps> = ({
    src = 'https://placehold.co/600x400',
    alt = 'Placeholder',
    aspectRatio = '16/9',
    fit = 'cover',
    style,
}) => {
    const { theme } = useDesignStore();

    return (
        <div
            style={{
                width: '100%',
                aspectRatio,
                borderRadius: theme.radius,
                overflow: 'hidden',
                backgroundColor: theme.colors.surface,
                ...style,
            }}
        >
            <img
                src={src}
                alt={alt}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: fit,
                }}
            />
        </div>
    );
};
