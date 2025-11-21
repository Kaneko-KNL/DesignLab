"use client";

import React from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';

export type Viewport = 'desktop' | 'tablet' | 'mobile';

interface ResponsivePanelProps {
    currentViewport: Viewport;
    onViewportChange: (viewport: Viewport) => void;
}

const VIEWPORTS: { id: Viewport; label: string; icon: React.ReactNode; width: string }[] = [
    { id: 'desktop', label: 'Desktop', icon: <Monitor size={16} />, width: '100%' },
    { id: 'tablet', label: 'Tablet', icon: <Tablet size={16} />, width: '768px' },
    { id: 'mobile', label: 'Mobile', icon: <Smartphone size={16} />, width: '375px' },
];

export const ResponsivePanel: React.FC<ResponsivePanelProps> = ({
    currentViewport,
    onViewportChange,
}) => {
    return (
        <div style={{
            display: 'flex',
            gap: '4px',
            padding: '4px',
            backgroundColor: '#f3f4f6',
            borderRadius: '6px',
        }}>
            {VIEWPORTS.map((viewport) => (
                <button
                    key={viewport.id}
                    onClick={() => onViewportChange(viewport.id)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor: currentViewport === viewport.id ? '#ffffff' : 'transparent',
                        color: currentViewport === viewport.id ? '#4f46e5' : '#6b7280',
                        fontWeight: currentViewport === viewport.id ? 600 : 400,
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: currentViewport === viewport.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    }}
                    title={`${viewport.label} (${viewport.width})`}
                >
                    {viewport.icon}
                    <span>{viewport.label}</span>
                </button>
            ))}
        </div>
    );
};

export const getViewportWidth = (viewport: Viewport): string => {
    const config = VIEWPORTS.find(v => v.id === viewport);
    return config?.width || '100%';
};
