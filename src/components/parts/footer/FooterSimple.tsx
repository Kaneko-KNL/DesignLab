import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Text } from '../base/Text';

interface FooterLink {
    label: string;
    href: string;
}

interface FooterSimpleProps {
    copyright?: string;
    links?: FooterLink[];
}

export const FooterSimple: React.FC<FooterSimpleProps> = ({
    copyright = '© 2025 DesignLab. All rights reserved.',
    links = [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Contact', href: '#' },
    ],
}) => {
    const { theme } = useDesignStore();

    const containerStyle: React.CSSProperties = {
        padding: '40px 24px',
        backgroundColor: theme.colors.surface,
        borderTop: '1px solid rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
    };

    const linksStyle: React.CSSProperties = {
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
        justifyContent: 'center',
    };

    return (
        <footer style={containerStyle}>
            <div style={linksStyle}>
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        style={{
                            color: theme.colors.text,
                            textDecoration: 'none',
                            fontSize: '14px',
                            opacity: 0.8
                        }}
                    >
                        {link.label}
                    </a>
                ))}
            </div>
            <Text
                text={copyright}
                size="14px"
                align="center"
                style={{ opacity: 0.6 }}
            />
        </footer>
    );
};
