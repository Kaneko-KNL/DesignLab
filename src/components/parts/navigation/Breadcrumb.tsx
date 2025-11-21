"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
    label: string;
    href: string;
}

export interface BreadcrumbProps {
    items?: BreadcrumbItem[];
    showHome?: boolean;
    separator?: 'chevron' | 'slash';
}

export function Breadcrumb({
    items = [
        { label: 'Products', href: '#' },
        { label: 'Category', href: '#' },
        { label: 'Item', href: '#' }
    ],
    showHome = true,
    separator = 'chevron'
}: BreadcrumbProps) {
    const { theme } = useDesignStore();

    const allItems = showHome
        ? [{ label: 'Home', href: '#', isHome: true }, ...items]
        : items;

    return (
        <nav
            style={{
                padding: '12px 0',
                width: '100%'
            }}
            aria-label="Breadcrumb"
        >
            <ol
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '8px',
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    fontSize: '14px'
                }}
            >
                {allItems.map((item: BreadcrumbItem & { isHome?: boolean }, index) => (
                    <React.Fragment key={index}>
                        <li
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <a
                                href={item.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    color: index === allItems.length - 1
                                        ? theme.colors.text
                                        : theme.colors.primary,
                                    textDecoration: 'none',
                                    fontWeight: index === allItems.length - 1 ? '500' : '400',
                                    transition: 'opacity 0.2s',
                                    cursor: index === allItems.length - 1 ? 'default' : 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    if (index !== allItems.length - 1) {
                                        e.currentTarget.style.opacity = '0.7';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.opacity = '1';
                                }}
                                aria-current={index === allItems.length - 1 ? 'page' : undefined}
                            >
                                {item.isHome && <Home size={16} />}
                                {item.label}
                            </a>
                        </li>
                        {index < allItems.length - 1 && (
                            <li
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: `${theme.colors.text}60`
                                }}
                                aria-hidden="true"
                            >
                                {separator === 'chevron' ? (
                                    <ChevronRight size={16} />
                                ) : (
                                    <span>/</span>
                                )}
                            </li>
                        )}
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
}
