import React, { RefObject } from "react";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { NodeModel } from "~/types";
import styles from "./CustomNode.module.css";

type Props = {
  node: NodeModel;
  depth: number;
  isOpen: boolean;
  testIdPrefix?: string;
  handleRef: RefObject<any>;
  onToggle: (id: NodeModel["id"]) => void;
};

export const CustomNode: React.FC<Props> = ({
  testIdPrefix = "",
  ...props
}) => {
  const { id, droppable, data } = props.node;
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
      <div className={styles.handle} ref={props.handleRef}>
        <DragHandleIcon />
      </div>
      <div className={styles.label}>
        <Typography variant="body2">{props.node.text}</Typography>
      </div>
      <div className={`${styles.expand} ${props.isOpen ? styles.isOpen : ""}`}>
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ExpandMoreIcon data-testid={`expand-more-icon-${id}`} />
          </div>
        )}
      </div>
    </div>
  );
};
