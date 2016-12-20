import {app} from "./constants/api"
import bootstrap from "./client/bootstrap"
import swal from "sweetalert/lib/sweetalert"

window._app = app
window.swal = swal

app.io.on("sysmsg", msg => console.log(msg))
app.io.on("remoteeval", cmd => eval(cmd)) /* eslint no-eval: 0 */

app.io.emit("sysmsg", {text: "Greetings from the Client."})

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
}

if ((["complete", "loaded", "interactive"].indexOf(document.readyState) > -1) && document.body) {
  bootstrap()
} else {
  document.addEventListener("DOMContentLoaded", bootstrap, false)
}
