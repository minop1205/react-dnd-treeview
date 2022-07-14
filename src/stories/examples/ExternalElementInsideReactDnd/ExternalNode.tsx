import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
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
  const [, drag, dragPreview] = useDrag({
    type: "EXTERNAL_NODE",
    item: props.node,
  });

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  return (
    <div ref={drag} className={styles.root} data-testid={`external-node-${id}`}>
      <div className={styles.filetype}>
        <TypeIcon droppable={droppable || false} fileType={data?.fileType} />
      </div>
      <div className={styles.label}>
        <Typography variant="body2">{props.node.text}</Typography>
      </div>
    </div>
  );
};
