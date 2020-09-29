import React, { createContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragLayer } from "./DragLayer";
import { Container } from "./Container";
import { mutateTree } from "./utils";
import { NodeModel, NodeRender, DragPreviewRender, TreeContext } from "./types";

type Props = {
  tree: NodeModel[];
  rootId: NodeModel["id"];
  openIds: NodeModel["id"][];
  classes?: TreeContext["classes"];
  listComponent?: TreeContext["listComponent"];
  listItemComponent?: TreeContext["listItemComponent"];
  render: NodeRender;
  dragPreviewRender?: DragPreviewRender;
  onChange: (tree: NodeModel[]) => void;
};

export const Context = createContext<TreeContext>({} as TreeContext);

export const Tree: React.FC<Props> = (props) => (
  <Context.Provider
    value={{
      ...props,
      onDrop: (id, parentId) =>
        props.onChange(mutateTree(props.tree, id, parentId)),
    }}
  >
    <DndProvider backend={HTML5Backend}>
      {props.dragPreviewRender && <DragLayer />}
      <Container parentId={props.rootId} depth={0} />
    </DndProvider>
  </Context.Provider>
);
