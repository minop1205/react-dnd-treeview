import React, { useState } from "react";
import {
  Button,
  Select,
  TextField,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  SelectChangeEvent,
} from "@mui/material";
import { NodeModel } from "~/types";
import { FileProperties } from "~/stories/types";
import styles from "./AddDialog.module.css";

type Props = {
  tree: NodeModel<FileProperties>[];
  onClose: () => void;
  onSubmit: (e: Omit<NodeModel<FileProperties>, "id">) => void;
};

export const AddDialog: React.FC<Props> = (props) => {
  const [text, setText] = useState("");
  const [fileType, setFileType] = useState("text");
  const [parent, setParent] = useState(0);
  const [droppable, setDroppable] = useState(false);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleChangeParent = (e: SelectChangeEvent<NodeModel["id"]>) => {
    setParent(Number(e.target.value));
  };

  const handleChangeDroppable = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDroppable(e.target.checked);
  };

  const handleChangeFileType = (e: SelectChangeEvent) => {
    setFileType(e.target.value);
  };

  return (
    <Dialog
      open={true}
      onClose={props.onClose}
      disablePortal
      data-testid="dialog"
    >
      <DialogTitle>Add New Node</DialogTitle>
      <DialogContent className={styles.content}>
        <div>
          <TextField
            label="Text"
            fullWidth
            onChange={handleChangeText}
            value={text}
            inputProps={{
              "data-testid": "dialog-input-text",
            }}
          />
        </div>
        <div>
          <FormControl className={styles.select}>
            <InputLabel>Parent</InputLabel>
            <Select label="Parent" onChange={handleChangeParent} value={parent}>
              <MenuItem value={0}>(root)</MenuItem>
              {props.tree
                .filter((node) => node.droppable === true)
                .map((node) => (
                  <MenuItem key={node.id} value={node.id}>
                    {node.text}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={droppable}
                onChange={handleChangeDroppable}
                color="primary"
              />
            }
            label="Droppable"
          />
        </div>
        {!droppable && (
          <div>
            <FormControl className={styles.select}>
              <InputLabel>File type</InputLabel>
              <Select
                label="FileType"
                onChange={handleChangeFileType}
                value={fileType}
              >
                <MenuItem value="text">TEXT</MenuItem>
                <MenuItem value="csv">CSV</MenuItem>
                <MenuItem value="image">IMAGE</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button
          disabled={text === ""}
          onClick={() =>
            props.onSubmit({
              text,
              parent,
              droppable,
              data: {
                fileType,
                fileSize: "",
              },
            })
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
