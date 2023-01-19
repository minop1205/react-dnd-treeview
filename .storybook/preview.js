import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../src/stories/examples/theme";

export const parameters = {
  layout: "fullscreen",
  controls: { expanded: true },
  options: {
    storySort: {
      order: [
        "Basic Examples",
        [
          "Minimum configuration",
          "Custom node",
          "Custom drag preview",
          "AnimateExpand",
          "Select node",
          "Multiple selections",
          "Opening and closing all nodes",
          "Open all parent nodes initially",
          "Open specific parent nodes initially",
          "Auto expand with drag over node",
          "Editable nodes",
          "Manual sort with placeholder",
          "Add, remove, duplicate nodes",
          "External element (inside react-dnd)",
          "External element (outside react-dnd)",
          "File drop",
          "Text drop",
          "Drag handle",
          "Disable dnd",
          "Dynamic hierarchy",
          "Directory structure",
        ],
        "Advanced Examples",
        ["Multiple tree", "Multiple drag"],
      ],
    },
  },
  viewMode: "docs",
};

const debugMode = !(process?.env?.STORYBOOK_DISABLE_INTERACTIONS === "true");

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];
