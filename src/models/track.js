import mongoose, {Schema} from "mongoose"
import autopopulate from "mongoose-autopopulate"

const TrackSchema = new Schema({
  action: {type: String, required: true},
  payload: Object,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    autopopulate: {select: "username"}
  },
  createdAt: {type: Date, default: Date.now}
})

TrackSchema.plugin(autopopulate)
TrackSchema.set("redisCache", true)

const track = mongoose.model("track", TrackSchema)

export default track
