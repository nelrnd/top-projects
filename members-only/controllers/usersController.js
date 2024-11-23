const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const db = require("../database/queries")
const pool = require("../database/pool")

exports.user_register_get = asyncHandler(async (req, res) => {
  res.render("sign-up", { title: "Sign up" })
})

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
