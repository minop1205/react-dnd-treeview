import React from "react";
import { expect, within, fireEvent } from "@storybook/test";
import { DndProvider } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { Tree, MultiBackend, getBackendOptions } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/sample-default.json";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import {
  dragLeaveAndDragEnd,
  getPointerCoords,
  wait,
} from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import { Template } from "./Template";
import styles from "./TextDrop.module.css";
import type { Meta } from "@storybook/react";
import type { FileProperties } from "~/stories/types";
import type { TreeProps, DragLayerMonitorProps } from "~/types";

export default {
  component: Tree,
  title: "Basic Examples/Text drop",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const TextDropStory = Template.bind({});

TextDropStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
    draggingSource: styles.draggingSource,
    dropTarget: styles.dropTarget,
  },
  extraAcceptTypes: [NativeTypes.TEXT, NativeTypes.HTML],
  render: function render(node, options) {
    return <CustomNode node={node} {...options} />;
  },
  dragPreviewRender: (monitorProps: DragLayerMonitorProps<FileProperties>) => (
    <CustomDragPreview monitorProps={monitorProps} />
  ),
};

TextDropStory.storyName = "Text drop";

TextDropStory.parameters = {
  csb: {
    jsId: "text-drop-js-t4xpkq",
    tsId: "text-drop-ts-odf9lz",
  },
};

if (!interactionsDisabled) {
  TextDropStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Cannot pass dataTransfer to the drop event,
    // so testing the drop is not possible.

    // drag over external element
    // that type is __NATIVE_TEXT__ into tree root
    {
      const dragSource = canvas.getByTestId("mock-text");
      const dropTarget = canvas.getByRole("list");
      const coords = getPointerCoords(dropTarget, { x: 10, y: 10 });
      const dataTransfer = new DataTransfer();
      const options = {
        dataTransfer,
        ...coords,
      };

      await fireEvent.dragStart(dragSource, options);
      await fireEvent.dragEnter(dropTarget, coords);
      await fireEvent.dragOver(dropTarget, coords);
      await wait();

      await expect(dropTarget).toHaveStyle("background-color: #e8f0fe");

      await dragLeaveAndDragEnd(dragSource, dropTarget);
    }

    await wait();

    // drag over external element
    // that type is __NATIVE_TEXT__ into Folder 1
    {
      const dragSource = canvas.getByTestId("mock-text");
      const dropTarget = canvas.getAllByRole("listitem")[0];
      const coords = getPointerCoords(dropTarget, { x: 10, y: 10 });
      const dataTransfer = new DataTransfer();
      const options = {
        dataTransfer,
        ...coords,
      };

      await fireEvent.dragStart(dragSource, options);
      await fireEvent.dragEnter(dropTarget, coords);
      await fireEvent.dragOver(dropTarget, coords);
      await wait();

      await expect(dropTarget).toHaveStyle("background-color: #e8f0fe");

      await dragLeaveAndDragEnd(dragSource, dropTarget);
    }
  };
}
