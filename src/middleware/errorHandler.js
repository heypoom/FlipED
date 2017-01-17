import React from "react"
import ReactDOM from "react-dom/server"
import PrettyError from "pretty-error"

import Html from "../components/Html"
import {ErrorPage} from "../routes/error/ErrorPage"
import errorPageStyle from "../routes/error/ErrorPage.scss"

const pe = new PrettyError()
pe.skipNodeFiles()
pe.skipPackage("feathers")

export default function errorHandler(err, req, res, next) {
  req.app.logger.log(pe.render(err))
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="โอ๊โอ ดูเหมือนจะมีปัญหาเล็กน้อย ขอโทษด้วยนะ"
      description={err.message}
      style={errorPageStyle._getCss()}
    >
      {ReactDOM.renderToString(<ErrorPage error={err} />)}
    </Html>
  )
  // res.status(err.status || 501)
  res.send(`<!doctype html>${html}`)
  res.end()
}
