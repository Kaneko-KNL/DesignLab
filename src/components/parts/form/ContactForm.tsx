"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Send } from 'lucide-react';

export interface ContactFormProps {
    title?: string;
    subtitle?: string;
    submitText?: string;
    showPhone?: boolean;
    showCompany?: boolean;
}

export function ContactForm({
    title = 'Get in Touch',
    subtitle = 'Fill out the form below and we\'ll get back to you soon.',
    submitText = 'Send Message',
    showPhone = true,
    showCompany = false
}: ContactFormProps) {
    const { theme } = useDesignStore();
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const inputStyle = {
        padding: '12px 16px',
        fontSize: '15px',
        border: `2px solid ${theme.colors.text}20`,
        borderRadius: theme.radius,
        backgroundColor: theme.colors.surface,
        color: theme.colors.text,
        outline: 'none',
        transition: 'border-color 0.2s',
        width: '100%'
    };

    return (
        <div
            style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '40px 24px'
            }}
        >
            {title && (
                <h2
                    style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        color: theme.colors.text,
                        marginBottom: '12px',
                        textAlign: 'center'
                    }}
                >
                    {title}
                </h2>
            )}

            {subtitle && (
                <p
                    style={{
                        fontSize: '16px',
                        color: `${theme.colors.text}80`,
                        marginBottom: '32px',
                        textAlign: 'center'
                    }}
                >
                    {subtitle}
                </p>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: showCompany ? '1fr 1fr' : '1fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label
                            style={{
                                fontSize: '14px',
                                fontWeight: '500',
                                color: theme.colors.text
                            }}
                        >
                            Name <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your name"
                            style={inputStyle}
                        />
                    </div>

                    {showCompany && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: theme.colors.text
                                }}
                            >
                                Company
                            </label>
                            <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                placeholder="Your company"
                                style={inputStyle}
                            />
                        </div>
                    )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: showPhone ? '1fr 1fr' : '1fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label
                            style={{
                                fontSize: '14px',
                                fontWeight: '500',
                                color: theme.colors.text
                            }}
                        >
                            Email <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            style={inputStyle}
                        />
                    </div>

                    {showPhone && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: theme.colors.text
                                }}
                            >
                                Phone
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="(123) 456-7890"
                                style={inputStyle}
                            />
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label
                        style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: theme.colors.text
                        }}
                    >
                        Message <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us more..."
                        style={{
                            ...inputStyle,
                            resize: 'vertical',
                            fontFamily: 'inherit',
                            lineHeight: '1.5'
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '14px 32px',
                        backgroundColor: theme.colors.primary,
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: theme.radius,
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'opacity 0.2s',
                        marginTop: '8px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.9';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1';
                    }}
                >
                    <Send size={18} />
                    {submitText}
                </button>
            </form>
        </div>
    );
}
