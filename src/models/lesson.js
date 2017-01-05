import mongoose, {Schema} from "mongoose"
import autopopulate from "mongoose-autopopulate"

/**
  @module Lecture Schema
  @param name (String): ชื่อบทเรียน
  @param description (String): คำอธิบายบทเรียน
  @param content (String): เนื้อหาที่ใช้เรียน
  @param thumbnail (String): รูปภาพที่ใช้แสดง
  @param parallaxImage (String): รูปภาพพื้นหลังช่วงแรก
  @param parentCourse (Refs): หลักสูตรของบทเรียน
  @param order (Number): ลำดับของการเรียน (บท 1, 2, ...)
*/

const LessonSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  content: {type: Array, required: true},
  thumbnail: String,
  parentCourse: {
    type: Schema.Types.ObjectId,
    ref: "class",
    autopopulate: {select: "name"}
  },
  section: {type: Schema.Types.ObjectId, ref: "section"},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

LessonSchema.plugin(autopopulate)
LessonSchema.set("redisCache", true)

const lesson = mongoose.model("lesson", LessonSchema)

export default lesson
