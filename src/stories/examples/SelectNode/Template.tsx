import React, { useState } from "react";
import { Story } from "@storybook/react";
import { Tree } from "~/Tree";
import { TreeProps, NodeModel } from "~/types";
import { useDropHandler } from "~/stories/useDropHandler";
import { FileProperties } from "~/stories/types";
import { CustomNode } from "./CustomNode";
import styles from "./SelectNode.module.css";

export const Template: Story<TreeProps<FileProperties>> = (args) => {
  const [tree, handleDrop] = useDropHandler<FileProperties>(args);
  const [selectedNode, setSelectedNode] = useState<NodeModel | null>(null);
  const handleSelect = (node: NodeModel) => setSelectedNode(node);

  return (
    <>
      <div className={styles.current}>
        <p>
          Current node:{" "}
          <span className={styles.currentLabel} data-testid="selected-node">
            {selectedNode ? selectedNode.text : "none"}
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
            isSelected={node.id === selectedNode?.id}
            onToggle={onToggle}
            onSelect={handleSelect}
          />
        )}
      />
    </>
  );
};
