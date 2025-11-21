"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { X } from 'lucide-react';

export interface ModalProps {
    title?: string;
    content?: React.ReactNode;
    isOpen?: boolean;
    showCloseButton?: boolean;
    size?: 'sm' | 'md' | 'lg';
    previewMode?: boolean;
}

export function Modal({
    title = 'Modal Title',
    content = 'Modal content goes here...',
    isOpen = true,
    showCloseButton = true,
    size = 'md',
    previewMode = false
}: ModalProps) {
    const { theme } = useDesignStore();
    const [isVisible, setIsVisible] = React.useState(isOpen);

    React.useEffect(() => {
        if (previewMode) {
            setIsVisible(true);
            return;
        }
        setIsVisible(isOpen);
    }, [isOpen, previewMode]);

    const getMaxWidth = () => {
        switch (size) {
            case 'sm': return '400px';
            case 'md': return '600px';
            case 'lg': return '800px';
        }
    };

    if (!isVisible) return null;

    if (previewMode) {
        return (
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: getMaxWidth(),
                    backgroundColor: theme.colors.surface,
                    borderRadius: theme.radius,
                    boxShadow: theme.shadow,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    border: `1px solid ${theme.colors.text}20`
                }}
            >
                {/* Header */}
                <div
                    style={{
                        padding: '20px 24px',
                        borderBottom: `1px solid ${theme.colors.text}10`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <h3
                        style={{
                            margin: 0,
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: theme.colors.text
                        }}
                    >
                        {title}
                    </h3>

                    {showCloseButton && (
                        <div style={{ opacity: 0.6 }}>
                            <X size={24} />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div
                    style={{
                        padding: '24px',
                        flex: 1,
                        color: theme.colors.text
                    }}
                >
                    {content}
                </div>

                {/* Footer */}
                <div
                    style={{
                        padding: '16px 24px',
                        borderTop: `1px solid ${theme.colors.text}10`,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '12px',
                        backgroundColor: theme.colors.surface
                    }}
                >
                    <button
                        style={{
                            padding: '8px 16px',
                            borderRadius: theme.radius,
                            border: `1px solid ${theme.colors.text}20`,
                            backgroundColor: 'transparent',
                            color: theme.colors.text,
                            cursor: 'default',
                            fontSize: '14px',
                            fontWeight: 500
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        style={{
                            padding: '8px 16px',
                            borderRadius: theme.radius,
                            border: 'none',
                            backgroundColor: theme.colors.primary,
                            color: '#ffffff',
                            cursor: 'default',
                            fontSize: '14px',
                            fontWeight: 500,
                            boxShadow: theme.shadow
                        }}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={() => setIsVisible(false)}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 9998,
                    animation: 'fadeIn 0.2s ease-out'
                }}
            />

            {/* Modal */}
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: getMaxWidth(),
                    width: '90%',
                    maxHeight: '90vh',
                    backgroundColor: theme.colors.surface,
                    borderRadius: theme.radius,
                    boxShadow: theme.shadow,
                    zIndex: 9999,
                    animation: 'scaleIn 0.2s ease-out',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Header */}
                <div
                    style={{
                        padding: '20px 24px',
                        borderBottom: `1px solid ${theme.colors.text}10`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <h3
                        style={{
                            margin: 0,
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: theme.colors.text
                        }}
                    >
                        {title}
                    </h3>

                    {showCloseButton && (
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
                            <X size={24} />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div
                    style={{
                        padding: '24px',
                        flex: 1,
                        overflow: 'auto',
                        color: theme.colors.text
                    }}
                >
                    {content}
                </div>

                {/* Footer */}
                <div
                    style={{
                        padding: '16px 24px',
                        borderTop: `1px solid ${theme.colors.text}10`,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '12px',
                        backgroundColor: theme.colors.surface
                    }}
                >
                    <button
                        onClick={() => setIsVisible(false)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: theme.radius,
                            border: `1px solid ${theme.colors.text}20`,
                            backgroundColor: 'transparent',
                            color: theme.colors.text,
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 500,
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = `${theme.colors.text}05`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: theme.radius,
                            border: 'none',
                            backgroundColor: theme.colors.primary,
                            color: '#ffffff',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 500,
                            boxShadow: theme.shadow,
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '0.9';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '1';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        Confirm
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from {
                        transform: translate(-50%, -50%) scale(0.9);
                        opacity: 0;
                    }
                    to {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                }
            `}</style>
        </>
    );
}
