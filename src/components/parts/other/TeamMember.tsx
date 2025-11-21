"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Linkedin, Twitter, Mail } from 'lucide-react';

export interface TeamMemberProps {
    name?: string;
    role?: string;
    bio?: string;
    avatar?: string;
    social?: {
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
}

export function TeamMember({
    name = 'Alex Johnson',
    role = 'Lead Designer',
    bio = 'Passionate about creating beautiful and functional user experiences.',
    avatar,
    social = { linkedin: '#', twitter: '#', email: 'mailto:alex@example.com' }
}: TeamMemberProps) {
    const { theme } = useDesignStore();

    return (
        <div
            style={{
                maxWidth: '320px',
                backgroundColor: theme.colors.surface,
                border: `1px solid ${theme.colors.text}10`,
                borderRadius: theme.radius,
                overflow: 'hidden',
                boxShadow: theme.shadow,
                textAlign: 'center'
            }}
        >
            <div style={{ padding: '32px 24px 24px' }}>
                {avatar ? (
                    <img
                        src={avatar}
                        alt={name}
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            margin: '0 auto 16px'
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            backgroundColor: theme.colors.primary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            fontSize: '48px',
                            fontWeight: 'bold',
                            margin: '0 auto 16px'
                        }}
                    >
                        {name?.charAt(0) || 'A'}
                    </div>
                )}

                <h3 style={{ fontSize: '20px', fontWeight: '700', color: theme.colors.text, marginBottom: '4px' }}>
                    {name}
                </h3>

                <div style={{ fontSize: '14px', color: theme.colors.primary, fontWeight: '500', marginBottom: '12px' }}>
                    {role}
                </div>

                <p style={{ fontSize: '14px', color: `${theme.colors.text}70`, lineHeight: '1.6', marginBottom: '20px' }}>
                    {bio}
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                    {social.linkedin && (
                        <a
                            href={social.linkedin}
                            style={{
                                width: '36px',
                                height: '36px',
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
                            <Linkedin size={18} />
                        </a>
                    )}
                    {social.twitter && (
                        <a
                            href={social.twitter}
                            style={{
                                width: '36px',
                                height: '36px',
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
                            <Twitter size={18} />
                        </a>
                    )}
                    {social.email && (
                        <a
                            href={social.email}
                            style={{
                                width: '36px',
                                height: '36px',
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
                            <Mail size={18} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
