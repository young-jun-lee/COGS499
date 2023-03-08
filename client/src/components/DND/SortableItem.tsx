import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { Item } from '..';
import { useMountStatus } from "./useMountStatus";
import { SortableItemProps } from "./SortableItemProps";

export function SortableItem({
    disabled, id, index, handle, renderItem, style, containerId, getIndex, wrapperStyle,
}: SortableItemProps) {
    const {
        setNodeRef, setActivatorNodeRef, listeners, isDragging, isSorting, over, overIndex, transform, transition,
    } = useSortable({
        id,
    });
    const mounted = useMountStatus();
    const mountedWhileDragging = isDragging && !mounted;

    return (
        <Item
            ref={disabled ? undefined : setNodeRef}
            value={id}
            dragging={isDragging}
            sorting={isSorting}
            handle={handle}
            handleProps={handle ? { ref: setActivatorNodeRef } : undefined}
            index={index}
            wrapperStyle={wrapperStyle({ index })}
            style={style({
                index,
                value: id,
                isDragging,
                isSorting,
                overIndex: over ? getIndex(over.id) : overIndex,
                containerId,
            })}
            transition={transition}
            transform={transform}
            fadeIn={mountedWhileDragging}
            listeners={listeners}
            renderItem={renderItem} />
    );
}
