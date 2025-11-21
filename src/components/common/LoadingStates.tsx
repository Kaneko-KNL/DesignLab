import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    color = '#4f46e5'
}) => {
    const sizeMap = {
        sm: 16,
        md: 24,
        lg: 32,
    };

    const dimension = sizeMap[size];

    return (
        <div
            style={{
                width: dimension,
                height: dimension,
                border: `3px solid ${color}20`,
                borderTop: `3px solid ${color}`,
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
            }}
        >
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

interface LoadingOverlayProps {
    message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
    message = 'Loading...'
}) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        }}>
            <LoadingSpinner size="lg" color="#ffffff" />
            <p style={{
                color: '#ffffff',
                marginTop: '16px',
                fontSize: '14px',
                fontWeight: 500,
            }}>
                {message}
            </p>
        </div>
    );
};
