import webpack from "webpack"
import webpackConfig from "./webpack.config"

import Visualizer from "webpack-visualizer-plugin"

export default () => new Promise((resolve, reject) => {
  webpackConfig.filter(x => x.target !== "node").forEach(config => {
    config.plugins.push(new Visualizer({
      filename: "./stats.html"
    }))
    console.log(config.plugins)
  })

  webpack(webpackConfig).run((err, stats) => {
    if (err)
      return reject(err)

    console.log(stats.toString(webpackConfig[0].stats))
    return resolve()
  })
})
