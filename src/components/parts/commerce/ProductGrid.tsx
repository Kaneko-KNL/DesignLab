"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { ShoppingCart } from 'lucide-react';

export interface ProductGridItem {
    id: string;
    image: string;
    title: string;
    price: string;
    originalPrice?: string;
}

export interface ProductGridProps {
    products?: ProductGridItem[];
    columns?: 2 | 3 | 4;
    title?: string;
}

export function ProductGrid({
    products = [
        { id: '1', image: 'https://placehold.co/400x400', title: 'Product 1', price: '$49.00' },
        { id: '2', image: 'https://placehold.co/400x400', title: 'Product 2', price: '$59.00', originalPrice: '$79.00' },
        { id: '3', image: 'https://placehold.co/400x400', title: 'Product 3', price: '$69.00' },
        { id: '4', image: 'https://placehold.co/400x400', title: 'Product 4', price: '$89.00' },
        { id: '5', image: 'https://placehold.co/400x400', title: 'Product 5', price: '$99.00' },
        { id: '6', image: 'https://placehold.co/400x400', title: 'Product 6', price: '$109.00' }
    ],
    columns = 3,
    title = 'Our Products'
}: ProductGridProps) {
    const { theme } = useDesignStore();

    return (
        <div style={{ width: '100%', padding: '40px 24px' }}>
            {title && (
                <h2
                    style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        color: theme.colors.text,
                        marginBottom: '32px',
                        textAlign: 'center'
                    }}
                >
                    {title}
                </h2>
            )}

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(auto-fill, minmax(${columns === 4 ? '220px' : columns === 3 ? '280px' : '350px'}, 1fr))`,
                    gap: '24px',
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            backgroundColor: theme.colors.surface,
                            border: `1px solid ${theme.colors.text}10`,
                            borderRadius: theme.radius,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = theme.shadow;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                paddingBottom: '100%',
                                overflow: 'hidden'
                            }}
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            />
                        </div>

                        <div style={{ padding: '16px' }}>
                            <h3
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: theme.colors.text,
                                    marginBottom: '8px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {product.title}
                            </h3>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '12px'
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        color: theme.colors.primary
                                    }}
                                >
                                    {product.price}
                                </span>
                                {product.originalPrice && (
                                    <span
                                        style={{
                                            fontSize: '14px',
                                            color: `${theme.colors.text}50`,
                                            textDecoration: 'line-through'
                                        }}
                                    >
                                        {product.originalPrice}
                                    </span>
                                )}
                            </div>

                            <button
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    backgroundColor: theme.colors.primary,
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: theme.radius,
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    transition: 'opacity 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.opacity = '0.9';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.opacity = '1';
                                }}
                            >
                                <ShoppingCart size={16} />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
