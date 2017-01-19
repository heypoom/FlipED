import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import TextField from "material-ui/TextField"
// import LinearProgress from "material-ui/LinearProgress"
import Fab from "material-ui/FloatingActionButton"
import DeleteIcon from "material-ui/svg-icons/action/delete"
import UploadIcon from "material-ui/svg-icons/file/file-upload"
import FullScreen from "material-ui/svg-icons/navigation/fullscreen"
import ExitFullScreen from "material-ui/svg-icons/navigation/fullscreen-exit"

import Upload from "../Upload"
import Content from "../Content"
import QuizCreator from "../QuizEditor/QuizCreator"
import Shadow from "../Shadow"

// import Grid from "../Grid"
// import Paper from "../Paper"

// () => props.set("full", !props.full)
// props.remove

import {IS_CLIENT} from "../../constants/util"

import s from "./ContentEditor.scss"

const Quill = IS_CLIENT ? require("react-quill") : () => <div />

const getYouTubeID = url => {
  const videoId = url.split("v=")[1]
  if (videoId) {
    const ampersandPosition = videoId.indexOf("&")
    if (ampersandPosition !== -1) {
      return videoId.substring(0, ampersandPosition)
    }
    return videoId
  }
  return url
}

const Remove = ({r}) => (
  <Fab data-tip="ลบ" onClick={r} mini>
    <DeleteIcon />
  </Fab>
)

const Full = ({e, f}) => (
  <Fab data-tip="เต็มจอ" onClick={() => e("full", !f)} mini>
    {f ? <ExitFullScreen /> : <FullScreen />}
  </Fab>
)

const UploadImage = ({cl, e}) => (
  <Upload className={cl} result={url => e("src", url)}>
    <Fab data-tip="อัพโหลดรูป" mini>
      <UploadIcon />
    </Fab>
  </Upload>
)

const ContentEditor = props => ({
  card: (
    <div>
      <div className={s.outer}>
        <Remove r={props.remove} />
      </div>
      <Quill
        placeholder="Try writing something here! You're welcome."
        value={props.content}
        onChange={v => props.set("content", v)}
        theme="bubble"
      />
    </div>
  ),
  youtube: (
    <div>
      <div className={s.left} style={{zIndex: 3}}>
        <Full e={props.set} f={props.full} />
      </div>
      <div className={s.right} style={{zIndex: 3}}>
        <Remove r={props.remove} />
      </div>
      <Content {...props} />
      <div style={{padding: "0em 2em 0.5em 2em"}}>
        <TextField
          style={{width: "100%"}}
          floatingLabelText="กรุณาวางลิงค์ของวิดิโอ YouTube"
          value={props.src}
          onChange={v => props.set("src", getYouTubeID(v.target.value))}
        />
      </div>
    </div>
  ),
  image: (
    <div>
      <div className={s.left}>
        <Full e={props.set} f={props.full} />
      </div>
      <UploadImage cl={s.center} e={props.set} />
      <div className={s.right}>
        <Remove r={props.remove} />
      </div>
      <Upload result={url => props.set("src", url)} disableClick>
        <Content {...props} />
      </Upload>
    </div>
  ),
  cover: (
    <div>
      <UploadImage cl={s.left} e={props.set} />
      <div className={s.right}>
        <Remove r={props.remove} />
      </div>
      <Upload result={url => props.set("src", url)}>
        <Content {...props} />
      </Upload>
    </div>
  ),
  quiz: (
    <QuizCreator {...props} />
  ),
  embed: (
    <div>
      <div className={s.left} style={{zIndex: 3}}>
        <Full e={props.set} f={props.full} />
      </div>
      <div className={s.right} style={{zIndex: 3}}>
        <Remove r={props.remove} />
      </div>
      <Content {...props} />
      <div style={{padding: "0em 2em 0.5em 2em"}}>
        <TextField
          style={{width: "100%"}}
          floatingLabelText="กรุณาวางลิงค์ของ Embed"
          value={props.src}
          onChange={v => props.set("src", getYouTubeID(v.target.value))}
        />
      </div>
    </div>
  ),
  gist: (
    <div>
      <Content {...props} />
    </div>
  )
}[props.type] || (
  <div style={{marginTop: "2.5em"}}>
    <div className={s.rightmost}>
      <Remove r={props.remove} />
    </div>
    <div style={{padding: "2em", background: "white"}}>
      <h2 style={{lineHeight: "1.4em"}}>
        501: The {props.type} component is not implemented yet!
      </h2>
    </div>
  </div>
))

export default withStyles(s)(ContentEditor)
