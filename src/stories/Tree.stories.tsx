import React, { useState } from "react";
import { Story, Meta } from "@storybook/react";
import { Tree } from "../Tree";
import { NodeModel, TreeProps, DropHandlerOptions } from "../types";
import sampleData from "./assets/sample-default.json";
import { CustomNode } from "./CustomNode";

export type CustomData = {
  fileType: string;
  fileSize: string;
};

export default {
  component: Tree,
  title: "Tree",
  parameters: {
    controls: { disable: true },
  },
  argTypes: {
    onDrop: {},
    onChangeOpen: {},
  },
} as Meta;

const Template: Story<TreeProps<CustomData>> = (args) => {
  const [tree, setTree] = useState<NodeModel<CustomData>[]>(args.tree);
  const handleDrop = (
    newTree: NodeModel<CustomData>[],
    options: DropHandlerOptions<CustomData>
  ) => {
    args.onDrop(newTree, options);
    setTree(newTree);
  };

  return <Tree {...args} tree={tree} onDrop={handleDrop} />;
};

// Minimum configuration
export const MinimumConfigurationStory = Template.bind({});

MinimumConfigurationStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: "tree-root",
  },
  render: function render(node, { depth, isOpen, onToggle }) {
    return (
      <div style={{ marginInlineStart: depth * 10 }}>
        {node.droppable && (
          <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
        )}
        {node.text}
      </div>
    );
  },
};

MinimumConfigurationStory.storyName = "Minimum configuration";

// Custom node
export const CustomNodeStory = Template.bind({});

CustomNodeStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: "tree-root",
    draggingSource: "dragging-source",
    dropTarget: "drop-target",
  },
  render: function render(node, options) {
    return <CustomNode node={node} {...options} />;
  },
};

CustomNodeStory.storyName = "Custom node";
