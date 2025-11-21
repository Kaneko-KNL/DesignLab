"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Calendar, User } from 'lucide-react';

export interface BlogPostCardProps {
    image?: string;
    title?: string;
    excerpt?: string;
    author?: string;
    date?: string;
    category?: string;
    readTime?: string;
}

export function BlogPostCard({
    image = 'https://placehold.co/600x400',
    title = 'Understanding Modern Web Design',
    excerpt = 'Explore the latest trends and best practices in contemporary web design that will help you create stunning websites.',
    author = 'Jane Doe',
    date = 'Dec 15, 2024',
    category = 'Tutorial',
    readTime = '5 min read'
}: BlogPostCardProps) {
    const { theme } = useDesignStore();

    return (
        <article
            style={{
                maxWidth: '400px',
                backgroundColor: theme.colors.surface,
                border: `1px solid ${theme.colors.text}10`,
                borderRadius: theme.radius,
                overflow: 'hidden',
                boxShadow: theme.shadow,
                transition: 'transform 0.2s',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            <div style={{ position: 'relative', paddingBottom: '60%', overflow: 'hidden' }}>
                <img
                    src={image}
                    alt={title}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                />

                {category && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '16px',
                            left: '16px',
                            padding: '6px 12px',
                            backgroundColor: theme.colors.primary,
                            color: '#ffffff',
                            fontSize: '12px',
                            fontWeight: '600',
                            borderRadius: '4px',
                            textTransform: 'uppercase'
                        }}
                    >
                        {category}
                    </div>
                )}
            </div>

            <div style={{ padding: '24px' }}>
                <h3
                    style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: theme.colors.text,
                        marginBottom: '12px',
                        lineHeight: '1.3'
                    }}
                >
                    {title}
                </h3>

                <p
                    style={{
                        fontSize: '15px',
                        color: `${theme.colors.text}70`,
                        lineHeight: '1.6',
                        marginBottom: '16px'
                    }}
                >
                    {excerpt}
                </p>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '16px',
                        borderTop: `1px solid ${theme.colors.text}10`
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <User size={16} style={{ color: `${theme.colors.text}60` }} />
                        <span style={{ fontSize: '14px', color: `${theme.colors.text}80` }}>
                            {author}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={16} style={{ color: `${theme.colors.text}60` }} />
                        <span style={{ fontSize: '14px', color: `${theme.colors.text}80` }}>
                            {date}
                        </span>
                    </div>
                </div>

                {readTime && (
                    <div
                        style={{
                            marginTop: '12px',
                            fontSize: '13px',
                            color: `${theme.colors.text}60`
                        }}
                    >
                        {readTime}
                    </div>
                )}
            </div>
        </article>
    );
}
