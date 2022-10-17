import React from "react";
import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { TreeProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { wait, toggleNode } from "~/stories/examples/helpers";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import sampleData from "~/stories/assets/sample-default.json";
import { Template } from "./Template";
import styles from "./AddRemoveDuplicateNodes.module.css";

export default {
  component: Tree,
  title: "Basic Examples/Add, remove, duplicate nodes",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const AddRemoveDuplicateNodesStory = Template.bind({});

AddRemoveDuplicateNodesStory.args = {
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
  dragPreviewRender: (monitorProps) => (
    <CustomDragPreview monitorProps={monitorProps} />
  ),
};

AddRemoveDuplicateNodesStory.storyName = "Add, remove, duplicate nodes";

AddRemoveDuplicateNodesStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "add-remove-duplicate-js-u9v93e",
      tsId: "add-remove-duplicate-ts-8q20pd",
    }),
  },
};

if (!interactionsDisabled) {
  AddRemoveDuplicateNodesStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await wait();

    // add new node named File4 to root
    {
      userEvent.click(canvas.getByTestId("btn-add"));
      await wait();

      const dialog = within(await canvas.findByTestId("dialog"));

      userEvent.click(dialog.getByTestId("dialog-input-text"));
      userEvent.type(dialog.getByTestId("dialog-input-text"), "File 4");
      userEvent.click(dialog.getByText(/submit/i));
    }

    expect(await canvas.findByText("File 4"));

    // delete Folder 1
    userEvent.hover(canvas.getByTestId("custom-node-1"));
    userEvent.click(await canvas.findByTestId("btn-delete-1"));
    await wait();
    expect(canvas.queryByText("Folder 1")).toBeNull();

    // copy Folder 2
    userEvent.hover(canvas.getByTestId("custom-node-4"));
    userEvent.click(await canvas.findByTestId("btn-copy-4"));
    userEvent.unhover(canvas.getByTestId("custom-node-4"));
    await toggleNode(await canvas.findByTestId("arrow-right-icon-12"));
    await toggleNode(await canvas.findByTestId("arrow-right-icon-13"));
    expect(await canvas.findByText("File 2-1-1")).toBeInTheDocument();
  };
}
