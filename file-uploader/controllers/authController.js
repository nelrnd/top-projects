const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const prisma = require("../prisma/prisma")

exports.auth_is_auth = auth_is_auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect("/login")
  }
}

exports.auth_is_not_auth = auth_is_not_auth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next()
  } else {
    res.redirect("/")
  }
}

exports.auth_login_get = [
  auth_is_not_auth,
  (req, res) => {
    const messages = req.session.messages
    const errors = messages && messages.map((msg) => ({ msg }))
    req.session.messages = undefined
    res.render("login", { title: "Log in", errors })
  },
]

const loginValidation = [
  body("email").trim().notEmpty().withMessage("Email is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
]

exports.auth_login_post = [
  loginValidation,
  (req, res, next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      res.render("login", { title: "Log in", errors: result.array() })
      return
    }
    next()
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  }),
]

exports.auth_register_get = [
  auth_is_not_auth,
  (req, res) => {
    res.render("register", { title: "Create an account" })
  },
]

const registerValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ max: 200 })
    .withMessage("Email cannot exceed 200 characters")
    .isEmail()
    .withMessage("Email format is incorrect")
    .custom(async (value) => {
      const user = await prisma.user.findUnique({ where: { email: value } })
      if (user) {
        throw new Error("Email is already used")
      }
    }),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters")
    .isAlpha()
    .withMessage("Name must only contain letters"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .isLength({ max: 200 })
    .withMessage("Password cannot exceed 200 characters"),
  body("password_confirm")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((value, { req }) => {
      return value === req.body.password
    })
    .withMessage("Passwords do not match"),
]

exports.auth_register_post = [
  registerValidation,
  asyncHandler(async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      res.render("register", {
        title: "Create an account",
        errors: result.array(),
      })
      return
    }

    const { email, name, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        folders: { create: { name: "Main", isRoot: true } },
      },
    })

    res.redirect("/login")
  }),
]

exports.auth_logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect("/")
  })
}
