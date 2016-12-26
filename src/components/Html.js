import React, {PropTypes} from "react"

import {SEGMENT} from "../constants"
import {IS_PROD} from "../constants/util"

const Html = ({title, description, style, script, vendors, children, state}) => (
  <html className="no-js" lang="th-TH">
    <head>
      <title>{title}</title>

      <meta charSet="utf-8" />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content="" />
      <meta name="author" content="" />
      <meta name="copyright" content="" />
      <meta name="application-name" content="FlipED" />

      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      <meta name="theme-color" content="#0c82d3" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="FlipED" />

      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="" />
      <meta property="og:url" content="" />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="" />
      <meta name="twitter:description" content="" />
      <meta name="twitter:image" content="" />

      <link rel="stylesheet" href="/css/grid.css" />
      <style id="css" dangerouslySetInnerHTML={{__html: style}} />
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{__html: children}} />
      <link rel="stylesheet" href="/css/sweetalert.css" />
      <link rel="stylesheet" href="/css/waves.min.css" />
      <link rel="stylesheet" href="/css/icon.css" />
      {vendors && <script id="vendors" src={vendors} />}
      {script && <script id="source" src={script} data-initial-state={JSON.stringify(state)} />}
      <script src="/lib/waves.min.js" />
      <link href="https://fonts.googleapis.com/css?family=Kanit:300,400|Roboto:300,400,600" rel="stylesheet" />
      {(SEGMENT && IS_PROD) && <script dangerouslySetInnerHTML={{__html: SEGMENT}} />}
    </body>
  </html>
)

// |Pridi

Html.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  script: PropTypes.string,
  children: PropTypes.string,
  state: PropTypes.object.isRequired
}

export default Html
