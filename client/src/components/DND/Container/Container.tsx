import { useMantineTheme } from "@mantine/core";
import classNames from "classnames";
import React, { forwardRef } from "react";
// import { Handle, Remove } from "../Item";

import { useSnapshot } from "valtio";
import { state } from "../../../Valtio/State";
import styles from "./Container.module.scss";

export interface Props {
  children: React.ReactNode;
  columns?: number;
  label?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hover?: boolean;
  handleProps?: React.HTMLAttributes<any>;
  scrollable?: boolean;
  shadow?: boolean;
  placeholder?: boolean;
  unstyled?: boolean;
  title?: string;
  onClick?(): void;
  onRemove?(): void;
}

export const Container = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      title,
      ...props
    }: Props,
    ref
  ) => {
    const Component = onClick ? "button" : "div";
    const snap = useSnapshot(state)

    const theme = useMantineTheme()
    return (

      <Component
        {...props}
        ref={ref}
        style={
          {
            ...style,
            "--columns": columns,
            "--containerColour": theme.colorScheme === 'dark' ? theme.colors.dark[6] : `${snap.specialization.colours?.tertiary}`,
            // "--containerColour": snap.darkMode ? snap.specialization.colours?.tertiary : "#25262b",
            "--scrollBarColour": snap.specialization.colours?.primary,
            "--scrollBarBackground": snap.specialization.colours?.tertiary,
          } as React.CSSProperties
        }
        className={classNames(
          styles.Container,
          unstyled && styles.unstyled,
          horizontal && styles.horizontal,
          hover && styles.hover,
          placeholder && styles.placeholder,
          scrollable && styles.scrollable,
          shadow && styles.shadow
        )}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <div className={styles.Header}>
            {label}
          </div>
        ) : null}

        {title ? (
          <div className={styles.Title}>
            {title}
          </div>
        ) : null}
        {placeholder ? children : <ul>{children}</ul>}
      </Component>

    );
  }
);
