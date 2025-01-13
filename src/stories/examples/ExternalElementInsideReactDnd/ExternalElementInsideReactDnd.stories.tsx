import React from "react";
import { expect } from "@storybook/test";
import { within } from "@storybook/test";
import { DndProvider } from "react-dnd";
import { Tree, MultiBackend, getBackendOptions } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/sample-default.json";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { toggleNode, wait, dragAndDrop } from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import styles from "./ExternalElementInsideReactDnd.module.css";
import { Template } from "./Template";
import type { Meta } from "@storybook/react";
import type { FileProperties } from "~/stories/types";
import type { TreeProps, DragLayerMonitorProps } from "~/types";

export default {
  component: Tree,
  title: "Basic Examples/External element (inside react-dnd)",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const ExternalElementInsideReactDnd = Template.bind({});

ExternalElementInsideReactDnd.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
    draggingSource: styles.draggingSource,
    dropTarget: styles.dropTarget,
  },
  extraAcceptTypes: ["EXTERNAL_NODE"],
  render: function render(node, options) {
    return <CustomNode node={node} {...options} />;
  },
  dragPreviewRender: (monitorProps: DragLayerMonitorProps<FileProperties>) => (
    <CustomDragPreview monitorProps={monitorProps} />
  ),
};

ExternalElementInsideReactDnd.storyName = "External element (inside react-dnd)";

ExternalElementInsideReactDnd.parameters = {
  csb: {
    jsId: "external-element-inside-react-dnd-js-lf66dj",
    tsId: "external-element-inside-react-dnd-ts-sktogh",
  },
};

if (!interactionsDisabled) {
  ExternalElementInsideReactDnd.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByTestId("custom-drag-preview")).toBeNull();

    // drag and drop: External node 1 into root
    {
      const dragSource = canvas.getByTestId("external-node-101");
      const dropTarget = canvas.getByRole("list");

      await dragAndDrop(dragSource, dropTarget);
      await wait();
      await expect(canvas.getByTestId("custom-node-101")).toBeInTheDocument();
      await expect(canvas.queryByTestId("external-node-101")).toBeNull();
    }

    // drag and drop: External node 2 into Folder 1
    {
      const dragSource = canvas.getByTestId("external-node-102");
      const dropTarget = canvas.getByText("Folder 1");

      await dragAndDrop(dragSource, dropTarget);
      await wait();
      await toggleNode(canvas.getByTestId("arrow-right-icon-1"));
      await expect(canvas.getByTestId("custom-node-102")).toBeInTheDocument();
      await expect(canvas.queryByTestId("external-node-102")).toBeNull();
    }

    // drag and drop: External node 2 into Folder 2
    {
      const dragSource = canvas.getByTestId("custom-node-102");
      const dropTarget = canvas.getByText("Folder 2");

      await dragAndDrop(dragSource, dropTarget);
      await wait();
      await expect(canvas.queryByTestId("external-node-102")).toBeNull();
      await toggleNode(canvas.getByTestId("arrow-right-icon-4"));
      await expect(canvas.getByTestId("custom-node-102")).toBeInTheDocument();
    }
  };
}
