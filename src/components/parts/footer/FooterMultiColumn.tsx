import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Text } from '../base/Text';
import { Heading } from '../base/Heading';

interface FooterLink {
    label: string;
    href: string;
}

interface FooterColumn {
    title: string;
    links: FooterLink[];
}

interface FooterMultiColumnProps {
    columns?: FooterColumn[];
    copyright?: string;
}

export const FooterMultiColumn: React.FC<FooterMultiColumnProps> = ({
    columns = [
        {
            title: 'Product',
            links: [
                { label: 'Features', href: '#' },
                { label: 'Pricing', href: '#' },
                { label: 'Documentation', href: '#' },
            ]
        },
        {
            title: 'Company',
            links: [
                { label: 'About Us', href: '#' },
                { label: 'Careers', href: '#' },
                { label: 'Blog', href: '#' },
            ]
        },
        {
            title: 'Resources',
            links: [
                { label: 'Community', href: '#' },
                { label: 'Help Center', href: '#' },
                { label: 'Status', href: '#' },
            ]
        },
        {
            title: 'Legal',
            links: [
                { label: 'Privacy', href: '#' },
                { label: 'Terms', href: '#' },
                { label: 'Security', href: '#' },
            ]
        }
    ],
    copyright = '© 2025 DesignLab. All rights reserved.',
}) => {
    const { theme } = useDesignStore();

    const containerStyle: React.CSSProperties = {
        padding: '60px 24px',
        backgroundColor: theme.colors.surface,
        borderTop: '1px solid rgba(0,0,0,0.1)',
    };

    const gridStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto 60px auto',
    };

    return (
        <footer style={containerStyle}>
            <div style={gridStyle} className={`grid-cols-2 md:grid-cols-${columns.length}`}>
                {columns.map((col, index) => (
                    <div key={index}>
                        <Heading text={col.title} level={5} style={{ marginBottom: '20px' }} />
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {col.links.map((link, linkIndex) => (
                                <li key={linkIndex} style={{ marginBottom: '12px' }}>
                                    <a
                                        href={link.href}
                                        style={{
                                            color: theme.colors.text,
                                            textDecoration: 'none',
                                            fontSize: '14px',
                                            opacity: 0.7,
                                            transition: 'opacity 0.2s'
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '24px', textAlign: 'center' }}>
                <Text
                    text={copyright}
                    size="14px"
                    align="center"
                    style={{ opacity: 0.6 }}
                />
            </div>
        </footer>
    );
};
