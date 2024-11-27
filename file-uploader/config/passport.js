const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")
const prisma = require("../prisma/prisma")

const customFields = {
  usernameField: "email",
  passwordField: "password",
}

const verifyCallback = async (email, password, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return done(null, false, { message: "Incorrect email or password" })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return done(null, false, { message: "Incorrect email or password" })
    }
    delete user.password
    done(null, user)
  } catch (err) {
    return done(err)
  }
}

passport.use(new LocalStrategy(customFields, verifyCallback))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new Error("User not found")
    }
    done(null, user)
  } catch (err) {
    done(err)
  }
})
