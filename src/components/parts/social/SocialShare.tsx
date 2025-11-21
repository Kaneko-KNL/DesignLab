"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Facebook, Twitter, Linkedin, Mail, Link } from 'lucide-react';

export interface SocialShareProps {
    url?: string;
    title?: string;
    variant?: 'buttons' | 'icons';
    showLabel?: boolean;
}

export function SocialShare({
    url = 'https://example.com',
    title = 'Check this out!',
    variant = 'icons',
    showLabel = true
}: SocialShareProps) {
    const { theme } = useDesignStore();

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
    };

    if (variant === 'buttons') {
        return (
            <div>
                {showLabel && (
                    <div style={{ fontSize: '14px', fontWeight: '600', color: theme.colors.text, marginBottom: '12px' }}>
                        Share this:
                    </div>
                )}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <a
                        href={shareLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#1877f2',
                            color: '#ffffff',
                            borderRadius: theme.radius,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'opacity 0.2s'
                        }}
                    >
                        <Facebook size={18} />
                        Facebook
                    </a>
                    <a
                        href={shareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#1da1f2',
                            color: '#ffffff',
                            borderRadius: theme.radius,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'opacity 0.2s'
                        }}
                    >
                        <Twitter size={18} />
                        Twitter
                    </a>
                    <a
                        href={shareLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#0077b5',
                            color: '#ffffff',
                            borderRadius: theme.radius,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'opacity 0.2s'
                        }}
                    >
                        <Linkedin size={18} />
                        LinkedIn
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div>
            {showLabel && (
                <div style={{ fontSize: '14px', fontWeight: '600', color: theme.colors.text, marginBottom: '12px' }}>
                    Share:
                </div>
            )}
            <div style={{ display: 'flex', gap: '12px' }}>
                <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: `${theme.colors.text}10`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.colors.text,
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#1877f2';
                        e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = `${theme.colors.text}10`;
                        e.currentTarget.style.color = theme.colors.text;
                    }}
                >
                    <Facebook size={20} />
                </a>
                <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: `${theme.colors.text}10`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.colors.text,
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#1da1f2';
                        e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = `${theme.colors.text}10`;
                        e.currentTarget.style.color = theme.colors.text;
                    }}
                >
                    <Twitter size={20} />
                </a>
                <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: `${theme.colors.text}10`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.colors.text,
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#0077b5';
                        e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = `${theme.colors.text}10`;
                        e.currentTarget.style.color = theme.colors.text;
                    }}
                >
                    <Linkedin size={20} />
                </a>
                <a
                    href={shareLinks.email}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: `${theme.colors.text}10`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.colors.text,
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme.colors.primary;
                        e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = `${theme.colors.text}10`;
                        e.currentTarget.style.color = theme.colors.text;
                    }}
                >
                    <Mail size={20} />
                </a>
                <button
                    onClick={copyToClipboard}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: `${theme.colors.text}10`,
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.colors.text,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme.colors.primary;
                        e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = `${theme.colors.text}10`;
                        e.currentTarget.style.color = theme.colors.text;
                    }}
                >
                    <Link size={20} />
                </button>
            </div>
        </div>
    );
}
