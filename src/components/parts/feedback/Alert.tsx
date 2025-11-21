"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export interface AlertProps {
    message?: string;
    title?: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    dismissible?: boolean;
}

export function Alert({
    message = 'This is an alert message',
    title,
    type = 'info',
    dismissible = true
}: AlertProps) {
    const { theme } = useDesignStore();
    const [isVisible, setIsVisible] = React.useState(true);

    const getIcon = () => {
        switch (type) {
            case 'success': return <CheckCircle size={20} />;
            case 'error': return <AlertCircle size={20} />;
            case 'warning': return <AlertTriangle size={20} />;
            case 'info': return <Info size={20} />;
        }
    };

    const getColor = () => {
        switch (type) {
            case 'success': return '#10b981';
            case 'error': return '#ef4444';
            case 'warning': return '#f59e0b';
            case 'info': return theme.colors.primary;
        }
    };

    if (!isVisible) return null;

    return (
        <div
            role="alert"
            style={{
                padding: '16px',
                borderRadius: theme.radius,
                backgroundColor: `${getColor()}15`,
                border: `1px solid ${getColor()}`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                width: '100%'
            }}
        >
            <div style={{ color: getColor(), flexShrink: 0, marginTop: '2px' }}>
                {getIcon()}
            </div>

            <div style={{ flex: 1 }}>
                {title && (
                    <div
                        style={{
                            fontWeight: '600',
                            fontSize: '15px',
                            color: theme.colors.text,
                            marginBottom: '4px'
                        }}
                    >
                        {title}
                    </div>
                )}
                <div
                    style={{
                        fontSize: '14px',
                        color: theme.colors.text,
                        lineHeight: '1.5'
                    }}
                >
                    {message}
                </div>
            </div>

            {dismissible && (
                <button
                    onClick={() => setIsVisible(false)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: theme.colors.text,
                        cursor: 'pointer',
                        padding: '4px',
                        opacity: 0.6,
                        transition: 'opacity 0.2s',
                        flexShrink: 0
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.6';
                    }}
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
}
