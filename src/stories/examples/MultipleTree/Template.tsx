import React, { useState } from "react";
import { Story } from "@storybook/react";
import { NodeModel, DropOptions } from "~/types";
import sampleData from "~/stories/assets/multiple-tree.json";
import { getDescendants } from "~/utils";
import { TreeView } from "./TreeView";
import styles from "./MultipleTree.module.css";

export const Template: Story = () => {
  const [treeData, setTreeData] = useState<NodeModel[]>(sampleData);
  const handleDrop = (
    newTree: NodeModel[],
    { dragSourceId, dropTargetId }: DropOptions
  ) => {
    setTreeData(
      treeData.map((node) => {
        if (node.id === dragSourceId) {
          return {
            ...node,
            parent: dropTargetId,
          };
        }

        return node;
      })
    );
  };

  const tree1 = getDescendants(treeData, 100);
  const tree2 = getDescendants(treeData, 200);
  const tree3 = getDescendants(treeData, 300);

  return (
    <div className={styles.rootGrid}>
      <div className={styles.column}>
        <TreeView
          tree={tree1}
          onDrop={handleDrop}
          rootId={100}
          testIdPrefix="tree1-"
        />
      </div>
      <div className={styles.column}>
        <TreeView
          tree={tree2}
          onDrop={handleDrop}
          rootId={200}
          testIdPrefix="tree2-"
        />
      </div>
      <div className={styles.column}>
        <TreeView
          tree={tree3}
          onDrop={handleDrop}
          rootId={300}
          testIdPrefix="tree3-"
        />
      </div>
    </div>
  );
};
