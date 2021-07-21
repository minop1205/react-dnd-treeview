import React, { useState } from "react";
import { NodeModel, PlaceholderState } from "../types";

export const PlaceholderContext = React.createContext<PlaceholderState>(
  {} as PlaceholderState
);

const initialState = {
  parentId: 0,
  index: 0,
  visible: false,
};

export const PlaceholderProvider: React.FC = (props) => {
  const [parentId, setParentId] = useState<NodeModel["id"]>(
    initialState.parentId
  );
  const [index, setIndex] = useState(initialState.index);
  const [visible, setVisible] = useState(initialState.visible);

  const showPlaceholder = (parentId: NodeModel["id"], index: number): void => {
    setParentId(parentId);
    setIndex(index);
    setVisible(true);
  };

  const hidePlaceholder = () => {
    setParentId(initialState.parentId);
    setIndex(initialState.index);
    setVisible(initialState.visible);
  };

  return (
    <PlaceholderContext.Provider
      value={{
        parentId,
        index,
        visible,
        showPlaceholder,
        hidePlaceholder,
      }}
    >
      {props.children}
    </PlaceholderContext.Provider>
  );
};
