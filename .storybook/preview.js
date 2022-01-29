import { DndProvider } from "react-dnd";
import { MultiBackend } from "dnd-multi-backend";
import { HTML5toTouch } from "../src/HTML5toTouch";

export const parameters = {
  layout: "fullscreen",
  controls: { expanded: true },
};

export const decorators = [
  (Story) => (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <Story />
    </DndProvider>
  ),
];