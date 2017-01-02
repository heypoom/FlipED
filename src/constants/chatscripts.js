export const FLIPED = {
  "init/load": {
    actions: [{
      type: "NOTIFY_TIMED",
      payload: {
        time: 3500,
        text: "ระบบกำลังโหลด..."
      }
    }],
    triggers: [{
      condition: {
        and: [{not: "HAVE_INTRODUCED"}]
      },
      actions: [{
        type: "LOAD_PATH",
        payload: "flip/intro"
      }]
    }, {
      condition: {
        and: [{is: "HAVE_INTRODUCED"}]
      },
      actions: [{
        type: "LOAD_PATH",
        payload: "flip/welcomeBack"
      }]
    }]
  },
  "init/unauthenticated": {
    messages: [{
      user: 1,
      text: "You are unauthenticated..."
    }],
    choices: [{
      text: "Login",
      path: "init/login"
    }, {
      text: "Proceed Anyway",
      path: "init/load"
    }]
  },
  "init/login": {
    messages: [{
      user: 1,
      text: ["Please Input Your Email"]
    }],
    choices: [{
      text: "Email",
      field: "TEMP_EMAIL",
      fieldType: "text",
      path: "init/login/proceed",
    }]
  },
  "init/login/proceed": {
    messages: [{
      user: 1,
      text: ["Please input your password"]
    }],
    choices: [{
      text: "Password",
      field: "TEMP_PASSWORD",
      fieldType: "password",
      actions: [{
        type: "LOGIN",
        payload: {
          successPath: "flip/welcomeBack",
          failurePath: "init/unauthenticated",
          emailField: "TEMP_EMAIL",
          passwordField: "TEMP_PASSWORD"
        }
      }]
    }]
  },
  "flip/welcomeBack": {
    messages: [{
      user: 1,
      text: ["ยินดีต้อนรับกลับครับ%NAME% 🤗"]
    }],
    choices: [{
      text: "Logout",
      actions: [{type: "LOGOUT", payload: "init/unauthenticated"}]
    }, {
      text: "Forget Me!",
      actions: [{
        type: "SET",
        payload: {HAVE_INTRODUCED: false}
      }, {
        type: "LOAD_PATH",
        payload: "flip/intro"
      }]
    }, {
      text: "อ่านบทความนี้",
      actions: [{type: "GOTO_URL", payload: "/notes/582536dcee439e3998c96765"}]
    }, {
      text: "Explore Classes",
      path: "flip/exploreClasses"
    }, {
      text: "Card ExploreClasses",
      path: "flip/exploreClasses/card"
    }]
  },
  "flip/exploreClasses/card": {
    messages: [{
      user: 0,
      type: "custom"
    }],
    choices: [{
      text: "ค้นหาห้องเรียน",
      field: "SEARCH_CLASS_LIST_TEMP",
      fieldType: "text",
    }]
  },
  "flip/exploreClasses": {
    actions: [{
      type: "SERVICES_FIND",
      payload: {
        api: "classes",
        opts: {
          choiceText: "ไปยังห้องเรียน "
        },
        query: {$select: ["_id", "name"]},
        parent: "parentCourse",
        success: {
          type: "SERVICES_FIND",
          payload: {
            api: "lessons",
            query: {$select: ["_id", "name", "url"]},
            opts: {
              choiceText: "ไปยังบทเรียน ",
              notFoundText: "ไม่พบบทเรียนในห้องเรียนนี้ครับ ขออภัย",
              notFoundPath: "flip/exploreClasses",
            },
            success: {
              type: "SERVICES_GET",
              payload: {
                api: "lessons",
                query: {$select: ["_id", "name", "url", "description", "content"]},
                success: [{
                  text: "กลับไปห้องเรียน",
                  actions: [{
                    type: "LOAD_PATH",
                    payload: "flip/exploreClasses"
                  }]
                }]
              }
            }
          }
        }
      }
    }]
  },
  "flip/intro": {
    messages: [{
      user: 1,
      text: [
        "สวัสดีครับ 😀",
        "อ้อ นี่เป็นครั้งแรกของพี่ใน FlipED ใช่มั้ยครับเนี่ย 🤗",
        "ไม่ต้องตกใจนะครับ :)"
      ]
    }],
    choices: [{
      text: "นายเป็นใครอะ ._.",
      path: "flip/intro/getToKnow"
    }]
  },
  "flip/intro/who": {
    messages: [{
      user: 1,
      text: [
        "ผมเป็นหมีครับ 🤗",
        "ผมชื่อ FlipED Bear ครับ ผมจะช่วยเหลือในการใช้งาน",
        "คุณอยากจะเริ่มใช้งานเลย หรือเรามารู้จักกันก่อนดีครับ? 🤗"
      ]
    }],
    choices: [{
      text: "รู้จักกันก่อนสิ",
      path: "flip/intro/getToKnow"
    }, {
      text: "เริ่มใช้งานเลย!",
      path: "flip/intro/beginUsing"
    }]
  },
  "flip/intro/getToKnow": {
    messages: [{
      user: 1,
      text: ["เย้ 😊", "คุณชื่ออะไรครับ?"]
    }],
    actions: [{
      type: "NOTIFY",
      payload: "บอกหน่อยสิคุณชื่ออะไร?"
    }],
    choices: [{
      text: "กรุณาใส่ชื่อของคุณ",
      field: "NAME",
      fieldType: "text",
      path: "flip/intro/getToKnow/2",
      actions: [{type: "CLEAR_NOTIFY"}]
    }]
  },
  "flip/intro/getToKnow/2": {
    messages: [{
      user: 1,
      text: "ยินดีที่ได้รู้จักครับ%NAME% :)"
    }],
    actions: [{
      type: "SET",
      payload: {HAVE_INTRODUCED: true}
    }, {
      type: "LOAD_PATH",
      payload: "flip/welcomeBack"
    }]
  }
}

export const FLIPED_CHARS = [{
  client: 1
}, {
  name: "FlipED Bear",
  avatar: "/images/icon/listening.svg"
}]
