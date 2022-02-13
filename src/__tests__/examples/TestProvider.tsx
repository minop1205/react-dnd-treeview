import React from "react";
import { DndProvider } from "react-dnd";
import { MultiBackend } from "dnd-multi-backend";
import { HTML5toTouch } from "../../HTML5toTouch";

export const TestProvider: React.FC = (props) => (
  <DndProvider backend={MultiBackend} options={HTML5toTouch}>
    {props.children}
  </DndProvider>
);
