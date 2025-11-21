import React from 'react';
import { useLayoutStore } from '@/store/layoutStore';

export const PropertyPanel: React.FC = () => {
    const { selectedPartId, parts, updatePart } = useLayoutStore();

    if (!selectedPartId) {
        return (
            <div style={{ padding: '20px', color: '#888', textAlign: 'center' }}>
                Select a part to edit its properties.
            </div>
        );
    }

    const part = parts[selectedPartId];
    if (!part) return null;

    const handleChange = (key: string, value: unknown) => {
        updatePart(part.id, {
            props: {
                ...part.props,
                [key]: value,
            },
        });
    };

    return (
        <div style={{ padding: '16px' }}>
            <h3 style={{
                marginBottom: '16px',
                fontSize: '16px',
                fontWeight: 600,
                borderBottom: '1px solid #eee',
                paddingBottom: '8px'
            }}>
                Edit {part.type}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Common Properties */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 500 }}>Label</label>
                    <input
                        type="text"
                        value={part.label}
                        onChange={(e) => updatePart(part.id, { label: e.target.value })}
                        style={{
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
                    />
                </div>

                {/* Dynamic Properties based on part.props */}
                {part.props && Object.entries(part.props).map(([key, value]) => {
                    // Simple type inference for input rendering
                    if (typeof value === 'string') {
                        // Check for color
                        if (value.startsWith('#') || value.startsWith('rgb')) {
                            return (
                                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 500 }}>{key}</label>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <input
                                            type="color"
                                            value={value}
                                            onChange={(e) => handleChange(key, e.target.value)}
                                            style={{ width: '32px', height: '32px', padding: 0, border: 'none' }}
                                        />
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={(e) => handleChange(key, e.target.value)}
                                            style={{
                                                flex: 1,
                                                padding: '8px',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                                fontSize: '14px'
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 500 }}>{key}</label>
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    style={{
                                        padding: '8px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                        );
                    }

                    if (typeof value === 'number') {
                        return (
                            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <label style={{ fontSize: '12px', fontWeight: 500 }}>{key}</label>
                                <input
                                    type="number"
                                    value={value}
                                    onChange={(e) => handleChange(key, Number(e.target.value))}
                                    style={{
                                        padding: '8px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                        );
                    }

                    if (typeof value === 'boolean') {
                        return (
                            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) => handleChange(key, e.target.checked)}
                                />
                                <label style={{ fontSize: '12px', fontWeight: 500 }}>{key}</label>
                            </div>
                        );
                    }

                    return null;
                })}
            </div>
        </div>
    );
};
