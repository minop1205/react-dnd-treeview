import { DndProvider } from "react-dnd";
import { MultiBackend } from "dnd-multi-backend";
import { ThemeProvider } from "@mui/material/styles";
import { HTML5toTouch } from "../src/HTML5toTouch";
import { theme } from "../src/stories/examples/theme";

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
            "Editable nodes",
          ],
        ],
      ],
    },
  },
  viewMode: "docs",
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <Story />
      </DndProvider>
    </ThemeProvider>
  ),
];
