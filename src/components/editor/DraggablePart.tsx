import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PartRenderer } from '@/components/parts/PartRenderer';
import { Part } from '@/types/layout';
import { useLayoutStore } from '@/store/layoutStore';

interface DraggablePartProps {
    part: Part;
}

export const DraggablePart: React.FC<DraggablePartProps> = ({ part }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: part.id });

    const { selectedPartId, selectPart } = useLayoutStore();
    const isSelected = selectedPartId === part.id;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        position: 'relative' as const,
        outline: isSelected ? '2px solid #3b82f6' : 'none',
        outlineOffset: '2px',
        cursor: 'grab',
        zIndex: isDragging ? 999 : 'auto',
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        selectPart(part.id);
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={handleClick}
            data-part={part.id}
        >
            <PartRenderer part={part} />
        </div>
    );
};
