import React from "react";
import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { TreeProps, DragLayerMonitorProps } from "~/types";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import { FileProperties } from "~/stories/types";
import { wait, toggleNode } from "~/stories/examples/helpers";
import sampleData from "~/stories/assets/sample-default.json";
import { Template } from "./Template";
import styles from "./EditableNodes.module.css";

export default {
  component: Tree,
  title: "Basic Examples/Editable nodes",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const EditableNodesStory = Template.bind({});

EditableNodesStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
    draggingSource: styles.draggingSource,
    dropTarget: styles.dropTarget,
  },
  dragPreviewRender: (monitorProps: DragLayerMonitorProps<FileProperties>) => (
    <CustomDragPreview monitorProps={monitorProps} />
  ),
};

EditableNodesStory.storyName = "Editable nodes";

EditableNodesStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "editable-js-gdszw4",
      tsId: "editable-ts-4v1034",
    }),
  },
};

if (!interactionsDisabled) {
  EditableNodesStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // open Folder2 and Folder2-1
    await toggleNode(await canvas.findByTestId("arrow-right-icon-4"));
    await toggleNode(await canvas.findByTestId("arrow-right-icon-5"));

    // open text field of File2-1-1
    userEvent.click(await canvas.findByTestId("btn-edit-6"));

    // hover on text field
    userEvent.hover(await canvas.findByTestId("input-6"));
    await wait();

    // all nodes will be undraggable when hover on text field in the node
    (await canvas.findAllByRole("listitem")).forEach((node) => {
      expect(node.draggable).toBe(false);
    });
  };
}
