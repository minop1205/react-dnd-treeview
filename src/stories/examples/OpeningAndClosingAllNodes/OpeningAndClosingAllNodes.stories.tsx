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
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./OpeningAndClosingAllNodes.module.css";

export default {
  component: Tree,
  title: "Basic Examples/Opening and closing all nodes",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const OpeningAndClosingAllNodesStory = Template.bind({});

OpeningAndClosingAllNodesStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
    draggingSource: styles.draggingSource,
    dropTarget: styles.dropTarget,
  },
};

OpeningAndClosingAllNodesStory.storyName = "Opening and closing all nodes";

OpeningAndClosingAllNodesStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "opening-and-closing-all-nodes-js-eqxzti",
      tsId: "opening-and-closing-all-nodes-ts-xeb5v4",
    }),
  },
};

if (!interactionsDisabled) {
  OpeningAndClosingAllNodesStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await wait();

    expect(canvas.queryByText("File 1-2")).toBeNull();

    const btnOpenAll = canvas.getByTestId("btn-open-all");
    const btnCloseAll = canvas.getByTestId("btn-close-all");

    userEvent.click(btnOpenAll);
    await wait();

    expect(canvas.getByText("File 1-2")).toBeInTheDocument();
    expect(await canvas.findByText("File 2-1-1")).toBeInTheDocument();

    userEvent.click(btnCloseAll);
    await wait();

    expect(canvas.queryByText("File 1-2")).toBeNull();
    expect(canvas.queryByText("File 2-1-1")).toBeNull();
  };
}
