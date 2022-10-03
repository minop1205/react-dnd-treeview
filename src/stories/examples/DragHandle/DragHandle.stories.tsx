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
  assertElementCoords,
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
  title: "Examples/Tree/Drag handle",
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
      jsId: "custom-drag-preview-js-s53fmx",
      tsId: "custom-drag-preview-ts-ibvb07",
    }),
  },
};

// if (!interactionsDisabled) {
//   CustomDragPreviewStory.play = async ({ canvasElement }) => {
//     const canvas = within(canvasElement);

//     expect(canvas.queryByTestId("custom-drag-preview")).toBeNull();

//     // show preview during dragging
//     const dragSource = canvas.getByText("File 3");
//     const dropTarget = canvas.getByTestId("custom-node-1");

//     await wait();

//     fireEvent.dragStart(dragSource);

//     const coords = getPointerCoords(dropTarget);
//     await dragEnterAndDragOver(dropTarget, coords);

//     expect(
//       await canvas.findByTestId("custom-drag-preview")
//     ).toBeInTheDocument();

//     assertElementCoords(canvas.getByTestId("custom-drag-preview"), 32, 32);

//     // hide preview when drag is canceled
//     dragLeaveAndDragEnd(dragSource, dropTarget);

//     await wait();

//     expect(canvas.queryByTestId("custom-drag-preview")).toBeNull();
//   };
// }
