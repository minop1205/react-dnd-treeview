import React from "react";
import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within, fireEvent } from "@storybook/testing-library";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { TreeProps, DragLayerMonitorProps, NodeModel } from "~/types";
import { FileProperties } from "~/stories/types";
import {
  dragEnterAndDragOver,
  dragLeaveAndDragEnd,
  getPointerCoords,
  assertElementCoords,
  wait,
} from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import sampleData from "~/stories/assets/dynamic-hierarchy.json";
import styles from "./DynamicHierarchy.module.css";

export default {
  component: Tree,
  title: "Basic Examples/Dynamic hierarchy",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const DynamicHierarchyStory = DefaultTemplate.bind({});

const compareNodeId = (a: NodeModel, b: NodeModel) => {
  if (a.id > b.id) {
    return 1;
  } else if (b.id > a.id) {
    return -1;
  }

  return 0;
};

DynamicHierarchyStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
    draggingSource: styles.draggingSource,
    dropTarget: styles.dropTarget,
  },
  sort: compareNodeId,
  render: function render(node, options) {
    return <CustomNode node={node} {...options} />;
  },
  dragPreviewRender: (monitorProps: DragLayerMonitorProps<FileProperties>) => (
    <CustomDragPreview monitorProps={monitorProps} />
  ),
};

DynamicHierarchyStory.storyName = "Dynamic hierarchy";

DynamicHierarchyStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "custom-drag-preview-js-s53fmx",
      tsId: "custom-drag-preview-ts-ibvb07",
    }),
  },
};

// if (!interactionsDisabled) {
//   DynamicHierarchyStory.play = async ({ canvasElement }) => {
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
