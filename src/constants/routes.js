export const roleMap = {
  Dashboard: {
    is: "guest"
  },
  Course: {
    is: "student"
  },
  Courses: {
    is: "student"
  },
  Students: {
    is: "teacher"
  },
  Profile: {
    is: "guest"
  }
}

export const Locale = {
  Dashboard: "หน้าหลัก",
  Courses: "คอร์สทั้งหมด",
  Course: "คอร์สของฉัน",
  Students: "ผู้ใช้งาน",
  Profile: "ข้อมูลส่วนตัว"
}

export const Path = {
  Dashboard: "/",
  Courses: "/courses",
  Course: "/course",
  Students: "/users",
  Profile: "/profile",
  Chats: "/chats",
  LectureEditor: "/notes/:id/edit",
  Lecture: "/notes/:id",
  Auth: "/auth"
}
