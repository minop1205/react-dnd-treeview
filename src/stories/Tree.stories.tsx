import React from "react";
import { Story, Meta } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
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
  argTypes: {
    onChangeOpen: {},
    onDrop: {},
  },
} as Meta;

const Template: Story<TreeProps<CustomData>> = (args) => {
  const [, updateArgs] = useArgs();
  const handleDrop = (
    newTree: NodeModel<CustomData>[],
    options: DropHandlerOptions<CustomData>
  ) => {
    args.onDrop(newTree, options);
    updateArgs({ tree: newTree });
  };

  return <Tree {...args} onDrop={handleDrop} />;
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
