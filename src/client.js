import app from "./client/api"
import history from "./core/history"
import bootstrap from "./client/bootstrap"
import swal from "sweetalert/lib/sweetalert"

if (module.hot) {
  module.hot.accept()
}

window._app = app
window._history = history
window.swal = swal

app.io.on("sysmsg", msg => console.log(msg))
app.io.on("remoteeval", cmd => eval(cmd)) /* eslint no-eval: 0 */

app.io.emit("sysmsg", {text: "Greetings from the Client."})

app.on("reauthentication-error", error => {
  console.log("REAUTH_ERR", error)
  app.authenticate({
    strategy: "jwt"
  }).then(response => {
    console.info("RE_AUTHENTICATED", response)
    return app.passport.verifyJwt(response.accessToken)
  }).then(payload => {
    console.info("JWT_PAYLOAD", payload)
    return app.service("users").get(payload.userId)
  }).then(user => {
    app.set("user", user)
    console.info("USER", app.get("user"))
  }).catch(err => {
    console.err("AUTH_ERR", err)
  })
})

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(reg => {
    console.log("[SW] Reg success with scope:", reg.scope)
  }).catch(err => {
    console.error("[SW] Reg Fail", err)
  })
}

if ((["complete", "loaded", "interactive"].indexOf(document.readyState) > -1) && document.body) {
  bootstrap()
} else {
  document.addEventListener("DOMContentLoaded", bootstrap, false)
}
