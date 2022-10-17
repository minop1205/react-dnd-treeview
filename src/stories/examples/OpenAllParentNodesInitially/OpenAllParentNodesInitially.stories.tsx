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
import styles from "./OpenAllParentNodesInitially.module.css";

export default {
  component: Tree,
  title: "Basic Examples/Open all parent nodes initially",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const OpenAllParentNodesInitially = DefaultTemplate.bind({});

OpenAllParentNodesInitially.args = {
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
  initialOpen: true,
};

OpenAllParentNodesInitially.storyName = "Open all parent nodes initially";

OpenAllParentNodesInitially.parameters = {
  docs: {
    page: pageFactory({
      jsId: "open-all-parent-nodes-initially-js-xowqs7",
      tsId: "open-all-parent-nodes-initially-ts-vdm3no",
    }),
  },
};

if (!interactionsDisabled) {
  OpenAllParentNodesInitially.play = ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("File 1-1")).toBeInTheDocument();
    expect(canvas.getByText("File 1-2")).toBeInTheDocument();
    expect(canvas.getByText("Folder 2-1")).toBeInTheDocument();
    expect(canvas.getByText("File 2-1-1")).toBeInTheDocument();
  };
}
