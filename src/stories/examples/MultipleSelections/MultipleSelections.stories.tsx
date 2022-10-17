import React from "react";
import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { TreeProps, DragLayerMonitorProps } from "~/types";
import { wait } from "~/stories/examples/helpers";
import { FileProperties } from "~/stories/types";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import { Template } from "./Template";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./MultipleSelections.module.css";

export default {
  component: Tree,
  title: "Basic Examples/Multiple selections",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const MultipleSelectionsStory = Template.bind({});

MultipleSelectionsStory.args = {
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

MultipleSelectionsStory.storyName = "Multiple selections";

MultipleSelectionsStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "multiple-selections-js-48q7qt",
      tsId: "multiple-selections-ts-zsfvj8",
    }),
  },
};

if (!interactionsDisabled) {
  MultipleSelectionsStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByTestId("selected-node").textContent).toBe("none");
    userEvent.click(canvas.getByText("Folder 1"));
    await wait();
    expect(canvas.getByTestId("selected-node").textContent).toBe("Folder 1");
    userEvent.click(canvas.getByText("File 3"));
    await wait();
    expect(canvas.getByTestId("selected-node").textContent).toBe(
      "Folder 1, File 3"
    );
    userEvent.click(canvas.getByRole("list"));
    await wait();
    expect(canvas.getByTestId("selected-node").textContent).toBe("none");
  };
}
