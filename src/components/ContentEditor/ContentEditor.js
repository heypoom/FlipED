import React from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import TextField from "material-ui/TextField"
import Fab from "material-ui/FloatingActionButton"
import DeleteIcon from "material-ui/svg-icons/action/delete"
import UploadIcon from "material-ui/svg-icons/file/file-upload"
import FullScreen from "material-ui/svg-icons/navigation/fullscreen"
import ExitFullScreen from "material-ui/svg-icons/navigation/fullscreen-exit"

import Upload from "../Upload"
import Content from "../Content"

// import Grid from "../Grid"
// import Shadow from "../Shadow"
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

const bg = "#2d2d30"

const ContentEditor = props => ({
  card: (
    <div>
      <div className={s.outer}>
        <Fab onClick={props.remove} backgroundColor={bg} mini>
          <DeleteIcon />
        </Fab>
      </div>
      <Quill
        value={props.content}
        onChange={v => props.set("content", v)}
        theme="bubble"
      />
    </div>
  ),
  youtube: (
    <div>
      <div className={s.left} style={{zIndex: 3}}>
        <Fab onClick={() => props.set("full", !props.full)} backgroundColor={bg} mini>
          {props.full ? <ExitFullScreen /> : <FullScreen />}
        </Fab>
      </div>
      <div className={s.right} style={{zIndex: 3}}>
        <Fab onClick={props.remove} backgroundColor={bg} mini>
          <DeleteIcon />
        </Fab>
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
        <Fab onClick={() => props.set("full", !props.full)} backgroundColor={bg} mini>
          {props.full ? <ExitFullScreen /> : <FullScreen />}
        </Fab>
      </div>
      <Upload className={s.center} result={id => props.set("src", `/uploads/${id}`)}>
        <Fab backgroundColor={bg} mini><UploadIcon /></Fab>
      </Upload>
      <div className={s.right}>
        <Fab onClick={props.remove} backgroundColor={bg} mini>
          <DeleteIcon />
        </Fab>
      </div>
      <Upload result={id => props.set("src", `/uploads/${id}`)} disableClick>
        <Content {...props} />
      </Upload>
    </div>
  ),
  cover: (
    <div>
      <Upload className={s.left} result={id => props.set("src", `/uploads/${id}`)}>
        <Fab backgroundColor={bg} mini><UploadIcon /></Fab>
      </Upload>
      <div className={s.right}>
        <Fab onClick={props.remove} backgroundColor={bg} mini>
          <DeleteIcon />
        </Fab>
      </div>
      <Upload result={id => props.set("src", `/uploads/${id}`)}>
        <Content {...props} />
      </Upload>
    </div>
  ),
  quiz: (
    <div>...</div>
  ),
  embed: (
    <Content {...props} />
  )
}[props.type] || <div />)

export default withStyles(s)(ContentEditor)
