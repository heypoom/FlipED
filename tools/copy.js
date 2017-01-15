import path from "path"
import gaze from "gaze"
import Promise from "bluebird"
import fs from "./lib/fs"
import pkg from "../package.json"

export default async ({watch} = {}) => {
  const ncp = Promise.promisify(require("ncp"))

  await Promise.all([
    ncp("src/public", "build/public")
  ])

  await fs.writeFile("./build/package.json", JSON.stringify({
    private: true,
    engines: pkg.engines,
    dependencies: pkg.dependencies,
    scripts: {
      start: "node server.js",
    },
  }, null, 2))

  if (watch) {
    const watcher = await new Promise((resolve, reject) => {
      gaze("src/public/*", (err, val) => (err ? reject(err) : resolve(val)))
    })

    const cp = async (file) => {
      const relPath = file.substr(path.join(__dirname, "../src/public/").length)
      await ncp(`src/public/${relPath}`, `build/public/${relPath}`)
    }

    watcher.on("changed", cp)
    watcher.on("added", cp)
  }
}
