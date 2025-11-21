"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Quote, Star } from 'lucide-react';

export interface TestimonialProps {
    quote?: string;
    author?: string;
    role?: string;
    company?: string;
    avatar?: string;
    rating?: number;
    variant?: 'card' | 'minimal' | 'highlighted';
}

export function Testimonial({
    quote = 'This product has completely transformed the way we work. Highly recommended!',
    author = 'John Doe',
    role = 'CEO',
    company = 'Tech Company',
    avatar,
    rating = 5,
    variant = 'card'
}: TestimonialProps) {
    const { theme } = useDesignStore();

    const renderStars = () => {
        return (
            <div style={{ display: 'flex', gap: '4px' }}>
                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        size={16}
                        style={{
                            fill: index < rating ? '#fbbf24' : 'none',
                            color: index < rating ? '#fbbf24' : `${theme.colors.text}30`,
                            strokeWidth: 2
                        }}
                    />
                ))}
            </div>
        );
    };

    if (variant === 'minimal') {
        return (
            <div
                style={{
                    padding: '24px',
                    maxWidth: '600px'
                }}
            >
                <div style={{ marginBottom: '16px' }}>
                    {renderStars()}
                </div>

                <p
                    style={{
                        fontSize: '16px',
                        lineHeight: '1.6',
                        color: theme.colors.text,
                        marginBottom: '16px',
                        fontStyle: 'italic'
                    }}
                >
                    "{quote}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {avatar ? (
                        <img
                            src={avatar}
                            alt={author}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: theme.colors.primary,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff',
                                fontWeight: 'bold',
                                fontSize: '16px'
                            }}
                        >
                            {author.charAt(0)}
                        </div>
                    )}

                    <div>
                        <div
                            style={{
                                fontWeight: '600',
                                color: theme.colors.text,
                                fontSize: '15px'
                            }}
                        >
                            {author}
                        </div>
                        <div
                            style={{
                                fontSize: '14px',
                                color: `${theme.colors.text}70`
                            }}
                        >
                            {role}{company && `, ${company}`}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'highlighted') {
        return (
            <div
                style={{
                    padding: '32px',
                    backgroundColor: theme.colors.primary,
                    borderRadius: theme.radius,
                    maxWidth: '700px',
                    position: 'relative'
                }}
            >
                <Quote
                    size={48}
                    style={{
                        position: 'absolute',
                        top: '24px',
                        right: '24px',
                        color: 'rgba(255, 255, 255, 0.2)'
                    }}
                />

                <div style={{ marginBottom: '16px' }}>
                    {[...Array(5)].map((_, index) => (
                        <Star
                            key={index}
                            size={18}
                            style={{
                                fill: index < rating ? '#ffffff' : 'none',
                                color: index < rating ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
                                strokeWidth: 2,
                                marginRight: '4px'
                            }}
                        />
                    ))}
                </div>

                <p
                    style={{
                        fontSize: '18px',
                        lineHeight: '1.6',
                        color: '#ffffff',
                        marginBottom: '24px',
                        fontStyle: 'italic'
                    }}
                >
                    "{quote}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {avatar ? (
                        <img
                            src={avatar}
                            alt={author}
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '2px solid rgba(255, 255, 255, 0.3)'
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ffffff',
                                fontWeight: 'bold',
                                fontSize: '18px',
                                border: '2px solid rgba(255, 255, 255, 0.3)'
                            }}
                        >
                            {author.charAt(0)}
                        </div>
                    )}

                    <div>
                        <div
                            style={{
                                fontWeight: '600',
                                color: '#ffffff',
                                fontSize: '16px'
                            }}
                        >
                            {author}
                        </div>
                        <div
                            style={{
                                fontSize: '14px',
                                color: 'rgba(255, 255, 255, 0.8)'
                            }}
                        >
                            {role}{company && `, ${company}`}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default: card variant
    return (
        <div
            style={{
                padding: '28px',
                backgroundColor: theme.colors.surface,
                border: `1px solid ${theme.colors.text}10`,
                borderRadius: theme.radius,
                boxShadow: theme.shadow,
                maxWidth: '600px'
            }}
        >
            <div style={{ marginBottom: '16px' }}>
                {renderStars()}
            </div>

            <p
                style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: theme.colors.text,
                    marginBottom: '20px',
                    fontStyle: 'italic'
                }}
            >
                "{quote}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {avatar ? (
                    <img
                        src={avatar}
                        alt={author}
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: theme.colors.primary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            fontSize: '18px'
                        }}
                    >
                        {author.charAt(0)}
                    </div>
                )}

                <div>
                    <div
                        style={{
                            fontWeight: '600',
                            color: theme.colors.text,
                            fontSize: '15px'
                        }}
                    >
                        {author}
                    </div>
                    <div
                        style={{
                            fontSize: '14px',
                            color: `${theme.colors.text}70`
                        }}
                    >
                        {role}{company && `, ${company}`}
                    </div>
                </div>
            </div>
        </div>
    );
}
