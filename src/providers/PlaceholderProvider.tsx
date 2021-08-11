import React, { useState } from "react";
import { NodeModel, PlaceholderState } from "../types";

export const PlaceholderContext = React.createContext<PlaceholderState>(
  {} as PlaceholderState
);

const initialState = {
  dropTargetId: undefined,
  index: undefined,
};

export const PlaceholderProvider: React.FC = (props) => {
  const [dropTargetId, setDropTargetId] = useState<
    PlaceholderState["dropTargetId"]
  >(initialState.dropTargetId);
  const [index, setIndex] = useState<PlaceholderState["index"]>(
    initialState.index
  );

  const showPlaceholder = (
    dropTargetId: NodeModel["id"],
    index: number
  ): void => {
    setDropTargetId(dropTargetId);
    setIndex(index);
  };

  const hidePlaceholder = () => {
    setDropTargetId(initialState.dropTargetId);
    setIndex(initialState.index);
  };

  return (
    <PlaceholderContext.Provider
      value={{
        dropTargetId,
        index,
        showPlaceholder,
        hidePlaceholder,
      }}
    >
      {props.children}
    </PlaceholderContext.Provider>
  );
};
