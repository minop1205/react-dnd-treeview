import React from "react";
import { expect } from "@storybook/test";
import { within, fireEvent } from "@storybook/test";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/sample-default.json";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import {
  dragEnterAndDragOver,
  dragLeaveAndDragEnd,
  dragAndDrop,
  getPointerCoords,
  assertElementCoords,
  toggleNode,
  wait,
} from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import styles from "./CustomNode.module.css";
import type { Meta } from "@storybook/react";
import type { FileProperties } from "~/stories/types";
import type { TreeProps } from "~/types";

export default {
  component: Tree,
  title: "Basic Examples/Custom node",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const CustomNodeStory = DefaultTemplate.bind({});

CustomNodeStory.args = {
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
};

CustomNodeStory.storyName = "Custom node";

CustomNodeStory.parameters = {
  csb: {
    jsId: "custom-node-js-b6bzqc",
    tsId: "custom-node-ts-6ws8ou",
  },
};

if (!interactionsDisabled) {
  CustomNodeStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // count nodes
    await expect(canvas.getAllByRole("listitem").length).toBe(3);

    // open and close first node
    await expect(canvas.queryByText("File 1-1")).toBeNull();

    await toggleNode(canvas.getByTestId("arrow-right-icon-1"));
    await expect(await canvas.findByText("File 1-1")).toBeInTheDocument();

    await toggleNode(canvas.getByTestId("arrow-right-icon-1"));
    await expect(canvas.queryByText("File 1-1")).toBeNull();

    // drag and drop: File 3 into Folder 1
    await dragAndDrop(
      canvas.getByText("File 3"),
      canvas.getByTestId("custom-node-1"),
    );
    await expect(canvas.queryByText("File 3")).toBeNull();

    // open Folder1
    await toggleNode(canvas.getByTestId("arrow-right-icon-1"));
    await expect(await canvas.findByText("File 3")).toBeInTheDocument();

    // drag and drop: File 3 into Folder 2
    await dragAndDrop(
      canvas.getByText("File 3"),
      canvas.getByTestId("custom-node-4"),
    );
    await expect(canvas.queryByText("File 3")).toBeNull();

    // open Folder2
    await toggleNode(canvas.getByTestId("arrow-right-icon-4"));

    // drag and drop: Folder 2 into Folder 1
    await dragAndDrop(
      canvas.getByText("Folder 2"),
      canvas.getByTestId("custom-node-1"),
    );

    await assertElementCoords(
      await canvas.findByTestId("custom-node-4"),
      32,
      64,
    );

    // drag and drop: File 1-2 into root node
    await dragAndDrop(
      canvas.getByText("File 1-2"),
      canvas.getAllByRole("list")[0],
    );

    await assertElementCoords(
      await canvas.findByTestId("custom-node-3"),
      32,
      192,
    );

    // drag File3 and cancel drag
    {
      const dragSource = canvas.getByText("File 3");
      const dropTarget = canvas.getAllByRole("list")[0];
      const coords = getPointerCoords(dropTarget);

      await wait();
      await fireEvent.dragStart(dragSource);
      await dragEnterAndDragOver(dropTarget, coords);
      await dragLeaveAndDragEnd(dragSource, dropTarget);
      await wait();
      await assertElementCoords(
        await canvas.findByTestId("custom-node-7"),
        32,
        128,
      );
    }
  };
}
