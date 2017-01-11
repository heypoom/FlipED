import mongoose, {Schema} from "mongoose"
import autopopulate from "mongoose-autopopulate"

import {DEFAULT_IMAGE} from "../constants/visual"

/**
  @module Lecture Schema]
  @param name (String): ชื่อบทเรียน
  @param description (String): คำอธิบายบทเรียน
  @param content (String): เนื้อหาที่ใช้เรียน
  @param thumbnail (String): รูปภาพที่ใช้แสดง
  @param parallaxImage (String): รูปภาพพื้นหลังช่วงแรก
  @param course (Refs): หลักสูตรของบทเรียน
  @param order (Number): ลำดับของการเรียน (บท 1, 2, ...)
*/

const COURSE_POPULATE = {select: "name owner subject"}

const LessonSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  content: {type: Array, required: true},
  thumbnail: {type: String, default: DEFAULT_IMAGE},
  course: {
    type: Schema.Types.ObjectId,
    ref: "class",
    autopopulate: COURSE_POPULATE
  },
  section: {type: Schema.Types.ObjectId, ref: "section"},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

LessonSchema.plugin(autopopulate)
LessonSchema.set("redisCache", true)

const lesson = mongoose.model("lesson", LessonSchema)

export default lesson
