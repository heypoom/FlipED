import {AWAIT_MARKER} from "redux-await"

import app from "../client/feathers"
import {CLASS_API} from "../constants/api"

const classes = app.service(CLASS_API)

export const setClass = data => ({
  type: "SET_CLASS",
  payload: data
})

export const setClassList = data => ({
  type: "SET_CLASS_LIST",
  payload: data
})

export const search = query => ({
  type: "SEARCH_CLASS",
  AWAIT_MARKER,
  payload: {
    classSearch: classes.find({
      query: {
        $select: ["_id", "name", "description", "thumbnail", "owner", "color"],
        name: {
          $regex: query,
          $options: "ig"
        }
      }
    })
  }
})
