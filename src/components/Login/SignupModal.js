import React from "react"
import {connect} from "react-redux"

import SignupForm from "./Signup"
import Modal from "../Modal"

import {toggleUi} from "../../actions/app"

const paper = {
  cover: {
    height: "10em",
    color: "#16a8af",
    src: "/images/fdesk3.svg",
    size: "contain",
    position: "center 0.8em"
  }
}

const SignupModal = props => (
  <Modal paper={paper} drop="rgba(212, 220, 223, 0.85)" {...props}>
    <SignupForm />
  </Modal>
)

const mapStateToProps = state => ({
  show: state.app.ui.signupModal || false
})

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(toggleUi("signupModal"))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupModal)
