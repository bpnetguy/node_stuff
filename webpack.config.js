var
webpack = require("webpack"),
path = require("path"),
bowerPath = path.join( __dirname, "bower_components" );

module.exports = {
  cache: true,
  entry: {
    app: "./index.js",
    tests: "./tests/index.js"
  },
  output: {
    path: __dirname + "/dev",
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader"},
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
      { test: /\.html$/, loader: "html-loader"},
      { test: /\.(png|jpg)$/, loader: 'file?prefix=images/' },
      { test: /\.(otf|woff)$/, loader: 'file-loader?prefix=fonts/' },
      { test: /tests\/index\.js$/, loader: "mocha-loader" },
      { test: /sinon\.js$/, loader: "imports?define=>false" },
      { test: /\.json$/, loader: "json-loader" }
    ]
  },
  resolve: {
    // Look in node_modules first, then look in bower_components
    modulesDirectories: ["modules", "node_modules", "bower_components"]
  },
  devtool: "eval",
  plugins: [
    // Tell webpack to look at the "main" property of bower.json files to resolve paths
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin( "bower.json", ["main", ["main", "1"]] )
    ], ["normal", "loader"])
  ]
};
