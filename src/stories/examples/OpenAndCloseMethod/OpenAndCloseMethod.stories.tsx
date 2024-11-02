import React from "react";
import { expect } from "@storybook/test";
import { within, userEvent } from "@storybook/test";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/sample-id-text.json";
import { wait } from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import styles from "./OpenAndCloseMethod.module.css";
import { Template } from "./Template";
import type { Meta } from "@storybook/react";
import type { FileProperties } from "~/stories/types";
import type { TreeProps } from "~/types";

export default {
  component: Tree,
  title: "Basic Examples/Open and close method",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const OpenAndCloseMethodStory = Template.bind({});

OpenAndCloseMethodStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
    draggingSource: styles.draggingSource,
    dropTarget: styles.dropTarget,
  },
};

OpenAndCloseMethodStory.storyName = "Open and close method";

OpenAndCloseMethodStory.parameters = {
  csb: {
    jsId: "opening-and-closing-all-nodes-js-eqxzti",
    tsId: "opening-and-closing-all-nodes-ts-xeb5v4",
  },
};

if (!interactionsDisabled) {
  OpenAndCloseMethodStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await wait();

    await expect(canvas.queryByText("File 1-2 (ID: 3)")).toBeNull();

    const btnOpenAll = canvas.getByTestId("btn-open-all");
    const btnCloseAll = canvas.getByTestId("btn-close-all");

    await userEvent.click(btnOpenAll);
    await wait();

    await expect(canvas.getByText("File 1-2 (ID: 3)")).toBeInTheDocument();
    await expect(
      await canvas.findByText("File 2-1-1 (ID: 6)"),
    ).toBeInTheDocument();

    await userEvent.click(btnCloseAll);
    await wait();

    await expect(canvas.queryByText("File 1-2 (ID: 3)")).toBeNull();
    await expect(canvas.queryByText("File 2-1-1 (ID: 6)")).toBeNull();

    const btnOpenSpecified = canvas.getByTestId("btn-open-specified");
    const btnCloseSpecified = canvas.getByTestId("btn-close-specified");
    const textField = canvas.getByTestId("input-ids");
    await userEvent.click(textField);
    await userEvent.type(textField, "1, 4, 5");
    await userEvent.click(btnOpenSpecified);
    await wait();

    await expect(canvas.getByText("File 1-2 (ID: 3)")).toBeInTheDocument();
    await expect(
      await canvas.findByText("File 2-1-1 (ID: 6)"),
    ).toBeInTheDocument();

    await userEvent.click(btnCloseSpecified);
    await wait();

    await expect(canvas.queryByText("File 1-2 (ID: 3)")).toBeNull();
    await expect(canvas.queryByText("File 2-1-1 (ID: 6)")).toBeNull();
  };
}
