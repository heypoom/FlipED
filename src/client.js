import swal from "sweetalert/lib/sweetalert"

import "babel-polyfill"

import bootstrap from "./client/bootstrap"
import app, {services, reAuth} from "./client/api"
import history from "./core/history"

const SW_PATH = "/sw.js"

if (module.hot) {
  module.hot.accept()
}

window._app = app
window._services = services
window._history = history
window.swal = swal

app.io.on("sysmsg", msg => console.log(msg))
app.io.on("remoteeval", cmd => eval(cmd)) /* eslint no-eval: 0 */

app.io.emit("sysmsg", {text: "Greetings from the Client."})

reAuth()

app.on("reauthentication-error", error => {
  console.log("REAUTH_ERR", error)
  reAuth()
})

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(SW_PATH).then(reg => {
    console.log("[SW] Reg success with scope:", reg.scope, {reg})
  }).catch(err => {
    console.error("[SW] Reg Fail", err)
  })
}

if ((["complete", "loaded", "interactive"].indexOf(document.readyState) > -1) && document.body) {
  bootstrap()
} else {
  document.addEventListener("DOMContentLoaded", bootstrap, false)
}
