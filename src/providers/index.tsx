import type { PropsWithChildren, ReactElement } from "react";
import React from "react";
import type { TreeMethods, TreeProps } from "~/types";
import { DragControlContext, DragControlProvider } from "./DragControlProvider";
import { PlaceholderContext, PlaceholderProvider } from "./PlaceholderProvider";
import { TreeContext, TreeProvider } from "./TreeProvider";

type Props<T> = PropsWithChildren<
	TreeProps<T> & {
		treeRef: React.ForwardedRef<TreeMethods>;
	}
>;

export const Providers = <T,>(props: Props<T>): ReactElement => (
	<TreeProvider {...props}>
		<DragControlProvider>
			<PlaceholderProvider>{props.children}</PlaceholderProvider>
		</DragControlProvider>
	</TreeProvider>
);

export { DragControlContext, PlaceholderContext, TreeContext };
