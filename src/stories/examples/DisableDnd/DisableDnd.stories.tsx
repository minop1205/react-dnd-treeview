import React from "react";
import { expect } from "@storybook/test";
import { within, fireEvent, userEvent } from "@storybook/test";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/sample-default.json";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import {
  dragEnterAndDragOver,
  getPointerCoords,
  dragAndDrop,
} from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import styles from "./DisableDnd.module.css";
import { Template } from "./Template";
import type { Meta } from "@storybook/react";
import type { FileProperties } from "~/stories/types";
import type { TreeProps, DragLayerMonitorProps } from "~/types";

export default {
  component: Tree,
  title: "Basic Examples/Disable dnd",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const DisableDndStory = Template.bind({});

DisableDndStory.args = {
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
  dragPreviewRender: (monitorProps: DragLayerMonitorProps<FileProperties>) => (
    <CustomDragPreview monitorProps={monitorProps} />
  ),
};

DisableDndStory.storyName = "Disable dnd";

DisableDndStory.parameters = {
  csb: {
    jsId: "drag-and-drop-as-optional-js-0z31vo",
    tsId: "drag-and-drop-as-optional-ts-sqzo11",
  },
};

if (!interactionsDisabled) {
  DisableDndStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("File 3")).toBeInTheDocument();

    // drag and drop: File 3 into Folder 1
    {
      await dragAndDrop(
        canvas.getByText("File 3"),
        canvas.getByTestId("custom-node-1"),
      );

      await expect(canvas.queryByText("File 3")).toBeNull();
    }

    // disable dnd
    await userEvent.click(canvas.getByTestId("switch-dnd"));

    // drag and drop: Folder 2 into Folder 1
    {
      const dragSource = canvas.getByText("Folder 2");
      const dropTarget = canvas.getByText("Folder 1");
      const coords = getPointerCoords(dropTarget, { x: 5, y: 5 });

      await fireEvent.dragStart(dragSource);
      await dragEnterAndDragOver(dropTarget, coords);
      await expect(canvas.queryByTestId("custom-drag-preview")).toBeNull();
    }
  };
}
