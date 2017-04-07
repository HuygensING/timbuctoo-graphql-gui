#!/usr/bin/node
//Nice and fast docker shutdown
process.on('SIGTERM', function () {
  //gracefull shutdown is for pusillanimous people and statefull apps
  process.exit(0);
});
//This is a js file because it get's run directly by Node.js
var isDev = process.argv[2] === "development";
process.env.NODE_ENV = isDev ? "development" : "production";

var express = require('express')
var path = require("path");
var app = express()

if (isDev) {
  var webpackMiddleware = require("webpack-dev-middleware");
  var webpack = require("webpack");
  var storybook = require('@kadira/storybook/dist/server/middleware').default;
  var webpackHotMiddleware = require("webpack-hot-middleware")

  var webpackConfig = require(path.join("..", "src", "configs", "webpack", "webpack.config"))

  //serve index that links to all other sites
  app.use(express.static(path.join(__dirname, 'static'), {}))
	app.use("/storybook", storybook(path.join(__dirname, "..", "src", 'configs', "storybook")));
  var compiler = webpack(webpackConfig);
	app.use(webpackMiddleware(compiler, {
		noInfo: true,
		publicPath: "/build",
		index: "index.html"
	}));
  app.use(webpackHotMiddleware(compiler, {path: "/build/__webpack_hmr"}));
  app.use("/build", express.static(path.join(__dirname, '..', "src", 'static'), {}))
} else {
  app.use(express.static(path.join(__dirname, '..', 'static'), {}))
  app.use(express.static(path.join(__dirname, '..', 'build'), {}))
}


app.use(function (req, res, next) {
  res.status(404).send("None of the middleware could handle that request.")
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke. See console for a stack trace.')
})

var server = require('http').createServer(app);
server.listen(isDev ? 8081 : 8080, function () {
  console.log("Server available!");
  console.log("on http://localhost:8080 (or whatever you bound port 8080 to in your docker-compose)");
});


//**********************************************************************************************************************
if (isDev) {
  var bs = require("browser-sync").create();
  bs.init({
    open: false,
    proxy: {
        target: "http://localhost:8081",
        ws: true
    },
    port: 8080,
    https: true
  });
}