"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Menu, Home, Settings, User, LogOut } from 'lucide-react';

export function PreviewDrawer() {
    const { theme } = useDesignStore();
    return (
        <div style={{
            width: '240px',
            height: '300px',
            backgroundColor: theme.colors.surface,
            boxShadow: theme.shadow,
            display: 'flex',
            flexDirection: 'column',
            borderRight: `1px solid ${theme.colors.text}10`
        }}>
            <div style={{ padding: '20px', borderBottom: `1px solid ${theme.colors.text}10` }}>
                <h3 style={{ margin: 0, color: theme.colors.primary }}>App Menu</h3>
            </div>
            <div style={{ padding: '10px' }}>
                {[
                    { icon: Home, label: 'Home' },
                    { icon: User, label: 'Profile' },
                    { icon: Settings, label: 'Settings' },
                ].map((item, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        color: theme.colors.text,
                        borderRadius: theme.radius,
                        cursor: 'pointer',
                        opacity: i === 0 ? 1 : 0.7,
                        backgroundColor: i === 0 ? `${theme.colors.primary}10` : 'transparent'
                    }}>
                        <item.icon size={18} color={i === 0 ? theme.colors.primary : theme.colors.text} />
                        <span style={{ fontSize: '14px', fontWeight: i === 0 ? 'bold' : 'normal' }}>{item.label}</span>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: 'auto', padding: '20px', borderTop: `1px solid ${theme.colors.text}10` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: theme.colors.accent, cursor: 'pointer' }}>
                    <LogOut size={18} />
                    <span style={{ fontSize: '14px' }}>Logout</span>
                </div>
            </div>
        </div>
    );
}

export function PreviewBottomSheet() {
    const { theme } = useDesignStore();
    return (
        <div style={{
            width: '100%',
            maxWidth: '320px',
            backgroundColor: theme.colors.surface,
            borderRadius: `${theme.radius} ${theme.radius} 0 0`,
            boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
            padding: '20px',
            position: 'relative'
        }}>
            <div style={{
                width: '40px',
                height: '4px',
                backgroundColor: theme.colors.text,
                opacity: 0.2,
                borderRadius: '2px',
                margin: '0 auto 20px auto'
            }} />
            <h4 style={{ margin: '0 0 12px 0', color: theme.colors.text }}>Options</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Share', 'Add to Favorites', 'Report Issue'].map((action) => (
                    <button key={action} style={{
                        padding: '12px',
                        textAlign: 'left',
                        backgroundColor: theme.colors.background,
                        border: 'none',
                        borderRadius: theme.radius,
                        color: theme.colors.text,
                        cursor: 'pointer'
                    }}>
                        {action}
                    </button>
                ))}
            </div>
        </div>
    );
}
