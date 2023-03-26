import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { UnstyledButton } from "@mantine/core";
import { useSnapshot } from "valtio";
import { Items } from "../../../types/stateTypes";
import { state } from "../../../Valtio/State";
import styles from "./Item.module.scss";

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
  items?: Items;
  setItems?: React.Dispatch<React.SetStateAction<{}>>;
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
      const [hover, setHover] = useState(false);

      const handleMouseEnter = () => {
        setHover(true);
      };

      const handleMouseLeave = () => {
        setHover(false);
      };
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
              "--courseOutline": snap.specialization.colours?.primary,
              "--courseColour": snap.specialization.colours?.secondary,
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

          <UnstyledButton
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="CloseButton" style={{
              position: "absolute",
              display: "flex",
              // width: "20px",
              width: hover ? "22px" : "20px",
              height: hover ? "22px" : "20px",
              alignItems: "center",
              justifyContent: "center",
              top: -7,
              right: -7,
              // color: "#9C090E",
              color: "black",
              backgroundColor: "white",
              borderRadius: "50%",
              transition: "all 0.2s ease-in-out",
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
