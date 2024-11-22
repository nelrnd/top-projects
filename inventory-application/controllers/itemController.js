const asyncHandler = require("express-async-handler")
const db = require("../db/queries")

exports.item_list = asyncHandler(async (req, res) => {
  const item_list = await db.getAllItems()
  res.render("item-list", { title: "All items", item_list })
})

exports.item_create_get = asyncHandler(async (req, res) => {
  const [category_list, brand_list] = await Promise.all([
    db.getAllCategories(),
    db.getAllBrands(),
  ])
  res.render("item-form", { title: "Create item", category_list, brand_list })
})

exports.item_create_post = asyncHandler(async (req, res) => {
  const { name, desc, price, quantity, category, brand } = req.body
  const item = await db.createItem({
    name,
    desc,
    price,
    quantity,
    category,
    brand,
  })
  res.redirect(`/item/${item.id}`)
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
