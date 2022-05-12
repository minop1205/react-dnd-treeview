import React, { useState, createContext } from "react";
import { DragControlState } from "~/types";

export const DragControlContext = createContext<DragControlState>(
  {} as DragControlState
);

const initialState = {
  isLock: false,
};

export const DragControlProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
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
