import run from "./run"
import clean from "./clean"
import copy from "./copy"
import bundle from "./bundle"

export default async () => {
  await run(clean)
  await run(copy)
  await run(bundle)
}
