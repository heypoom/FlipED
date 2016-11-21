import React from "react"
import {Link} from "react-router"

import withStyles from "isomorphic-style-loader/lib/withStyles"
import s from "./ChapterStepper.scss"

// <a href={`#${d.title}`} style={{textDecoration: "none", color: "black"}} key={i}>

const ChapterStepper = props => {
  let index = 0
  let choosen = 0
  return (
    <div className={s.stepperWrapper}>
      {
        props.data ? props.data.map(sect => (
          <div key={sect._id}>
            <div className={s.stepperTitle}>{sect.name}</div>
            <div className={s.stepperBody}>{sect.description}</div>
            <br />
            <div>
              {
                props.lessons ? props.lessons.map((e, i) => {
                  if (String(e.section) === String(sect._id)) {
                    index++
                    if (props.lesson._id === e._id) {
                      choosen = index
                    }
                    return (
                      <Link
                        to={`${props.uriPrefix}${e.url}`}
                        style={{textDecoration: "none", color: "black"}}
                        key={i}
                      >
                        <div className={s.stepperStep}>
                          <div>
                            <div
                              className={
                                choosen === index ?
                                  s.stepperCircleChoosen : s.stepperCircle
                              }
                            >
                              {index}
                            </div>
                            <div className={s.stepperLine}></div>
                          </div>
                          <div>
                            <div className={s.stepperTitle}>{e.name}</div>
                            <div className={s.stepperBody}>{e.description}</div>
                            <br />
                          </div>
                        </div>
                      </Link>
                    )
                  }
                  return null
                }) : null
              }
            </div>
          </div>
        )) : null
      }
    </div>
  )
}

export default withStyles(s)(ChapterStepper)
