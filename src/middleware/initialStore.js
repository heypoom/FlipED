import cookie from "cookie"
import decode from "../core/decodeJwt"

// import {isRoute, getIDfromURL} from "../core/helper"

import {servicesSSR} from "../client/api"
import {USER, LESSON} from "../constants/api"

import {setRuntimeVariable} from "../actions/runtime"
import {setUserInfo} from "../actions/user"
import {set} from "../actions/chat"

import {isRoute, getIDfromURL} from "../core/helper"

import configureStore from "../core/configureStore"

/**
 * @module initialStore
 * @description Serves initial state to the universal renderer.
 * @param (Object) i: Parameters for SSR (Cookies, Routes, etc.)
*/

const initialStore = async i => {
  const services = servicesSSR(i.app) // Creates new instance of feathers-reduxify-services
  const store = configureStore()

  try {
    const myJwt = await decode(i.cookie)
    const user = await i.app.service(USER).find({
      query: {
        _id: myJwt.userId,
        $select: ["_id", "username", "photo", "email", "roles", "state"]
      }
    })
    console.log("USER", myJwt.userId, user)

    if (user) {
      if (user.data.length === 1) {
        store.dispatch(setUserInfo(user.data[0]))
        store.dispatch(set(user.data[0].state))
      }
    }

    console.info("ROUTE", i.route)

    await store.dispatch(services.class.find({}))

    if (isRoute(i.route, "/notes/")) {
      console.log("Notes is in route; Getting", getIDfromURL(i.route, "/notes/"))
      await store.dispatch(services.lesson.get(getIDfromURL(i.route, "/notes/")))
    } else {
      await store.dispatch(services.lesson.find())
    }
  } catch (err) {
    console.error("SSR_ERR", err, "at", i.route)
    store.dispatch(setUserInfo({}))
    store.dispatch(set({}))
  }

  store.dispatch(setRuntimeVariable("route", i.route))
  store.dispatch(setRuntimeVariable("userAgent", i.userAgent))
  store.dispatch(setRuntimeVariable("cookie", (typeof i.cookie === "string" && i.cookie !== "")
    ? cookie.parse(i.cookie) : i.cookie))
  store.dispatch(setRuntimeVariable("routeQuery", i.query))

  console.log("Store", store.getState().class)
  console.log("ENV_SERVER", process.env.NODE_ENV)

  return store
}

export default initialStore
