import React from "react";
import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within, fireEvent } from "@storybook/testing-library";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { TreeProps } from "~/types";
import { FileProperties } from "~/stories/types";
import {
  dragEnterAndDragOver,
  dragLeaveAndDragEnd,
  dragAndDrop,
  getPointerCoords,
  assertElementCoords,
  toggleNode,
  wait,
} from "~/stories/examples/helpers";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./CustomNode.module.css";

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
  docs: {
    page: pageFactory({
      jsId: "custom-node-js-b6bzqc",
      tsId: "custom-node-ts-6ws8ou",
    }),
  },
};

if (!interactionsDisabled) {
  CustomNodeStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // count nodes
    expect(canvas.getAllByRole("listitem").length).toBe(3);

    // open and close first node
    expect(canvas.queryByText("File 1-1")).toBeNull();

    await toggleNode(canvas.getByTestId("arrow-right-icon-1"));
    expect(await canvas.findByText("File 1-1")).toBeInTheDocument();

    await toggleNode(canvas.getByTestId("arrow-right-icon-1"));
    expect(canvas.queryByText("File 1-1")).toBeNull();

    // drag and drop: File 3 into Folder 1
    await dragAndDrop(
      canvas.getByText("File 3"),
      canvas.getByTestId("custom-node-1")
    );
    expect(canvas.queryByText("File 3")).toBeNull();

    // open Folder1
    toggleNode(canvas.getByTestId("arrow-right-icon-1"));
    expect(await canvas.findByText("File 3")).toBeInTheDocument();

    // drag and drop: File 3 into Folder 2
    await dragAndDrop(
      canvas.getByText("File 3"),
      canvas.getByTestId("custom-node-4")
    );
    expect(canvas.queryByText("File 3")).toBeNull();

    // open Folder2
    toggleNode(canvas.getByTestId("arrow-right-icon-4"));

    // drag and drop: Folder 2 into Folder 1
    await dragAndDrop(
      canvas.getByText("Folder 2"),
      canvas.getByTestId("custom-node-1")
    );

    assertElementCoords(await canvas.findByTestId("custom-node-4"), 32, 64);

    // drag and drop: File 1-2 into root node
    await dragAndDrop(
      canvas.getByText("File 1-2"),
      canvas.getAllByRole("list")[0]
    );

    assertElementCoords(await canvas.findByTestId("custom-node-3"), 32, 192);

    // drag File3 and cancel drag
    {
      const dragSource = canvas.getByText("File 3");
      const dropTarget = canvas.getAllByRole("list")[0];
      const coords = getPointerCoords(dropTarget);

      await wait();
      fireEvent.dragStart(dragSource);
      await dragEnterAndDragOver(dropTarget, coords);
      dragLeaveAndDragEnd(dragSource, dropTarget);
      wait();

      assertElementCoords(await canvas.findByTestId("custom-node-7"), 32, 128);
    }
  };
}
