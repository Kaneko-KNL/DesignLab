"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { ColorPalette } from '@/lib/colors';

export const GlobalStylePanel: React.FC = () => {
    const { theme, setColor, randomizeColors } = useDesignStore();

    const handleColorChange = (key: keyof ColorPalette, value: string) => {
        setColor(key, value);
    };

    return (
        <div style={{ padding: '16px' }}>
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '16px',
                    color: '#374151'
                }}>
                    Color Palette
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {Object.entries(theme.colors).map(([key, value]) => (
                        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <label style={{
                                flex: 1,
                                fontSize: '13px',
                                color: '#6b7280',
                                textTransform: 'capitalize'
                            }}>
                                {key}
                            </label>
                            <input
                                type="color"
                                value={value}
                                onChange={(e) => handleColorChange(key as keyof ColorPalette, e.target.value)}
                                style={{
                                    width: '40px',
                                    height: '32px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            />
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleColorChange(key as keyof ColorPalette, e.target.value)}
                                style={{
                                    width: '90px',
                                    padding: '6px 8px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    fontFamily: 'monospace'
                                }}
                            />
                        </div>
                    ))}
                </div>

                <button
                    onClick={randomizeColors}
                    style={{
                        marginTop: '16px',
                        width: '100%',
                        padding: '8px 16px',
                        backgroundColor: '#4f46e5',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: 500,
                        cursor: 'pointer',
                    }}
                >
                    Randomize Colors
                </button>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <h3 style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '16px',
                    color: '#374151'
                }}>
                    Typography
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            color: '#6b7280',
                            marginBottom: '6px'
                        }}>
                            Heading Font
                        </label>
                        <input
                            type="text"
                            value={theme.fontHeading}
                            readOnly
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px',
                                backgroundColor: '#f9fafb'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            color: '#6b7280',
                            marginBottom: '6px'
                        }}>
                            Body Font
                        </label>
                        <input
                            type="text"
                            value={theme.fontBody}
                            readOnly
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px',
                                backgroundColor: '#f9fafb'
                            }}
                        />
                    </div>
                </div>
            </div>

            <div>
                <h3 style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '16px',
                    color: '#374151'
                }}>
                    Styling
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            color: '#6b7280',
                            marginBottom: '6px'
                        }}>
                            Border Radius
                        </label>
                        <input
                            type="text"
                            value={theme.radius}
                            readOnly
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px',
                                backgroundColor: '#f9fafb'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            color: '#6b7280',
                            marginBottom: '6px'
                        }}>
                            Shadow
                        </label>
                        <input
                            type="text"
                            value={theme.shadow}
                            readOnly
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px',
                                backgroundColor: '#f9fafb'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
