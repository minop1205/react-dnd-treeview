import React from "react";
import { expect } from "@storybook/test";
import { within, userEvent } from "@storybook/test";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/sample-default.json";
import { wait } from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import styles from "./SelectNode.module.css";
import { Template } from "./Template";
import type { Meta } from "@storybook/react";
import type { FileProperties } from "~/stories/types";
import type { TreeProps } from "~/types";

export default {
  component: Tree,
  title: "Basic Examples/Select node",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const SelectNodeStory = Template.bind({});

SelectNodeStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
    draggingSource: styles.draggingSource,
    dropTarget: styles.dropTarget,
  },
};

SelectNodeStory.storyName = "Select node";

SelectNodeStory.parameters = {
  csb: {
    jsId: "select-node-js-diykvq",
    tsId: "select-node-ts-gocexe",
  },
};

if (!interactionsDisabled) {
  SelectNodeStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId("selected-node").textContent).toBe("none");
    await userEvent.click(canvas.getByText("Folder 1"));
    await wait();
    await expect(canvas.getByTestId("selected-node").textContent).toBe(
      "Folder 1",
    );
    await userEvent.click(canvas.getByText("File 3"));
    await wait();
    await expect(canvas.getByTestId("selected-node").textContent).toBe(
      "File 3",
    );
  };
}
