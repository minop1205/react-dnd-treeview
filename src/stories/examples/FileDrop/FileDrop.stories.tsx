import React from "react";
import { Meta } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { DndProvider } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { Tree, MultiBackend, getBackendOptions } from "~/index";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { TreeProps, DragLayerMonitorProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import sampleData from "~/stories/assets/sample-default.json";
import { Template } from "./Template";
import styles from "./FileDrop.module.css";

export default {
  component: Tree,
  title: "Basic Examples/File drop",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const FileDrop = Template.bind({});

FileDrop.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
    draggingSource: styles.draggingSource,
    dropTarget: styles.dropTarget,
  },
  extraAcceptTypes: [NativeTypes.FILE],
  render: function render(node, options) {
    return <CustomNode node={node} {...options} />;
  },
  dragPreviewRender: (monitorProps: DragLayerMonitorProps<FileProperties>) => (
    <CustomDragPreview monitorProps={monitorProps} />
  ),
};

FileDrop.storyName = "File drop";

FileDrop.parameters = {
  docs: {
    page: pageFactory({
      jsId: "file-drop-js-x1o985",
      tsId: "file-drop-ts-4s5i48",
    }),
  },
};

if (!interactionsDisabled) {
  FileDrop.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // TODO:
    // Testing is on hold for now
    // because we cannot simulate drag and drop of external files.
  };
}
