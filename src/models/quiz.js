import mongoose, {Schema} from "mongoose"

/*
  NOTE: คำถาม
  [QuizSchema]
    @name (String Required): ชื่อคำถาม
    @questions ([QuestionSchema]): คำถามต่างๆ
    @mode (Enum): ชนิดของ Quiz (test, pop, compete)
    @time (Number): เวลาที่ต้องใช้ทั้งหมด หน่วยเป็นวินาที
    @parentCourse (ObjectId)
  [QuestionSchema]
    @question (String Required): คำถาม
    @choices ([ChoiceSchema]): ช้อยส์
    @timePerQuestion (Number): กี่วินาทีต่อหนึ่งข้อ
    @hint (String): คำใบ้
    @explanation (String): คำอธิบายคำถาม
  [ChoiceSchema]
    @text (String Required): ช้อยส์
    @correct (Boolean): ถูกหรือผิด
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
