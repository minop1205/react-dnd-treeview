import type { Meta } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import React from "react";
import { DndProvider, getBackendOptions, MultiBackend, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/sample-default.json";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { wait } from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import type { FileProperties } from "~/stories/types";
import type { DragLayerMonitorProps, TreeProps } from "~/types";
import styles from "./MultipleSelections.module.css";
import { Template } from "./Template";

export default {
	component: Tree,
	title: "Basic Examples/Multiple selections",
	argTypes,
	decorators: [
		(Story) => (
			<DndProvider backend={MultiBackend} options={getBackendOptions()}>
				<Story />
			</DndProvider>
		),
	],
} as Meta<TreeProps<FileProperties>>;

export const MultipleSelectionsStory = Template.bind({});

MultipleSelectionsStory.args = {
	rootId: 0,
	tree: sampleData,
	classes: {
		root: styles.treeRoot,
		draggingSource: styles.draggingSource,
		dropTarget: styles.dropTarget,
	},
	dragPreviewRender: (monitorProps: DragLayerMonitorProps<FileProperties>) => (
		<CustomDragPreview monitorProps={monitorProps} />
	),
};

MultipleSelectionsStory.storyName = "Multiple selections";

MultipleSelectionsStory.parameters = {
	csb: {
		jsId: "multiple-selections-js-48q7qt",
		tsId: "multiple-selections-ts-zsfvj8",
	},
};

if (!interactionsDisabled) {
	MultipleSelectionsStory.play = async ({ canvasElement }) => {
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
			"Folder 1, File 3",
		);
		await userEvent.click(canvas.getByRole("list"));
		await wait();
		await expect(canvas.getByTestId("selected-node").textContent).toBe("none");
	};
}
