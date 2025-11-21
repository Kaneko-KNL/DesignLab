"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useDesignStore } from '@/store/designStore';
import styles from './PreviewComponents.module.css';
import { Search } from 'lucide-react';
import { getContrastMutedColor } from '@/lib/colors';

export function PreviewSection({ title, children }: { title: string; children: React.ReactNode }) {
    const { theme } = useDesignStore();
    return (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle} style={{
                color: getContrastMutedColor(theme.colors.background)
            }}>{title}</h3>
            <div className={styles.grid}>{children}</div>
        </div>
    );
}

export function PreviewButton() {
    const { theme } = useDesignStore();
    return (
        <div style={{ width: '100%' }}>
            <div style={{ fontSize: '11px', color: getContrastMutedColor(theme.colors.background), marginBottom: '8px', fontWeight: 500 }}>#Button</div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.button}
                style={{
                    backgroundColor: theme.colors.primary,
                    color: '#ffffff',
                    borderRadius: theme.radius,
                    boxShadow: theme.shadow,
                }}
            >
                Primary Action
            </motion.button>
        </div>
    );
}

export function PreviewCard() {
    const { theme } = useDesignStore();
    return (
        <div style={{ width: '100%' }}>
            <div style={{ fontSize: '11px', color: getContrastMutedColor(theme.colors.background), marginBottom: '8px', fontWeight: 500 }}>#Card</div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.card}
                style={{
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text,
                    borderRadius: theme.radius,
                    boxShadow: theme.shadow,
                }}
            >
                <div className={styles.cardHeader}>
                    <div className={styles.avatar} style={{ backgroundColor: theme.colors.accent }} />
                    <div className={styles.cardTitle}>Card Title</div>
                </div>
                <div className={styles.cardBody}>
                    This is a preview card component. It reflects the current design tokens.
                </div>
            </motion.div>
        </div>
    );
}

export function PreviewInput() {
    const { theme } = useDesignStore();
    return (
        <div style={{ width: '100%' }}>
            <div style={{ fontSize: '11px', color: getContrastMutedColor(theme.colors.background), marginBottom: '8px', fontWeight: 500 }}>#Input</div>
            <div className={styles.inputWrapper}>
                <Search size={16} className={styles.inputIcon} style={{ color: theme.colors.text }} />
                <input
                    type="text"
                    placeholder="Search..."
                    className={styles.input}
                    style={{
                        borderColor: theme.colors.primary,
                        borderRadius: theme.radius,
                        color: theme.colors.text,
                        backgroundColor: theme.colors.background,
                    }}
                />
            </div>
        </div>
    );
}

export function PreviewBadge() {
    const { theme } = useDesignStore();
    return (
        <div style={{ width: '100%' }}>
            <div style={{ fontSize: '11px', color: getContrastMutedColor(theme.colors.background), marginBottom: '8px', fontWeight: 500 }}>#Badge</div>
            <span
                className={styles.badge}
                style={{
                    backgroundColor: theme.colors.accent,
                    color: '#ffffff',
                    borderRadius: theme.radius,
                }}
            >
                New
            </span>
        </div>
    );
}

export function PreviewHero() {
    const { theme } = useDesignStore();
    return (
        <div style={{ width: '100%' }}>
            <div style={{ fontSize: '11px', color: getContrastMutedColor(theme.colors.background), marginBottom: '8px', fontWeight: 500 }}>#Hero</div>
            <div style={{
                padding: '40px',
                textAlign: 'center',
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radius,
                marginBottom: '20px',
                width: '100%',
                boxShadow: theme.shadow
            }}>
                <h1 style={{ color: theme.colors.primary, marginBottom: '16px' }}>Welcome to DesignLab</h1>
                <p style={{ color: theme.colors.text, marginBottom: '24px', opacity: 0.8 }}>
                    Create stunning design systems with the power of AI.
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button style={{
                        padding: '10px 20px',
                        backgroundColor: theme.colors.primary,
                        color: '#fff',
                        border: 'none',
                        borderRadius: theme.radius,
                        cursor: 'pointer'
                    }}>Get Started</button>
                    <button style={{
                        padding: '10px 20px',
                        backgroundColor: 'transparent',
                        color: theme.colors.text,
                        border: `1px solid ${theme.colors.text}`,
                        borderRadius: theme.radius,
                        cursor: 'pointer'
                    }}>Learn More</button>
                </div>
            </div>
        </div>
    );
}

export function PreviewArticle() {
    const { theme } = useDesignStore();
    return (
        <div style={{ width: '100%' }}>
            <div style={{ fontSize: '11px', color: getContrastMutedColor(theme.colors.background), marginBottom: '8px', fontWeight: 500 }}>#Article</div>
            <div style={{
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radius,
                overflow: 'hidden',
                boxShadow: theme.shadow,
                maxWidth: '300px',
                width: '100%'
            }}>
                <div style={{ height: '160px', backgroundColor: theme.colors.accent, opacity: 0.5 }}></div>
                <div style={{ padding: '20px' }}>
                    <span style={{ fontSize: '12px', color: theme.colors.primary, fontWeight: 'bold' }}>TECHNOLOGY</span>
                    <h3 style={{ margin: '8px 0', color: theme.colors.text }}>The Future of AI Design</h3>
                    <p style={{ fontSize: '14px', color: theme.colors.text, opacity: 0.7 }}>
                        How artificial intelligence is reshaping the way we build user interfaces.
                    </p>
                </div>
            </div>
        </div>
    );
}

export function PreviewDashboard() {
    const { theme } = useDesignStore();
    return (
        <div style={{ width: '100%' }}>
            <div style={{ fontSize: '11px', color: getContrastMutedColor(theme.colors.background), marginBottom: '8px', fontWeight: 500 }}>#Dashboard</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{
                        padding: '20px',
                        backgroundColor: theme.colors.surface,
                        borderRadius: theme.radius,
                        boxShadow: theme.shadow
                    }}>
                        <div style={{ fontSize: '12px', color: theme.colors.text, opacity: 0.6 }}>Total Users</div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: theme.colors.text, margin: '8px 0' }}>1,234</div>
                        <div style={{ fontSize: '12px', color: theme.colors.primary }}>+12% from last month</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function PreviewForm() {
    const { theme } = useDesignStore();
    return (
        <div style={{ width: '100%' }}>
            <div style={{ fontSize: '11px', color: getContrastMutedColor(theme.colors.background), marginBottom: '8px', fontWeight: 500 }}>#Form</div>
            <div style={{
                padding: '24px',
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radius,
                boxShadow: theme.shadow,
                maxWidth: '400px',
                width: '100%'
            }}>
                <h3 style={{ marginBottom: '20px', color: theme.colors.text }}>Login</h3>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: theme.colors.text }}>Email</label>
                    <input
                        type="email"
                        placeholder="user@example.com"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: theme.radius,
                            border: `1px solid ${theme.colors.text}40`,
                            backgroundColor: theme.colors.background,
                            color: theme.colors.text
                        }}
                    />
                </div>
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: theme.colors.text }}>Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: theme.radius,
                            border: `1px solid ${theme.colors.text}40`,
                            backgroundColor: theme.colors.background,
                            color: theme.colors.text
                        }}
                    />
                </div>
                <button style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: theme.colors.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: theme.radius,
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}>Sign In</button>
            </div>
        </div>
    );
}

export function PreviewSelect() {
    const { theme } = useDesignStore();
    return (
        <div style={{ width: '100%' }}>
            <div style={{ fontSize: '11px', color: getContrastMutedColor(theme.colors.background), marginBottom: '8px', fontWeight: 500 }}>#Select</div>
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '300px'
            }}>
                <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    color: theme.colors.text
                }}>
                    Select Option
                </label>
                <div style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: theme.radius,
                    border: `1px solid ${theme.colors.text}40`,
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s'
                }}>
                    <span>Select an option...</span>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke={theme.colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export function PreviewSelectExpanded() {
    const { theme } = useDesignStore();
    const options = [
        { id: 1, label: 'Option 1', selected: false },
        { id: 2, label: 'Option 2', selected: true },
        { id: 3, label: 'Option 3', selected: false },
        { id: 4, label: 'Option 4', selected: false },
    ];

    return (
        <div style={{ width: '100%' }}>
            <div style={{ fontSize: '11px', color: getContrastMutedColor(theme.colors.background), marginBottom: '8px', fontWeight: 500 }}>#Select (Expanded)</div>
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '300px'
            }}>
                <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    color: theme.colors.text
                }}>
                    Select Option (Expanded)
                </label>
                <div style={{
                    width: '100%',
                    borderRadius: theme.radius,
                    border: `1px solid ${theme.colors.primary}`,
                    backgroundColor: theme.colors.background,
                    overflow: 'hidden',
                    boxShadow: theme.shadow
                }}>
                    <div style={{
                        padding: '10px 12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: `1px solid ${theme.colors.text}20`,
                        color: theme.colors.text
                    }}>
                        <span>Option 2</span>
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ transform: 'rotate(180deg)' }}>
                            <path d="M1 1.5L6 6.5L11 1.5" stroke={theme.colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div style={{
                        backgroundColor: theme.colors.surface,
                    }}>
                        {options.map((option) => (
                            <div
                                key={option.id}
                                style={{
                                    padding: '10px 12px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: option.selected ? `${theme.colors.primary}20` : 'transparent',
                                    color: option.selected ? theme.colors.primary : theme.colors.text,
                                    transition: 'background-color 0.2s'
                                }}
                            >
                                <span>{option.label}</span>
                                {option.selected && (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke={theme.colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
