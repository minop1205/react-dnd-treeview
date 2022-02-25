import { Meta } from "@storybook/react";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { Tree } from "~/Tree";
import { TreeProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { Template } from "./Template";
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./SelectNode.module.css";

export default {
  component: Tree,
  title: "Examples/Tree/Select node",
  argTypes,
} as Meta<TreeProps<FileProperties>>;

export const SelectNodeStory = Template.bind({});

SelectNodeStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
    draggingSource: styles.draggingSource,
    dropTarget: styles.dropTarget,
  },
};

SelectNodeStory.storyName = "Select node";

SelectNodeStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "select-node-js-diykvq",
      tsId: "select-node-ts-gocexe",
    }),
  },
};
