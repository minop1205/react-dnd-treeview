import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import hooksPlugin from "eslint-plugin-react-hooks";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

// configメソッドは flat config を拡張して config object に extends を独自追加している
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
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // eslint.configs.recommended の実体は rules のみ入った ConfigurationObject
  eslint.configs.recommended,

  // redommendedTypeCheckedにはrecommendedも含まれるので、TypeCheckedの方だけでOK
  // recommendedTypeCheckedにはlanguageOptions, pluginsなどの設定も含まれる
  ...tseslint.configs.recommendedTypeChecked,

  // reactPlugin.configs.recommended はflat config形式で提供されている
  // reactPlugin.configs.recommendedにはlanguageOptions.parserOptions.ecmaFeaturesも定義されている
  reactPlugin.configs.recommended

  // {
  //   plugins: {
  //     "react-hooks": hooksPlugin,
  //   },
  //   rules: hooksPlugin.configs.recommended.rules,
  // },

  // {
  //   rules: {
  //     "import/order": [
  //       "warn",
  //       {
  //         groups: [
  //           "builtin",
  //           "external",
  //           "parent",
  //           "sibling",
  //           "index",
  //           "object",
  //           "type",
  //         ],
  //         pathGroups: [
  //           {
  //             pattern: "react",
  //             group: "builtin",
  //             position: "before",
  //           },
  //           {
  //             pattern: "~/**",
  //             group: "parent",
  //             position: "before",
  //           },
  //         ],
  //         pathGroupsExcludedImportTypes: ["type"],
  //         alphabetize: {
  //           order: "asc",
  //         },
  //       },
  //     ],
  //   },
  // },

  // // Prettierの設定は一番最後に置く
  // prettierPlugin
);
