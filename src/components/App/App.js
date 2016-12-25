import React, {Component, PropTypes} from "react"
import {Provider as StoreProvider} from "react-redux"
import {AppContainer} from "react-hot-loader"

import ThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"

import {blue100, blue500, blue700} from "material-ui/styles/colors"

import {DEFAULT_UA} from "../../constants"
import app from "../../client/api"
import {USER} from "../../constants/api"

import {setUserInfo} from "../../actions/user"
import {autoSync} from "../../actions/sync"

const empty = () => {}

import s from "./App.scss"

export default class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      store: PropTypes.object.isRequired,
      insertCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func
    }),
    children: PropTypes.element.isRequired,
    error: PropTypes.object
  }

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.muiTheme = getMuiTheme({
      palette: {
        primary1Color: blue500,
        primary2Color: blue700,
        primary3Color: blue100,
      },
    }, {
      avatar: {borderColor: null},
      userAgent: props.context.store.getState().runtime.userAgent || DEFAULT_UA,
      fontFamily: "Roboto, Kanit"
    })
  }

  getChildContext = () => ({
    insertCss: this.props.context.insertCss || empty,
    setTitle: this.props.context.setTitle || empty,
    setMeta: this.props.context.setMeta || empty,
  })

  componentWillMount = () => {
    const {insertCss, store} = this.props.context
    this.removeCss = insertCss(s)
    autoSync("lessons", store.dispatch)
    autoSync("classes", store.dispatch)
    // store.dispatch(services.lessons.find({}))
    app.service(USER).on("patched", e => {
      if (store.getState().user._id === e._id) {
        store.dispatch(setUserInfo(e))
      }
    })
  }

  componentWillUnmount = () => {
    this.removeCss()
    app.service(USER).off("patched")
  }

  render = () => (this.props.error ? this.props.children : (
    <AppContainer>
      <ThemeProvider muiTheme={this.muiTheme}>
        <StoreProvider store={this.props.context.store}>
          {this.props.children}
        </StoreProvider>
      </ThemeProvider>
    </AppContainer>
  ))

}
