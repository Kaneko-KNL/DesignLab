"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';

export interface TabItem {
    label: string;
    content?: React.ReactNode;
    icon?: React.ReactNode;
    badge?: string | number;
}

export interface TabsProps {
    tabs?: TabItem[];
    defaultTab?: number;
    variant?: 'underline' | 'pills' | 'enclosed';
    fullWidth?: boolean;
}

export function Tabs({
    tabs = [
        { label: 'Overview', content: 'Overview content' },
        { label: 'Details', content: 'Details content', badge: '3' },
        { label: 'Reviews', content: 'Reviews content' }
    ],
    defaultTab = 0,
    variant = 'underline',
    fullWidth = false
}: TabsProps) {
    const { theme } = useDesignStore();
    const [activeTab, setActiveTab] = React.useState(defaultTab);

    const getTabStyle = (index: number, isActive: boolean) => {
        const baseStyle = {
            padding: '12px 20px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: '15px',
            fontWeight: isActive ? '500' : '400',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flex: fullWidth ? '1' : 'none',
            justifyContent: fullWidth ? 'center' : 'flex-start',
            textAlign: 'center' as const,
            border: 'none',
            background: 'none'
        };

        switch (variant) {
            case 'underline':
                return {
                    ...baseStyle,
                    color: isActive ? theme.colors.primary : theme.colors.text,
                    borderBottom: isActive ? `2px solid ${theme.colors.primary}` : '2px solid transparent',
                    opacity: isActive ? 1 : 0.7
                };
            case 'pills':
                return {
                    ...baseStyle,
                    borderRadius: theme.radius,
                    backgroundColor: isActive ? theme.colors.primary : 'transparent',
                    color: isActive ? '#ffffff' : theme.colors.text,
                    opacity: isActive ? 1 : 0.7
                };
            case 'enclosed':
                return {
                    ...baseStyle,
                    border: `1px solid ${isActive ? theme.colors.primary : `${theme.colors.text}20`}`,
                    borderBottom: isActive ? 'none' : `1px solid ${theme.colors.text}20`,
                    borderRadius: `${theme.radius} ${theme.radius} 0 0`,
                    backgroundColor: isActive ? theme.colors.surface : 'transparent',
                    color: isActive ? theme.colors.primary : theme.colors.text,
                    marginBottom: '-1px'
                };
            default:
                return baseStyle;
        }
    };

    return (
        <div style={{ width: '100%' }}>
            {/* Tab Headers */}
            <div
                role="tablist"
                style={{
                    display: 'flex',
                    gap: variant === 'pills' ? '8px' : '0',
                    borderBottom: variant === 'underline' ? `1px solid ${theme.colors.text}20` : 'none',
                    marginBottom: variant === 'enclosed' ? '0' : '20px',
                    flexWrap: 'wrap'
                }}
            >
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        role="tab"
                        aria-selected={activeTab === index}
                        onClick={() => setActiveTab(index)}
                        style={getTabStyle(index, activeTab === index)}
                        onMouseEnter={(e) => {
                            if (activeTab !== index) {
                                e.currentTarget.style.opacity = '1';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (activeTab !== index) {
                                e.currentTarget.style.opacity = '0.7';
                            }
                        }}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                        {tab.badge && (
                            <span
                                style={{
                                    padding: '2px 6px',
                                    borderRadius: '10px',
                                    backgroundColor: activeTab === index && variant === 'pills'
                                        ? 'rgba(255, 255, 255, 0.3)'
                                        : theme.colors.accent,
                                    color: '#ffffff',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    minWidth: '20px',
                                    textAlign: 'center'
                                }}
                            >
                                {tab.badge}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div
                role="tabpanel"
                style={{
                    padding: variant === 'enclosed' ? '20px' : '0',
                    border: variant === 'enclosed' ? `1px solid ${theme.colors.text}20` : 'none',
                    borderTop: variant === 'enclosed' ? `1px solid ${theme.colors.primary}` : 'none',
                    borderRadius: variant === 'enclosed' ? `0 ${theme.radius} ${theme.radius} ${theme.radius}` : '0',
                    backgroundColor: variant === 'enclosed' ? theme.colors.surface : 'transparent',
                    color: theme.colors.text
                }}
            >
                {tabs[activeTab]?.content || (
                    <p style={{ margin: 0 }}>Content for {tabs[activeTab]?.label}</p>
                )}
            </div>
        </div>
    );
}
