import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
  },
  {
    // This pattern is added after the default patterns,
    // which are ["**/node_modules/", ".git/"].
    ignores: ["dist", "storybook-static"],
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      //import: importPlugin,
      react: reactPlugin,
      prettier: prettierPlugin,
    },
  },

  // eslint.configs.recommended の実体は rules のみ入った ConfigurationObject
  eslint.configs.recommended,

  // redommendedTypeCheckedにはrecommendedも含まれるので、TypeCheckedの方だけでOK
  //...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  ...reactPlugin.configs.recommended,

  {
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
  }

  //reactPlugin.configs.recommended
  // importPlugin.configs.recommended
);

// export default [
//   {
//     files: ["**/*.{js,jsx,ts,tsx}"],
//   },
//   {
//     // This pattern is added after the default patterns,
//     // which are ["**/node_modules/", ".git/"].
//     ignores: ["dist", "storybook-static"],
//   },
//   eslint.configs.recommended,

// ];
