import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { LayoutArea } from '@/types/layout';
import { useLayoutStore } from '@/store/layoutStore';
import { DraggablePart } from './DraggablePart';

interface DroppableAreaProps {
    area: LayoutArea;
    children?: React.ReactNode;
}

export const DroppableArea: React.FC<DroppableAreaProps> = ({ area }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: area.id,
    });

    const { parts } = useLayoutStore();
    const areaParts = area.components
        .map(id => parts[id])
        .filter(Boolean);

    return (
        <div
            ref={setNodeRef}
            style={{
                ...area.styles,
                gridArea: area.gridArea,
                minHeight: '100px',
                padding: '16px',
                border: isOver ? '2px dashed #3b82f6' : '2px dashed rgba(0,0,0,0.1)',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                backgroundColor: isOver ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}
        >
            {areaParts.length === 0 && (
                <div style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(0,0,0,0.3)',
                    fontSize: '14px',
                    pointerEvents: 'none'
                }}>
                    {area.label || 'Drop items here'}
                </div>
            )}
            <SortableContext
                items={area.components}
                strategy={verticalListSortingStrategy}
            >
                {areaParts.map((part) => (
                    <DraggablePart key={part.id} part={part} />
                ))}
            </SortableContext>
        </div>
    );
};
