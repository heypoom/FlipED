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
  // Creates new instance of feathers-reduxify-services
  const services = servicesSSR(i.app)
  const store = configureStore()

  console.info("ROUTE", i.route)

  try {
    const myJwt = await decode(i.cookie)
    const user = await i.app.service("users").find({
      query: {
        _id: myJwt.userId,
        $select: ["_id", "username", "photo", "email", "roles", "state"]
      }
    })

    if (user) {
      console.log("USER", myJwt.userId, user)
      if (user.data.length === 1) {
        store.dispatch(setUserInfo(user.data[0]))
        store.dispatch(set(user.data[0].state))
      }
    }

    await store.dispatch(services.classes.find({}))
    await store.dispatch(services.lessons.find({}))

    if (isRoute(i.route, "/notes/")) {
      console.log("Notes is in route; Getting", getIDfromURL(i.route, "/notes/"))
      await store.dispatch(services.lessons.get(getIDfromURL(i.route, "/notes/")))
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

  console.log("ENV_SERVER", process.env.NODE_ENV)

  return store
}

export default initialStore
