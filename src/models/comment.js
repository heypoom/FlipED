import mongoose, {Schema} from "mongoose"
import autopopulate from "mongoose-autopopulate"

/**
  * @module Comment Schema
  * @param owner ผู้โพสต์: Refs Required
  * @param message ข้อความ: String required
  * @param metadata ข้อมูลเพิ่มเติม: Mixed
*/

const CommentSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    autopopulate: {select: "username"}
  },
  message: {type: String, required: true},
  for: {type: String, required: true, default: "global"},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

CommentSchema.plugin(autopopulate)
CommentSchema.set("redisCache", true)

const comment = mongoose.model("comment", CommentSchema)

export default comment
