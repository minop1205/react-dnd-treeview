const path = require("path");
const pkg = require("./package.json");

module.exports = (env) => {
  const mode = env && env.production ? "production" : "development";

  return {
    mode,
    devtool: mode === "production" ? false : "source-map",
    resolve: {
      extensions: [
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
      ],
      alias: {
        react: path.resolve(__dirname, "./node_modules/react"),
        "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      },
    },
    externals: {
      react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React",
      },
      "react-dom": {
        commonjs: "react-dom",
        commonjs2: "react-dom",
        amd: "ReactDOM",
        root: "ReactDOM",
      },
    },
    entry: "./src/index.ts",
    output: {
      path: `${__dirname}/dist`,
      filename: "index.js",
      library: pkg.name,
      libraryTarget: "umd",
      publicPath: "/dist/",
      umdNamedDefine: true,
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "source-map-loader",
        },
      ],
    },
  };
};
