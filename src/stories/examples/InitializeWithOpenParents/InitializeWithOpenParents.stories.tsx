import React from "react";
import { Meta } from "@storybook/react";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { Tree } from "~/Tree";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { TreeProps, DragLayerMonitorProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./InitializeWithOpenParents.module.css";

export default {
  component: Tree,
  title: "Examples/Tree/Initialize with open parents",
  argTypes,
} as Meta<TreeProps<FileProperties>>;

export const InitializeWithOpenParentsStory = DefaultTemplate.bind({});

InitializeWithOpenParentsStory.args = {
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
  initialOpen: true,
};

InitializeWithOpenParentsStory.storyName = "Initialize with open parents";

InitializeWithOpenParentsStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "initialize-with-open-parents-js-mff8sw",
      tsId: "initialize-with-open-parents-ts-j8zxuj",
    }),
  },
};
