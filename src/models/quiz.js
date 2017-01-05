import mongoose, {Schema} from "mongoose"

/**
  * @module Quiz Schema
  * @example QuizSchema
  *   @param name (String Required): ชื่อคำถาม,
  *   @param questions ([QuestionSchema]): คำถามต่างๆ
  *   @param mode (Enum): ชนิดของ Quiz (test, pop, compete)
  *   @param time (Number): เวลาที่ต้องใช้ทั้งหมด หน่วยเป็นวินาที
  *   @param parentCourse (ObjectId)
  * @example QuestionSchema
  *   @param question (String Required): คำถาม
  *   @param choices ([ChoiceSchema]): ช้อยส์
  *   @param timePerQuestion (Number): กี่วินาทีต่อหนึ่งข้อ
  *   @param hint (String): คำใบ้
  *   @param explanation (String): คำอธิบายคำถาม
  * @example ChoiceSchema
  *   @param text (String Required): ช้อยส์
  *   @param correct (Boolean): ถูกหรือผิด
*/

const ChoiceSchema = new Schema({
  text: {type: String},
  correct: {type: Boolean, default: false}
})

const QuestionSchema = new Schema({
  question: String,
  image: String,
  choices: [ChoiceSchema],
  hint: String,
  explanation: String,
  timePerQuestion: Number
})

const QuizSchema = new Schema({
  name: {type: String, required: true},
  questions: [QuestionSchema],
  time: Number,
  mode: {type: String, enum: ["test", "pop", "compete"], default: "test"},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  parentCourse: {type: Schema.Types.ObjectId, ref: "course"}
})

QuizSchema.set("redisCache", true)

const quiz = mongoose.model("quiz", QuizSchema)

export default quiz
