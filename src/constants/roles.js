// Role Configuration used in the Application

export const ROLE = {
  guest: {
    perm: 0,
    th: "รอการยืนยันสิทธิ"
  },
  student: {
    perm: 1,
    th: "ผู้เรียน"
  },
  teacher: {
    perm: 2,
    th: "ผู้สอน"
  },
  admin: {
    perm: 3,
    th: "ผู้ดูแลระบบ"
  }
}

export const roles = ["guest", "student", "teacher", "admin"]

export const VIEW_ROLE = "student"
export const MODIFY_ROLE = "teacher"
