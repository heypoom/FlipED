import del from "del"
import fs from "./lib/fs"

export default async () => {
  await del([".tmp", "build/*", "!build/.git"], {dot: true})
  await fs.makeDir("build/public")
}
