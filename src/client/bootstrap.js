import React from "react"
import {render} from "react-dom"
import injectTapEventPlugin from "react-tap-event-plugin"

import {ConnectedRouter} from "connected-react-router"
import browserHistory from "../core/history"

import initialStore from "./initialStore"
import Routes from "../routes"
import App from "../components/App"

// Initial Context
const context = {
  store: null,
  insertCss: (...styles) => {
    // isomorphic-style-loader insertCss
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
  }
}

/**
  @module Bootstrap
  @desc Bootstraps the application and render views.
*/

export default () => {
  // Inject Tap Event Plugin on first time.
  if (!module.hot || module.hot.status() === "idle")
    injectTapEventPlugin()

  // Initiate Redux Store on the Client Side
  context.store = initialStore(JSON.parse(
    document.getElementById("source").getAttribute("data-initial-state")
  ))

  // Remove Critical CSS
  const css = document.getElementById("css")
  if (css)
    css.parentNode.removeChild(css)

  // Send PageViews to Google Analytics
  if (window.ga)
    window.ga("send", "pageview")

  // Render the Application!
  render(
    <App context={context}>
      <ConnectedRouter history={browserHistory}>
        <Routes />
      </ConnectedRouter>
    </App>,
    document.getElementById("app")
  )
}
