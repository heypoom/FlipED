export const APP_TITLE = "FlipED™"
export const TOKEN_KEY = "feathers-jwt"
export const DEFAULT_UA = "all" // Default user agent

// HotKeys used in the Application
export const KEYMAP = {
  save: "ctrl+s"
}

// Parameters for Chat Interface
export const WAITING_TIME_BASE = 800
export const WAITING_TIME_MULTIPLIER = 550
export const TYPING_TIME = 950

export const SEGMENT_KEY = "inYx5crWKP9gKRgehuRMlXH3hS8MjENa"
export const SEGMENT = `
!function(){var analytics=window.analytics=window.analytics||[];
  if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.1.0";
  analytics.load("${SEGMENT_KEY}");
  analytics.page()
  }}();
`

export const NO_JWT = "NO_JWT"
export const INVALID_JWT = "INVALID_JWT"
export const NO_COOKIE = "NO_COOKIE"
