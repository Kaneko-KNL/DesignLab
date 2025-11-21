import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { TOAST_DURATION, Z_INDEX } from '@/lib/constants';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = crypto.randomUUID();
        const newToast: Toast = { id, message, type };

        setToasts((prev) => [...prev, newToast]);

        const duration = type === 'error' ? TOAST_DURATION.ERROR :
            type === 'success' ? TOAST_DURATION.SUCCESS :
                TOAST_DURATION.INFO;

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    const getToastStyles = (type: ToastType) => {
        const baseStyles = {
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: 500,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            animation: 'slideIn 0.3s ease-out',
        };

        switch (type) {
            case 'success':
                return { ...baseStyles, backgroundColor: '#10b981', color: '#ffffff' };
            case 'error':
                return { ...baseStyles, backgroundColor: '#ef4444', color: '#ffffff' };
            case 'info':
            default:
                return { ...baseStyles, backgroundColor: '#3b82f6', color: '#ffffff' };
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: Z_INDEX.TOAST,
                maxWidth: '400px',
            }}>
                {toasts.map((toast) => (
                    <div key={toast.id} style={getToastStyles(toast.type)}>
                        {toast.message}
                    </div>
                ))}
            </div>
            <style>{`
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
        </ToastContext.Provider>
    );
};
