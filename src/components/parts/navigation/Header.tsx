"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Menu, X } from 'lucide-react';

export interface HeaderProps {
    logo?: string;
    logoText?: string;
    links?: Array<{ label: string; href: string }>;
    ctaText?: string;
    ctaHref?: string;
    sticky?: boolean;
}

export function Header({
    logo,
    logoText = 'Brand',
    links = [
        { label: 'Home', href: '#' },
        { label: 'About', href: '#' },
        { label: 'Services', href: '#' },
        { label: 'Contact', href: '#' }
    ],
    ctaText = 'Get Started',
    ctaHref = '#',
    sticky = true
}: HeaderProps) {
    const { theme } = useDesignStore();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <header
            style={{
                position: sticky ? 'sticky' : 'relative',
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: theme.colors.surface,
                borderBottom: `1px solid ${theme.colors.text}10`,
                boxShadow: sticky ? theme.shadow : 'none',
                zIndex: 1000,
                width: '100%'
            }}
        >
            <nav
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '16px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                {/* Logo */}
                <a
                    href="#"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textDecoration: 'none',
                        color: theme.colors.text,
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }}
                >
                    {logo && (
                        <img
                            src={logo}
                            alt={logoText}
                            style={{
                                height: '32px',
                                width: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                    )}
                    {!logo && <span style={{ color: theme.colors.primary }}>{logoText}</span>}
                </a>

                {/* Desktop Navigation */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '32px'
                    }}
                    className="desktop-nav"
                >
                    <div style={{ display: 'flex', gap: '24px' }}>
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                style={{
                                    color: theme.colors.text,
                                    textDecoration: 'none',
                                    fontSize: '16px',
                                    transition: 'color 0.2s',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = theme.colors.primary;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = theme.colors.text;
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {ctaText && (
                        <a
                            href={ctaHref}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: theme.colors.primary,
                                color: '#ffffff',
                                borderRadius: theme.radius,
                                textDecoration: 'none',
                                fontSize: '16px',
                                fontWeight: '500',
                                transition: 'opacity 0.2s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = '0.9';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = '1';
                            }}
                        >
                            {ctaText}
                        </a>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        color: theme.colors.text,
                        cursor: 'pointer',
                        padding: '8px'
                    }}
                    className="mobile-menu-btn"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div
                    style={{
                        backgroundColor: theme.colors.surface,
                        borderTop: `1px solid ${theme.colors.text}10`,
                        padding: '16px 24px',
                        display: 'none'
                    }}
                    className="mobile-menu"
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                style={{
                                    color: theme.colors.text,
                                    textDecoration: 'none',
                                    fontSize: '16px',
                                    padding: '8px 0'
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                        {ctaText && (
                            <a
                                href={ctaHref}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: theme.colors.primary,
                                    color: '#ffffff',
                                    borderRadius: theme.radius,
                                    textDecoration: 'none',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    textAlign: 'center',
                                    marginTop: '8px'
                                }}
                            >
                                {ctaText}
                            </a>
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
                @media (max-width: 768px) {
                    .desktop-nav {
                        display: none !important;
                    }
                    .mobile-menu-btn {
                        display: block !important;
                    }
                    .mobile-menu {
                        display: block !important;
                    }
                }
            `}</style>
        </header>
    );
}
