"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useDesignStore } from '@/store/designStore';

export function PreviewSpinner() {
    const { theme } = useDesignStore();
    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: `3px solid ${theme.colors.text}20`,
                borderTopColor: theme.colors.primary,
            }}
        />
    );
}

export function PreviewProgress() {
    const { theme } = useDesignStore();
    return (
        <div style={{ width: '100%', maxWidth: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: theme.colors.text }}>
                <span>Loading...</span>
                <span>75%</span>
            </div>
            <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: `${theme.colors.text}10`,
                borderRadius: '4px',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: '75%',
                    height: '100%',
                    backgroundColor: theme.colors.primary,
                    borderRadius: '4px'
                }} />
            </div>
        </div>
    );
}

export function PreviewSkeleton() {
    const { theme } = useDesignStore();
    return (
        <div style={{ width: '100%', maxWidth: '300px', display: 'flex', gap: '16px' }}>
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: `${theme.colors.text}10`
            }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{
                    width: '80%',
                    height: '16px',
                    borderRadius: '4px',
                    backgroundColor: `${theme.colors.text}10`
                }} />
                <div style={{
                    width: '60%',
                    height: '12px',
                    borderRadius: '4px',
                    backgroundColor: `${theme.colors.text}10`
                }} />
            </div>
        </div>
    );
}
