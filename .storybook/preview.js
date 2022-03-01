import { DndProvider } from "react-dnd";
import { MultiBackend } from "dnd-multi-backend";
import { HTML5toTouch } from "../src/HTML5toTouch";

export const parameters = {
  layout: "fullscreen",
  controls: { expanded: true },
  options: {
    storySort: {
      order: [
        "Examples",
        [
          "Tree",
          [
            "Minimum configuration",
            "Custom node",
            "Custom drag preview",
            "Select node",
            "Multiple selections",
            "Opening and closing all nodes",
            "Auto expand with drag over node",
            "Initialize with open parents",
          ],
        ],
      ],
    },
  },
  viewMode: "docs",
};

export const decorators = [
  (Story) => (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <Story />
    </DndProvider>
  ),
];
