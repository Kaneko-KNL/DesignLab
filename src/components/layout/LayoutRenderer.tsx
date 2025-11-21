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
    const { currentLayout, movePart, selectPart, parts } = useLayoutStore();
    const [activeId, setActiveId] = React.useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    if (!currentLayout) {
        return <div>No layout generated</div>;
    }

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
        selectPart(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        // Find which area the "over" element belongs to
        let targetAreaId = overId;
        let newIndex = 0;

        // Check if overId is a known area ID
        const isOverArea = currentLayout.areas.some(a => a.id === overId);

        if (!isOverArea) {
            // Dropped over another part
            const overPart = parts[overId];
            if (overPart) {
                targetAreaId = overPart.areaId;
                // Find index of overPart in that area
                const area = currentLayout.areas.find(a => a.id === targetAreaId);
                if (area) {
                    const overIndex = area.components.indexOf(overId);
                    newIndex = overIndex;
                }
            }
        } else {
            // Dropped directly on an area
            const area = currentLayout.areas.find(a => a.id === targetAreaId);
            if (area) {
                newIndex = area.components.length;
            }
        }

        if (activeId !== overId) {
            movePart(activeId, targetAreaId, newIndex);
        }
    };

    const activePart = activeId ? parts[activeId] : null;

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
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
            <DragOverlay>
                {activePart ? (
                    <div style={{ opacity: 0.8 }}>
                        <PartRenderer part={activePart} />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};
