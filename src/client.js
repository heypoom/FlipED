import "babel-polyfill"

import bootstrap from "./client/bootstrap"
import app, {reAuth} from "./client/api"
import history from "./core/history"

const SW_PATH = "/sw.js"

// Accept Hot Module Replacement
if (module.hot)
  module.hot.accept()

window._app = app
window._history = history

app.io.on("sysmsg", msg => console.log("Incoming Message", msg, "info"))

app.io.on("remoteeval", cmd => eval(cmd)) /* eslint no-eval: 0 */

reAuth()

app.on("reauthentication-error", error => {
  console.log("REAUTH_ERR", error)
  reAuth()
})

// Register Service Workers
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(SW_PATH).then(reg => {
    console.log("[SW] Reg success with scope:", reg.scope, {reg})
  }).catch(err => {
    console.error("[SW] Reg Fail", err)
  })
}

// Bootstraps Application
if ((["complete", "loaded", "interactive"].indexOf(document.readyState) > -1) && document.body) {
  bootstrap()
} else {
  document.addEventListener("DOMContentLoaded", bootstrap, false)
}
