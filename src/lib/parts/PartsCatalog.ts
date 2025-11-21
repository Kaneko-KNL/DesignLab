import React from 'react';
import { Button } from '@/components/parts/base/Button';
import { Card } from '@/components/parts/base/Card';
import { Heading } from '@/components/parts/base/Heading';
import { Text } from '@/components/parts/base/Text';
import { Image } from '@/components/parts/base/Image';
import { HeroSimple } from '@/components/parts/hero/HeroSimple';
import { HeroSplit } from '@/components/parts/hero/HeroSplit';
import { FeatureGrid } from '@/components/parts/features/FeatureGrid';
import { FeatureList } from '@/components/parts/features/FeatureList';
import { ContentBlock } from '@/components/parts/content/ContentBlock';
import { Gallery } from '@/components/parts/content/Gallery';
import { FooterSimple } from '@/components/parts/footer/FooterSimple';
import { FooterMultiColumn } from '@/components/parts/footer/FooterMultiColumn';

export interface PartDefinition {
    type: string;
    label: string;
    component: React.FC<unknown>;
    defaultProps: Record<string, unknown>;
    category: 'basic' | 'layout' | 'media' | 'form' | 'sections' | 'content' | 'footer';
}

export const PARTS_CATALOG: Record<string, PartDefinition> = {
    'button': {
        type: 'button',
        label: 'Button',
        component: Button as unknown as React.FC<unknown>,
        defaultProps: {
            text: 'Click Me',
            variant: 'primary',
            size: 'md',
        },
        category: 'basic',
    },
    'card': {
        type: 'card',
        label: 'Card',
        component: Card as unknown as React.FC<unknown>,
        defaultProps: {
            padding: '24px',
        },
        category: 'layout',
    },
    'heading': {
        type: 'heading',
        label: 'Heading',
        component: Heading as unknown as React.FC<unknown>,
        defaultProps: {
            text: 'New Heading',
            level: 2,
            align: 'left',
        },
        category: 'basic',
    },
    'text': {
        type: 'text',
        label: 'Text Block',
        component: Text as unknown as React.FC<unknown>,
        defaultProps: {
            text: 'Enter your text here...',
            size: '16px',
            align: 'left',
        },
        category: 'basic',
    },
    'image': {
        type: 'image',
        label: 'Image',
        component: Image as unknown as React.FC<unknown>,
        defaultProps: {
            src: 'https://placehold.co/600x400',
            alt: 'Image',
            aspectRatio: '16/9',
            fit: 'cover',
        },
        category: 'media',
    },
    'hero-simple': {
        type: 'hero-simple',
        label: 'Hero (Simple)',
        component: HeroSimple as unknown as React.FC<unknown>,
        defaultProps: {
            title: 'Welcome',
            subtitle: 'Subtitle here',
            ctaText: 'Get Started',
            align: 'center'
        },
        category: 'sections',
    },
    'hero-split': {
        type: 'hero-split',
        label: 'Hero (Split)',
        component: HeroSplit as unknown as React.FC<unknown>,
        defaultProps: {
            title: 'Transform Your Workflow',
            subtitle: 'Description here',
            ctaText: 'Learn More',
            reverse: false
        },
        category: 'sections',
    },
    'feature-grid': {
        type: 'feature-grid',
        label: 'Feature Grid',
        component: FeatureGrid as unknown as React.FC<unknown>,
        defaultProps: {
            title: 'Features',
            columns: 3,
            features: [
                { title: 'Feature 1', description: 'Description 1' },
                { title: 'Feature 2', description: 'Description 2' },
                { title: 'Feature 3', description: 'Description 3' }
            ]
        },
        category: 'sections',
    },
    'feature-list': {
        type: 'feature-list',
        label: 'Feature List',
        component: FeatureList as unknown as React.FC<unknown>,
        defaultProps: {
            alternate: true,
            features: [
                { title: 'Feature A', description: 'Description A', imageSrc: 'https://placehold.co/600x400', imageAlt: 'A' },
                { title: 'Feature B', description: 'Description B', imageSrc: 'https://placehold.co/600x400', imageAlt: 'B' }
            ]
        },
        category: 'sections',
    },
    'content-block': {
        type: 'content-block',
        label: 'Content Block',
        component: ContentBlock as unknown as React.FC<unknown>,
        defaultProps: {
            content: 'Rich content goes here...',
            align: 'left'
        },
        category: 'content',
    },
    'gallery': {
        type: 'gallery',
        label: 'Gallery',
        component: Gallery as unknown as React.FC<unknown>,
        defaultProps: {
            columns: 3,
            images: [
                { src: 'https://placehold.co/400x400', alt: '1' },
                { src: 'https://placehold.co/400x400', alt: '2' },
                { src: 'https://placehold.co/400x400', alt: '3' }
            ]
        },
        category: 'content',
    },
    'footer-simple': {
        type: 'footer-simple',
        label: 'Footer (Simple)',
        component: FooterSimple as unknown as React.FC<unknown>,
        defaultProps: {
            copyright: '© 2025 DesignLab',
            links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }]
        },
        category: 'footer',
    },
    'footer-multicolumn': {
        type: 'footer-multicolumn',
        label: 'Footer (Multi-col)',
        component: FooterMultiColumn as unknown as React.FC<unknown>,
        defaultProps: {
            copyright: '© 2025 DesignLab'
        },
        category: 'footer',
    }
};

export const getPartDefinition = (type: string): PartDefinition | undefined => {
    return PARTS_CATALOG[type];
};
