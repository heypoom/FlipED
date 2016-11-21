import React from "react"

import Role from "./Role"
import Fi from "./Fi"
import Grid from "./Grid"
import {Link} from "react-router"

import {CDN_URL} from "../constants/visual"

const menuText = {
  marginTop: "0.5em",
  fontSize: "1.4em",
  textAlign: "center",
  textDecoration: "none"
}

const c = Object.assign

const CircleMenu = (props) => (
  <div>
    {
      props.data.map((e, i) => (
        <Grid
          md={2}
          sm={4}
          xs={6}
          onClick={e.c ? e.c : () => props.set(e.t)}
          key={i}
        >
          <Role is={e.r}>
            {
              e.p ? (
                <Link to={e.p} style={{textDecoration: "none", color: "black"}}>
                  <Fi
                    size="5em"
                    src={`${CDN_URL}/images/icon/${e.i}.svg`}
                  />
                  <p style={c({fontWeight: props.show === e.t && "500"}, menuText)}>
                    {e.l}
                  </p>
                </Link>
              ) : (
                <div>
                  <Fi
                    size="5em"
                    src={`${CDN_URL}/images/icon/${e.i}.svg`}
                  />
                  <p style={c({fontWeight: props.show === e.t && "500"}, menuText)}>
                    {e.l}
                  </p>
                </div>
              )
            }
          </Role>
        </Grid>
      ))
    }
  </div>
)

export default CircleMenu
