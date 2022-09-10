import React from "react";
import { Badge } from "@mui/material";
import { NodeModel } from "~/types";
import { FileProperties } from "~/stories/types";
import { TypeIcon } from "~/stories/examples/components/TypeIcon";
import styles from "./MultipleDragPreview.module.css";

type Props = {
  dragSources: NodeModel<FileProperties>[];
};

export const MultipleDragPreview: React.FC<Props> = (props) => {
  return (
    <Badge
      classes={{ badge: styles.badge }}
      color="error"
      badgeContent={props.dragSources.length}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <div className={styles.root} data-testid="multiple-drag-preview">
        {props.dragSources.map((node) => (
          <div key={node.id} className={styles.item}>
            <div className={styles.icon}>
              <TypeIcon
                droppable={node.droppable || false}
                fileType={node?.data?.fileType}
              />
            </div>
            <div className={styles.label}>{node.text}</div>
          </div>
        ))}
      </div>
    </Badge>
  );
};
