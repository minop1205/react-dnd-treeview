import React from "react";
import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within, fireEvent, userEvent } from "@storybook/testing-library";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { TreeProps, DragLayerMonitorProps } from "~/types";
import * as argTypes from "~/stories/argTypes";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { pageFactory } from "~/stories/pageFactory";
import { FileProperties } from "~/stories/types";
import { toggleNode, wait } from "~/stories/examples/helpers";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import sampleData from "~/stories/assets/sample-animate-expand.json";
import styles from "./AnimateExpand.module.css";

export default {
  component: Tree,
  title: "Basic Examples/AnimateExpand",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const AnimateExpandStory = DefaultTemplate.bind({});

AnimateExpandStory.args = {
  rootId: 0,
  tree: sampleData,
  enableAnimateExpand: true,
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

AnimateExpandStory.storyName = "AnimateExpand";

AnimateExpandStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "animateexpand-js-vtvh18",
      tsId: "animateexpand-ts-l5rd4r",
    }),
  },
};

if (!interactionsDisabled) {
  AnimateExpandStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Do not render hidden nodes.
    expect(canvas.queryByText("File 1-01")).toBe(null);
    expect(canvas.queryByText("File 2-1-1")).toBe(null);

    // Check style attributes before and after opening a node.
    const animateContainer =
      canvas.getByTestId("custom-node-1").nextElementSibling;

    expect(animateContainer).toHaveStyle({ height: 0, opacity: 0 });

    await toggleNode(canvas.getByTestId("arrow-right-icon-1"));
    await wait(300);

    expect(animateContainer).toHaveStyle({ height: "640px", opacity: 1 });
  };
}
