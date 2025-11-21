"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { ShoppingCart, Heart } from 'lucide-react';

export interface ProductCardProps {
    image?: string;
    title?: string;
    price?: string;
    originalPrice?: string;
    badge?: string;
    rating?: number;
    showWishlist?: boolean;
}

export function ProductCard({
    image = 'https://placehold.co/400x400',
    title = 'Product Name',
    price = '$99.00',
    originalPrice,
    badge,
    rating = 4.5,
    showWishlist = true
}: ProductCardProps) {
    const { theme } = useDesignStore();
    const [isWishlisted, setIsWishlisted] = React.useState(false);

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '320px',
                backgroundColor: theme.colors.surface,
                border: `1px solid ${theme.colors.text}10`,
                borderRadius: theme.radius,
                overflow: 'hidden',
                boxShadow: theme.shadow,
                transition: 'transform 0.2s',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
                <img
                    src={image}
                    alt={title}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />

                {badge && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '12px',
                            left: '12px',
                            padding: '4px 12px',
                            backgroundColor: theme.colors.accent,
                            color: '#ffffff',
                            fontSize: '12px',
                            fontWeight: '600',
                            borderRadius: '4px',
                            textTransform: 'uppercase'
                        }}
                    >
                        {badge}
                    </div>
                )}

                {showWishlist && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsWishlisted(!isWishlisted);
                        }}
                        style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        <Heart
                            size={18}
                            style={{
                                fill: isWishlisted ? '#ef4444' : 'none',
                                color: isWishlisted ? '#ef4444' : '#000000',
                                strokeWidth: 2
                            }}
                        />
                    </button>
                )}
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
                    {title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                style={{
                                    color: i < Math.floor(rating) ? '#fbbf24' : `${theme.colors.text}20`,
                                    fontSize: '14px'
                                }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <span style={{ fontSize: '13px', color: `${theme.colors.text}70` }}>
                        ({rating})
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <span
                        style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: theme.colors.primary
                        }}
                    >
                        {price}
                    </span>
                    {originalPrice && (
                        <span
                            style={{
                                fontSize: '16px',
                                color: `${theme.colors.text}50`,
                                textDecoration: 'line-through'
                            }}
                        >
                            {originalPrice}
                        </span>
                    )}
                </div>

                <button
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: theme.colors.primary,
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: theme.radius,
                        fontSize: '15px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.9';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1';
                    }}
                >
                    <ShoppingCart size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
