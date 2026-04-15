import type { Meta } from "@storybook/react-vite";
import React from "react";
import { expect, fireEvent, within } from "storybook/test";
import { DndProvider, getBackendOptions, MultiBackend, Tree } from "~/index";
import * as argTypes from "~/stories/argTypes";
import sampleData from "~/stories/assets/sample-default.json";
import {
	dragEnterAndDragOver,
	dragLeaveAndDragEnd,
	getPointerCoords,
} from "~/stories/examples/helpers";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import type { FileProperties } from "~/stories/types";
import type { TreeProps } from "~/types";
import styles from "./MultipleDrag.module.css";
import { Template } from "./Template";

export default {
	component: Tree,
	title: "Advanced Examples/Multiple drag",
	argTypes,
	decorators: [
		(Story) => (
			<DndProvider backend={MultiBackend} options={getBackendOptions()}>
				<div className={styles.storyRoot}>
					<div className={styles.information}>
						<p className={styles.usage}>
							Multiple selection is possible by holding down the Ctrl key
							(Command key for Mac) and clicking on a node.
						</p>
						<p className={styles.note}>
							NOTE:
							<br />
							Although multiple dragging is not provided as a feature of this
							package, it is possible to provide equivalent functionality by
							implementing event handlers and state management on the main
							application side that uses the package.
						</p>
					</div>
					<Story />
				</div>
			</DndProvider>
		),
	],
} as Meta<TreeProps<FileProperties>>;

export const MultipleDragStory = Template.bind({});

MultipleDragStory.args = {
	rootId: 0,
	tree: sampleData,
	classes: {
		root: styles.treeRoot,
		dropTarget: styles.dropTarget,
	},
};

MultipleDragStory.storyName = "Multiple drag";

MultipleDragStory.parameters = {
	csb: {
		jsId: "multiple-drag-js-m3ut0u",
		tsId: "multiple-drag-ts-nf0m3k",
	},
};

if (!interactionsDisabled) {
	MultipleDragStory.play = async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// drag and drop: Folder 2 and File 3 into Folder 1
		{
			const dragSource = canvas.getByText("Folder 2");
			const dropTarget = canvas.getByTestId("custom-node-1");
			const coords = getPointerCoords(dropTarget, { x: 10, y: 10 });

			await fireEvent.click(canvas.getByText("File 3"), { ctrlKey: true });
			await fireEvent.click(canvas.getByText("Folder 2"), { ctrlKey: true });

			await fireEvent.dragStart(dragSource);
			await dragEnterAndDragOver(dropTarget, coords);

			await expect(
				canvas.getByTestId("multiple-drag-preview"),
			).toBeInTheDocument();
			await fireEvent.drop(dropTarget, coords);
			await dragLeaveAndDragEnd(dragSource, dropTarget);
			await expect(canvas.queryByText("Folder 2")).toBeNull();
			await expect(canvas.queryByText("File 3")).toBeNull();
			await fireEvent.click(canvas.getByTestId("arrow-right-icon-1"));
			await expect(await canvas.findByText("Folder 2")).toBeInTheDocument();
			await expect(await canvas.findByText("File 3")).toBeInTheDocument();
		}
	};
}
