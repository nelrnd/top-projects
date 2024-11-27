const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const prisma = require("../prisma/prisma")

exports.auth_login_get = (req, res) => {
  res.render("login", { title: "Login" })
}

exports.auth_login_post = (req, res) => {}

exports.auth_register_get = (req, res) => {
  res.render("register", { title: "Create an account" })
}

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
      },
    })

    res.redirect("/login")
  }),
]
