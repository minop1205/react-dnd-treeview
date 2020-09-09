const path = require("path");

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
    },
    entry: "./src/Tree.tsx",
    output: {
      path: `${__dirname}/dist`,
      filename: "index.js",
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
