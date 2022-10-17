import React from "react";
import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within, fireEvent, waitFor } from "@storybook/testing-library";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { TreeProps } from "~/types";
import { FileProperties } from "~/stories/types";
import {
  dragEnterAndDragOver,
  dragLeaveAndDragEnd,
  getPointerCoords,
  wait,
} from "~/stories/examples/helpers";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./AutoExpandWithDragOverNode.module.css";

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
  docs: {
    page: pageFactory({
      jsId: "auto-expand-with-drag-over-node-js-7izeed",
      tsId: "auto-expand-with-drag-over-node-ts-mde4zo",
    }),
  },
};

if (!interactionsDisabled) {
  AutoExpandWithDragOverNodeStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // hover File3 into Folder1 during 0.5sec
    {
      expect(canvas.queryByText("File 1-2")).toBeNull();

      const dragSource = canvas.getByText("File 3");
      const dropTarget = canvas.getByTestId("custom-node-1");
      const coords = getPointerCoords(dropTarget);

      await wait();
      fireEvent.dragStart(dragSource);
      await dragEnterAndDragOver(dropTarget, coords);
      await wait(500);
      dragLeaveAndDragEnd(dragSource, dropTarget);
      await wait();
      expect(await canvas.findByText("File 1-2")).toBeInTheDocument();
    }
  };
}
