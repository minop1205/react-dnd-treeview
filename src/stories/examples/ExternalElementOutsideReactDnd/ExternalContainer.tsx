import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useContext } from "react";
import styles from "./ExternalElementOutsideReactDnd.module.css";
import { ExternalNode } from "./ExternalNode";
import type { StoryState } from "./StoryProvider";
import { StoryContext } from "./StoryProvider";

export const ExternalContainer: React.FC = () => {
	const storyContext = useContext(StoryContext) as StoryState;
	const { externalNodes, handleAddExternalNode } = storyContext;

	return (
		<div className={styles.externalContainer}>
			<div>
				<Button
					variant="outlined"
					startIcon={<Add />}
					onClick={handleAddExternalNode}
				>
					Add node
				</Button>
			</div>
			<div>
				{externalNodes.map((node) => (
					<ExternalNode key={node.id} node={node} />
				))}
			</div>
		</div>
	);
};
