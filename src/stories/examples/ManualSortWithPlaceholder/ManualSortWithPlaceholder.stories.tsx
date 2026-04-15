import type { Meta } from "@storybook/react-vite";
import React from "react";
import { expect, fireEvent, within } from "storybook/test";
import { DndProvider, getBackendOptions, MultiBackend, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/sample-default.json";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import { Placeholder } from "~/stories/examples/components/Placeholder";
import { DefaultTemplate } from "~/stories/examples/DefaultTemplate";
import {
	assertElementCoords,
	dragEnterAndDragOver,
	dragLeaveAndDragEnd,
	getPointerCoords,
	toggleNode,
	wait,
} from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import type { FileProperties } from "~/stories/types";
import type { DragLayerMonitorProps, TreeProps } from "~/types";
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
	csb: {
		jsId: "placeholder-js-bvev61",
		tsId: "placeholder-ts-bsuyhv",
	},
};

if (!interactionsDisabled) {
	ManualSortWithPlaceholderStory.play = async ({ canvasElement }) => {
		const assertPlaceholderCoords = async (x: number, y: number) => {
			const topMargin = 40; // height of CodeSandbox link bar
			const bbox = canvas.getByTestId("placeholder").getBoundingClientRect();
			await expect(bbox.x).toBe(x);
			await expect(bbox.y).toBe(y + topMargin);
		};

		const canvas = within(canvasElement);
		await expect(canvas.queryByTestId("placeholder")).toBeNull();

		// dragover file3 into center of file3
		{
			const file3Text = canvas.getByText("File 3");
			const file3Node = canvas.getByTestId("custom-node-7");
			const coords = getPointerCoords(file3Node, { x: 0, y: 16 });

			await wait();
			await fireEvent.dragStart(file3Text);
			await dragEnterAndDragOver(file3Node, coords);
			await assertPlaceholderCoords(32, 95);
			await dragLeaveAndDragEnd(file3Text, file3Node);
			await wait();
			await expect(canvas.queryByTestId("placeholder")).toBeNull();
		}

		// dragover file3 into top part of file3
		{
			const file3Text = canvas.getByText("File 3");
			const file3Node = canvas.getByTestId("custom-node-7");
			const coords = getPointerCoords(file3Node, { x: 0, y: 5 });

			await wait();
			await fireEvent.dragStart(file3Text);
			await dragEnterAndDragOver(file3Node, coords);
			await assertPlaceholderCoords(32, 95);
			await dragLeaveAndDragEnd(file3Text, file3Node);
			await wait();
			await expect(canvas.queryByTestId("placeholder")).toBeNull();
		}

		// dragover file3 into bottom part of file3
		{
			const file3Text = canvas.getByText("File 3");
			const file3Node = canvas.getByTestId("custom-node-7");
			const coords = getPointerCoords(file3Node, { x: 0, y: 27 });

			await wait();
			await fireEvent.dragStart(file3Text);
			await dragEnterAndDragOver(file3Node, coords);
			await assertPlaceholderCoords(32, 127);
			await dragLeaveAndDragEnd(file3Text, file3Node);
			await wait();
			await expect(canvas.queryByTestId("placeholder")).toBeNull();
		}

		// drag and drop file3 into top part of root
		{
			const file3Text = canvas.getByText("File 3");
			const root = canvas.getByRole("list");
			const coords = getPointerCoords(root, { x: 0, y: 0 });

			await wait();
			await fireEvent.dragStart(file3Text);
			await dragEnterAndDragOver(root, coords);
			await assertPlaceholderCoords(32, 31);
			await fireEvent.drop(root, coords);
			await wait();
			await dragLeaveAndDragEnd(canvas.getByText("File 3"), root);
			await wait();
			await assertElementCoords(canvas.getByTestId("custom-node-7"), 32, 32);
			await expect(canvas.queryByTestId("placeholder")).toBeNull();
		}

		// drag and drop file3 into bottom part of root
		{
			const file3Text = canvas.getByText("File 3");
			const root = canvas.getByRole("list");
			const coords = getPointerCoords(root, { x: 100, y: 200 });

			await wait();
			await fireEvent.dragStart(file3Text);
			await dragEnterAndDragOver(root, coords);
			await assertPlaceholderCoords(32, 127);
			await fireEvent.drop(root, coords);
			await wait();
			await dragLeaveAndDragEnd(file3Text, root);
			await wait();
			await assertElementCoords(canvas.getByTestId("custom-node-7"), 32, 96);
			await expect(canvas.queryByTestId("placeholder")).toBeNull();
		}

		// open folder1
		await toggleNode(canvas.getByTestId("arrow-right-icon-1"));

		// drag and drop file3 into center of folder1
		{
			const file3Text = canvas.getByText("File 3");
			const folder1Node = canvas.getByTestId("custom-node-1");
			const coords = getPointerCoords(folder1Node, { x: 0, y: 16 });

			await wait();
			await fireEvent.dragStart(file3Text);
			await dragEnterAndDragOver(folder1Node, coords);
			await assertPlaceholderCoords(56, 63);
			await fireEvent.drop(folder1Node, coords);
			await wait();
			await dragLeaveAndDragEnd(file3Text, folder1Node);
			await wait();
			await assertElementCoords(canvas.getByTestId("custom-node-7"), 32, 64);
			await expect(canvas.queryByTestId("placeholder")).toBeNull();
		}

		// drag and drop file3 into top part of folder1
		{
			const file3Text = canvas.getByText("File 3");
			const folder1Node = canvas.getByTestId("custom-node-1");
			const coords = getPointerCoords(folder1Node, { x: 0, y: 5 });

			await wait();
			await fireEvent.dragStart(file3Text);
			await dragEnterAndDragOver(folder1Node, coords);
			await assertPlaceholderCoords(32, 31);
			await fireEvent.drop(folder1Node, coords);
			await wait();
			await dragLeaveAndDragEnd(file3Text, folder1Node);
			await wait();
			await assertElementCoords(canvas.getByTestId("custom-node-7"), 32, 32);
			await expect(canvas.queryByTestId("placeholder")).toBeNull();
		}

		// drag and drop file3 into center of folder1
		{
			const file3Text = canvas.getByText("File 3");
			const folder2Node = canvas.getByTestId("custom-node-4");
			const coords = getPointerCoords(folder2Node, { x: 0, y: 16 });

			await wait();
			await fireEvent.dragStart(file3Text);
			await dragEnterAndDragOver(folder2Node, coords);
			await expect(canvas.queryByTestId("placeholder")).toBeNull();
			await fireEvent.drop(folder2Node, coords);
			await wait();
			await dragLeaveAndDragEnd(file3Text, folder2Node);
			await wait();
			await expect(canvas.queryByText("File 3")).toBeNull();
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
			await fireEvent.dragStart(file3Text);
			await dragEnterAndDragOver(file211Node, coords);
			await assertPlaceholderCoords(80, 223);
			await fireEvent.drop(file211Node, coords);
			await wait();
			await dragLeaveAndDragEnd(file3Text, file211Node);
			await wait();
			await assertElementCoords(canvas.getByTestId("custom-node-7"), 32, 192);
			await expect(canvas.queryByTestId("placeholder")).toBeNull();
		}
	};
}
