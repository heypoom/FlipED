import React, {Component} from "react"
import c from "classnames"
import {Link} from "react-router"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./SideNav.scss"

import Fa from "../Fa"

const example = [{
  name: "หน้าหลัก",
  url: "/",
  icon: "home"
}, {
  name: "สถิติ",
  url: "/stats",
  icon: "pie-chart"
}, {
  name: "Main 2",
  child: [{
    name: "Sub 2.1",
    url: "#!"
  }, {
    name: "Sub 2.2",
    url: "#!"
  }]
}, {
  name: "Main 3",
  url: "#!"
}]

const faStyle = {
  fontSize: "1.15em",
  paddingRight: "1em"
}

class SideNav extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    Waves.attach(".waves")
    Waves.init()
  }

  render = () => (
    <div>
      <input type="checkbox" className={s["responsive-nav"]} id="rNav" />
      <label className={s.label} htmlFor="rNav" style={{zIndex: 5}}>☰</label>
      <aside className={s.aside} style={{zIndex: 4}}>
        <div
          className={c(s["logo-area"], "waves", "waves-light")}
          style={{backgroundImage: "url(/images/cover/october.jpg)"}}
        >
          {this.props.logo}
        </div>
        <nav className={s.nav}>
          {
            (this.props.data || example).map((e, i) => {
              if (e.hasOwnProperty("child")) {
                return (
                  <div key={i} className={s["nav-collapsible"]}>
                    <input
                      type="checkbox"
                      id={`subSideNav${i}`}
                      className={s["nav-collapsible-n"]}
                    />
                    <label className={c(s.label, "waves")} htmlFor={`subSideNav${i}`}>
                      <Fa i={e.icon} style={faStyle} /> {e.name}
                    </label>
                    <div className={s.wrap}>
                      {
                        e.child.map((item, index) => (
                          <Link key={index} to={item.url} className={c(s.a, "waves")}>
                            <Fa i={item.icon} style={faStyle} /> {item.name}
                          </Link>
                        ))
                      }
                    </div>
                  </div>
                )
              } else {
                return (
                  <Link key={i} to={e.url} className={c(s.a, "waves")}>
                    <Fa i={e.icon} style={faStyle} /> {e.name}
                  </Link>
                )
              }
            })
          }
        </nav>
      </aside>
      <main className={s.main}>
        {this.props.children}
      </main>
    </div>
  )

}

export default withStyles(s)(SideNav)
