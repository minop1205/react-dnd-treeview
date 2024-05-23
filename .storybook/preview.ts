import { ThemeProvider } from "@mui/material";
import { theme } from "../src/stories/examples/theme";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
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
            "Open and close method",
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
  },
  tags: ["autodocs"],
  decorators: [
    withThemeFromJSXProvider({
      Provider: ThemeProvider,
      themes: { theme },
    }),
  ],
};

export default preview;
