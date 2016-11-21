import React from "react"
import app from "../core/feathers"
import ReactDOM from "react-dom/server"
import PrettyError from "pretty-error"

import Html from "../components/Html"
import {ErrorPage} from "../routes/error/ErrorPage"
import errorPageStyle from "../routes/error/ErrorPage.css"

const pe = new PrettyError()
pe.skipNodeFiles()
pe.skipPackage("feathers")

/* eslint-disable no-unused-vars */

const errorHandler = (err, req, res, next) => {
  app.logger.log(pe.render(err))
  const statusCode = err.status || 500
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="โอ๊โอ ดูเหมือนจะมีปัญหาเล็กน้อย ขอโทษด้วยนะ"
      description={err.message}
      style={errorPageStyle._getCss()}
    >
      {ReactDOM.renderToString(<ErrorPage error={err} />)}
    </Html>
  )
  res.status(statusCode)
  res.send(`<!doctype html>${html}`)
}

export default errorHandler
