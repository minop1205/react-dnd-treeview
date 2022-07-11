import React, { useState } from "react";
import { Story } from "@storybook/react";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import styles from "./TextDrop.module.css";
import type { FileProperties } from "~/stories/types";
import type {
  TreeProps,
  NodeModel,
  DropOptions,
  NativeSourceDropOptions,
} from "~/types";
import type { DragDropMonitor } from "dnd-core";

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

  const handleNativeSourceDrop = (
    monitor: DragDropMonitor,
    options: NativeSourceDropOptions<FileProperties>
  ) => {
    const sourceItem = monitor.getItem();
    const itemType = monitor.getItemType();
    const { dropTargetId } = options;
    let node: NodeModel<FileProperties> | null = null;

    if (itemType === "__NATIVE_TEXT__") {
      const text = sourceItem.text as string;

      node = {
        id: lastId,
        parent: dropTargetId,
        text,
        data: {
          fileSize: "1KB",
          fileType: "text",
        },
      };
    } else if (itemType === "__NATIVE_HTML__") {
      const html = sourceItem.html as string;
      const tempEl = document.createElement("div");
      tempEl.innerHTML = html;
      const text = tempEl.textContent as string;

      node = {
        id: lastId,
        parent: dropTargetId,
        text,
        data: {
          fileSize: "1KB",
          fileType: "text",
        },
      };
    }

    if (node) {
      setTree([...tree, node]);
      setLastId(lastId + 1);
    }

    if (args.onNativeSourceDrop) {
      args.onNativeSourceDrop(monitor, options);
    }
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
          onNativeSourceDrop={handleNativeSourceDrop}
        />
      </DndProvider>
    </div>
  );
};
