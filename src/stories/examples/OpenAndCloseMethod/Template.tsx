import { Button, TextField } from "@mui/material";
import type { StoryFn } from "@storybook/react";
import React, { useRef, useState } from "react";
import { CustomDragPreview } from "~/stories/examples/components/CustomDragPreview";
import { CustomNode } from "~/stories/examples/components/CustomNode";
import type { FileProperties } from "~/stories/types";
import { useDropHandler } from "~/stories/useDropHandler";
import { Tree } from "~/Tree";
import type { NodeModel, TreeMethods, TreeProps } from "~/types";
import styles from "./OpenAndCloseMethod.module.css";

export const Template: StoryFn<TreeProps<FileProperties>> = (args) => {
	const [tree, handleDrop] = useDropHandler<FileProperties>(args);
	const [text, setText] = useState<string>("");
	const ref = useRef<TreeMethods>(null);

	const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const getIds = (text: string) => {
		let idTexts = text.split(",").map((id) => id.trim());
		idTexts = idTexts.filter((id) => id !== "");
		let ids = idTexts.map((id) => Number(id));
		ids = ids.filter((id) => !isNaN(id));
		return ids;
	};

	const handleOpenAll = () => ref.current?.openAll();
	const handleCloseAll = () => ref.current?.closeAll();
	const handleOpenSpecified = () => ref.current?.open(getIds(text));
	const handleCloseSpecified = () => ref.current?.close(getIds(text));

	return (
		<>
			<div className={styles.actions}>
				<Button
					variant="outlined"
					color="primary"
					onClick={handleOpenAll}
					data-testid="btn-open-all"
				>
					Open All
				</Button>
				<Button
					variant="outlined"
					color="primary"
					onClick={handleCloseAll}
					data-testid="btn-close-all"
				>
					Close All
				</Button>
			</div>
			<div className={styles.actions}>
				<TextField
					slotProps={{
						htmlInput: {
							"data-testid": "input-ids",
							style: {
								padding: "6.75px 16px",
							},
						},
					}}
					variant="outlined"
					placeholder="e.g. 1, 4, 5"
					onChange={handleChangeText}
				/>
				<Button
					variant="outlined"
					color="primary"
					onClick={handleOpenSpecified}
					data-testid="btn-open-specified"
				>
					Open Specified ID(s)
				</Button>
				<Button
					variant="outlined"
					color="primary"
					onClick={handleCloseSpecified}
					data-testid="btn-close-specified"
				>
					Close Specified ID(s)
				</Button>
			</div>
			<Tree
				ref={ref}
				{...args}
				tree={tree}
				onDrop={handleDrop}
				render={(
					node: NodeModel<FileProperties>,
					{ depth, isOpen, onToggle },
				) => (
					<CustomNode
						node={node}
						depth={depth}
						isOpen={isOpen}
						onToggle={onToggle}
					/>
				)}
				dragPreviewRender={(monitorProps) => (
					<CustomDragPreview monitorProps={monitorProps} />
				)}
			/>
		</>
	);
};
