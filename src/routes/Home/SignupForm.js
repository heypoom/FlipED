import React from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import {reduxForm, Field} from "redux-form"

import Grid from "../../components/Grid"
import TextField from "../../components/TextField"

import s from "./Home.scss"

const SignupForm = reduxForm({form: "signup"})(withStyles(s)(props => (
  <form className={s.signupForm} method="post" onSubmit={props.handleSubmit}>
    <Grid r>
      <Grid xs={12}>
        <div className={s.fieldWrapper}>
          <Field
            component={TextField}
            name="email"
            type="email"
            placeholder="Your E-mail address."
            // className={s.formInput}
            required
          />
        </div>
      </Grid>
    </Grid>
    <Grid r>
      <Grid xs={12}>
        <div className={s.fieldWrapper}>
          <Field
            component={TextField}
            name="password"
            type="password"
            pattern=".{8,}"
            placeholder="Your Password."
            // className={s.formInput}
            required
          />
        </div>
      </Grid>
    </Grid>
    <Grid r>
      <Grid xs={12}>
        <button className={s.formBtn}>
          Sign Up
        </button>
      </Grid>
    </Grid>
  </form>
)))

const ConnectedSignupForm = props => <SignupForm onSubmit={props.signup} />

const mapDispatchToProps = dispatch => ({
  signup: data => {
    console.log(data)
  }
})

export default connect(null, mapDispatchToProps)(ConnectedSignupForm)
