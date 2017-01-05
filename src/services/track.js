import {Service} from "feathers-mongoose"

import {isRole} from "../core/hooks"

import track from "../models/track"

import {TRACK} from "../constants/api"

export default function tracks() {
  this.use(TRACK, new Service({
    Model: track,
    paginate: {
      default: 5,
      max: 25
    }
  }))

  this.service(TRACK).before({
    all: [],
    find: [isRole("teacher")],
    get: [isRole("teacher")],
    create: [isRole("student")],
    update: [isRole("teacher")],
    patch: [isRole("teacher")]
  })
}
