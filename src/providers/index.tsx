import React from "react";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/cjs/HTML5toTouch";
import { TreeProvider, TreeContext } from "./TreeProvider";
import { DragControlProvider, DragControlContext } from "./DragControlProvider";
import { PlaceholderProvider, PlaceholderContext } from "./PlaceholderProvider";
import { TreeProps, OpenIdsHandlers } from "../types";

type Props = TreeProps & {
  treeRef: React.ForwardedRef<OpenIdsHandlers>;
};

export const Providers: React.FC<Props> = (props) => (
  <TreeProvider {...props}>
    <DragControlProvider>
      <PlaceholderProvider>
        <DndProvider options={HTML5toTouch}>{props.children}</DndProvider>
      </PlaceholderProvider>
    </DragControlProvider>
  </TreeProvider>
);

export { TreeContext, DragControlContext, PlaceholderContext };
