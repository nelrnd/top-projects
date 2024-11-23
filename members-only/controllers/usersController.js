const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const db = require("../database/queries")
const pool = require("../database/pool")
const passport = require("passport")

exports.user_is_auth = user_is_auth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/log-in")
    return
  }
  next()
}

exports.user_is_not_auth = user_is_not_auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/")
    return
  }
  next()
}

exports.user_register_get = [
  user_is_not_auth,
  asyncHandler(async (req, res) => {
    res.render("sign-up", { title: "Sign up" })
  }),
]

const registerValidation = [
  body("first_name")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("First name must be between 1 and 100 characters")
    .isAlpha()
    .withMessage("First name must only contain letters"),
  body("last_name")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Last name must be between 1 and 100 characters")
    .isAlpha()
    .withMessage("Last name must only contain letters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ max: 200 })
    .withMessage("Email cannot exceed 200 characters")
    .isEmail()
    .withMessage("Email format is incorrect")
    .custom(async (value) => {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE LOWER(email) = $1",
        [value.toLowerCase()]
      )
      const user = rows[0]
      if (user) {
        throw new Error("Email is already used by another account")
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ max: 200 })
    .withMessage("Password cannot exceed 200 characters"),
  body("password_confirm")
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password
    })
    .withMessage("Passwords do not match"),
]

exports.user_register_post = [
  registerValidation,
  asyncHandler(async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      res.render("sign-up", { title: "Sign up", errors: result.array() })
      return
    }
    const { first_name, last_name, email, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 12)
    await db.createUser({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    })
    res.redirect("/log-in")
  }),
]

exports.user_login_get = [
  user_is_not_auth,
  asyncHandler(async (req, res) => {
    const errors =
      req.session.messages && req.session.messages.map((msg) => ({ msg }))
    req.session.messages = undefined
    res.render("log-in", { title: "Log in", errors })
  }),
]

const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ max: 200 })
    .withMessage("Email cannot exceed 200 characters")
    .isEmail()
    .withMessage("Email format is incorrect"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ max: 200 })
    .withMessage("Password cannot exceed 200 characters"),
]

exports.user_login_post = [
  loginValidation,
  (req, res, next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      res.render("log-in", { title: "Log in", errors: result.array() })
      return
    }
    next()
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true,
  }),
]

exports.user_logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect("/")
  })
}

exports.join_club_get = [
  user_is_auth,
  (req, res) => {
    res.render("join-club", { title: "Join the club" })
  },
]

exports.join_club_post = [
  user_is_auth,
  asyncHandler(async (req, res) => {
    const match = req.body.secret_passcode === process.env.SECRET_PASSCODE
    if (match) {
      await db.joinClub(req.user.user_id)
      res.redirect("/")
      return
    }
    res.render("join-club", {
      title: "Join the club",
      errors: [{ msg: "Passcode is incorrect" }],
    })
  }),
]

exports.become_admin_get = [
  user_is_auth,
  (req, res) => {
    res.render("join-admin", { title: "Become an admin" })
  },
]

exports.become_admin_post = [
  user_is_auth,
  asyncHandler(async (req, res) => {
    const match = req.body.password === process.env.ADMIN_PASSWORD
    if (match) {
      await db.becomeAdmin(req.user.user_id)
      res.redirect("/")
      return
    }
    res.render("join-admin", {
      title: "Join the club",
      errors: [{ msg: "Admin password is incorrect" }],
    })
  }),
]
