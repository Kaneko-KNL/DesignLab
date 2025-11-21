"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';

export interface TimelineEvent {
    date: string;
    title: string;
    description: string;
}

export interface TimelineProps {
    events?: TimelineEvent[];
    variant?: 'left' | 'center';
}

export function Timeline({
    events = [
        { date: '2024 Q1', title: 'Project Started', description: 'Initial concept and planning phase.' },
        { date: '2024 Q2', title: 'Development', description: 'Core features implementation.' },
        { date: '2024 Q3', title: 'Beta Testing', description: 'Public beta release and feedback collection.' },
        { date: '2024 Q4', title: 'Launch', description: 'Official product launch.' }
    ],
    variant = 'left'
}: TimelineProps) {
    const { theme } = useDesignStore();

    if (variant === 'center') {
        return (
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
                {events.map((event, index) => {
                    const isLeft = index % 2 === 0;
                    return (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '40px',
                                position: 'relative'
                            }}
                        >
                            {isLeft && (
                                <>
                                    <div style={{ flex: 1, paddingRight: '32px', textAlign: 'right' }}>
                                        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600', color: theme.colors.text }}>{event.title}</h3>
                                        <p style={{ margin: 0, fontSize: '14px', color: `${theme.colors.text}70`, lineHeight: '1.5' }}>{event.description}</p>
                                    </div>
                                    <div style={{ position: 'relative', zIndex: 2 }}>
                                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: theme.colors.primary, border: `3px solid ${theme.colors.surface}`, boxShadow: theme.shadow }} />
                                    </div>
                                    <div style={{ flex: 1, paddingLeft: '32px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: '500', color: theme.colors.primary }}>{event.date}</span>
                                    </div>
                                </>
                            )}
                            {!isLeft && (
                                <>
                                    <div style={{ flex: 1, paddingRight: '32px', textAlign: 'right' }}>
                                        <span style={{ fontSize: '14px', fontWeight: '500', color: theme.colors.primary }}>{event.date}</span>
                                    </div>
                                    <div style={{ position: 'relative', zIndex: 2 }}>
                                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: theme.colors.primary, border: `3px solid ${theme.colors.surface}`, boxShadow: theme.shadow }} />
                                    </div>
                                    <div style={{ flex: 1, paddingLeft: '32px' }}>
                                        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600', color: theme.colors.text }}>{event.title}</h3>
                                        <p style={{ margin: 0, fontSize: '14px', color: `${theme.colors.text}70`, lineHeight: '1.5' }}>{event.description}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '2px', backgroundColor: `${theme.colors.text}20`, zIndex: 1 }} />
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '600px', padding: '20px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '8px', top: 0, bottom: 0, width: '2px', backgroundColor: `${theme.colors.text}20` }} />

            {events.map((event, index) => (
                <div key={index} style={{ position: 'relative', paddingLeft: '40px', marginBottom: '32px' }}>
                    <div style={{ position: 'absolute', left: 0, top: '4px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: theme.colors.primary, border: `3px solid ${theme.colors.surface}`, boxShadow: theme.shadow }} />

                    <div style={{ marginBottom: '4px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: theme.colors.primary }}>{event.date}</span>
                    </div>

                    <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600', color: theme.colors.text }}>{event.title}</h3>

                    <p style={{ margin: 0, fontSize: '14px', color: `${theme.colors.text}70`, lineHeight: '1.6' }}>{event.description}</p>
                </div>
            ))}
        </div>
    );
}
