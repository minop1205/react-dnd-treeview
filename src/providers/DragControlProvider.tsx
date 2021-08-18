import React, { useState } from "react";
import { DragControlState } from "../types";

export const DragControlContext = React.createContext<DragControlState>(
  {} as DragControlState
);

const initialState = {
  isLock: false,
};

export const DragControlProvider: React.FC = (props) => {
  const [isLock, setIsLock] = useState(initialState.isLock);

  return (
    <DragControlContext.Provider
      value={{
        isLock,
        lock: () => setIsLock(true),
        unlock: () => setIsLock(false),
      }}
    >
      {props.children}
    </DragControlContext.Provider>
  );
};
