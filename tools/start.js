import Browsersync from "browser-sync"
import webpack from "webpack"
import webpackMiddleware from "webpack-middleware"
import webpackHotMiddleware from "webpack-hot-middleware"
import DashboardPlugin from "webpack-dashboard/plugin"

import run from "./run"
import runServer from "./runServer"
import webpackConfig from "./webpack.config.babel"
import clean from "./clean"
import copy from "./copy"

const DEBUG = !process.argv.includes("--release")

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */

export default async () => {
  await run(clean)
  await run(copy.bind(undefined, {watch: true}))
  await new Promise(resolve => {
    // Patch the client-side bundle configurations
    // to enable Hot Module Replacement (HMR)
    webpackConfig.filter(x => x.target !== "node").forEach(config => {
      /* eslint-disable no-param-reassign */
      config.entry = ["webpack-hot-middleware/client"].concat(config.entry)
      config.output.filename = config.output.filename.replace("[chunkhash]", "[hash]")
      config.output.chunkFilename = config.output.chunkFilename.replace("[chunkhash]", "[hash]")
      config.plugins.push(new webpack.HotModuleReplacementPlugin())
      config.plugins.push(new webpack.NoEmitOnErrorsPlugin())
      config.plugins.push(new DashboardPlugin())
    })

    // For other settings see
    // https://webpack.github.io/docs/webpack-dev-middleware

    let bundler

    try {
      bundler = webpack(webpackConfig)
    } catch (e) {
      console.error(e)
    }

    const wpMiddleware = webpackMiddleware(bundler, {
      publicPath: webpackConfig[0].output.publicPath,
      stats: webpackConfig[0].stats
    })

    const hotMiddlewares = bundler.compilers
      .filter(compiler => compiler.options.target !== "node")
      .map(compiler => webpackHotMiddleware(compiler))

    let handleServerBundleComplete = () => {
      runServer((err, host) => {
        if (!err) {
          const bs = Browsersync.create()
          bs.init({
            ...(DEBUG ? {} : {notify: false, ui: false}),

            proxy: {
              target: host,
              middleware: [wpMiddleware, ...hotMiddlewares],
            },

            ws: true,

            files: ["build/public/*"],
          }, resolve)
          handleServerBundleComplete = runServer
        }
      })
    }

    bundler.plugin("done", () => handleServerBundleComplete())
  })
}
