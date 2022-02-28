import { Meta } from "@storybook/react";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { Tree } from "~/Tree";
import { TreeProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { Template } from "./Template";
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./OpeningAndClosingAllNodes.module.css";

export default {
  component: Tree,
  title: "Examples/Tree/Opening and closing all nodes",
  argTypes,
} as Meta<TreeProps<FileProperties>>;

export const OpeningAndClosingAllNodesStory = Template.bind({});

OpeningAndClosingAllNodesStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
    draggingSource: styles.draggingSource,
    dropTarget: styles.dropTarget,
  },
};

OpeningAndClosingAllNodesStory.storyName = "Opening and closing all nodes";

OpeningAndClosingAllNodesStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "opening-and-closing-all-nodes-js-eqxzti",
      tsId: "opening-and-closing-all-nodes-ts-xeb5v4",
    }),
  },
};
