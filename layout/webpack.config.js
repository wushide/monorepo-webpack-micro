const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

function rootResolve(dir) {
  return path.resolve(__dirname, dir);
}
module.exports = async (env = {}) => {
  const { default: UnoCSS } = await import("@unocss/webpack");

  return {
    mode: "development",
    cache: false,
    devtool: "source-map",
    optimization: {
      minimize: false,
    },
    target: "web",
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
      publicPath: "auto",
    },
    resolve: {
      extensions: [".vue", ".jsx", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: ["vue-loader"],
        },
        {
          test: /\.png$/,
          use: {
            loader: "url-loader",
            options: { limit: 8192 },
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {},
            },
            "css-loader",
            // "style-loader",
          ],
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      UnoCSS(), // 确保 UnoCSS 插件优先加载
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new ModuleFederationPlugin({
        name: "home",
        filename: "remoteEntry.js",
        remotes: {
          home: "home@http://localhost:1678/remoteEntry.js",
        },
        shared: {
          vue: {
            singleton: true,
            requiredVersion: "^3.0.11",
          },
          "vue-router": {
            singleton: true,
            requiredVersion: "^4.0.0",
          },
          "@babel/runtime": {
            singleton: true,
            requiredVersion: "^7.24.7",
          },
          lodash: {
            requiredVersion: "^4.17.21",
          },
          axios: {
            requiredVersion: "^1.6.8",
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./index.html"),
      }),
      new VueLoaderPlugin(),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname),
      },
      compress: true,
      port: 3678,
      hot: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    },
    resolve: {
      alias: {
        "#": rootResolve("core/packages"),
      },
      extensions: [".vue", ".jsx", ".js", ".mjs", ".scss"],
      modules: ["node_modules"],
    },
  };
};
