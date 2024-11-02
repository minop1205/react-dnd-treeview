import React, { useState } from "react";
import { Tree } from "~/Tree";
import { useDropHandler } from "~/stories/useDropHandler";
import { CustomNode } from "./CustomNode";
import styles from "./MultipleSelections.module.css";
import type { StoryFn } from "@storybook/react";
import type { FileProperties } from "~/stories/types";
import type { TreeProps, NodeModel } from "~/types";

export const Template: StoryFn<TreeProps<FileProperties>> = (args) => {
  const [tree, handleDrop] = useDropHandler<FileProperties>(args);
  const [selectedNodes, setSelectedNodes] = useState<NodeModel[]>([]);

  const handleSelect = (node: NodeModel) => {
    const item = selectedNodes.find((n) => n.id === node.id);

    if (!item) {
      setSelectedNodes([...selectedNodes, node]);
    } else {
      setSelectedNodes(selectedNodes.filter((n) => n.id !== node.id));
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedNodes([]);
    }
  };

  return (
    <>
      <div className={styles.current}>
        <p>
          Current node:{" "}
          <span className={styles.currentLabel} data-testid="selected-node">
            {selectedNodes.length === 0
              ? "none"
              : selectedNodes.map((n) => n.text).join(", ")}
          </span>
        </p>
      </div>
      <Tree
        {...args}
        tree={tree}
        onDrop={handleDrop}
        render={(
          node: NodeModel<FileProperties>,
          { depth, isOpen, onToggle },
        ) => (
          <CustomNode
            node={node}
            depth={depth}
            isOpen={isOpen}
            isSelected={!!selectedNodes.find((n) => n.id === node.id)}
            onToggle={onToggle}
            onSelect={handleSelect}
          />
        )}
        rootProps={{
          onClick: handleClear,
        }}
      />
    </>
  );
};
