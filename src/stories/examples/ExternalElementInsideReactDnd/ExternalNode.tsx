import React, { useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { TypeIcon } from "~/stories/examples/components/TypeIcon";
import styles from "./ExternalNode.module.css";
import type { FileProperties } from "~/stories/types";
import type { NodeModel } from "~/types";

type Props = {
  node: NodeModel<FileProperties>;
};

export const ExternalNode: React.FC<Props> = (props) => {
  const { id, droppable, data } = props.node;
  const [, drag, dragPreview] = useDrag({
    type: "EXTERNAL_NODE",
    item: props.node,
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  drag(ref);

  return (
    <div ref={ref} className={styles.root} data-testid={`external-node-${id}`}>
      <div className={styles.filetype}>
        <TypeIcon droppable={droppable || false} fileType={data?.fileType} />
      </div>
      <div className={styles.label}>
        <Typography variant="body2">{props.node.text}</Typography>
      </div>
    </div>
  );
};
