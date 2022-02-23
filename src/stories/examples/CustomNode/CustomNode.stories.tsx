import React from "react";
import { Meta } from "@storybook/react";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { Tree } from "~/Tree";
import { TreeProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { DefaultTemplate } from "~/stories/examples/templates/DefaultTemplate";
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./CustomNode.module.css";

export default {
  component: Tree,
  title: "Examples/Tree/Custom node",
  argTypes,
} as Meta<TreeProps<FileProperties>>;

export const CustomNodeStory = DefaultTemplate.bind({});

CustomNodeStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
    draggingSource: styles.draggingSource,
    dropTarget: styles.dropTarget,
  },
  render: function render(node, options) {
    return <CustomNode node={node} {...options} />;
  },
};

CustomNodeStory.storyName = "Custom node";

CustomNodeStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "custom-node-js-b6bzqc",
      tsId: "custom-node-ts-6ws8ou",
    }),
  },
};
