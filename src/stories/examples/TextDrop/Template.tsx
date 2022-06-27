import React, { useState } from "react";
import { Story } from "@storybook/react";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { useDropHandler } from "~/stories/useDropHandler";
import styles from "./TextDrop.module.css";
import type { FileProperties } from "~/stories/types";
import type { TreeProps, NodeModel, DropOptions } from "~/types";
import type { Identifier } from "dnd-core";

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
    if (itemType === "__NATIVE_TEXT__") {
      const text = dropItem.text as string;

      return {
        id: lastId,
        parent: dropTargetId,
        text,
        data: {
          fileSize: "1KB",
          fileType: "text",
        },
      } as NodeModel<FileProperties>;
    } else if (itemType === "__NATIVE_HTML__") {
      const html = dropItem.html as string;
      const tempEl = document.createElement("div");
      tempEl.innerHTML = html;
      const text = tempEl.textContent;

      return {
        id: lastId,
        parent: dropTargetId,
        text,
        data: {
          fileSize: "1KB",
          fileType: "text",
        },
      } as NodeModel<FileProperties>;
    }

    return dropItem as NodeModel<FileProperties>;
  };

  return (
    <div className={styles.rootGrid}>
      <div className={styles.fileChooser}>
        <p>ダミーテキストダミーテキストダミーテキストダミーテキスト</p>
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
