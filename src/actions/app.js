import {makeAction} from "../core/helper"

export const setField = makeAction("SET_FIELD", "field", "value")
export const setSnackbar = makeAction("SET_SNACKBAR")
export const setUi = makeAction("SET_UI_STATE", "key", "value")
export const toggleUi = makeAction("TOGGLE_UI_STATE")
