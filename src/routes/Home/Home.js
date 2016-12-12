import React, {Component} from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./Home.scss"

import Grid from "../../components/Grid"
import ChatStage from "../../components/ChatStage"

const FlipED = {
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
        type: "GOTO",
        payload: "flip/intro"
      }]
    }, {
      condition: {
        and: [{is: "HAVE_INTRODUCED"}]
      },
      actions: [{
        type: "GOTO",
        payload: "flip/welcomeBack"
      }]
    }]
  },
  "init/unauthenticated": {
    messages: [{
      user: 1,
      text: "You are unauthenticated..."
    }],
    choices: [{text: "Proceed Anyway", path: "init/load"}]
  },
  "flip/welcomeBack": {
    messages: [{
      user: 1,
      text: ["ยินดีต้อนรับกลับครับ%NAME% 🤗", "ShowChoice: %g:state.showChoice%, Username: %g:props.user.username%, Nope: %g:props.nope.node%"]
    }],
    choices: [{
      text: "Forget Me!",
      actions: [{
        type: "SET",
        payload: {HAVE_INTRODUCED: false}
      }, {
        type: "GOTO",
        payload: "flip/intro"
      }]
    }, {
      text: "Browse Classes",
      actions: [{
        type: "SERVICES_LIST",
        payload: {
          api: "api/classes",
          choiceText: "ไปยังห้องเรียน ",
          query: {$select: ["_id", "name"]},
          success: {
            type: "SERVICES_LIST",
            payload: {
              api: "api/lessons",
              query: {$select: ["_id", "name", "url"]},
              parent: "parentCourse",
              choiceText: "ไปยังบทเรียน ",
              success: {
                type: "SERVICES_GET",
                payload: {
                  api: "api/lessons",
                  query: {$select: ["_id", "name", "url", "description", "content"]}
                }
              }
            }
          }
        }
      }]
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
      type: "GOTO",
      payload: "flip/welcomeBack"
    }]
  }
}

const MChars = [{
  client: 1
}, {
  name: "FlipED Bear",
  avatar: "/images/icon/listening.svg"
}]

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render = () => (
    <Grid style={{marginTop: "2em"}} c>
      <ChatStage stage={FlipED} users={MChars} />
    </Grid>
  )

}

export default withStyles(s)(Home)
