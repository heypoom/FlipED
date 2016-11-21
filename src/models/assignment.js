import mongoose, {Schema} from "mongoose"

/*
  NOTE: สั่งงาน
  @createdBy
*/

const AssignmentSchema = new Schema({
  createdBy: {type: Schema.Types.ObjectId, ref: "user"},
  course: {type: Schema.Types.ObjectId, ref: "course"},
  visibleTime: Date,
  name: {type: String, required: true},
  description: {type: String, required: true},
  content: {type: String, required: true},
  submitted: [{type: Schema.Types.ObjectId, ref: "user"}],
  checked: [{type: Schema.Types.ObjectId, ref: "user"}],
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

AssignmentSchema.set("redisCache", true)

const assignment = mongoose.model("assignment", AssignmentSchema)

export default assignment
