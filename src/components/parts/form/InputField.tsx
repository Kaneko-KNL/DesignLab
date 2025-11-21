"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';

export interface InputFieldProps {
    label?: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    value?: string;
    error?: string;
    helperText?: string;
    required?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
}

export function InputField({
    label,
    placeholder = 'Enter text...',
    type = 'text',
    value = '',
    error,
    helperText,
    required = false,
    disabled = false,
    fullWidth = true
}: InputFieldProps) {
    const { theme } = useDesignStore();
    const [inputValue, setInputValue] = React.useState(value);
    const [isFocused, setIsFocused] = React.useState(false);

    const hasError = !!error;

    return (
        <div
            style={{
                width: fullWidth ? '100%' : 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
            }}
        >
            {label && (
                <label
                    style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: theme.colors.text,
                        display: 'flex',
                        gap: '4px'
                    }}
                >
                    {label}
                    {required && (
                        <span style={{ color: '#ef4444' }}>*</span>
                    )}
                </label>
            )}

            <input
                type={type}
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={disabled}
                required={required}
                style={{
                    padding: '12px 16px',
                    fontSize: '15px',
                    border: `2px solid ${hasError
                            ? '#ef4444'
                            : isFocused
                                ? theme.colors.primary
                                : `${theme.colors.text}20`
                        }`,
                    borderRadius: theme.radius,
                    backgroundColor: disabled ? `${theme.colors.text}05` : theme.colors.surface,
                    color: theme.colors.text,
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    cursor: disabled ? 'not-allowed' : 'text',
                    opacity: disabled ? 0.6 : 1,
                    width: '100%'
                }}
            />

            {(helperText || error) && (
                <span
                    style={{
                        fontSize: '13px',
                        color: hasError ? '#ef4444' : `${theme.colors.text}80`
                    }}
                >
                    {error || helperText}
                </span>
            )}
        </div>
    );
}
