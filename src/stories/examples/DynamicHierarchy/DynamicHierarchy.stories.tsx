import React from "react";
import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { TreeProps, DragLayerMonitorProps, NodeModel } from "~/types";
import { FileProperties } from "~/stories/types";
import { dragAndDrop, wait } from "~/stories/examples/helpers";
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

DynamicHierarchyStory.args = {
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

DynamicHierarchyStory.storyName = "Dynamic hierarchy";

DynamicHierarchyStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "dynamic-hierarchy-js-n8m7zn",
      tsId: "dynamic-hierarchy-ts-dz4bis",
    }),
  },
};

if (!interactionsDisabled) {
  DynamicHierarchyStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.queryByTestId("arrow-right-icon-1")).toBeNull();

    // drag and drop: Item 2 into Item 1
    {
      await wait(500);
      await dragAndDrop(
        canvas.getByText("Item 2"),
        canvas.getByTestId("custom-node-1")
      );

      expect(canvas.queryByText("Item 2")).toBeNull();

      await userEvent.click(canvas.getByTestId("arrow-right-icon-1"));

      expect(await canvas.findByText("Item 2")).toBeInTheDocument();
    }
  };
}
