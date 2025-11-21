"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { Check } from 'lucide-react';

export interface CheckboxProps {
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    error?: string;
}

export function Checkbox({
    label = 'Checkbox label',
    checked = false,
    disabled = false,
    error
}: CheckboxProps) {
    const { theme } = useDesignStore();
    const [isChecked, setIsChecked] = React.useState(checked);

    const hasError = !!error;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
            }}
        >
            <label
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
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
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
                            borderRadius: '4px',
                            backgroundColor: isChecked ? theme.colors.primary : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                            pointerEvents: 'none'
                        }}
                    >
                        {isChecked && (
                            <Check
                                size={14}
                                style={{
                                    color: '#ffffff',
                                    strokeWidth: 3
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
                    {label}
                </span>
            </label>

            {error && (
                <span
                    style={{
                        fontSize: '13px',
                        color: '#ef4444',
                        marginLeft: '30px'
                    }}
                >
                    {error}
                </span>
            )}
        </div>
    );
}
