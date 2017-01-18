export const roleMap = {
  Dashboard: {is: "guest"},
  Course: {is: "student"},
  Courses: {is: "student"},
  Students: {only: "teacher"},
  Users: {only: "admin"}
}

export const Locale = {
  Dashboard: "หน้าหลัก",
  Courses: "คอร์สทั้งหมด",
  Course: "คอร์สของฉัน",
  Students: "ผู้เรียน",
  Users: "ผู้ใช้งาน"
}

export const Icons = {
  Dashboard: "home",
  Courses: "book",
  Course: "wifiOn",
  Students: "user",
  Users: "person"
}

export const Path = {
  Dashboard: "/",
  Courses: "/courses",
  Course: "/course",
  Students: "/students",
  Users: "/users",
  Profile: "/profile",
  Chats: "/chats",
  LectureEditor: "/notes/:id/edit",
  Lecture: "/notes/:id",
  Login: "/login",
  Signup: "/signup",
  Join: "/join"
}
