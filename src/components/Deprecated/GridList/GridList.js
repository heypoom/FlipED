import React from "react"
import {Link} from "react-router"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Grid from "../Grid"
import Paper from "../Paper"
import Role from "../Role"
import {CDN_URL} from "../../constants/visual"

import s from "./GridList.scss"

const GridList = ({data, cFunc, cLink, cTitle, url, c}) => (
  <Grid r>
    {
      data ? data.map((item, i) => (
        <Grid key={i} xs={12} sm={(i % 2 === 0) && (i === data.length - 1) ? 12 : 6} md={4}>
          <Link to={`${url}${item[c ? "url" : "_id"]}`} className={s.link}>
            <Paper
              outerChild={
                <div className={s.cover} style={{backgroundImage: `url(${item.src})`}} />
              }
            >
              <strong style={{float: "right"}}>1500</strong>
              <span className={s.heading}>{item.heading}</span><br />
              <span className={s.subheading}>{item.subheading}</span>
            </Paper>
          </Link>
        </Grid>
      )) : null
    }
    <Role is="teacher">
      <Grid xs={12} sm={6} md={4}>
        <Link to={cLink || "#!"} className={s.link}>
          <Paper
            onClick={cFunc}
            outerChild={
              <div className={s.cover} style={{backgroundImage: `${CDN_URL}/images/add.jpg`}} />
            }
          >
            <span className={s.heading}>{cTitle}</span><br />
          </Paper>
        </Link>
      </Grid>
    </Role>
  </Grid>
)

export default withStyles(s)(GridList)
