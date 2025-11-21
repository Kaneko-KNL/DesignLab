import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Image } from '../base/Image';

interface GalleryItem {
    src: string;
    alt: string;
}

interface GalleryProps {
    images?: GalleryItem[];
    columns?: 2 | 3 | 4;
}

export const Gallery: React.FC<GalleryProps> = ({
    images = [
        { src: 'https://placehold.co/600x400', alt: 'Gallery Image 1' },
        { src: 'https://placehold.co/600x400', alt: 'Gallery Image 2' },
        { src: 'https://placehold.co/600x400', alt: 'Gallery Image 3' },
        { src: 'https://placehold.co/600x400', alt: 'Gallery Image 4' },
        { src: 'https://placehold.co/600x400', alt: 'Gallery Image 5' },
        { src: 'https://placehold.co/600x400', alt: 'Gallery Image 6' },
    ],
    columns = 3,
}) => {
    const { theme } = useDesignStore();

    const containerStyle: React.CSSProperties = {
        padding: '40px 24px',
        backgroundColor: theme.colors.background,
    };

    const gridStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '16px',
    };

    return (
        <div style={containerStyle}>
            <div style={gridStyle} className={`grid-cols-2 md:grid-cols-${columns}`}>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        aspectRatio="1/1"
                        style={{ borderRadius: theme.radius }}
                    />
                ))}
            </div>
        </div>
    );
};
