"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectDropdownProps {
    label?: string;
    options?: SelectOption[];
    placeholder?: string;
    selected?: string;
    error?: string;
    helperText?: string;
    required?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
}

export function SelectDropdown({
    label,
    options = [
        { value: '', label: 'Select an option' },
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
    ],
    placeholder = 'Select...',
    selected = '',
    error,
    helperText,
    required = false,
    disabled = false,
    fullWidth = true
}: SelectDropdownProps) {
    const { theme } = useDesignStore();
    const [selectedValue, setSelectedValue] = React.useState(selected);
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

            <div style={{ position: 'relative' }}>
                <select
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    required={required}
                    style={{
                        width: '100%',
                        padding: '12px 40px 12px 16px',
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
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        opacity: disabled ? 0.6 : 1,
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none'
                    }}
                >
                    {!selectedValue && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    size={20}
                    style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: theme.colors.text,
                        pointerEvents: 'none',
                        opacity: disabled ? 0.4 : 0.6
                    }}
                />
            </div>

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
