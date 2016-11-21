import React from "react"
import {Link} from "react-router"

import withStyles from "isomorphic-style-loader/lib/withStyles"
import s from "./ChapterStepper.scss"

// <a href={`#${d.title}`} style={{textDecoration: "none", color: "black"}} key={i}>

const ChapterStepper = props => (
  <div className={s.stepperWrapper}>
    {
      props.data.map((d, i) => (
        <div className={s.stepperStep} onClick={() => props.set(i + 1)} key={i}>
          <div>
            <div className={props.choosen === i + 1 ? s.stepperCircleChoosen : s.stepperCircle}>
              {i + 1}
            </div>
            <div className={s.stepperLine}></div>
          </div>
          <div>
            <div className={s.stepperTitle}>{d.title}</div>
            <div className={s.stepperBody}>{d.description}</div>
            <br />
          </div>
        </div>
      ))
    }
  </div>
)

export default withStyles(s)(ChapterStepper)
