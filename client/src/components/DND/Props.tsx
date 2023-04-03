import React from 'react';
import {
    CancelDrop, Modifiers,
    UniqueIdentifier
} from '@dnd-kit/core';
import { SortingStrategy } from '@dnd-kit/sortable';
// import { Items } from './MultipleContainers';

export interface Props {
    adjustScale?: boolean;
    cancelDrop?: CancelDrop;
    columns?: number;
    containerStyle?: React.CSSProperties;
    getItemStyles?(args: {
        value: UniqueIdentifier;
        index: number;
        overIndex: number;
        isDragging: boolean;
        containerId: UniqueIdentifier;
        isSorting: boolean;
        isDragOverlay: boolean;
    }): React.CSSProperties;
    wrapperStyle?(args: { index: number; }): React.CSSProperties;
    itemCount?: number;
    items?: any;
    handle?: boolean;
    renderItem?: any;
    strategy?: SortingStrategy;
    modifiers?: Modifiers;
    minimal?: boolean;
    trashable?: boolean;
    scrollable?: boolean;
    vertical?: boolean;
}
