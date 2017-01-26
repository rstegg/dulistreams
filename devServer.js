const browserSync = require('browser-sync')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const webpackConfig = require('./webpack.config')
const bundler = webpack(webpackConfig)

const bsConfig = require('./bs.config')

const devConfig = Object.assign({}, bsConfig, {
  server: {
    baseDir: 'dev',
    index: 'index.html',
    middleware: [
      webpackDevMiddleware(bundler, {
        // IMPORTANT: dev middleware can't access config, so we should
        // provide publicPath by ourselves
        publicPath: webpackConfig.output.publicPath,

        // pretty colored output
        stats: { colors: true }

        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler)
    ]
  }
})

browserSync(devConfig)
