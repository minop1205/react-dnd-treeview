import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import alias from "@rollup/plugin-alias";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import packageJson from "./package.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const tspCompiler = require("ts-patch/compiler");

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
      typescript: tspCompiler,
      tsconfigDefaults: {
        compilerOptions: {
          plugins: [
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
