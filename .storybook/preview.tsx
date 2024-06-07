import React from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../src/stories/examples/theme";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { Link } from "@mui/material";
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
  decorators: [
    withThemeFromJSXProvider({
      Provider: ThemeProvider,
      themes: { theme },
    }),
    (Story, context) => {
      const jsId = context.parameters.csb?.jsId;
      const tsId = context.parameters.csb?.tsId;

      if (!jsId && !tsId) {
        return <Story />;
      }

      return (
        <>
          <div className="csb-link-container">
            <p>Show code on CodeSandbox</p>
            <div className="csb-link-items">
              {jsId && (
                <Link
                  component="a"
                  href={`https://codesandbox.io/p/sandbox/${context.parameters.csb.jsId}?file=/src/App.jsx`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  JavaScript
                </Link>
              )}
              {tsId && (
                <Link
                  component="a"
                  href={`https://codesandbox.io/p/sandbox/${context.parameters.csb.tsId}?file=/src/App.tsx`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  TypeScript
                </Link>
              )}
            </div>
          </div>
          <Story />
        </>
      );
    },
  ],
};

export default preview;
