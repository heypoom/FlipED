export const setRuntimeVariable = ({name, value}) => ({
  type: "SET_RUNTIME_VARIABLE",
  payload: {name, value}
})

export const appSettings = ({params}) => ({
  type: "APP_SETTINGS",
  payload: {params}
})

export const setTitle = title => ({
  type: "SET_TITLE",
  payload: title
})

export const setNav = navStyle => ({
  type: "SET_NAV",
  payload: navStyle
})
