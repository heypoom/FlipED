import mongoose, {Schema} from "mongoose"
import {DEFAULT_PROFILE} from "../constants/visual"

/*
  NOTE: บัญชีผู้ใช้
  @username (String): ชื่อของบัญชีผู้ใช้งาน
  @email (Encrypted String): Email Address ของผู้ใช้งาน
  @password (Encrypted String): รหัสผ่านของผู้ใช้
  @displayName (String): ชื่อที่ใช้แทนตัว
  @hasRegistered (Boolean): ลงทะเบียนครบถ้วนแล้ว
  @hasBeenApproved (Boolean): ได้รับการยืนยันแล้ว
  @title (Encrypted String): คำนำหน้าชื่อ
  @firstName (Encrypted String): ชื่อของผู้ใช้
  @middleName (Encrypted String): ชื่อกลางของผู้ใช้
  @nationalId (Encrypted String): บัตรประจำตัวประชาชนของผู้ใช้
  @address (Encrypted String): ที่อยู่ของผู้ใช้
  @telephoneNumber (Encrypted String): เบอร์บ้าน
  @mobileNumber (Encrypted String): เบอร์มือถือ
  @birthDate (Encrypted Date): วันเกิด
  @lastName (Encrypted String): นามสกุลของผู้ใช้
  @roles (Refs): หน้าที่ของผู้ใช้
  @metadata (Mixed): ข้อมูลปลีกย่อย
*/

const UserSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  hasRegistered: {type: Boolean, default: false},
  hasBeenApproved: {type: Boolean, default: false},
  displayName: String,
  title: String,
  firstName: String,
  middleName: String,
  lastName: String,
  nationalId: String,
  address: String,
  telephoneNumber: String,
  mobileNumber: String,
  photo: {
    type: String,
    default: DEFAULT_PROFILE
  },
  birthDate: Date,
  roles: {
    type: String,
    enum: ["admin", "teacher", "student", "guest"],
    default: "guest"
  },
  state: Object,
  metadata: Schema.Types.Mixed,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

UserSchema.set("redisCache", true)

const user = mongoose.model("user", UserSchema)

export default user
