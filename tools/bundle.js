import webpack from "webpack"
import webpackConfig from "./webpack.config"

export default () => new Promise((resolve, reject) => {
  webpack(webpackConfig).run((err, stats) => {
    if (err)
      return reject(err)

    console.log(stats.toString(webpackConfig[0].stats))
    return resolve()
  })
})
