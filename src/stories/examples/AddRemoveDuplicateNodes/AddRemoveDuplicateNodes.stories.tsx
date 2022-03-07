import React from "react";
import { Meta } from "@storybook/react";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { Tree } from "~/Tree";
import { TreeProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import sampleData from "~/stories/assets/sample-default.json";
import { Template } from "./Template";
import styles from "./AddRemoveDuplicateNodes.module.css";

export default {
  component: Tree,
  title: "Examples/Tree/Add, remove, duplicate nodes",
  argTypes,
} as Meta<TreeProps<FileProperties>>;

export const AddRemoveDuplicateNodesStory = Template.bind({});

AddRemoveDuplicateNodesStory.args = {
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
  dragPreviewRender: (monitorProps) => (
    <CustomDragPreview monitorProps={monitorProps} />
  ),
};

AddRemoveDuplicateNodesStory.storyName = "Add, remove, duplicate nodes";

AddRemoveDuplicateNodesStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "add-remove-duplicate-js-u9v93e",
      tsId: "add-remove-duplicate-ts-8q20pd",
    }),
  },
};
