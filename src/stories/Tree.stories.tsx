import React from "react";
import { Story, Meta } from "@storybook/react";
import { useArgs } from "@storybook/client-api";
import { Tree } from "../Tree";
import { NodeModel, TreeProps, DropHandlerOptions } from "../types";
import sampleData from "./assets/sample-default.json";

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
export const MinimumConfiguration = Template.bind({});

MinimumConfiguration.args = {
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

MinimumConfiguration.storyName = "Minimum configuration";
