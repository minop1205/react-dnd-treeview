import React, { useState } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Story } from "@storybook/react";
import { NativeTypes } from "react-dnd-html5-backend";
import { Tree } from "~/index";
import type { TreeProps, NodeModel, DropOptions } from "~/types";
import { FileProperties } from "~/stories/types";
import styles from "./FileDrop.module.css";

const Input = styled("input")({
  display: "none",
});

export const Template: Story<TreeProps<FileProperties>> = (args) => {
  const [tree, setTree] = useState<NodeModel<FileProperties>[]>(args.tree);
  const [lastId, setLastId] = useState(105);

  const handleDrop = (
    newTree: NodeModel<FileProperties>[],
    options: DropOptions<FileProperties>
  ) => {
    const { dropTargetId, monitor } = options;
    const itemType = monitor.getItemType();

    if (itemType === NativeTypes.FILE) {
      const files: File[] = monitor.getItem().files;
      const nodes: NodeModel<FileProperties>[] = files.map((file, index) => ({
        id: lastId + index,
        parent: dropTargetId,
        text: file.name,
        data: {
          fileSize: `${file.size / 1024}KB`,
          fileType: "text",
        },
      }));

      const mergedTree = [...newTree, ...nodes];
      setTree(mergedTree);
      setLastId(lastId + files.length);
      args.onDrop(mergedTree, options);
    } else {
      setTree(newTree);
      setLastId(lastId + 1);
      args.onDrop(newTree, options);
    }
  };

  return (
    <div className={styles.rootGrid}>
      <div className={styles.fileChooser}>
        <label htmlFor="contained-button-file">
          <Input id="contained-button-file" type="file" multiple />
          <Button variant="outlined" component="span">
            Open File Chooser
          </Button>
        </label>
      </div>
      <Tree {...args} tree={tree} onDrop={handleDrop} />
    </div>
  );
};
