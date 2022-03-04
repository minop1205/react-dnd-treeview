import React from "react";
import { Meta } from "@storybook/react";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { Tree } from "~/Tree";
import { TreeProps, DragLayerMonitorProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { Placeholder } from "~/stories/examples/components/Placeholder";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./ManualSortWithPlaceholder.module.css";

export default {
  component: Tree,
  title: "Examples/Tree/Manual sort with placeholder",
  argTypes,
} as Meta<TreeProps<FileProperties>>;

export const ManualSortWithPlaceholderStory = DefaultTemplate.bind({});

ManualSortWithPlaceholderStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
    draggingSource: styles.draggingSource,
    placeholder: styles.placeholderContainer,
  },
  render: function render(node, options) {
    return <CustomNode node={node} {...options} />;
  },
  dragPreviewRender: (monitorProps: DragLayerMonitorProps<FileProperties>) => (
    <CustomDragPreview monitorProps={monitorProps} />
  ),
  sort: false,
  insertDroppableFirst: false,
  canDrop: (tree, { dragSource, dropTargetId }) => {
    if (dragSource?.parent === dropTargetId) {
      return true;
    }
  },
  dropTargetOffset: 10,
  placeholderRender: (node, { depth }) => (
    <Placeholder node={node} depth={depth} />
  ),
};

ManualSortWithPlaceholderStory.storyName = "Manual sort with placeholder";

ManualSortWithPlaceholderStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "placeholder-js-bvev61",
      tsId: "placeholder-ts-bsuyhv",
    }),
  },
};
