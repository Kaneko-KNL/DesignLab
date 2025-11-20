"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { useUiStore } from '@/store/uiStore';
import { Clock, User, Edit } from 'lucide-react';

// Mock data for saved designs (since we don't have a real backend yet)
const SAVED_DESIGNS = [
    {
        id: '1',
        name: 'Corporate Blue',
        author: 'User',
        updatedAt: '2025-11-20',
        colors: {
            background: '#f8f9fa',
            text: '#212529',
            primary: '#0d6efd',
            accent: '#6610f2',
        }
    },
    {
        id: '2',
        name: 'Dark Neon',
        author: 'User',
        updatedAt: '2025-11-19',
        colors: {
            background: '#212529',
            text: '#f8f9fa',
            primary: '#00ff9d',
            accent: '#ff00ff',
        }
    },
    {
        id: '3',
        name: 'Warm Autumn',
        author: 'User',
        updatedAt: '2025-11-18',
        colors: {
            background: '#fff3cd',
            text: '#856404',
            primary: '#d39e00',
            accent: '#fd7e14',
        }
    }
];

export default function ExplorerView() {
    const { theme } = useDesignStore();
    const { setActiveView } = useUiStore();

    return (
        <div style={{ padding: '40px', height: '100%', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '32px', color: theme.colors.text }}>Explorer</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
            }}>
                {SAVED_DESIGNS.map((design) => (
                    <div key={design.id} style={{
                        backgroundColor: theme.colors.surface,
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: theme.shadow,
                        border: `1px solid ${theme.colors.text}10`,
                        transition: 'transform 0.2s',
                        cursor: 'pointer'
                    }}
                        onClick={() => setActiveView('workspace')} // In a real app, this would load the design
                    >
                        {/* Card Art / Color Preview */}
                        <div style={{ height: '160px', position: 'relative', padding: '20px' }}>
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: `linear-gradient(135deg, ${design.colors.background} 0%, ${design.colors.background} 100%)`
                            }} />
                            <div style={{
                                position: 'relative',
                                zIndex: 1,
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '8px',
                                height: '100%'
                            }}>
                                <div style={{ backgroundColor: design.colors.primary, borderRadius: '8px' }} />
                                <div style={{ backgroundColor: design.colors.accent, borderRadius: '8px' }} />
                                <div style={{ backgroundColor: design.colors.text, borderRadius: '8px', opacity: 0.8 }} />
                                <div style={{ backgroundColor: design.colors.background, borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)' }} />
                            </div>
                        </div>

                        {/* Card Body */}
                        <div style={{ padding: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                                <h3 style={{ margin: 0, fontSize: '18px', color: theme.colors.text }}>{design.name}</h3>
                                <Edit size={16} color={theme.colors.text} style={{ opacity: 0.5 }} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: theme.colors.text, opacity: 0.7 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <User size={12} />
                                    <span>{design.author}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Clock size={12} />
                                    <span>Updated: {design.updatedAt}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
