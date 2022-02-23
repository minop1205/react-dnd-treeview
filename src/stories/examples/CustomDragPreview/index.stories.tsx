import React from "react";
import { Meta } from "@storybook/react";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { Tree } from "~/Tree";
import { CustomDragPreview } from "~/stories/examples/components/Preview";
import { TreeProps, DragLayerMonitorProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { Template } from "~/stories/examples/templates/Template";
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./index.module.css";

export default {
  component: Tree,
  title: "Examples/Tree/Custom drag preview",
  argTypes,
} as Meta<TreeProps<FileProperties>>;

export const CustomDragPreviewStory = Template.bind({});

CustomDragPreviewStory.args = {
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
  dragPreviewRender: (monitorProps: DragLayerMonitorProps<FileProperties>) => (
    <CustomDragPreview monitorProps={monitorProps} />
  ),
};

CustomDragPreviewStory.storyName = "Custom drag preview";

CustomDragPreviewStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "custom-drag-preview-js-s53fmx",
      tsId: "custom-drag-preview-ts-ibvb07",
    }),
  },
};
