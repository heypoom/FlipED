import React from "react"

import Fab from "material-ui/FloatingActionButton"
import PhotoIcon from "material-ui/svg-icons/image/add-a-photo"
import DeleteIcon from "material-ui/svg-icons/action/delete"

import Grid from "./Grid"
import Paper from "./Paper"
import Cover from "./Cover"
import Upload from "./Upload"
import Role from "./Role"

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

export default ({c = {}, set, remove, cover}) => (
  <Role is="teacher">
    <div>
      <div style={{position: "relative"}}>
        <Upload result={url => set("thumbnail", url)} disableClick>
          <Cover src={c.thumbnail} {...cover} />
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
              value={c.name}
              onChange={e => set("name", e.target.value)}
            />
          </h2>
          <h3 style={h3}>
            <input
              className="inlineInput"
              style={{color: "grey"}}
              value={c.description}
              onChange={e => set("description", e.target.value)}
            />
          </h3>
          <h4 style={h3}>
            สอนโดย
            {c.owner ? c.owner.map((e, i) => (
              <span style={{textTransform: "capitalize"}} key={i}>
                &nbsp;{e.username}{i !== c.owner.length - 1 && ","}
              </span>
            )) : " -"}
          </h4>
        </Grid>
      </Paper>
    </div>
  </Role>
)
