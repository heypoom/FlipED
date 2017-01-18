import mongoose, {Schema} from "mongoose"
import autopopulate from "mongoose-autopopulate"

import {DEFAULT_IMAGE} from "../constants/visual"

/**
  @module Course Schema
  @param name (String): ชื่อของรายวิชา
  @param description (String): คำอธิบายรายวิชา
  @param class (Refs): ระดับชั้น
  @param owner (Refs): เจ้าของวิชา
  @param enrolledStudent (Refs): ผู้ที่กำลังเรียนอยู่
  @param metadata (Mixed): ข้อมูลปลีกย่อย
  @param category (String): ชนิดของวิชา
*/

const USER_POPULATE = {
  select: "username photo email"
}

const SectionSchema = new Schema({
  name: {type: String},
  description: {type: String}
})

const ClassSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  owner: [{
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    autopopulate: USER_POPULATE
  }],
  students: [{
    type: Schema.Types.ObjectId,
    ref: "user",
    autopopulate: USER_POPULATE
  }],
  sections: [SectionSchema],
  thumbnail: {type: String, default: DEFAULT_IMAGE},
  color: String,
  metadata: Schema.Types.Mixed,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  subject: {
    type: String,
    required: true
  },
})

ClassSchema.plugin(autopopulate)
ClassSchema.set("redisCache", true)

const classModel = mongoose.model("class", ClassSchema)

export const section = mongoose.model("section", SectionSchema)

export default classModel
