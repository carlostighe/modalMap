const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/*
 * Webpack Plugins
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ProductionPlugins = [
  // production webpack plugins go here
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production"),
    },
  }),
];

const debug = process.env.NODE_ENV !== "production";
const rootAssetPath = path.join(__dirname);

module.exports = {
  // configuration
  context: __dirname,
  entry: {
    app_js: [path.join(__dirname, "js", "app")],
    app_css: [
      path.join(
        __dirname,
        "node_modules",
        "materialize-css",
        "dist",
        "css",
        "materialize.css"
      ),
      path.join(__dirname, "node_modules", "leaflet", "dist", "leaflet.css"),
      path.join(__dirname, "css", "style.css"),
    ],
  },
  mode: debug,
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[id].js",
    path: path.join(__dirname, "dist"),
    publicPath: `/dist/`,
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"],
  },
  devtool: debug ? "eval-source-map" : false,
  devServer: {
    // headers: { "Access-Control-Allow-Origin": "*" },
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html" }),
    new MiniCssExtractPlugin({ filename: "[name].bundle.css" }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      d3: "d3v4",
    }),
  ].concat(debug ? [] : ProductionPlugins),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: debug,
            },
          },
          "css-loader",
        ],
      },
      { test: /\.html$/, loader: "raw-loader" },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        options: { limit: 10000, mimetype: "application/font-woff" },
      },
      {
        test: /\.(ttf|eot|svg|png|jpe?g|gif|ico)(\?.*)?$/i,
        loader: `file-loader?context=${rootAssetPath}&name=[path][name].[ext]`,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: { presets: ["@babel/preset-env"], cacheDirectory: true },
      },
    ],
  },

  node: {
    fs: "empty",
    http: "empty",
  },
};
