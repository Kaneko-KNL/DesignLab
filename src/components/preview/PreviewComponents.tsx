"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useDesignStore } from '@/store/designStore';
import styles from './PreviewComponents.module.css';
import { Bell, Check, X, Menu, Search, User } from 'lucide-react';

export function PreviewSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{title}</h3>
            <div className={styles.grid}>{children}</div>
        </div>
    );
}

export function PreviewButton() {
    const { theme } = useDesignStore();
    return (
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
    );
}

export function PreviewCard() {
    const { theme } = useDesignStore();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.card}
            style={{
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                borderRadius: theme.radius,
                boxShadow: theme.shadow,
                borderColor: theme.colors.accent, // Just for visual flair
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
    );
}

export function PreviewInput() {
    const { theme } = useDesignStore();
    return (
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
    );
}

export function PreviewBadge() {
    const { theme } = useDesignStore();
    return (
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
    );
}

export function PreviewHero() {
    const { theme } = useDesignStore();
    return (
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
    );
}

export function PreviewArticle() {
    const { theme } = useDesignStore();
    return (
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
    );
}

export function PreviewDashboard() {
    const { theme } = useDesignStore();
    return (
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
    );
}

export function PreviewForm() {
    const { theme } = useDesignStore();
    return (
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
    );
}
