var webpack = require('webpack')
var path = require('path')

var extraModules = process.env.NODE_ENV === "development" ?
  ["webpack-hot-middleware/client?path=/build/__webpack_hmr&reload=true"] :
  [];

module.exports = {
  entry: {
    "app": ["./src/app/index.ts"].concat(extraModules),
    "tests": ["./src/_external/babyccino"].concat(extraModules),
  },
  output: {
    filename: "[name].js", //this can be improved upon. Currently each build creates a new hash (even if the content didn't change)
    path: path.resolve("./build"),
    publicPath: "/build"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "babyccinoPath": JSON.stringify(path.resolve("./src/app")),
      "babyccinoRegex": "/\\.test$/",
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  externals: {
      "react": "React",
      "react-dom": "ReactDOM",
      "redux": "Redux"
  },
};