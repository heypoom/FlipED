import React from "react"
import {Link} from "react-router"

import withStyles from "isomorphic-style-loader/lib/withStyles"
import s from "./ChapterStepper.scss"

// <a href={`#${d.title}`} style={{textDecoration: "none", color: "black"}} key={i}>

const ChapterStepper = props => (
  <div className={s.stepperWrapper}>
    {
      props.data.map(sect => (
        <div key={sect._id}>
          <div className={s.stepperTitle}>{sect.name}</div>
          <div className={s.stepperBody}>{sect.description}</div>
          <br />
          <div>
            {
              props.lesson.map((e, i) => {
                if (String(e.section) === String(sect._id)) {
                  return (
                    <Link
                      to={`${props.uriPrefix}${e[props.uri]}`}
                      style={{textDecoration: "none", color: "black"}}
                      key={i}
                    >
                      <div className={s.stepperStep}>
                        <div>
                          <div
                            className={
                              props.choosen === i + 1 ? s.stepperCircleChoosen : s.stepperCircle
                            }
                          >
                            {i + 1}
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
              })
            }
          </div>
        </div>
      ))
    }
  </div>
)

export default withStyles(s)(ChapterStepper)
