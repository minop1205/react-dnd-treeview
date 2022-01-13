import React, { PropsWithChildren, ReactElement } from "react";
import { DndProvider } from "react-dnd";
import { MultiBackend } from "dnd-multi-backend";
import { HTML5toTouch } from "./HTML5toTouch";
import { TreeProvider, TreeContext } from "./TreeProvider";
import { DragControlProvider, DragControlContext } from "./DragControlProvider";
import { PlaceholderProvider, PlaceholderContext } from "./PlaceholderProvider";
import { TreeProps, TreeMethods } from "../types";

type Props<T> = PropsWithChildren<
  TreeProps<T> & {
    treeRef: React.ForwardedRef<TreeMethods>;
  }
>;

export const Providers = <T extends unknown>(props: Props<T>): ReactElement => (
  <TreeProvider {...props}>
    <DragControlProvider>
      <PlaceholderProvider>
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
          {props.children}
        </DndProvider>
      </PlaceholderProvider>
    </DragControlProvider>
  </TreeProvider>
);

export { TreeContext, DragControlContext, PlaceholderContext };
