const path = require("path");

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "import", "react", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  rules: {
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
  },
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: ["/*.js"],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
};
