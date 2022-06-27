import React, { useState } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Story } from "@storybook/react";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { useDropHandler } from "~/stories/useDropHandler";
import styles from "./FileDrop.module.css";
import type { FileProperties } from "~/stories/types";
import type { TreeProps, NodeModel, DropOptions } from "~/types";
import type { Identifier } from "dnd-core";

const Input = styled("input")({
  display: "none",
});

export const Template: Story<TreeProps<FileProperties>> = (args) => {
  const [tree, updateTree] = useDropHandler<FileProperties>(args);
  const [lastId, setLastId] = useState(105);

  const handleDrop = (
    newTree: NodeModel<FileProperties>[],
    options: DropOptions<FileProperties>
  ) => {
    updateTree(newTree, options);
    setLastId((state) => state + 1);
  };

  const dropItemTransformer = (
    itemType: Identifier | null,
    dropItem: any,
    dropTargetId: NodeModel["id"]
  ) => {
    if (itemType === "__NATIVE_FILE__") {
      const file = dropItem.files[0] as File;

      return {
        id: lastId,
        parent: dropTargetId,
        text: file.name,
        data: {
          fileSize: `${dropItem.files[0].size / 1024}KB`,
          fileType: "image",
        },
      };
    }

    return dropItem as NodeModel<FileProperties>;
  };

  return (
    <div className={styles.rootGrid}>
      <div className={styles.fileChooser}>
        <label htmlFor="contained-button-file">
          <Input id="contained-button-file" type="file" />
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
        <Tree
          {...args}
          tree={tree}
          onDrop={handleDrop}
          dropItemTransformer={dropItemTransformer}
        />
      </DndProvider>
    </div>
  );
};
