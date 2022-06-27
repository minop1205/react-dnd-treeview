import React from "react";
import Typography from "@mui/material/Typography";
import { NodeModel } from "~/types";
import { FileProperties } from "~/stories/types";
import { TypeIcon } from "~/stories/examples/components/TypeIcon";
import styles from "./ExternalNode.module.css";

type Props = {
  node: NodeModel<FileProperties>;
};

export const ExternalNode: React.FC<Props> = (props) => {
  const { id, droppable, data } = props.node;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text", JSON.stringify(props.node));
  };

  return (
    <div
      draggable
      className={styles.root}
      data-testid={`external-node-${id}`}
      onDragStart={handleDragStart}
    >
      <div className={styles.filetype}>
        <TypeIcon droppable={droppable || false} fileType={data?.fileType} />
      </div>
      <div className={styles.label}>
        <Typography variant="body2">{props.node.text}</Typography>
      </div>
    </div>
  );
};
