import React from "react";
import { Meta } from "@storybook/react";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { Tree } from "~/Tree";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { TreeProps, DragLayerMonitorProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { Template } from "./Template";
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./EditableNodes.module.css";

export default {
  component: Tree,
  title: "Examples/Tree/Editable nodes",
  argTypes,
} as Meta<TreeProps<FileProperties>>;

export const EditableNodesStory = Template.bind({});

EditableNodesStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
    draggingSource: styles.draggingSource,
    dropTarget: styles.dropTarget,
  },
  dragPreviewRender: (monitorProps: DragLayerMonitorProps<FileProperties>) => (
    <CustomDragPreview monitorProps={monitorProps} />
  ),
};

EditableNodesStory.storyName = "Editable nodes";

EditableNodesStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "editable-js-gdszw4",
      tsId: "editable-ts-4v1034",
    }),
  },
};
