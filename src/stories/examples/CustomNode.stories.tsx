import React from "react";
import { Meta } from "@storybook/react";
import * as argTypes from "../argTypes";
import { Tree } from "../../Tree";
import { TreeProps } from "../../types";
import { FileProperties } from "../types";
import { CustomNode } from "../CustomNode";

export default {
  component: Tree,
  title: "Examples/Tree/Custom node",
  argTypes,
} as Meta<TreeProps<FileProperties>>;

import { Template } from "../Template";
import sampleData from "../assets/sample-default.json";

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
