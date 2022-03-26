const path = require("path");

const interactionsDisabled =
  process?.env?.STORYBOOK_DISABLE_INTERACTIONS === "true";

const addons = ["storybook-css-modules-preset", "@storybook/addon-essentials"];

if (!interactionsDisabled) {
  addons.push("@storybook/addon-interactions");
}

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons,
  features: {
    interactionsDebugger: !interactionsDisabled,
  },
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "~": path.resolve(__dirname, "../src"),
    };

    delete config.resolve.alias["emotion-theming"];
    delete config.resolve.alias["@emotion/styled"];
    delete config.resolve.alias["@emotion/core"];

    return config;
  },
};
