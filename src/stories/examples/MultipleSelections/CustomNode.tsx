import React from "react";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { NodeModel } from "~/types";
import { FileProperties } from "~/stories/types";
import { TypeIcon } from "~/stories/examples/components/TypeIcon";
import styles from "./CustomNode.module.css";

type Props = {
  node: NodeModel<FileProperties>;
  depth: number;
  isOpen: boolean;
  isSelected: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onSelect: (node: NodeModel) => void;
};

export const CustomNode: React.FC<Props> = (props) => {
  const { droppable, data } = props.node;
  const indent = props.depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleSelect = () => props.onSelect(props.node);

  return (
    <div
      className={`${styles.root} ${props.isSelected ? styles.isSelected : ""}`}
      style={{ paddingInlineStart: indent }}
      onClick={handleSelect}
    >
      <div className={`${styles.arrow} ${props.isOpen ? styles.isOpen : ""}`}>
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ArrowRightIcon />
          </div>
        )}
      </div>
      <div>
        <Checkbox
          style={{ padding: 6 }}
          color="primary"
          size="small"
          checked={props.isSelected}
          onClick={handleSelect}
        />
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
