import React, { useEffect } from "react";
import classNames from "classnames";
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import { Handle, Remove } from "./components";

import styles from "./Item.module.scss";
import { Remove } from "./components";
import { Button, CloseButton, ActionIcon, UnstyledButton } from "@mantine/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { useSnapshot } from "valtio";
import { state } from "../../../Valtio/State";

export interface Props {
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  handleProps?: any;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: React.ReactNode;
  containerId: string | number;

  onRemove?(): void;
  renderItem?(args: {
    dragOverlay: boolean;
    dragging: boolean;
    sorting: boolean;
    index: number | undefined;
    fadeIn: boolean;
    listeners: DraggableSyntheticListeners;
    ref: React.Ref<HTMLElement>;
    style: React.CSSProperties | undefined;
    transform: Props["transform"];
    transition: Props["transition"];
    value: Props["value"];
  }): React.ReactElement;
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        height,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        items,
        setItems,
        containerId,
        ...props
      },
      ref
    ) => {
      const snap = useSnapshot(state)
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value
        })
      ) : (
        <li
          className={classNames(
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay
          )}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(", "),
              "--translate-x": transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              "--translate-y": transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              "--scale-x": transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              "--scale-y": transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              "--index": index,
              "--color": color,
              "--courseColour": snap.specialization.colours?.secondary,
              "--courseOutline": snap.specialization.colours?.primary,
              "--courseTitle": snap.specialization.colours?.tertiary,
            } as React.CSSProperties
          }
          ref={ref}
        >
          <div
            className={classNames(
              styles.Item,
              dragging && styles.dragging,
              handle && styles.withHandle,
              dragOverlay && styles.dragOverlay,
              disabled && styles.disabled,
              color && styles.color
            )}
            style={style}
            data-cypress="draggable-item"
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            {value}

          </div>
          <UnstyledButton style={{
            position: "absolute",
            display: "flex",
            width: "20px",
            height: "20px",
            alignItems: "center",
            justifyContent: "center",
            top: -7,
            right: -7,
            color: "#9C090E",
            backgroundColor: "white",
            borderRadius: "50%",
            fontSize: "25px",
            border: `2px solid ${snap.specialization.colours?.primary}`
          }} onClick={() => {
            const newItems = [
              ...items[containerId].slice(0, index),
              ...items[containerId].slice(index + 1)
            ]
            setItems({
              ...items,
              [containerId]: newItems
            })
          }}>

            <span>&times;</span>
          </UnstyledButton>
        </li>

      );
    }
  )
);
