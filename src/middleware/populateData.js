import {
  USER_API,
  LESSON_API,
  QUIZ_API,
  CLASS_API,
  TRACK_API,
  SOCKET_API,
  LESSON_URL,
  CLASS_URL
} from "../constants/api"

import app from "../core/feathers"
import {isRoute, getIDfromURL} from "../core/helper"
import decode from "../core/decodeJwt"

const populateData = async (v) => {
  try {
    const myJwt = await decode(v.cookie)
    return {
      cookie: v.cookie,
      route: v.route,
      query: v.query,
      userAgent: v.userAgent,
      user: await app.service(USER_API).find({
        query: {
          _id: myJwt._id,
          $select: ["_id", "username", "photo", "email", "roles"]
        }
      }),
      // HACK: Will use a proper route matching system.
      lesson: isRoute(v.route, LESSON_URL) ?
        await app.service(LESSON_API).find({
          query: {
            url: getIDfromURL(v.route, LESSON_URL)
          }
        }) : {},
      lessonList: isRoute(v.route, CLASS_URL) ?
        await app.service(LESSON_API).find({
          query: {
            $select: ["_id", "url", "name", "description", "thumbnail"],
            parentCourse: getIDfromURL(v.route, CLASS_URL)
          }
        }) : {},
      quizList: isRoute(v.route, CLASS_URL) ?
        await app.service(QUIZ_API).find({
          query: {
            $select: ["_id", "name"],
            parentCourse: getIDfromURL(v.route, CLASS_URL)
          }
        }) : {},
      class: isRoute(v.route, CLASS_URL) ?
        await app.service(CLASS_API).get(getIDfromURL(v.route, CLASS_URL)) : {},
      classList: await app.service(CLASS_API).find({
        query: {
          $select: ["_id", "name", "thumbnail", "color", "owner", "description"]
        }
      }),
      actionList: await app.service(TRACK_API).find({
        query: {
          $sort: {createdAt: -1}
        }
      }),
      usersList: await app.service(USER_API).find({
        query: {
          $select: ["_id", "username", "email", "roles", "photo"]
        }
      }),
      online: await app.service(SOCKET_API).get(0)
    }
  } catch (err) {
    if (err !== "NO_JWT")
      app.logger.log("debug", "[FAIL] POPULATE MODULE ERROR", err)
    const mockLesson = {
      _id: "",
      name: " ",
      description: " ",
      thumbnail: "",
      color: "#2d2d30",
      url: "0000",
      content: [{
        type: "none"
      }]
    }
    const mockClass = {
      _id: "",
      name: " ",
      description: " ",
      lesson: [mockLesson, mockLesson],
      color: "#2d2d30"
    }
    return {
      cookie: v.cookie,
      route: v.route,
      query: v.query,
      userAgent: v.userAgent,
      jwt: null,
      user: {},
      lesson: {
        data: []
      },
      lessonList: {
        data: []
      },
      quizList: {
        data: []
      },
      class: mockClass,
      classList: {
        data: []
      },
      actionList: {
        data: []
      },
      online: {
        count: 0,
        users: []
      },
      usersList: {
        data: []
      },
      error: err || ""
    }
  }
}

export default populateData
