import {register} from "../../actions/user"

const RegistrationForm = reduxForm({form: "register"})(withStyles(s)(props => (
  <form className={s.form} method="post" onSubmit={props.handleSubmit}>
    <div className={s.card}>
      <Grid r>
        <Grid xs={4} md={3} className={s.label}>
          ชื่อผู้ใช้ของคุณ:
        </Grid>
        <Grid xs={8} md={9}>
          <Field
            name="username"
            placeholder="John Smith"
            style={{width: "100%"}}
            component={TextField}
            type="text"
            required
            autoFocus
          />
        </Grid>
      </Grid>
      <Grid r>
        <Grid xs={4} md={3} className={s.label}>
          อีเมล์ของคุณ:
        </Grid>
        <Grid xs={8} md={9}>
          <Field
            name="email"
            placeholder="youremail@example.com"
            style={{width: "100%"}}
            component={TextField}
            type="email"
            required
          />
        </Grid>
      </Grid>
      <Grid r>
        <Grid xs={4} md={3} className={s.label}>
          รหัสผ่านของคุณ:
        </Grid>
        <Grid xs={8} md={9}>
          <Field
            name="password"
            placeholder="********"
            style={{width: "100%"}}
            component={TextField}
            type="password"
            pattern=".{8,}"
            required
          />
        </Grid>
      </Grid>
    </div>
    <button className={s.login} type="submit">
      สมัครสมาชิก
    </button>
  </form>
)))

handleRegistration: ({username, email, password}) => {
  dispatch(register(username, email, password))
}
