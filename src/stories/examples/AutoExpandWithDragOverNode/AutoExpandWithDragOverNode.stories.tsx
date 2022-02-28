import React from "react";
import { Meta } from "@storybook/react";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { Tree } from "~/Tree";
import { TreeProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./AutoExpandWithDragOverNode.module.css";

export default {
  component: Tree,
  title: "Examples/Tree/Auto expand with drag over node",
  argTypes,
} as Meta<TreeProps<FileProperties>>;

export const AutoExpandWithDragOverNodeStory = DefaultTemplate.bind({});

AutoExpandWithDragOverNodeStory.args = {
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

AutoExpandWithDragOverNodeStory.storyName = "Auto expand with drag over node";

AutoExpandWithDragOverNodeStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "auto-expand-with-drag-over-node-js-7izeed",
      tsId: "auto-expand-with-drag-over-node-ts-mde4zo",
    }),
  },
};
