import React from "react";
import { DndProvider } from "react-dnd";
import { MultiBackend } from "dnd-multi-backend";
import { getBackendOptions } from "~/utils/getBackendOptions";

export const TestProvider: React.FC = (props) => (
  <DndProvider backend={MultiBackend} options={getBackendOptions()}>
    {props.children}
  </DndProvider>
);
