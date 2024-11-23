const asyncHandler = require("express-async-handler")
const db = require("../database/queries")

exports.index_get = asyncHandler(async (req, res) => {
  const messages = await db.getAllMessages()
  res.render("index", { title: "Home", messages })
})
