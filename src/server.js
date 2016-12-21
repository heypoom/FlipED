import app from "./core/feathers"

import middleware from "./middleware"
import services from "./services"

import {HOST, PORT} from "./config"

if (module.hot) {
  module.hot.accept()
}

require("pmx").init({
  http: true
})

// global.navigator = global.navigator || {}
// global.navigator.userAgent = global.navigator.userAgent || "all"

app.configure(middleware)
app.configure(services)

app.logger.log("debug", process.env.NODE_ENV)

app.listen(PORT, HOST, () => {
  /* eslint no-console: 0 */
  console.log(`The server is running at http://localhost:${PORT}/`)
})
