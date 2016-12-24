import {makeAction} from "../core/helper"

export const setField = makeAction("SET_FIELD", "field", "value")
export const setSnackbar = makeAction("SET_SNACKBAR")
export const setUi = makeAction("SET_UI_STATE", "key", "value")
export const toggleUi = makeAction("TOGGLE_UI_STATE")

export const setUserState = (key, value, user) => dispatch => {
  if (user) {
    dispatch(service.users.patch(user._id, {
      state: {...user.state, [key]: value}
    }))
  }
}
