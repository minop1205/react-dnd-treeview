import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { NodeModel } from "~/types";
import { useDragOver } from "~/hooks";
import { FileProperties } from "~/stories/types";
import styles from "./CustomNode.module.css";

type Props = {
  node: NodeModel<FileProperties>;
  depth: number;
  isOpen: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onTextChange: (id: NodeModel["id"], value: string) => void;
};

export const CustomNode: React.FC<Props> = (props) => {
  const { id, text } = props.node;
  const [visibleInput, setVisibleInput] = useState(false);
  const [labelText, setLabelText] = useState(text);
  const indent = props.depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleShowInput = () => {
    setVisibleInput(true);
  };

  const handleCancel = () => {
    setLabelText(text);
    setVisibleInput(false);
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelText(e.target.value);
  };

  const handleSubmit = () => {
    setVisibleInput(false);
    props.onTextChange(id, labelText);
  };

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

  return (
    <div
      className={styles.root}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
    >
      <div className={`${styles.arrow} ${props.isOpen ? styles.isOpen : ""}`}>
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ArrowRightIcon />
          </div>
        )}
      </div>
      <div className={styles.nodeInner}>
        {visibleInput ? (
          <div className={styles.inputWrapper}>
            <TextField
              className={styles.textField}
              value={labelText}
              onChange={handleChangeText}
            />
            <IconButton onClick={handleSubmit} disabled={labelText === ""}>
              <CheckIcon />
            </IconButton>
            <IconButton onClick={handleCancel}>
              <CloseIcon />
            </IconButton>
          </div>
        ) : (
          <div className={styles.inputWrapper}>
            <Typography variant="body2" className={styles.nodeLabel}>
              {props.node.text}
            </Typography>
            <IconButton onClick={handleShowInput}>
              <EditIcon />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};
