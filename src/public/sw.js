/* eslint-disable */

importScripts("lib/sw-toolbox.js")
importScripts("lib/sw-toolbox-cache.js")

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

toolbox.router.get("/", toolbox.networkFirst)
toolbox.router.get("/css/*.css", toolbox.fastest)
toolbox.router.get("/lib/*.js", toolbox.fastest)
toolbox.router.get("/fonts/*", toolbox.fastest)
toolbox.router.get("/images/cover/*.jpg", toolbox.fastest)
toolbox.router.get("/images/icon/*.svg", toolbox.fastest)
toolbox.router.get("/images/touch/*.png", toolbox.fastest)
toolbox.router.get("/browserconfig.xml", toolbox.fastest)
toolbox.router.get("/crossdomain.xml", toolbox.fastest)
toolbox.router.get("/manifest.json", toolbox.fastest)
