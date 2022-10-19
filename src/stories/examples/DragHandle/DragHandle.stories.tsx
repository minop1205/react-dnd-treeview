import React from "react";
import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within, fireEvent } from "@storybook/testing-library";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { TreeProps } from "~/types";
import {
  dragEnterAndDragOver,
  dragLeaveAndDragEnd,
  getPointerCoords,
  wait,
} from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import sampleData from "~/stories/assets/sample-default.json";
import { Placeholder } from "~/stories/examples/components/Placeholder";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import styles from "./DragHandle.module.css";

export default {
  component: Tree,
  title: "Basic Examples/Drag handle",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps>;

export const DragHandleStory = DefaultTemplate.bind({});

DragHandleStory.args = {
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
  dragPreviewRender: (monitorProps) => (
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

DragHandleStory.storyName = "Drag handle";

DragHandleStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "drag-handle-js-fb4ys9",
      tsId: "drag-handle-ts-050v5h",
    }),
  },
};

if (!interactionsDisabled) {
  DragHandleStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const assertPlaceholderCoords = (x: number, y: number) => {
      const bbox = canvas
        .getByTestId("custom-drag-preview")
        .getBoundingClientRect();
      expect(bbox.x).toBe(x);
      expect(bbox.y).toBe(y);
    };

    expect(canvas.queryByTestId("custom-drag-preview")).toBeNull();

    // starting a drag on an element other than a handle
    // does not allow preview display or drop
    {
      const file3Text = canvas.getByText("File 3");
      const folder1Node = canvas.getByTestId("custom-node-1");
      const coords = getPointerCoords(folder1Node, { x: 0, y: 16 });

      await wait();
      fireEvent.dragStart(file3Text);
      await dragEnterAndDragOver(folder1Node, coords);
      expect(canvas.queryByTestId("custom-drag-preview")).toBeNull();
    }

    // preview display and drop possible by starting drag with handle
    {
      const file3Handle = canvas.getByTestId("drag-handle-7");
      const folder1Node = canvas.getByTestId("custom-node-1");
      const coords = getPointerCoords(folder1Node, { x: 0, y: 16 });

      await wait();
      fireEvent.dragStart(file3Handle);
      await dragEnterAndDragOver(folder1Node, coords);
      assertPlaceholderCoords(32, 48);
      fireEvent.drop(folder1Node, coords);
      await wait();
      dragLeaveAndDragEnd(file3Handle, folder1Node);
      await wait();
      expect(canvas.queryByTestId("custom-drag-preview")).toBeNull();
      expect(canvas.queryByText("File 3")).toBeNull();
    }
  };
}
