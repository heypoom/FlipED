import mongoose from "mongoose"
import mongooseRedisCache from "mongoose-redis-cache"

import {DATABASE_URL} from "../config"
import {IS_PROD} from "../constants/util"

import authentication from "./authentication"
import debug from "./debug"
import messages from "./messages"
import users from "./users"
import classes from "./classes"
import lessons from "./lessons"
import quizzes from "./quizzes"
import comments from "./comments"
import assignments from "./assignments"
import track from "./track"
import socket from "./socket"
import upload from "./upload"
import account from "./account"

export default function services() {
  mongoose.connect(DATABASE_URL)
  mongoose.Promise = global.Promise

  if (IS_PROD)
    mongooseRedisCache(mongoose)

  this.configure(users)
  this.configure(authentication)
  this.configure(messages)
  this.configure(classes)
  this.configure(lessons)
  this.configure(quizzes)
  this.configure(comments)
  this.configure(assignments)
  this.configure(debug)
  this.configure(track)
  this.configure(socket)
  this.configure(upload)
  this.configure(account)
  this.configure(debug)
}
