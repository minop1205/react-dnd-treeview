import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";

const path = require("path");
const packageJson = require("./package.json");
const alias = require("@rollup/plugin-alias");

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    alias({
      entries: {
        "~": path.resolve(__dirname, "src"),
      },
    }),
    typescript({
      tsconfig: "tsconfig.build.json",
      useTsconfigDeclarationDir: true,
      clean: true,
      // Resolve path alias in declaration files (.d.ts)
      // https://github.com/minop1205/react-dnd-treeview/issues/149
      // https://github.com/ezolenko/rollup-plugin-typescript2/issues/201#issuecomment-591942905
      typescript: require("ttypescript"),
      tsconfigDefaults: {
        compilerOptions: {
          plugins: [
            { transform: "typescript-transform-paths" },
            {
              transform: "typescript-transform-paths",
              afterDeclarations: true,
            },
          ],
        },
      },
    }),
  ],
};
