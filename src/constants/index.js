import {CLASS_URL} from "./api"

export const APP_TITLE = "FlipED™"
export const TOKEN_KEY = "feathers-jwt"
export const SEGMENT_API_KEY = "inYx5crWKP9gKRgehuRMlXH3hS8MjENa"

export const ROLE = {
  none: {
    perm: -1,
    th: "ไม่มีสิทธิในการใช้งาน"
  },
  guest: {
    perm: 0,
    th: "รอการยืนยันสิทธิ"
  },
  student: {
    perm: 1,
    th: "ผู้เรียน"
  },
  teacher: {
    perm: 3,
    th: "ผู้สอน"
  },
  admin: {
    perm: 4,
    th: "ผู้ดูแลระบบ"
  }
}

export const CLASS_MENU = [{
  t: "lesson",
  i: "text",
  l: "สำรวจบทเรียน", // Explore
  r: "student"
}, {
  t: "quiz",
  i: "lab",
  l: "ทำแบบทดสอบ", // Test Yourself
  r: "student"
}, {
  t: "chat",
  i: "listening",
  l: "สนทนาถามตอบ", // Discuss
  r: "student"
}, {
  t: "stats",
  i: "target",
  l: "สถิติผู้เรียน", // My Goals
  p: "/stats",
  r: "teacher"
}, {
  t: "newLesson",
  i: "content",
  l: "สร้างบทเรียน", // New Lesson
  r: "teacher"
}, {
  t: "newQuiz",
  i: "blackboard",
  l: "สร้างควิซ", // New Quiz
  r: "teacher"
}]

export const DASHBOARD_MENU = [{
  t: "newClass",
  i: "lab",
  l: "สร้างห้องเรียน",
  p: `${CLASS_URL}new`,
  r: "guest"
}]
