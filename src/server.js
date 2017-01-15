import feathers from "feathers"

import middleware from "./middleware"
import services from "./services"

import {HOST, PORT} from "./config"
import {DEFAULT_UA} from "./constants"

const app = feathers()

require("pmx").init({
  http: true
})

global.navigator = global.navigator || {}
global.navigator.userAgent = global.navigator.userAgent || DEFAULT_UA

app.configure(middleware)
app.configure(services)

app.logger.log("debug", process.env.NODE_ENV)

app.listen(PORT, HOST, () => {
  /* eslint no-console: 0 */
  console.log(`The server is running at http://localhost:${PORT}/`)
})
