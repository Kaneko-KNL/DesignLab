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
    const { setNodeRef } = useDroppable({
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
                minHeight: '100px', // Ensure drop target is visible even if empty
                padding: '8px',
                border: '1px dashed rgba(0,0,0,0.1)',
                borderRadius: '4px',
                transition: 'background-color 0.2s',
            }}
        >
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
