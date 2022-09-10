import React from "react";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { TypeIcon } from "~/stories/examples/components/TypeIcon";
import { NodeModel, RenderParams } from "~/types";
import { FileProperties } from "~/stories/types";
import styles from "./CustomNode.module.css";

type Props = RenderParams & {
  node: NodeModel<FileProperties>;
  isSelected: boolean;
  isDragging: boolean;
  testIdPrefix?: string;
  onClick: (e: React.MouseEvent, node: NodeModel<FileProperties>) => void;
};

export const CustomNode: React.FC<Props> = ({
  testIdPrefix = "",
  ...props
}) => {
  const { id, droppable, data } = props.node;
  const indent = props.depth * 24;

  const handleClick = (e: React.MouseEvent) => {
    props.onClick(e, props.node);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle();
  };

  if (props.isSelected) {
    props.containerRef.current?.classList.add(styles.selected);
  } else {
    props.containerRef.current?.classList.remove(styles.selected);
  }

  if (props.isDragging) {
    props.containerRef.current?.classList.add(styles.dragging);
  } else {
    props.containerRef.current?.classList.remove(styles.dragging);
  }

  return (
    <div
      className={styles.root}
      style={{ paddingInlineStart: indent }}
      data-testid={`${testIdPrefix}custom-node-${id}`}
      onClick={handleClick}
    >
      <div className={`${styles.arrow} ${props.isOpen ? styles.isOpen : ""}`}>
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ArrowRightIcon data-testid={`arrow-right-icon-${id}`} />
          </div>
        )}
      </div>
      <div className={styles.filetype}>
        <TypeIcon droppable={droppable || false} fileType={data?.fileType} />
      </div>
      <div className={styles.label}>
        <Typography variant="body2">{props.node.text}</Typography>
      </div>
    </div>
  );
};
