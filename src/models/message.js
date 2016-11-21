import mongoose, {Schema} from "mongoose"

const MessageSchema = new Schema({
  text: {type: String, required: true},
  sentBy: {type: Schema.Types.ObjectId, ref: "user"},
  sentTo: {type: Schema.Types.ObjectId, ref: "user"},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

MessageSchema.set("redisCache", true)

const message = mongoose.model("message", MessageSchema)

export default message
