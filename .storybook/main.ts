import type { StorybookConfig } from "@storybook/react-webpack5";

const path = require("path");

const interactionsDisabled =
  process?.env?.STORYBOOK_DISABLE_INTERACTIONS === "true";

const addons = [
  "storybook-css-modules-preset",
  "@storybook/addon-essentials",
  "@storybook/addon-webpack5-compiler-swc",
  "@storybook/addon-themes",
];

if (!interactionsDisabled) {
  addons.push("@storybook/addon-interactions");
}

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.tsx"],
  addons,

  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "~": path.resolve(__dirname, "../src"),
      };
    }

    if (config.module?.rules) {
      // https://github.com/storybookjs/storybook/issues/16690#issuecomment-971579785
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      });
    }

    if (config.resolve?.alias) {
      delete config.resolve.alias["emotion-theming"];
      delete config.resolve.alias["@emotion/styled"];
      delete config.resolve.alias["@emotion/core"];
    }

    return config;
  },

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  staticDirs: ["../src/stories/assets"],

  // configuration for using swc compiler
  // https://storybook.js.org/docs/configure/compilers#the-swc-compiler-doesnt-work-with-react
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: "automatic",
        },
      },
    },
  }),
};

export default config;
