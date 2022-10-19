import React from "react";
import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within, fireEvent, userEvent } from "@storybook/testing-library";
import { DndProvider, MultiBackend, getBackendOptions, Tree } from "~/index";
import { TreeProps, DragLayerMonitorProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import {
  getPointerCoords,
  dragEnterAndDragOver,
  dragLeaveAndDragEnd,
  assertElementCoords,
  wait,
  toggleNode,
} from "~/stories/examples/helpers";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { Placeholder } from "~/stories/examples/components/Placeholder";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./ManualSortWithPlaceholder.module.css";

export default {
  component: Tree,
  title: "Basic Examples/Manual sort with placeholder",
  argTypes,
  decorators: [
    (Story) => (
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <Story />
      </DndProvider>
    ),
  ],
} as Meta<TreeProps<FileProperties>>;

export const ManualSortWithPlaceholderStory = DefaultTemplate.bind({});

ManualSortWithPlaceholderStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
    draggingSource: styles.draggingSource,
    placeholder: styles.placeholderContainer,
  },
  render: function render(node, options) {
    return <CustomNode node={node} {...options} />;
  },
  dragPreviewRender: (monitorProps: DragLayerMonitorProps<FileProperties>) => (
    <CustomDragPreview monitorProps={monitorProps} />
  ),
  sort: false,
  insertDroppableFirst: false,
  canDrop: (tree, { dragSource, dropTargetId }) => {
    if (dragSource?.parent === dropTargetId) {
      return true;
    }
  },
  dropTargetOffset: 10,
  placeholderRender: (node, { depth }) => (
    <Placeholder node={node} depth={depth} />
  ),
};

ManualSortWithPlaceholderStory.storyName = "Manual sort with placeholder";

ManualSortWithPlaceholderStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "placeholder-js-bvev61",
      tsId: "placeholder-ts-bsuyhv",
    }),
  },
};

if (!interactionsDisabled) {
  ManualSortWithPlaceholderStory.play = async ({ canvasElement }) => {
    const assertPlaceholderCoords = (x: number, y: number) => {
      const bbox = canvas.getByTestId("placeholder").getBoundingClientRect();
      expect(bbox.x).toBe(x);
      expect(bbox.y).toBe(y);
    };

    const canvas = within(canvasElement);
    expect(canvas.queryByTestId("placeholder")).toBeNull();

    // dragover file3 into center of file3
    {
      const file3Text = canvas.getByText("File 3");
      const file3Node = canvas.getByTestId("custom-node-7");
      const coords = getPointerCoords(file3Node, { x: 0, y: 16 });

      await wait();
      fireEvent.dragStart(file3Text);
      await dragEnterAndDragOver(file3Node, coords);
      assertPlaceholderCoords(32, 95);
      dragLeaveAndDragEnd(file3Text, file3Node);
      await wait();
      expect(canvas.queryByTestId("placeholder")).toBeNull();
    }

    // dragover file3 into top part of file3
    {
      const file3Text = canvas.getByText("File 3");
      const file3Node = canvas.getByTestId("custom-node-7");
      const coords = getPointerCoords(file3Node, { x: 0, y: 5 });

      await wait();
      fireEvent.dragStart(file3Text);
      await dragEnterAndDragOver(file3Node, coords);
      assertPlaceholderCoords(32, 95);
      dragLeaveAndDragEnd(file3Text, file3Node);
      await wait();
      expect(canvas.queryByTestId("placeholder")).toBeNull();
    }

    // dragover file3 into bottom part of file3
    {
      const file3Text = canvas.getByText("File 3");
      const file3Node = canvas.getByTestId("custom-node-7");
      const coords = getPointerCoords(file3Node, { x: 0, y: 27 });

      await wait();
      fireEvent.dragStart(file3Text);
      await dragEnterAndDragOver(file3Node, coords);
      assertPlaceholderCoords(32, 127);
      dragLeaveAndDragEnd(file3Text, file3Node);
      await wait();
      expect(canvas.queryByTestId("placeholder")).toBeNull();
    }

    // drag and drop file3 into top part of root
    {
      const file3Text = canvas.getByText("File 3");
      const root = canvas.getByRole("list");
      const coords = getPointerCoords(root, { x: 0, y: 0 });

      await wait();
      fireEvent.dragStart(file3Text);
      await dragEnterAndDragOver(root, coords);
      assertPlaceholderCoords(32, 31);
      fireEvent.drop(root, coords);
      await wait();
      dragLeaveAndDragEnd(canvas.getByText("File 3"), root);
      await wait();
      assertElementCoords(canvas.getByTestId("custom-node-7"), 32, 32);
      expect(canvas.queryByTestId("placeholder")).toBeNull();
    }

    // drag and drop file3 into bottom part of root
    {
      const file3Text = canvas.getByText("File 3");
      const root = canvas.getByRole("list");
      const coords = getPointerCoords(root, { x: 100, y: 200 });

      await wait();
      fireEvent.dragStart(file3Text);
      await dragEnterAndDragOver(root, coords);
      assertPlaceholderCoords(32, 127);
      fireEvent.drop(root, coords);
      await wait();
      dragLeaveAndDragEnd(file3Text, root);
      await wait();
      assertElementCoords(canvas.getByTestId("custom-node-7"), 32, 96);
      expect(canvas.queryByTestId("placeholder")).toBeNull();
    }

    // open folder1
    await toggleNode(canvas.getByTestId("arrow-right-icon-1"));

    // drag and drop file3 into center of folder1
    {
      const file3Text = canvas.getByText("File 3");
      const folder1Node = canvas.getByTestId("custom-node-1");
      const coords = getPointerCoords(folder1Node, { x: 0, y: 16 });

      await wait();
      fireEvent.dragStart(file3Text);
      await dragEnterAndDragOver(folder1Node, coords);
      assertPlaceholderCoords(56, 63);
      fireEvent.drop(folder1Node, coords);
      await wait();
      dragLeaveAndDragEnd(file3Text, folder1Node);
      await wait();
      assertElementCoords(canvas.getByTestId("custom-node-7"), 32, 64);
      expect(canvas.queryByTestId("placeholder")).toBeNull();
    }

    // drag and drop file3 into top part of folder1
    {
      const file3Text = canvas.getByText("File 3");
      const folder1Node = canvas.getByTestId("custom-node-1");
      const coords = getPointerCoords(folder1Node, { x: 0, y: 5 });

      await wait();
      fireEvent.dragStart(file3Text);
      await dragEnterAndDragOver(folder1Node, coords);
      assertPlaceholderCoords(32, 31);
      fireEvent.drop(folder1Node, coords);
      await wait();
      dragLeaveAndDragEnd(file3Text, folder1Node);
      await wait();
      assertElementCoords(canvas.getByTestId("custom-node-7"), 32, 32);
      expect(canvas.queryByTestId("placeholder")).toBeNull();
    }

    // drag and drop file3 into center of folder1
    {
      const file3Text = canvas.getByText("File 3");
      const folder2Node = canvas.getByTestId("custom-node-4");
      const coords = getPointerCoords(folder2Node, { x: 0, y: 16 });

      await wait();
      fireEvent.dragStart(file3Text);
      await dragEnterAndDragOver(folder2Node, coords);
      expect(canvas.queryByTestId("placeholder")).toBeNull();
      fireEvent.drop(folder2Node, coords);
      await wait();
      dragLeaveAndDragEnd(file3Text, folder2Node);
      await wait();
      expect(canvas.queryByText("File 3")).toBeNull();
    }

    // open folder2 and folder2-1
    await toggleNode(canvas.getByTestId("arrow-right-icon-4"));
    await toggleNode(canvas.getByTestId("arrow-right-icon-5"));

    // drag and drop file3 into top part of file2-1-1
    {
      const file3Text = canvas.getByText("File 3");
      const file211Node = canvas.getByTestId("custom-node-6");
      const coords = getPointerCoords(file211Node, { x: 0, y: 5 });

      await wait();
      fireEvent.dragStart(file3Text);
      await dragEnterAndDragOver(file211Node, coords);
      assertPlaceholderCoords(80, 223);
      fireEvent.drop(file211Node, coords);
      await wait();
      dragLeaveAndDragEnd(file3Text, file211Node);
      await wait();
      assertElementCoords(canvas.getByTestId("custom-node-7"), 32, 192);
      expect(canvas.queryByTestId("placeholder")).toBeNull();
    }
  };
}
