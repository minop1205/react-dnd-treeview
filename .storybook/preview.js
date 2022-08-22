import { ThemeProvider } from "@mui/material/styles";
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
            "Open all parent nodes initially",
            "Open specific parent nodes initially",
            "Editable nodes",
            "Manual sort with placeholder",
            "Add, remove, duplicate nodes",
            "External element (inside react-dnd)",
            "External element (outside react-dnd)",
            "File drop",
            "Text drop",
          ],
        ],
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
