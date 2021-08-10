import React, { useState } from "react";
import { NodeModel, PlaceholderState } from "../types";

export const PlaceholderContext = React.createContext<PlaceholderState>(
  {} as PlaceholderState
);

const initialState = {
  parentId: undefined,
  index: undefined,
};

export const PlaceholderProvider: React.FC = (props) => {
  const [parentId, setParentId] = useState<PlaceholderState["parentId"]>(
    initialState.parentId
  );
  const [index, setIndex] = useState<PlaceholderState["index"]>(
    initialState.index
  );

  const showPlaceholder = (parentId: NodeModel["id"], index: number): void => {
    setParentId(parentId);
    setIndex(index);
  };

  const hidePlaceholder = () => {
    setParentId(initialState.parentId);
    setIndex(initialState.index);
  };

  return (
    <PlaceholderContext.Provider
      value={{
        parentId,
        index,
        showPlaceholder,
        hidePlaceholder,
      }}
    >
      {props.children}
    </PlaceholderContext.Provider>
  );
};
