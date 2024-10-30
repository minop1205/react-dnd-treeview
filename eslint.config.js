import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],

    // This pattern is added after the default patterns,
    // which are ["**/node_modules/", ".git/"].
    ignores: ["dist", "storybook-static"],

    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  reactPlugin.configs.flat.recommended,

  // eslint-plugin-react-hooks does not yet support FlatConfig,
  // so configure it separately.
  {
    plugins: {
      "react-hooks": hooksPlugin,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },

  {
    ...importPlugin.flatConfigs.recommended,
    rules: {
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "~/**",
              group: "parent",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["type"],
          alphabetize: {
            order: "asc",
          },
        },
      ],
    },
  },

  prettierPlugin
);
