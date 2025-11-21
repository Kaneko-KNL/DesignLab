"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export interface ToastProps {
    message?: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
    position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
    previewMode?: boolean;
}

export function Toast({
    message = 'This is a notification message',
    type = 'info',
    duration = 3000,
    position = 'top-right',
    previewMode = false
}: ToastProps) {
    const { theme } = useDesignStore();
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        if (previewMode) {
            setIsVisible(true);
            return;
        }
        setIsVisible(true);
        if (duration > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, previewMode]);

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
            case 'success': return theme.colors.primary; // Using primary for success to match theme
            case 'error': return '#ef4444'; // Keep semantic error red but could be theme.colors.error if it existed
            case 'warning': return '#f59e0b'; // Keep semantic warning amber
            case 'info': return theme.colors.secondary; // Use secondary for info
        }
    };

    const getPosition = () => {
        if (previewMode) return { position: 'relative' as const, margin: '0' };

        switch (position) {
            case 'top-right':
                return { top: '20px', right: '20px' };
            case 'top-center':
                return { top: '20px', left: '50%', transform: 'translateX(-50%)' };
            case 'bottom-right':
                return { bottom: '20px', right: '20px' };
            case 'bottom-center':
                return { bottom: '20px', left: '50%', transform: 'translateX(-50%)' };
        }
    };

    if (!isVisible) return null;

    const positionStyles = getPosition();

    return (
        <div
            style={{
                position: previewMode ? 'relative' : 'fixed',
                ...positionStyles,
                minWidth: '300px',
                maxWidth: '500px',
                padding: '16px 20px',
                backgroundColor: theme.colors.surface,
                border: `2px solid ${getColor()}`,
                borderRadius: theme.radius,
                boxShadow: theme.shadow,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                animation: previewMode ? 'none' : 'slideIn 0.3s ease-out',
                zIndex: 9999
            }}
        >
            <div style={{ color: getColor(), flexShrink: 0 }}>
                {getIcon()}
            </div>

            <span
                style={{
                    flex: 1,
                    color: theme.colors.text,
                    fontSize: '15px'
                }}
            >
                {message}
            </span>

            {!previewMode && (
                <button
                    onClick={() => setIsVisible(false)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: theme.colors.text,
                        cursor: 'pointer',
                        padding: '4px',
                        opacity: 0.6,
                        transition: 'opacity 0.2s'
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

            <style jsx>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}
