import React from "react";
import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within, fireEvent } from "@storybook/testing-library";
import { DndProvider } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { Tree, MultiBackend, getBackendOptions } from "~/index";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { TreeProps, DragLayerMonitorProps } from "~/types";
import { FileProperties } from "~/stories/types";
import {
  dragLeaveAndDragEnd,
  getPointerCoords,
  wait,
} from "~/stories/examples/helpers";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import sampleData from "~/stories/assets/sample-default.json";
import { Template } from "./Template";
import styles from "./TextDrop.module.css";

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

export const TextDrop = Template.bind({});

TextDrop.args = {
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

TextDrop.storyName = "Text drop";

TextDrop.parameters = {
  docs: {
    page: pageFactory({
      jsId: "text-drop-js-t4xpkq",
      tsId: "text-drop-ts-odf9lz",
    }),
  },
};

if (!interactionsDisabled) {
  TextDrop.play = async ({ canvasElement }) => {
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

      fireEvent.dragStart(dragSource, options);
      fireEvent.dragEnter(dropTarget, coords);
      fireEvent.dragOver(dropTarget, coords);
      await wait();

      expect(dropTarget).toHaveStyle("background-color: #e8f0fe");

      dragLeaveAndDragEnd(dragSource, dropTarget);
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

      fireEvent.dragStart(dragSource, options);
      fireEvent.dragEnter(dropTarget, coords);
      fireEvent.dragOver(dropTarget, coords);
      await wait();

      expect(dropTarget).toHaveStyle("background-color: #e8f0fe");

      dragLeaveAndDragEnd(dragSource, dropTarget);
    }
  };
}
