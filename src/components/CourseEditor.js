import React from "react"

import Fab from "material-ui/FloatingActionButton"
import PhotoIcon from "material-ui/svg-icons/image/add-a-photo"
import DeleteIcon from "material-ui/svg-icons/action/delete"

import Grid from "./Grid"
import Paper from "./Paper"
import Cover from "./Cover"
import Upload from "./Upload"

const h2 = {
  margin: 0,
  fontWeight: 300,
  lineHeight: "1.1em"
}

const h3 = {
  lineHeight: "1.48em",
  color: "grey",
  fontWeight: 300,
  fontSize: "1.1em",
  margin: "0.6em 0"
}

const upload = {
  position: "absolute",
  right: "8%",
  top: "16%" // -8%
}

const delStyle = {
  position: "absolute",
  right: "8%",
  bottom: "-8%"
}

const cover = {
  height: "13em",
  alpha: 0.2,
  attachment: "fixed",
  depth: "z-0"
}

export default ({classes, set, remove}) => (classes && (
  <div>
    <div style={{position: "relative"}}>
      <Upload result={url => set("thumbnail", url)} disableClick>
        <Cover src={classes.thumbnail} {...cover} />
      </Upload>
      <Upload style={upload} result={url => set("thumbnail", url)}>
        <Fab backgroundColor="#2d2d30" mini>
          <PhotoIcon />
        </Fab>
      </Upload>
      <div style={delStyle}>
        <Fab onClick={remove} secondary mini><DeleteIcon /></Fab>
      </div>
    </div>
    <Paper>
      <Grid c>
        <h2 style={h2}>
          <input
            className="inlineInput"
            value={classes.name}
            onChange={e => set("name", e.target.value)}
          />
        </h2>
        <h3 style={h3}>
          <input
            className="inlineInput"
            style={{color: "grey"}}
            value={classes.description}
            onChange={e => set("description", e.target.value)}
          />
        </h3>
        <h4 style={h3}>
          สอนโดย
          {classes.owner ? classes.owner.map((e, i) => (
            <span style={{textTransform: "capitalize"}} key={i}>
              &nbsp;{e.username}{i !== classes.owner.length - 1 && ","}
            </span>
          )) : " -"}
        </h4>
      </Grid>
    </Paper>
  </div>
))
