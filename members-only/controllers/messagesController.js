const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator")
const db = require("../database/queries")
const usersController = require("./usersController")

exports.message_create_get = [
  usersController.user_is_auth,
  asyncHandler(async (req, res) => {
    res.render("create-message", { title: "Create new message" })
  }),
]

const messageValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 200 })
    .withMessage("Title must not exceed 200 characters"),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Message content is required")
    .isLength({ max: 1000 })
    .withMessage("Message content must not exceed 1000 characters"),
]

exports.message_create_post = [
  usersController.user_is_auth,
  messageValidation,
  asyncHandler(async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      res.render("create-message", {
        title: "Create new message",
        errors: result.array(),
      })
      return
    }
    const { title, content } = req.body
    await db.createMessage({ title, content, user_id: req.user.user_id })
    res.redirect("/")
  }),
]

exports.message_delete = [
  usersController.user_is_admin,
  asyncHandler(async (req, res) => {
    const { messageId } = req.params
    if (messageId) {
      await db.deleteMessage(messageId)
    }
    res.redirect("/")
  }),
]
