"use client";

import React from 'react';
import { useDesignStore } from '@/store/designStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselItem {
    content: React.ReactNode;
}

export interface CarouselProps {
    items?: CarouselItem[];
    autoPlay?: boolean;
    interval?: number;
}

export function Carousel({
    items = [
        { content: 'Slide 1' },
        { content: 'Slide 2' },
        { content: 'Slide 3' }
    ],
    autoPlay = false,
    interval = 3000
}: CarouselProps) {
    const { theme } = useDesignStore();
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        if (!autoPlay) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, interval);
        return () => clearInterval(timer);
    }, [autoPlay, interval, items.length]);

    const next = () => setCurrentIndex((prev) => (prev + 1) % items.length);
    const prev = () => setCurrentIndex((curr) => (curr - 1 + items.length) % items.length);

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ overflow: 'hidden', borderRadius: theme.radius }}>
                <div
                    style={{
                        display: 'flex',
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transition: 'transform 0.5s ease-in-out'
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                minWidth: '100%',
                                padding: '40px',
                                backgroundColor: theme.colors.surface,
                                color: theme.colors.text,
                                textAlign: 'center',
                                fontSize: '24px',
                                fontWeight: '600'
                            }}
                        >
                            {item.content}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={prev}
                style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: theme.colors.surface,
                    border: `1px solid ${theme.colors.text}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
            >
                <ChevronLeft size={24} color={theme.colors.text} />
            </button>

            <button
                onClick={next}
                style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: theme.colors.surface,
                    border: `1px solid ${theme.colors.text}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
            >
                <ChevronRight size={24} color={theme.colors.text} />
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: index === currentIndex ? theme.colors.primary : `${theme.colors.text}30`,
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
