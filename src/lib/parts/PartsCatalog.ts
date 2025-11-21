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
import { Header } from '@/components/parts/navigation/Header';
import { Breadcrumb } from '@/components/parts/navigation/Breadcrumb';
import { SidebarNavigation } from '@/components/parts/navigation/SidebarNavigation';
import { Tabs } from '@/components/parts/navigation/Tabs';
import { InputField } from '@/components/parts/form/InputField';
import { Textarea } from '@/components/parts/form/Textarea';
import { Checkbox } from '@/components/parts/form/Checkbox';
import { Radio } from '@/components/parts/form/Radio';
import { SelectDropdown } from '@/components/parts/form/SelectDropdown';
import { ContactForm } from '@/components/parts/form/ContactForm';
import { NewsletterSignup } from '@/components/parts/form/NewsletterSignup';
import { Toast } from '@/components/parts/feedback/Toast';
import { Modal } from '@/components/parts/feedback/Modal';
import { Alert } from '@/components/parts/feedback/Alert';
import { Testimonial } from '@/components/parts/feedback/Testimonial';
import { ProductCard } from '@/components/parts/commerce/ProductCard';
import { PricingTable } from '@/components/parts/commerce/PricingTable';
import { ProductGrid } from '@/components/parts/commerce/ProductGrid';
import { Accordion } from '@/components/parts/content-display/Accordion';
import { Timeline } from '@/components/parts/content-display/Timeline';
import { Stats } from '@/components/parts/content-display/Stats';
import { BlogPostCard } from '@/components/parts/content-display/BlogPostCard';
import { Carousel } from '@/components/parts/content-display/Carousel';
import { SocialShare } from '@/components/parts/social/SocialShare';
import { CTASection } from '@/components/parts/cta/CTASection';
import { FAQ } from '@/components/parts/other/FAQ';
import { TeamMember } from '@/components/parts/other/TeamMember';
import { Divider } from '@/components/parts/other/Divider';
import { Badge } from '@/components/parts/other/Badge';
import { ProgressBar } from '@/components/parts/other/ProgressBar';
import { Spinner } from '@/components/parts/other/Spinner';

export interface PartDefinition {
    type: string;
    label: string;
    component: React.FC<unknown>;
    defaultProps: Record<string, unknown>;
    category: 'basic' | 'layout' | 'media' | 'form' | 'sections' | 'content' | 'footer' | 'navigation' | 'feedback' | 'commerce' | 'content-display' | 'social' | 'cta' | 'other';
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
                {
                    title: 'Lightning Fast',
                    description: 'Experience blazing fast performance with our optimized infrastructure designed for scale and reliability.',
                    icon: 'zap'
                },
                {
                    title: 'Secure by Default',
                    description: 'Enterprise-grade security built-in from the ground up to protect your data and your users at all times.',
                    icon: 'shield'
                },
                {
                    title: 'Premium Support',
                    description: 'Our dedicated support team is available 24/7 to help you resolve any issues and get the most out of our platform.',
                    icon: 'star'
                }
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
    },
    'header': {
        type: 'header',
        label: 'Header',
        component: Header as unknown as React.FC<unknown>,
        defaultProps: {
            logoText: 'Brand',
            links: [
                { label: 'Home', href: '#' },
                { label: 'About', href: '#' },
                { label: 'Services', href: '#' },
                { label: 'Contact', href: '#' }
            ],
            ctaText: 'Get Started',
            ctaHref: '#',
            sticky: true
        },
        category: 'navigation',
    },
    'breadcrumb': {
        type: 'breadcrumb',
        label: 'Breadcrumb',
        component: Breadcrumb as unknown as React.FC<unknown>,
        defaultProps: {
            items: [
                { label: 'Products', href: '#' },
                { label: 'Category', href: '#' },
                { label: 'Item', href: '#' }
            ],
            showHome: true,
            separator: 'chevron'
        },
        category: 'navigation',
    },
    'sidebar-navigation': {
        type: 'sidebar-navigation',
        label: 'Sidebar Nav',
        component: SidebarNavigation as unknown as React.FC<unknown>,
        defaultProps: {
            items: [
                { label: 'Dashboard', href: '#', badge: '5' },
                {
                    label: 'Products', href: '#', children: [
                        { label: 'All Products', href: '#' },
                        { label: 'Categories', href: '#' }
                    ]
                },
                { label: 'Orders', href: '#' },
                { label: 'Settings', href: '#' }
            ],
            title: 'Menu',
            collapsed: false
        },
        category: 'navigation',
    },
    'tabs': {
        type: 'tabs',
        label: 'Tabs',
        component: Tabs as unknown as React.FC<unknown>,
        defaultProps: {
            tabs: [
                { label: 'Overview', content: 'Overview content' },
                { label: 'Details', content: 'Details content', badge: '3' },
                { label: 'Reviews', content: 'Reviews content' }
            ],
            defaultTab: 0,
            variant: 'underline',
            fullWidth: false
        },
        category: 'navigation',
    },
    'input-field': {
        type: 'input-field',
        label: 'Input Field',
        component: InputField as unknown as React.FC<unknown>,
        defaultProps: {
            label: 'Email Address',
            placeholder: 'Enter your email',
            type: 'email',
            required: true
        },
        category: 'form',
    },
    'textarea': {
        type: 'textarea',
        label: 'Textarea',
        component: Textarea as unknown as React.FC<unknown>,
        defaultProps: {
            label: 'Message',
            placeholder: 'Enter your message',
            rows: 4,
            maxLength: 500
        },
        category: 'form',
    },
    'checkbox': {
        type: 'checkbox',
        label: 'Checkbox',
        component: Checkbox as unknown as React.FC<unknown>,
        defaultProps: {
            label: 'I agree to the terms and conditions'
        },
        category: 'form',
    },
    'radio': {
        type: 'radio',
        label: 'Radio',
        component: Radio as unknown as React.FC<unknown>,
        defaultProps: {
            label: 'Select an option',
            name: 'choice',
            options: [
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
                { value: '3', label: 'Option 3' }
            ]
        },
        category: 'form',
    },
    'select-dropdown': {
        type: 'select-dropdown',
        label: 'Select Dropdown',
        component: SelectDropdown as unknown as React.FC<unknown>,
        defaultProps: {
            label: 'Country',
            placeholder: 'Select a country',
            options: [
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'jp', label: 'Japan' }
            ]
        },
        category: 'form',
    },
    'contact-form': {
        type: 'contact-form',
        label: 'Contact Form',
        component: ContactForm as unknown as React.FC<unknown>,
        defaultProps: {
            title: 'Contact Us',
            layout: 'two-column'
        },
        category: 'form',
    },
    'newsletter-signup': {
        type: 'newsletter-signup',
        label: 'Newsletter Signup',
        component: NewsletterSignup as unknown as React.FC<unknown>,
        defaultProps: {
            title: 'Subscribe to our Newsletter',
            layout: 'inline'
        },
        category: 'form',
    },
    'toast': {
        type: 'toast',
        label: 'Toast',
        component: Toast as unknown as React.FC<unknown>,
        defaultProps: {
            message: 'Operation completed successfully!',
            type: 'success',
            position: 'top-right'
        },
        category: 'feedback',
    },
    'modal': {
        type: 'modal',
        label: 'Modal',
        component: Modal as unknown as React.FC<unknown>,
        defaultProps: {
            title: 'Modal Title',
            content: 'This is the modal content.',
            size: 'md',
            isOpen: false
        },
        category: 'feedback',
    },
    'alert': {
        type: 'alert',
        label: 'Alert',
        component: Alert as unknown as React.FC<unknown>,
        defaultProps: {
            message: 'This is an important alert message.',
            type: 'info',
            dismissible: true
        },
        category: 'feedback',
    },
    'testimonial': {
        type: 'testimonial',
        label: 'Testimonial',
        component: Testimonial as unknown as React.FC<unknown>,
        defaultProps: {
            quote: 'Amazing product! It exceeded all my expectations.',
            author: 'Sarah Johnson',
            role: 'CEO',
            company: 'Tech Startup',
            rating: 5,
            variant: 'card'
        },
        category: 'feedback',
    },
    'product-card': {
        type: 'product-card',
        label: 'Product Card',
        component: ProductCard as unknown as React.FC<unknown>,
        defaultProps: {
            title: 'Premium Headphones',
            price: '$299',
            originalPrice: '$399',
            badge: 'Sale',
            rating: 4.5
        },
        category: 'commerce',
    },
    'pricing-table': {
        type: 'pricing-table',
        label: 'Pricing Table',
        component: PricingTable as unknown as React.FC<unknown>,
        defaultProps: {
            title: 'Choose Your Plan',
            subtitle: 'Select the perfect plan for your needs'
        },
        category: 'commerce',
    },
    'product-grid': {
        type: 'product-grid',
        label: 'Product Grid',
        component: ProductGrid as unknown as React.FC<unknown>,
        defaultProps: {
            title: 'Featured Products',
            columns: 3
        },
        category: 'commerce',
    },
    'accordion': {
        type: 'accordion',
        label: 'Accordion',
        component: Accordion as unknown as React.FC<unknown>,
        defaultProps: {
            allowMultiple: false
        },
        category: 'content-display',
    },
    'timeline': {
        type: 'timeline',
        label: 'Timeline',
        component: Timeline as unknown as React.FC<unknown>,
        defaultProps: {
            variant: 'left'
        },
        category: 'content-display',
    },
    'stats': {
        type: 'stats',
        label: 'Stats',
        component: Stats as unknown as React.FC<unknown>,
        defaultProps: {
            columns: 4
        },
        category: 'content-display',
    },
    'blog-post-card': {
        type: 'blog-post-card',
        label: 'Blog Post Card',
        component: BlogPostCard as unknown as React.FC<unknown>,
        defaultProps: {
            title: 'Understanding Modern Web Design',
            category: 'Tutorial'
        },
        category: 'content-display',
    },
    'carousel': {
        type: 'carousel',
        label: 'Carousel',
        component: Carousel as unknown as React.FC<unknown>,
        defaultProps: {
            autoPlay: false,
            interval: 3000
        },
        category: 'content-display',
    },
    'social-share': {
        type: 'social-share',
        label: 'Social Share',
        component: SocialShare as unknown as React.FC<unknown>,
        defaultProps: {
            variant: 'icons',
            showLabel: true
        },
        category: 'social',
    },
    'cta-section': {
        type: 'cta-section',
        label: 'CTA Section',
        component: CTASection as unknown as React.FC<unknown>,
        defaultProps: {
            title: 'Ready to Get Started?',
            variant: 'centered'
        },
        category: 'cta',
    },
    'faq': {
        type: 'faq',
        label: 'FAQ',
        component: FAQ as unknown as React.FC<unknown>,
        defaultProps: {
            title: 'Frequently Asked Questions'
        },
        category: 'other',
    },
    'team-member': {
        type: 'team-member',
        label: 'Team Member',
        component: TeamMember as unknown as React.FC<unknown>,
        defaultProps: {
            name: 'Alex Johnson',
            role: 'Lead Designer'
        },
        category: 'other',
    },
    'divider': {
        type: 'divider',
        label: 'Divider',
        component: Divider as unknown as React.FC<unknown>,
        defaultProps: {
            variant: 'solid',
            spacing: 'md'
        },
        category: 'other',
    },
    'badge': {
        type: 'badge',
        label: 'Badge',
        component: Badge as unknown as React.FC<unknown>,
        defaultProps: {
            text: 'New',
            variant: 'primary',
            size: 'md'
        },
        category: 'other',
    },
    'progress-bar': {
        type: 'progress-bar',
        label: 'Progress Bar',
        component: ProgressBar as unknown as React.FC<unknown>,
        defaultProps: {
            value: 65,
            max: 100,
            variant: 'default'
        },
        category: 'other',
    },
    'spinner': {
        type: 'spinner',
        label: 'Spinner',
        component: Spinner as unknown as React.FC<unknown>,
        defaultProps: {
            size: 'md'
        },
        category: 'other',
    }

};

export const getPartDefinition = (type: string): PartDefinition | undefined => {
    return PARTS_CATALOG[type];
};
