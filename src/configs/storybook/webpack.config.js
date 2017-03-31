module.exports = function(config, ENV) {
  config.entry.preview = config.entry.preview.map(function(entry) {
    if (entry.includes("webpack-hot-middleware")) {
      return `${require.resolve('webpack-hot-middleware/client')}?path=/storybook/__webpack_hmr&reload=true`;
    }

    return entry;
  });

  config.module.loaders.push({test: /\.(tsx|ts)$/, loaders: ['awesome-typescript-loader']});
  config.module.preLoaders = config.module.preLoaders || [];
  config.module.preLoaders.push({enforce: "pre", test: /\.js$/, loader: "source-map-loader"});

  config.devtool = "source-map"
  config.resolve = {
    extensions: ['', '.js', '.jsx', '.tsx', '.ts']
  };

  if (!config.externals) {
    config.externals = {};
  }
  config.externals["redux"] = "Redux";
  
  return config;
};