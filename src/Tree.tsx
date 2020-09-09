import React, { createContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragLayer } from "./DragLayer";
import { Container } from "./Container";
import { mutateTree } from "./utils";
import {
  NodeModel,
  NodeRender,
  DragPreviewRender,
  ClickHandler,
  TreeContext,
} from "./types";

type Props = {
  tree: NodeModel[];
  rootId: NodeModel["id"];
  openIds: NodeModel["id"][];
  render: NodeRender;
  dragPreviewRender: DragPreviewRender;
  onChange: (tree: NodeModel[]) => void;
  onClick: ClickHandler;
};

export const Context = createContext<TreeContext>({} as TreeContext);

export const Tree: React.FC<Props> = (props) => (
  <Context.Provider
    value={{
      tree: props.tree,
      openIds: props.openIds,
      render: props.render,
      dragPreviewRender: props.dragPreviewRender,
      onClick: props.onClick,
      onDrop: (id, parentId) =>
        props.onChange(mutateTree(props.tree, id, parentId)),
    }}
  >
    <DndProvider backend={HTML5Backend}>
      <DragLayer />
      <Container parentId={props.rootId} depth={0} />
    </DndProvider>
  </Context.Provider>
);
