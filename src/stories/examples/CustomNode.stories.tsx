import React from "react";
import { Meta } from "@storybook/react";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { Tree } from "~/Tree";
import { TreeProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { CustomNode } from "~/stories/CustomNode";
import { Template } from "~/stories/Template";
import sampleData from "~/stories/assets/sample-default.json";

export default {
  component: Tree,
  title: "Examples/Tree/Custom node",
  argTypes,
} as Meta<TreeProps<FileProperties>>;

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

CustomNodeStory.parameters = {
  docs: {
    page: pageFactory({}),
  },
};
