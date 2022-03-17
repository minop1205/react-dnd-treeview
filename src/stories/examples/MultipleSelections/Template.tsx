import React, { useState } from "react";
import { Story } from "@storybook/react";
import { Tree } from "~/Tree";
import { TreeProps, NodeModel } from "~/types";
import { useDropHandler } from "~/stories/useDropHandler";
import { FileProperties } from "~/stories/types";
import { CustomNode } from "./CustomNode";
import styles from "./MultipleSelections.module.css";

export const Template: Story<TreeProps<FileProperties>> = (args) => {
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
          { depth, isOpen, onToggle }
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
