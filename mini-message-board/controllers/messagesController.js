const db = require("../db/queries")
const CustomNotFoundError = require("../errors/CustomNotFoundError")

async function getAllMessages(req, res) {
  const messages = await db.getAllMessages()
  res.render("index", { messages })
}

async function createMessageGet(req, res) {
  res.render("form")
}

async function createMessagePost(req, res) {
  const { user, text } = req.body
  console.log(user, text)
  await db.createMessage(user, text)
  res.redirect("/")
}

async function getMessageById(req, res) {
  const { messageId } = req.params

  const message = await db.getMessageById(messageId)

  if (!message) {
    throw new CustomNotFoundError("Message not found")
  }

  res.render("message", { message })
}

module.exports = {
  getAllMessages,
  createMessageGet,
  createMessagePost,
  getMessageById,
}
