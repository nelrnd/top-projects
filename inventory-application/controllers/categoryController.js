const asyncHandler = require("express-async-handler")
const db = require("../db/queries")

exports.category_list = asyncHandler(async (req, res) => {
  const category_list = await db.getAllCategories()
  res.render("category-list", { title: "Categories", category_list })
})

exports.category_create_get = asyncHandler(async (req, res) => {
  res.render("category-form", { title: "Create category" })
})

exports.category_create_post = asyncHandler(async (req, res) => {
  const { name, desc } = req.body
  const category = await db.createCategory({ name, desc })
  res.redirect(`/category/${category.id}`)
})

exports.category_detail = asyncHandler(async (req, res) => {
  const { categoryId } = req.params
  console.log("category_detail")
})

exports.category_update_get = asyncHandler(async (req, res) => {
  const { categoryId } = req.params
  console.log("category_update_get")
})

exports.category_update_post = asyncHandler(async (req, res) => {
  const { categoryId } = req.params
  console.log("category_update_post")
})

exports.category_delete_get = asyncHandler(async (req, res) => {
  const { categoryId } = req.params
  console.log("category_delete_get")
})

exports.category_delete_post = asyncHandler(async (req, res) => {
  const { categoryId } = req.params
  console.log("category_delete_post")
})