import React, {PropTypes} from "react"

import {SEGMENT_API_KEY} from "../constants"
import {IS_PROD} from "../constants/util"

function Html({title, description, style, script, vendors, children, state}) {
  return (
    <html className="no-js" lang="">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        <title>{title}</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />

        <meta name="description" ontent={description} />
        <meta name="keywords" content="" />

        <meta name="author" content="" />
        <meta name="copyright" content="" />
        <meta name="application-name" content="FlipED" />

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
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        {IS_PROD && <link href="https://fonts.googleapis.com/css?family=Kanit:300,400" rel="stylesheet" />}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/sweetalert.css" />
        {vendors && <script id="vendors" src={vendors} />}
        {script && <script id="source" src={script} data-initial-state={JSON.stringify(state)} />}
        <script src="/js/waves.min.js" />
        {(SEGMENT_API_KEY && IS_PROD) &&
          <div>
            <script
              dangerouslySetInnerHTML={{
                __html:
                `
        				  !function(){var analytics=window.analytics=window.analytics||[];
                  if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.1.0";
        				  analytics.load("${SEGMENT_API_KEY}");
        				  analytics.page()
        				  }}();
        				`
              }}
            />
          </div>
        }
      </body>
    </html>
  )
}

Html.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  script: PropTypes.string,
  children: PropTypes.string,
  state: PropTypes.object.isRequired
}

export default Html
