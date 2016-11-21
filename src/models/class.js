import mongoose, {Schema} from "mongoose"
import autopopulate from "mongoose-autopopulate"

import {DEFAULT_IMAGE} from "../constants/visual"

/*
  NOTE: คลาสเรียน
  @name (String): ชื่อของรายวิชา
  @description (String): คำอธิบายรายวิชา
  @class (Refs): ระดับชั้น
  @owner (Refs): เจ้าของวิชา
  @enrolledStudent (Refs): ผู้ที่กำลังเรียนอยู่
  @metadata (Mixed): ข้อมูลปลีกย่อย
*/

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
    autopopulate: {select: "username"}
  }],
  enrolledStudent: [{
    type: Schema.Types.ObjectId,
    ref: "user",
    autopopulate: {select: "username"}
  }],
  sections: [SectionSchema],
  thumbnail: {type: String, default: DEFAULT_IMAGE},
  color: String,
  metadata: Schema.Types.Mixed,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

ClassSchema.plugin(autopopulate)
ClassSchema.set("redisCache", true)

const classModel = mongoose.model("class", ClassSchema)

export const section = mongoose.model("section", SectionSchema)

export default classModel
