import React from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Items } from '../../types/stateTypes';



export interface SortableItemProps {
    containerId: UniqueIdentifier;
    id: UniqueIdentifier;
    index: number;
    handle: boolean;
    disabled?: boolean;
    style(args: any): React.CSSProperties;
    getIndex(id: UniqueIdentifier): number;
    renderItem(): React.ReactElement;
    wrapperStyle({ index }: { index: number; }): React.CSSProperties;
    items: Items;
    setItems: React.Dispatch<React.SetStateAction<{}>>;
}
