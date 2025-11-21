"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { ChevronRight } from 'lucide-react';

export interface SidebarItem {
    label: string;
    href: string;
    icon?: React.ReactNode;
    badge?: string;
    children?: SidebarItem[];
}

export interface SidebarNavigationProps {
    items?: SidebarItem[];
    title?: string;
    collapsed?: boolean;
}

export function SidebarNavigation({
    items = [
        { label: 'Dashboard', href: '#', badge: '5' },
        {
            label: 'Products', href: '#', children: [
                { label: 'All Products', href: '#' },
                { label: 'Categories', href: '#' }
            ]
        },
        { label: 'Orders', href: '#' },
        { label: 'Settings', href: '#' }
    ],
    title = 'Menu',
    collapsed = false
}: SidebarNavigationProps) {
    const { theme } = useDesignStore();
    const [expandedItems, setExpandedItems] = React.useState<Set<number>>(new Set());
    const [activeIndex, setActiveIndex] = React.useState(0);

    const toggleExpand = (index: number) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedItems(newExpanded);
    };

    return (
        <aside
            style={{
                width: collapsed ? '80px' : '280px',
                backgroundColor: theme.colors.surface,
                borderRight: `1px solid ${theme.colors.text}10`,
                padding: '24px 16px',
                height: '100%',
                minHeight: '400px',
                transition: 'width 0.3s',
                overflow: 'hidden'
            }}
        >
            {!collapsed && (
                <h3
                    style={{
                        margin: '0 0 20px 0',
                        fontSize: '18px',
                        fontWeight: '600',
                        color: theme.colors.text,
                        paddingLeft: '8px'
                    }}
                >
                    {title}
                </h3>
            )}

            <nav>
                <ul
                    style={{
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                    }}
                >
                    {items.map((item, index) => (
                        <li key={index}>
                            <div
                                onClick={() => {
                                    setActiveIndex(index);
                                    if (item.children) {
                                        toggleExpand(index);
                                    }
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px',
                                    borderRadius: theme.radius,
                                    backgroundColor: activeIndex === index
                                        ? `${theme.colors.primary}15`
                                        : 'transparent',
                                    color: activeIndex === index ? theme.colors.primary : theme.colors.text,
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                    fontWeight: activeIndex === index ? '500' : '400',
                                    fontSize: '15px'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeIndex !== index) {
                                        e.currentTarget.style.backgroundColor = `${theme.colors.text}05`;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeIndex !== index) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {item.icon}
                                    {!collapsed && <span>{item.label}</span>}
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {!collapsed && item.badge && (
                                        <span
                                            style={{
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                backgroundColor: theme.colors.accent,
                                                color: '#ffffff',
                                                fontSize: '12px',
                                                fontWeight: '500'
                                            }}
                                        >
                                            {item.badge}
                                        </span>
                                    )}
                                    {!collapsed && item.children && (
                                        <ChevronRight
                                            size={16}
                                            style={{
                                                transform: expandedItems.has(index) ? 'rotate(90deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.2s'
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Submenu */}
                            {!collapsed && item.children && expandedItems.has(index) && (
                                <ul
                                    style={{
                                        listStyle: 'none',
                                        margin: '4px 0 0 0',
                                        padding: '0 0 0 28px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '2px'
                                    }}
                                >
                                    {item.children.map((child, childIndex) => (
                                        <li key={childIndex}>
                                            <a
                                                href={child.href}
                                                style={{
                                                    display: 'block',
                                                    padding: '10px 12px',
                                                    borderRadius: theme.radius,
                                                    color: theme.colors.text,
                                                    textDecoration: 'none',
                                                    fontSize: '14px',
                                                    transition: 'background-color 0.2s',
                                                    opacity: 0.8
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = `${theme.colors.text}05`;
                                                    e.currentTarget.style.opacity = '1';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                    e.currentTarget.style.opacity = '0.8';
                                                }}
                                            >
                                                {child.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
