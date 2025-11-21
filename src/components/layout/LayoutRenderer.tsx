import React from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragStartEvent
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useLayoutStore } from '@/store/layoutStore';
import { DroppableArea } from '@/components/editor/DroppableArea';
import { PartRenderer } from '@/components/parts/PartRenderer';

export const LayoutRenderer: React.FC = () => {
    const { currentLayout } = useLayoutStore();

    if (!currentLayout) {
        return <div>No layout generated</div>;
    }

    return (
        <div style={{
            display: 'grid',
            width: '100%',
            height: '100%',
            gap: currentLayout.gap,
            gridTemplateAreas: currentLayout.gridTemplateAreas.join(' '),
            gridTemplateColumns: currentLayout.gridTemplateColumns,
            gridTemplateRows: currentLayout.gridTemplateRows,
        }}>
            {currentLayout.areas.map((area) => (
                <DroppableArea key={area.id} area={area} />
            ))}
        </div>
    );
};
