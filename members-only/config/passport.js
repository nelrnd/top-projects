const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")
const pool = require("../database/pool")

const customFields = {
  usernameField: "email",
}

const verifyCallback = async (email, password, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ])
    const user = rows[0]
    if (!user) {
      return done(null, false, { message: "Incorrect username" })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return done(null, false, { message: "Incorrect password" })
    }
    return done(null, user)
  } catch (err) {
    return done(err)
  }
}

passport.use(new LocalStrategy(customFields, verifyCallback))

passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user.user_id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id]
    )
    const user = rows[0]
    done(null, user)
  } catch (err) {
    done(err)
  }
})
