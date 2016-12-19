export const addEventListener = (node, event, listener) => {
  if (node.addEventListener)
    node.addEventListener(event, listener, false)
  else
    node.attachEvent(`on${event}`, listener)
}

export const removeEventListener = (node, event, listener) => {
  if (node.removeEventListener)
    node.removeEventListener(event, listener, false)
  else
    node.detachEvent(`on${event}`, listener)
}

export const windowScrollX = () => (window.pageXOffset !== undefined) ? window.pageXOffset
  : (document.documentElement || document.body.parentNode || document.body).scrollLeft

export const windowScrollY = () => (window.pageYOffset !== undefined) ? window.pageYOffset
  : (document.documentElement || document.body.parentNode || document.body).scrollTop
