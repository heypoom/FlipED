/* eslint-disable */

importScripts("sw-toolbox.js")
importScripts("sw-toolbox-cache.js")

var mode = toolbox.fastest

toolbox.precache([
  "/",
  "/browserconfig.xml",
  "/crossdomain.xml",
  "/manifest.json"
])

toolbox.options.debug = true

self.addEventListener("install", function install() {
  self.skipWaiting()
})

self.addEventListener("activate", function activate(e) {
  e.waitUntil(self.clients.claim())
})

toolbox.router.get("/", mode)
toolbox.router.get("/api(.*)", mode)

toolbox.router.get("/css/*.css", mode)
toolbox.router.get("/lib/*.js", mode)
toolbox.router.get("/fonts/*", mode)
toolbox.router.get("/images/cover/*.jpg", mode)
toolbox.router.get("/images/icon/*.svg", mode)
toolbox.router.get("/images/touch/*.png", mode)
toolbox.router.get("/browserconfig.xml", mode)
toolbox.router.get("/crossdomain.xml", mode)
toolbox.router.get("/manifest.json", mode)
