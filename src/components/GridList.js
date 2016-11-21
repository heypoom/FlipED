import React from "react"
import {Link} from "react-router"

import Grid from "./Grid"
import Shadow, {zGrid} from "./Shadow"
import Role from "./Role"

import {PRIMARY_COLOR, CDN_URL} from "../constants/visual"

const sNone = {textDecoration: "none"}

const wrapperStyle = {
  paddingTop: "1em",
  paddingLeft: "1.5em",
  paddingRight: "1.5em"
}

const h1Style = {
  fontWeight: 300,
  fontSize: "1.6em"
}

const h2Style = {
  fontWeight: 300,
  fontSize: "1.1em"
}

const GridCard = props => (
  <div
    style={{marginBottom: props.marginBottom, marginTop: props.marginTop}}
    className={props.className}
  >
    <div
      style={{
        backgroundImage: `url(${props.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: zGrid,
        height: props.height ? `${props.height - 6}em` : "9em"
      }}
    />
    <div style={wrapperStyle}>
      <div className={props.textClass}>
        <strong style={{float: "right"}}>1500</strong>
        <span style={h1Style}>{props.heading}</span><br />
        <span style={h2Style}>{props.subheading}</span>
      </div>
      {props.children}
    </div>
  </div>
)

const GridList = props => {
  if (props.data) {
    if (props.data[0] !== "undefined") {
      return (
        <Grid r>
          {
            props.data.map((e, i) => (
              <Grid
                key={i}
                xs={12}
                sm={(i % 2 === 0) && (i === props.data.length - 1) ? 12 : 6}
                md={4}
              >
                <div>
                  <Link to={`${props.url}${e[props.c ? "url" : "_id"]}`} style={sNone}>
                    <Shadow
                      depth="z-flow"
                      className="waves waves-light"
                      style={{
                        width: "100%",
                        height: props.height || "15em",
                        marginBottom: "1em",
                        background: "#fefefe",
                        color: PRIMARY_COLOR,
                      }}
                    >
                      <GridCard
                        src={e.thumbnail}
                        color={e.color}
                        heading={e.name}
                        subheading={e.description}
                        depth="z-0"
                        h1Weight="300"
                        alpha="0.2"
                        height={props.height ? props.height.slice(0, -2) : "15"}
                      />
                    </Shadow>
                  </Link>
                </div>
              </Grid>
            ))
          }
          <Role is="teacher">
            <Grid
              xs={12}
              sm={6}
              md={4}
            >
              <Link to={props.create || "#!"} style={sNone}>
                <div onClick={props.new}>
                  <Shadow
                    depth="z-flow"
                    className="waves waves-light"
                    style={{
                      width: "100%",
                      height: props.height || "15em",
                      marginBottom: "1em",
                      background: "#fefefe",
                      color: PRIMARY_COLOR,
                    }}
                  >
                    <GridCard
                      src={`${CDN_URL}/images/add.jpg`}
                      color="#efefef"
                      heading={props.cTitle || "สร้าง"}
                      subheading={props.cDesc}
                      depth="z-0"
                      h1Weight="300"
                      alpha="0.2"
                      height={props.height ? props.height.slice(0, -2) : "15"}
                    />
                  </Shadow>
                </div>
              </Link>
            </Grid>
          </Role>
        </Grid>
      )
    }
  }
  return null
}

export default GridList
