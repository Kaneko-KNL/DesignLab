"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Mail } from 'lucide-react';

export interface NewsletterSignupProps {
    title?: string;
    subtitle?: string;
    placeholder?: string;
    buttonText?: string;
    inline?: boolean;
}

export function NewsletterSignup({
    title = 'Subscribe to Our Newsletter',
    subtitle = 'Get the latest updates and news delivered to your inbox.',
    placeholder = 'Enter your email',
    buttonText = 'Subscribe',
    inline = true
}: NewsletterSignupProps) {
    const { theme } = useDesignStore();
    const [email, setEmail] = React.useState('');
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Newsletter signup:', email);
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setEmail('');
        }, 3000);
    };

    return (
        <div
            style={{
                width: '100%',
                padding: '40px 24px',
                textAlign: 'center'
            }}
        >
            {title && (
                <h3
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: theme.colors.text,
                        marginBottom: '8px'
                    }}
                >
                    {title}
                </h3>
            )}

            {subtitle && (
                <p
                    style={{
                        fontSize: '15px',
                        color: `${theme.colors.text}80`,
                        marginBottom: '24px'
                    }}
                >
                    {subtitle}
                </p>
            )}

            {isSubmitted ? (
                <div
                    style={{
                        padding: '16px',
                        backgroundColor: `${theme.colors.primary}15`,
                        border: `1px solid ${theme.colors.primary}`,
                        borderRadius: theme.radius,
                        color: theme.colors.primary,
                        maxWidth: inline ? '500px' : '100%',
                        margin: '0 auto'
                    }}
                >
                    ✓ Thanks for subscribing!
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: inline ? 'row' : 'column',
                        gap: '12px',
                        maxWidth: inline ? '500px' : '400px',
                        margin: '0 auto',
                        alignItems: 'stretch'
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Mail
                            size={18}
                            style={{
                                position: 'absolute',
                                left: '14px',
                                color: `${theme.colors.text}60`,
                                pointerEvents: 'none'
                            }}
                        />
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={placeholder}
                            style={{
                                width: '100%',
                                padding: '12px 16px 12px 44px',
                                fontSize: '15px',
                                border: `2px solid ${theme.colors.text}20`,
                                borderRadius: theme.radius,
                                backgroundColor: theme.colors.surface,
                                color: theme.colors.text,
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            padding: '12px 28px',
                            backgroundColor: theme.colors.primary,
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: theme.radius,
                            fontSize: '15px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'opacity 0.2s',
                            whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '0.9';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '1';
                        }}
                    >
                        {buttonText}
                    </button>
                </form>
            )}

            <p
                style={{
                    fontSize: '13px',
                    color: `${theme.colors.text}60`,
                    marginTop: '16px'
                }}
            >
                We respect your privacy. Unsubscribe at any time.
            </p>
        </div>
    );
}
