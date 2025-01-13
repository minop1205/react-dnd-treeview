import React from "react";
import { expect } from "@storybook/test";
import { within, fireEvent } from "@storybook/test";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/sample-default.json";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import {
  dragEnterAndDragOver,
  dragLeaveAndDragEnd,
  getPointerCoords,
  wait,
} from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import styles from "./AutoExpandWithDragOverNode.module.css";
import { CustomNode } from "./CustomNode";
import type { Meta } from "@storybook/react";
import type { FileProperties } from "~/stories/types";
import type { TreeProps } from "~/types";

export default {
  component: Tree,
  title: "Basic Examples/Auto expand with drag over node",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
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
  csb: {
    jsId: "auto-expand-with-drag-over-node-js-7izeed",
    tsId: "auto-expand-with-drag-over-node-ts-mde4zo",
  },
};

if (!interactionsDisabled) {
  AutoExpandWithDragOverNodeStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // hover File3 into Folder1 during 0.5sec
    {
      await expect(canvas.queryByText("File 1-2")).toBeNull();

      const dragSource = canvas.getByText("File 3");
      const dropTarget = canvas.getByTestId("custom-node-1");
      const coords = getPointerCoords(dropTarget);

      await wait();
      await fireEvent.dragStart(dragSource);
      await dragEnterAndDragOver(dropTarget, coords);
      await wait(500);
      await dragLeaveAndDragEnd(dragSource, dropTarget);
      await wait();
      await expect(await canvas.findByText("File 1-2")).toBeInTheDocument();
    }
  };
}
