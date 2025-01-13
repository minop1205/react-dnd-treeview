import React, { useState } from "react";
import { ArrowRight, Delete, FileCopy } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDragOver } from "~/hooks";
import { TypeIcon } from "~/stories/examples/components/TypeIcon";
import styles from "./CustomNode.module.css";
import type { FileProperties } from "~/stories/types";
import type { NodeModel } from "~/types";

type Props = {
  node: NodeModel<FileProperties>;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onDelete: (id: NodeModel["id"]) => void;
  onCopy: (id: NodeModel["id"]) => void;
};

export const CustomNode: React.FC<Props> = (props) => {
  const [hover, setHover] = useState<boolean>(false);
  const { id, droppable, data } = props.node;
  const indent = props.depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    <div
      className={styles.root}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-testid={`custom-node-${id}`}
    >
      <div className={`${styles.arrow} ${props.isOpen ? styles.isOpen : ""}`}>
        {props.node.droppable && (
          <div onClick={handleToggle} data-testid={`arrow-right-icon-${id}`}>
            <ArrowRight />
          </div>
        )}
      </div>
      <div className={styles.filetype}>
        <TypeIcon droppable={droppable ?? false} fileType={data?.fileType} />
      </div>
      <div className={styles.label}>
        <Typography variant="body2">{props.node.text}</Typography>
      </div>
      {hover && (
        <>
          <div className={styles.actionButton}>
            <IconButton
              size="small"
              onClick={() => props.onDelete(id)}
              data-testid={`btn-delete-${id}`}
            >
              <Delete fontSize="small" />
            </IconButton>
          </div>
          <div className={styles.actionButton}>
            <IconButton
              size="small"
              onClick={() => props.onCopy(id)}
              data-testid={`btn-copy-${id}`}
            >
              <FileCopy fontSize="small" />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
};
