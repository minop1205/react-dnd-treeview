import React, { useState } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Story } from "@storybook/react";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import styles from "./FileDrop.module.css";
import type { FileProperties } from "~/stories/types";
import type { TreeProps, NodeModel, DropOptions } from "~/types";
import type { DragDropMonitor } from "dnd-core";

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
    setTree(newTree);
    args.onDrop(newTree, options);
  };

  // const handleNativeSourceDrop = (
  //   monitor: DragDropMonitor,
  //   options: NativeSourceDropOptions<FileProperties>
  // ) => {
  //   const sourceItem = monitor.getItem();
  //   const itemType = monitor.getItemType();
  //   const { dropTargetId } = options;

  //   if (itemType === "__NATIVE_FILE__") {
  //     const files = sourceItem.files as File[];
  //     const nodes: NodeModel<FileProperties>[] = files.map((file, index) => ({
  //       id: lastId + index,
  //       parent: dropTargetId,
  //       text: file.name,
  //       data: {
  //         fileSize: `${file.size / 1024} KB`,
  //         fileType: "text",
  //       },
  //     }));

  //     setTree([...tree, ...nodes]);
  //     setLastId(lastId + files.length);
  //   }

  //   if (args.onNativeSourceDrop) {
  //     args.onNativeSourceDrop(monitor, options);
  //   }
  // };

  return (
    <div className={styles.rootGrid}>
      <div className={styles.fileChooser}>
        <label htmlFor="contained-button-file">
          <Input id="contained-button-file" type="file" multiple />
          <Button variant="outlined" component="span">
            Upload
          </Button>
        </label>
      </div>
      <DndProvider
        backend={MultiBackend}
        options={getBackendOptions()}
        debugMode={true}
      >
        <Tree {...args} tree={tree} onDrop={handleDrop} />
      </DndProvider>
    </div>
  );
};
