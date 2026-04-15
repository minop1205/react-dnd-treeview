import React from "react";
import type { NodeModel } from "~/types";

const Placeholder: React.FC<{ node: NodeModel; depth: number }> = ({
	depth,
}) => {
	return (
		<div
			style={{
				position: "absolute",
				top: 0,
				right: 0,
				height: 4,
				left: depth * 24,
				transform: "translateY(-50%)",
				backgroundColor: "#81a9e0",
				zIndex: 100,
			}}
		/>
	);
};

export default Placeholder;
