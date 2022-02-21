import React from "react";
import { Meta } from "@storybook/react";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { Tree } from "~/Tree";
import { CustomDragPreview } from "~/stories/CustomDragPreview";
import { TreeProps, DragLayerMonitorProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { CustomNode } from "~/stories/CustomNode";
import { Template } from "~/stories/Template";
import sampleData from "~/stories/assets/sample-default.json";

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
    root: "tree-root",
    draggingSource: "dragging-source",
    dropTarget: "drop-target",
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
