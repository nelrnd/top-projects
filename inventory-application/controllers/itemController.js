const asyncHandler = require("express-async-handler")
const db = require("../db/queries")

exports.item_list = asyncHandler(async (req, res) => {
  const item_list = await db.getAllItems()
  res.render("item-list", { title: "All items", item_list })
})

exports.item_create_get = asyncHandler(async (req, res) => {
  console.log("item_create_get")
})

exports.item_create_post = asyncHandler(async (req, res) => {
  console.log("item_create_post")
})

exports.item_detail = asyncHandler(async (req, res) => {
  const { itemId } = req.params
  const item = await db.getItemById(itemId)
  res.render("item", { item })
})

exports.item_update_get = asyncHandler(async (req, res) => {
  const { itemId } = req.params
  console.log("item_update_get")
})

exports.item_update_post = asyncHandler(async (req, res) => {
  const { itemId } = req.params
  console.log("item_update_post")
})

exports.item_delete_get = asyncHandler(async (req, res) => {
  const { itemId } = req.params
  console.log("item_delete_get")
})

exports.item_delete_post = asyncHandler(async (req, res) => {
  const { itemId } = req.params
  console.log("item_delete_post")
})
