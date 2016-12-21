export const WAITING_TIME_BASE = 800
export const WAITING_TIME_MULTIPLIER = 550
export const TYPING_TIME = 950

export const DEFAULT_UA = "all"

export const APP_TITLE = "FlipED™"
export const TOKEN_KEY = "feathers-jwt"
export const SEGMENT_KEY = "inYx5crWKP9gKRgehuRMlXH3hS8MjENa"
export const SEGMENT = `
!function(){var analytics=window.analytics=window.analytics||[];
  if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.1.0";
  analytics.load("${SEGMENT_KEY}");
  analytics.page()
  }}();
`

export const ROLE = {
  none: {
    perm: -1,
    th: "ไม่มีสิทธิในการใช้งาน"
  },
  guest: {
    perm: 0,
    th: "รอการยืนยันสิทธิ"
  },
  student: {
    perm: 1,
    th: "ผู้เรียน"
  },
  teacher: {
    perm: 3,
    th: "ผู้สอน"
  },
  admin: {
    perm: 4,
    th: "ผู้ดูแลระบบ"
  }
}
