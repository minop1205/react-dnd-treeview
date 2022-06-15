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
    }),
  ],
};
