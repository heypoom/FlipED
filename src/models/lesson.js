import mongoose, {Schema} from "mongoose"
import autopopulate from "mongoose-autopopulate"

/*
  NOTE: เนื้อหา
  @name (String): ชื่อบทเรียน
  @description (String): คำอธิบายบทเรียน
  @content (String): เนื้อหาที่ใช้เรียน
  @thumbnail (String): รูปภาพที่ใช้แสดง
  @parallaxImage (String): รูปภาพพื้นหลังช่วงแรก
  @parentCourse (Refs): หลักสูตรของบทเรียน
  @order (Number): ลำดับของการเรียน (บท 1, 2, ...)
*/

const LessonSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  content: {type: Array, required: true},
  url: {type: String, unique: true},
  thumbnail: String,
  parallaxImage: String,
  parentCourse: {
    type: Schema.Types.ObjectId,
    ref: "class",
    autopopulate: {select: "name"}
  },
  order: Number,
  section: {type: Schema.Types.ObjectId, ref: "section"},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

LessonSchema.plugin(autopopulate)
LessonSchema.set("redisCache", true)

const lesson = mongoose.model("lesson", LessonSchema)

export default lesson
