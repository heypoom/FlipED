import mongoose, {Schema} from "mongoose"

import {roles} from "../constants/roles"
import {DEFAULT_PROFILE} from "../constants/visual"

/**
  @module User Model
  @desc Structure of what data are stored
  @param username (String): ชื่อของบัญชีผู้ใช้งาน
  @param email (Encrypted String): Email Address ของผู้ใช้งาน
  @param password (Encrypted String): รหัสผ่านของผู้ใช้
  @param displayName (String): ชื่อที่ใช้แทนตัว
  @param title (Encrypted String): คำนำหน้าชื่อ
  @param firstName (Encrypted String): ชื่อของผู้ใช้
  @param middleName (Encrypted String): ชื่อกลางของผู้ใช้
  @param nationalId (Encrypted String): บัตรประจำตัวประชาชนของผู้ใช้
  @param address (Encrypted String): ที่อยู่ของผู้ใช้
  @param telephoneNumber (Encrypted String): เบอร์บ้าน
  @param mobileNumber (Encrypted String): เบอร์มือถือ
  @param birthDate (Encrypted Date): วันเกิด
  @param lastName (Encrypted String): นามสกุลของผู้ใช้
  @param roles (Refs): หน้าที่ของผู้ใช้
  @param metadata (Mixed): ข้อมูลปลีกย่อย
*/

const UserSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
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
    enum: roles,
    default: roles[0]
  },
  state: Object,
  metadata: Schema.Types.Mixed,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

UserSchema.set("redisCache", true)

const user = mongoose.model("user", UserSchema)

export default user
