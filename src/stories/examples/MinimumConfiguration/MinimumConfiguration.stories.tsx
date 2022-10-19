import React from "react";
import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within, fireEvent, userEvent } from "@storybook/testing-library";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { TreeProps } from "~/types";
import * as argTypes from "~/stories/argTypes";
import { pageFactory } from "~/stories/pageFactory";
import { FileProperties } from "~/stories/types";
import {
  dragEnterAndDragOver,
  dragLeaveAndDragEnd,
  dragAndDrop,
  getPointerCoords,
  toggleNode,
  wait,
} from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./MinimumConfiguration.module.css";

export default {
  component: Tree,
  title: "Basic Examples/Minimum configuration",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const MinimumConfigurationStory = DefaultTemplate.bind({});

MinimumConfigurationStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
  },
  render: function render(node, { depth, isOpen, onToggle }) {
    return (
      <div
        style={{ marginInlineStart: depth * 10 }}
        data-testid={`node-${node.id}`}
      >
        {node.droppable && (
          <span onClick={onToggle} data-testid={`open-icon-${node.id}`}>
            {isOpen ? "[-]" : "[+]"}
          </span>
        )}
        {node.text}
      </div>
    );
  },
  dragPreviewRender: (monitor) => <div>{monitor.item.text}</div>,
};

MinimumConfigurationStory.storyName = "Minimum configuration";

MinimumConfigurationStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "minimum-configuration-js-mrhwrd",
      tsId: "minimum-configuration-ts-tn9xj7",
    }),
  },
};

if (!interactionsDisabled) {
  MinimumConfigurationStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // count nodes
    expect(canvas.getAllByRole("listitem").length).toBe(3);

    // open and close first node
    expect(canvas.queryByText("File 1-1")).toBeNull();

    await toggleNode(canvas.getByTestId("open-icon-1"));
    expect(await canvas.findByText("File 1-1")).toBeInTheDocument();

    await toggleNode(canvas.getByTestId("open-icon-1"));
    expect(canvas.queryByText("File 1-1")).toBeNull();

    // drag and drop: File 3 into Folder 1
    await dragAndDrop(canvas.getByText("File 3"), canvas.getByTestId("node-1"));
    expect(canvas.queryByText("File 3")).toBeNull();

    // open Folder1
    await toggleNode(canvas.getByTestId("open-icon-1"));
    expect(await canvas.findByText("File 3")).toBeInTheDocument();

    // drag and drop: File 3 into Folder 2
    await dragAndDrop(canvas.getByText("File 3"), canvas.getByTestId("node-4"));
    expect(canvas.queryByText("File 3")).toBeNull();

    // open Folder2
    await toggleNode(canvas.getByTestId("open-icon-4"));

    // drag and drop: Folder 2 into Folder 1
    await dragAndDrop(
      canvas.getByText("Folder 2"),
      canvas.getByTestId("node-1")
    );

    expect(await canvas.findByTestId("node-4")).toHaveStyle(
      "margin-inline-start: 10px"
    );

    // drag and drop: File 1-2 into root node
    await dragAndDrop(
      canvas.getByText("File 1-2"),
      canvas.getAllByRole("list")[0]
    );

    expect(await canvas.findByText("File 1-2")).toHaveStyle(
      "margin-inline-start: 0px"
    );

    // drag File3 and cancel drag
    {
      const dragSource = canvas.getByText("File 3");
      const dropTarget = canvas.getAllByRole("list")[0];
      const coords = getPointerCoords(dropTarget);

      await wait();
      fireEvent.dragStart(dragSource);
      await dragEnterAndDragOver(dropTarget, coords);
      dragLeaveAndDragEnd(dragSource, dropTarget);
      await wait();

      expect(await canvas.findByText("File 3")).toHaveStyle(
        "margin-inline-start: 20px"
      );
    }
  };
}
