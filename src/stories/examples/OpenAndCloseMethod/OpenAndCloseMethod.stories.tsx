import React from "react";
import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { TreeProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { wait } from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import { Template } from "./Template";
import sampleData from "~/stories/assets/sample-id-text.json";
import styles from "./OpenAndCloseMethod.module.css";

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
  docs: {
    page: pageFactory({
      jsId: "opening-and-closing-all-nodes-js-eqxzti",
      tsId: "opening-and-closing-all-nodes-ts-xeb5v4",
    }),
  },
};

if (!interactionsDisabled) {
  OpenAndCloseMethodStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await wait();

    expect(canvas.queryByText("File 1-2 (ID: 3)")).toBeNull();

    const btnOpenAll = canvas.getByTestId("btn-open-all");
    const btnCloseAll = canvas.getByTestId("btn-close-all");

    userEvent.click(btnOpenAll);
    await wait();

    expect(canvas.getByText("File 1-2 (ID: 3)")).toBeInTheDocument();
    expect(await canvas.findByText("File 2-1-1 (ID: 6)")).toBeInTheDocument();

    userEvent.click(btnCloseAll);
    await wait();

    expect(canvas.queryByText("File 1-2 (ID: 3)")).toBeNull();
    expect(canvas.queryByText("File 2-1-1 (ID: 6)")).toBeNull();

    const btnOpenSpecified = canvas.getByTestId("btn-open-specified");
    const btnCloseSpecified = canvas.getByTestId("btn-close-specified");
    const textField = canvas.getByTestId("input-ids");

    userEvent.click(textField);
    userEvent.type(textField, "1, 4, 5");
    userEvent.click(btnOpenSpecified);
    await wait();

    expect(canvas.getByText("File 1-2 (ID: 3)")).toBeInTheDocument();
    expect(await canvas.findByText("File 2-1-1 (ID: 6)")).toBeInTheDocument();

    userEvent.click(btnCloseSpecified);
    await wait();

    expect(canvas.queryByText("File 1-2 (ID: 3)")).toBeNull();
    expect(canvas.queryByText("File 2-1-1 (ID: 6)")).toBeNull();
  };
}
