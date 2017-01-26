const webpack = require('webpack')
const merge   = require('webpack-merge')
const path    = require('path')

const ProgressBarPlugin     = require('progress-bar-webpack-plugin')
const ExtractTextPlugin     = require('extract-text-webpack-plugin')
const LessPluginAutoPrefix  = require('less-plugin-autoprefix')

const target = process.env.npm_lifecycle_event

const paths = {
  src:  path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  dev:  path.join(__dirname, 'dev')
}

const common = {
  context: paths.src,
  entry: './js',
  output: {
    filename:       'app.js',
    library:        'DuliWorks',
    libraryTarget:  'umd'
  },
  resolve: {
    extensions: ['', '.js', '.less']
  },
  module: {
    loaders: [
      { test: /\.js?$/, include: paths.src, loader: 'babel?cacheDirectory' }
    ]
  },
  lessLoader: {
    lessPlugins: [
      new LessPluginAutoPrefix({ browsers: [ 'last 2 versions' ] })
    ]
  }
}

if(target === 'build') {
  module.exports = merge(common, {
    output: { path: paths.dist },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin('app.css', { allChunks: true }),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    ],
    module:   {
      loaders: [
        { test: /.less$/, include: paths.src, loader: ExtractTextPlugin.extract("css!less") }
      ]
    }
  })
}

module.exports = merge(common, {
  watch:    true,
  debug:    true,
  devtool:  'inline-source-map',
  output:   {
    path:       paths.dev,
    publicPath: paths.dev
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin()
  ],
  module:   {
    loaders: [
      { test: /.less$/, include: paths.src, loader: 'style!css!less' }
    ]
  }
})
