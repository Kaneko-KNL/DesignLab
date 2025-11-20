"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useDesignStore } from '@/store/designStore';
import { Bell, AlertTriangle, Info, CheckCircle, X } from 'lucide-react';

export function PreviewToast() {
    const { theme } = useDesignStore();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                padding: '12px 20px',
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                borderRadius: theme.radius,
                boxShadow: theme.shadow,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                maxWidth: '300px',
                borderLeft: `4px solid ${theme.colors.primary}`
            }}
        >
            <CheckCircle size={18} color={theme.colors.primary} />
            <span style={{ fontSize: '14px' }}>Action completed successfully.</span>
        </motion.div>
    );
}

export function PreviewAlert() {
    const { theme } = useDesignStore();
    return (
        <div style={{
            padding: '16px',
            backgroundColor: `${theme.colors.accent}20`, // 20% opacity
            color: theme.colors.text,
            borderRadius: theme.radius,
            border: `1px solid ${theme.colors.accent}`,
            display: 'flex',
            gap: '12px',
            maxWidth: '400px',
            width: '100%'
        }}>
            <AlertTriangle size={20} color={theme.colors.accent} />
            <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>Attention needed</h4>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Please review your account settings.</p>
            </div>
        </div>
    );
}

export function PreviewModal() {
    const { theme } = useDesignStore();
    return (
        <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '400px',
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius,
            boxShadow: theme.shadow,
            overflow: 'hidden',
            border: `1px solid ${theme.colors.text}10`
        }}>
            <div style={{
                padding: '16px 24px',
                borderBottom: `1px solid ${theme.colors.text}10`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h3 style={{ margin: 0, fontSize: '18px', color: theme.colors.text }}>Confirm Action</h3>
                <X size={18} color={theme.colors.text} style={{ cursor: 'pointer', opacity: 0.5 }} />
            </div>
            <div style={{ padding: '24px', color: theme.colors.text, opacity: 0.8, fontSize: '14px' }}>
                Are you sure you want to proceed? This action cannot be undone.
            </div>
            <div style={{
                padding: '16px 24px',
                backgroundColor: theme.colors.background,
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px'
            }}>
                <button style={{
                    padding: '8px 16px',
                    backgroundColor: 'transparent',
                    border: `1px solid ${theme.colors.text}40`,
                    borderRadius: theme.radius,
                    color: theme.colors.text,
                    cursor: 'pointer'
                }}>Cancel</button>
                <button style={{
                    padding: '8px 16px',
                    backgroundColor: theme.colors.primary,
                    border: 'none',
                    borderRadius: theme.radius,
                    color: '#fff',
                    cursor: 'pointer'
                }}>Confirm</button>
            </div>
        </div>
    );
}

export function PreviewTooltip() {
    const { theme } = useDesignStore();
    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ color: theme.colors.primary, textDecoration: 'underline', cursor: 'help' }}>Hover me</span>
            <div style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginBottom: '8px',
                padding: '6px 12px',
                backgroundColor: theme.colors.text,
                color: theme.colors.background,
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none'
            }}>
                Tooltip Text
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    borderWidth: '4px',
                    borderStyle: 'solid',
                    borderColor: `${theme.colors.text} transparent transparent transparent`
                }} />
            </div>
        </div>
    );
}
