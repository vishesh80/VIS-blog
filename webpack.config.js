const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env =>
{

  const isProd = env === "prod";

  return {

    entry: ["@babel/polyfill", "./src/main.js"],

    output: {
      path: __dirname + "/public",
      filename: "script.js",
    },

    plugins: [new MiniCssExtractPlugin({ filename: "style.css" })],

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
          },
        },

        {
          test: /\.(s)?css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },

    devtool: isProd ? "source-map" : "eval-cheap-module-source-map",

  };


}
  