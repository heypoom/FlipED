import React from "react"
import {Link} from "react-router"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import Grid from "../../components/Grid"
import Cover from "../../components/Cover"
import Shadow from "../../components/Shadow"
import Paper from "../../components/Paper"

import {LOGO} from "../../constants/visual"

import s from "./Home.scss"

const Home = () => (
  <div className={s.root}>
    <div className={s.topStyle} />
    <div className={s.first}>
      <div className={s.container}>
        <div className={s.nav}>
          <div>
            <img className={s.logo} src={LOGO} alt="FlipED Logo" />
          </div>
          <div>Home</div>
          <div>About</div>
          <div>How It Works</div>
          <div>Contact Us</div>
          <div><Link to="/auth">Login</Link></div>
        </div>
        <div className={s.intro}>
          <div className={s.introText}>
            <h2>
              Let's build ourselves an <b>Education 4.0</b> classroom!
            </h2>
            <h3>
              Get the <b>Classroom 4.0</b> tools now, <b>free forever</b>.
              <br /> Built by Students, for <b>Teachers</b>.
            </h3>
            <div className={s.introCta}>
              <button className={s.introBtn}>
                Get yours now.
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={s.details}>
      <div className={s.container}>
        <Grid r>
          <Grid xs={12} md={4}>
            <div className={s.stat}>
              <h2>65</h2>
              <h4>Active Users</h4>
            </div>
          </Grid>
          <Grid xs={12} md={4}>
            <div className={s.stat}>
              <h2>42</h2>
              <h4>Classes Created</h4>
            </div>
          </Grid>
          <Grid xs={12} md={4}>
            <div className={s.stat}>
              <h2>4</h2>
              <h4>Awards</h4>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  </div>
)

// <img src="/images/cover/science.jpg" />

export default withStyles(s)(Home)
