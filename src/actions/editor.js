import {makeAction} from "../core/helper"

export const setEditor = makeAction("SET_EDITOR", "content", "index", "key", "value")
export const loadEditor = makeAction("LOAD_EDITOR", "content", "data")
