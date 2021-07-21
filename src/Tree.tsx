import React, { forwardRef } from "react";
import { DndProvider } from "react-dnd-multi-backend";
import { TreeProvider } from "./providers/TreeProvider";
import { DragControlProvider } from "./providers/DragControlProvider";
import { PlaceholderProvider } from "./providers/PlaceholderProvider";
import HTML5toTouch from "react-dnd-multi-backend/dist/cjs/HTML5toTouch";
import { DragLayer } from "./DragLayer";
import { Container } from "./Container";
import { OpenIdsHandlers, TreeProps } from "./types";

const Tree = forwardRef<OpenIdsHandlers, TreeProps>((props, ref) => {
  return (
    <TreeProvider {...props} treeRef={ref}>
      <DragControlProvider>
        <PlaceholderProvider>
          <DndProvider options={HTML5toTouch}>
            {props.dragPreviewRender && <DragLayer />}
            <Container parentId={props.rootId} depth={0} />
          </DndProvider>
        </PlaceholderProvider>
      </DragControlProvider>
    </TreeProvider>
  );
});

Tree.displayName = "Tree";

export { Tree };
