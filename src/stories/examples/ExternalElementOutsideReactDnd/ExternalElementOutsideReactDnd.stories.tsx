import React from "react";
import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within, fireEvent } from "@storybook/testing-library";
import { NativeTypes } from "react-dnd-html5-backend";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { TreeProps, DragLayerMonitorProps } from "~/types";
import { FileProperties } from "~/stories/types";
import {
  dragEnterAndDragOver,
  dragLeaveAndDragEnd,
  getPointerCoords,
  assertElementCoords,
  wait,
} from "~/stories/examples/helpers";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import sampleData from "~/stories/assets/sample-default.json";
import { Template } from "./Template";
import styles from "./ExternalElementOutsideReactDnd.module.css";

export default {
  component: Tree,
  title: "Examples/Tree/External element (outside react-dnd)",
  argTypes,
} as Meta<TreeProps<FileProperties>>;

export const ExternalElementOutsideReactDnd = Template.bind({});

ExternalElementOutsideReactDnd.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
    draggingSource: styles.draggingSource,
    dropTarget: styles.dropTarget,
  },
  extraAcceptTypes: [NativeTypes.TEXT],
  render: function render(node, options) {
    return <CustomNode node={node} {...options} />;
  },
  dragPreviewRender: (monitorProps: DragLayerMonitorProps<FileProperties>) => (
    <CustomDragPreview monitorProps={monitorProps} />
  ),
};

ExternalElementOutsideReactDnd.storyName =
  "External element (outside react-dnd)";

ExternalElementOutsideReactDnd.parameters = {
  docs: {
    page: pageFactory({
      jsId: "custom-drag-preview-js-s53fmx",
      tsId: "custom-drag-preview-ts-ibvb07",
    }),
  },
};

// if (!interactionsDisabled) {
//   ExternalElementOutsideReactDnd.play = async ({ canvasElement }) => {
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
//     expect(canvas.queryByTestId("custom-drag-preview")).toBeNull();
//   };
// }