import React from "react"
import {render} from "react-dom"
import injectTapEventPlugin from "react-tap-event-plugin"

import {ConnectedRouter} from "connected-react-router"
import browserHistory from "../core/history"

import initialStore from "./initialStore"
import Routes from "../routes"
import App from "../components/App"

/* eslint no-undef: 0 */

import {addEventListener, removeEventListener} from "../core/DOMUtils"

const context = {
  store: null,
  insertCss: (...styles) => {
    const removeCss = styles.map(style => style._insertCss())
    return () => removeCss.forEach(f => f())
  },
  setTitle: value => (document.title = value),
  setMeta: (name, content) => {
    // HACK: Remove and create a new <meta /> tag for Safari bookmarks.
    const elements = document.getElementsByTagName("meta")
    Array.from(elements).forEach(element => {
      if (element.getAttribute("name") === name) {
        element.parentNode.removeChild(element)
      }
    })
    const meta = document.createElement("meta")
    meta.setAttribute("name", name)
    meta.setAttribute("content", content)
    document.getElementsByTagName("head")[0].appendChild(meta)
  },
}

export default () => {
  if (!module.hot || module.hot.status() === "idle")
    injectTapEventPlugin()

  context.store = initialStore(JSON.parse(
    document.getElementById("source").getAttribute("data-initial-state")
  ))

  let originalScrollRestoration
  if (window.history && "scrollRestoration" in window.history) {
    originalScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"
  }

  addEventListener(window, "pagehide", function onPageHide() {
    removeEventListener(window, "pagehide", onPageHide)
    if (originalScrollRestoration) {
      window.history.scrollRestoration = originalScrollRestoration
      originalScrollRestoration = undefined
      // restoreScrollPosition(s)
    }
  })

  const css = document.getElementById("css")
  if (css)
    css.parentNode.removeChild(css)

  if (window.ga)
    window.ga("send", "pageview")

  render(
    <App context={context}>
      <ConnectedRouter history={browserHistory}>
        <Routes />
      </ConnectedRouter>
    </App>,
    document.getElementById("app")
  )
}
