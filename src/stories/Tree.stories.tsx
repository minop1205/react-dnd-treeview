import React from "react";
import { Story, Meta } from "@storybook/react";
import * as argTypes from "./argTypes";
import { Tree } from "../Tree";
import { TreeProps } from "../types";
import sampleData from "./assets/sample-default.json";
import { CustomNode } from "./CustomNode";
import { useDropHandler } from "./useDropHandler";

export type CustomData = {
  fileType: string;
  fileSize: string;
};

export default {
  component: Tree,
  title: "Tree",
  argTypes: {
    rootId: argTypes.rootId,
    onDrop: argTypes.onDrop,
    onChangeOpen: argTypes.onChangeOpen,
    tree: argTypes.tree,
    classes: argTypes.classes,
    render: argTypes.render,
  },
} as Meta<TreeProps<CustomData>>;

const Template: Story<TreeProps<CustomData>> = (args) => {
  const [tree, handleDrop] = useDropHandler<CustomData>(args);
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
