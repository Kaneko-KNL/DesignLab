"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';

export interface RadioOption {
    value: string;
    label: string;
}

export interface RadioProps {
    options?: RadioOption[];
    name?: string;
    selected?: string;
    disabled?: boolean;
    error?: string;
    label?: string;
}

export function Radio({
    options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
    ],
    name = 'radio-group',
    selected = '',
    disabled = false,
    error,
    label
}: RadioProps) {
    const { theme } = useDesignStore();
    const [selectedValue, setSelectedValue] = React.useState(selected);

    const hasError = !!error;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}
        >
            {label && (
                <span
                    style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: theme.colors.text
                    }}
                >
                    {label}
                </span>
            )}

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}
            >
                {options.map((option) => (
                    <label
                        key={option.value}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: disabled ? 'not-allowed' : 'pointer',
                            opacity: disabled ? 0.6 : 1,
                            userSelect: 'none'
                        }}
                    >
                        <div
                            style={{
                                position: 'relative',
                                width: '20px',
                                height: '20px',
                                flexShrink: 0
                            }}
                        >
                            <input
                                type="radio"
                                name={name}
                                value={option.value}
                                checked={selectedValue === option.value}
                                onChange={(e) => setSelectedValue(e.target.value)}
                                disabled={disabled}
                                style={{
                                    position: 'absolute',
                                    opacity: 0,
                                    cursor: 'inherit',
                                    width: '100%',
                                    height: '100%',
                                    margin: 0
                                }}
                            />
                            <div
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    border: `2px solid ${hasError ? '#ef4444' : theme.colors.primary}`,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s',
                                    pointerEvents: 'none'
                                }}
                            >
                                {selectedValue === option.value && (
                                    <div
                                        style={{
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '50%',
                                            backgroundColor: theme.colors.primary
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        <span
                            style={{
                                fontSize: '15px',
                                color: theme.colors.text
                            }}
                        >
                            {option.label}
                        </span>
                    </label>
                ))}
            </div>

            {error && (
                <span
                    style={{
                        fontSize: '13px',
                        color: '#ef4444'
                    }}
                >
                    {error}
                </span>
            )}
        </div>
    );
}
