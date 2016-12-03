import {app} from "./constants/api"
import bootstrap from "./client/bootstrap"
import history from "./core/history"
import swal from "sweetalert/lib/sweetalert"
import {CookieStorage} from "cookie-storage"

import {services} from "./constants/api"

window._app = app
window._history = history
window._cookieStorage = new CookieStorage()
window.swal = swal

console.log(services)

app.io.on("sysmsg", msg => console.log(msg))
app.io.on("remoteeval", cmd => eval(cmd)) /* eslint no-eval: 0 */

app.io.emit("sysmsg", {text: "Greetings from the Client."})

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
}

if ((["complete", "loaded", "interactive"].indexOf(document.readyState) > -1) && document.body) {
  bootstrap()
} else {
  document.addEventListener("DOMContentLoaded", bootstrap, false)
}
