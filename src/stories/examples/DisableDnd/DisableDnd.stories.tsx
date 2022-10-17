import React from "react";
import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within, fireEvent, userEvent } from "@storybook/testing-library";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { TreeProps, DragLayerMonitorProps } from "~/types";
import { FileProperties } from "~/stories/types";
import {
  dragEnterAndDragOver,
  getPointerCoords,
  dragAndDrop,
} from "~/stories/examples/helpers";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import sampleData from "~/stories/assets/sample-default.json";
import { Template } from "./Template";
import styles from "./DisableDnd.module.css";

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
  docs: {
    page: pageFactory({
      jsId: "drag-and-drop-as-optional-js-0z31vo",
      tsId: "drag-and-drop-as-optional-ts-sqzo11",
    }),
  },
};

if (!interactionsDisabled) {
  DisableDndStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("File 3")).toBeInTheDocument();

    // drag and drop: File 3 into Folder 1
    {
      await dragAndDrop(
        canvas.getByText("File 3"),
        canvas.getByTestId("custom-node-1")
      );

      expect(canvas.queryByText("File 3")).toBeNull();
    }

    // disable dnd
    await userEvent.click(canvas.getByTestId("switch-dnd"));

    // drag and drop: Folder 2 into Folder 1
    {
      const dragSource = canvas.getByText("Folder 2");
      const dropTarget = canvas.getByText("Folder 1");
      const coords = getPointerCoords(dropTarget, { x: 5, y: 5 });

      fireEvent.dragStart(dragSource);
      await dragEnterAndDragOver(dropTarget, coords);
      expect(canvas.queryByTestId("custom-drag-preview")).toBeNull();
    }
  };
}
