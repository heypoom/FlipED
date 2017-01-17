export const setRuntimeVariable = (name, value) => ({
  type: "SET_RUNTIME_VARIABLE",
  payload: {name, value}
})

export const toggleLocale = () => ({
  type: "TOGGLE_LOCALE"
})
