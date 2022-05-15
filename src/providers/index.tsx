import React, { PropsWithChildren, ReactElement } from "react";
import { TreeProvider, TreeContext } from "./TreeProvider";
import { DragControlProvider, DragControlContext } from "./DragControlProvider";
import { PlaceholderProvider, PlaceholderContext } from "./PlaceholderProvider";
import { TreeProps, TreeMethods } from "~/types";

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

export { TreeContext, DragControlContext, PlaceholderContext };
