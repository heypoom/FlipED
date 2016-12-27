import {makeAction} from "../core/helper"

export const setEditor = makeAction("SET_EDITOR", "content", "index", "key", "value")
export const loadEditor = makeAction("LOAD_EDITOR", "content", "data")
export const addElement = makeAction("EDITOR_ADD_ELEMENT", "content", "item")
export const removeElement = makeAction("EDITOR_REMOVE_ELEMENT", "content", "index")
