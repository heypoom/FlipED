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
  @param meta (Mixed): ข้อมูลปลีกย่อย
*/

const emailRegex = /.+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [email => (emailRegex.test(email)), "Please fill a valid email address"],
    match: [emailRegex, "Please fill a valid email address"]
  },
  password: {type: String, required: true},
  photo: {
    type: String,
    default: DEFAULT_PROFILE
  },
  roles: {
    type: String,
    enum: roles,
    default: roles[0]
  },
  state: Object,
  meta: Object,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},

  // Personal Information
  title: String,
  firstName: String,
  middleName: String,
  lastName: String,
  nationalId: String,
  address: String,
  telephoneNumber: String,
  mobileNumber: String,
  birthDate: Date
})

UserSchema.set("redisCache", true)

const user = mongoose.model("user", UserSchema)

export default user
