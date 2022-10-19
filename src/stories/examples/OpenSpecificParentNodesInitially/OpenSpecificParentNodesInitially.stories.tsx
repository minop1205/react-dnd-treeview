import React from "react";
import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { TreeProps, DragLayerMonitorProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./OpenSpecificParentNodesInitially.module.css";

export default {
  component: Tree,
  title: "Basic Examples/Open specific parent nodes initially",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const OpenSpecificParentNodesInitially = DefaultTemplate.bind({});

OpenSpecificParentNodesInitially.args = {
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
  initialOpen: [1, 5],
};

OpenSpecificParentNodesInitially.storyName =
  "Open specific parent nodes initially";

OpenSpecificParentNodesInitially.parameters = {
  docs: {
    page: pageFactory({
      jsId: "open-specific-parent-nodes-initially-js-forked-tz2y6f",
      tsId: "open-specific-parent-nodes-initially-ts-forked-kyh3h7",
    }),
  },
};

if (!interactionsDisabled) {
  OpenSpecificParentNodesInitially.play = ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("File 1-1")).toBeInTheDocument();
    expect(canvas.getByText("File 1-2")).toBeInTheDocument();
    expect(canvas.queryByText("Folder 2-1")).toBeNull();
    expect(canvas.queryByText("File 2-1-1")).toBeNull();
  };
}
