import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import Typography from "@mui/material/Typography";
import styles from "./CustomNode.module.css";
import type { RefObject } from "react";
import type { NodeModel } from "~/types";

type Props = {
  node: NodeModel;
  depth: number;
  isOpen: boolean;
  testIdPrefix?: string;
  handleRef: RefObject<HTMLDivElement | null>;
  onToggle: (id: NodeModel["id"]) => void;
};

export const CustomNode: React.FC<Props> = ({
  testIdPrefix = "",
  ...props
}) => {
  const { id } = props.node;
  const indent = props.depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  return (
    <div
      className={styles.root}
      style={{ paddingInlineStart: indent }}
      data-testid={`${testIdPrefix}custom-node-${id}`}
    >
      <div
        className={styles.handle}
        ref={props.handleRef}
        data-testid={`drag-handle-${props.node.id}`}
      >
        <DragHandleIcon />
      </div>
      <div className={styles.label}>
        <Typography variant="body2">{props.node.text}</Typography>
      </div>
      <div className={`${styles.expand} ${props.isOpen ? styles.isOpen : ""}`}>
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ArrowDropDownIcon data-testid={`arrow-drop-down-icon-${id}`} />
          </div>
        )}
      </div>
    </div>
  );
};
