import React from "react";
import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { Tree } from "~/Tree";
import { TreeProps, DragLayerMonitorProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import { Template } from "./Template";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./MultipleSelections.module.css";

export default {
  component: Tree,
  title: "Examples/Tree/Multiple selections",
  argTypes,
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
  MultipleSelectionsStory.play = ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByTestId("selected-node").textContent).toBe("none");
    userEvent.click(canvas.getByText("Folder 1"));
    expect(canvas.getByTestId("selected-node").textContent).toBe("Folder 1");
    userEvent.click(canvas.getByText("File 3"));
    expect(canvas.getByTestId("selected-node").textContent).toBe(
      "Folder 1, File 3"
    );
    userEvent.click(canvas.getByRole("list"));
    expect(canvas.getByTestId("selected-node").textContent).toBe("none");
  };
}
