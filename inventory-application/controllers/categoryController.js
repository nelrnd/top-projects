const asyncHandler = require("express-async-handler")
const db = require("../db/queries")

exports.category_list = asyncHandler(async (req, res) => {
  res.render("category-list", { title: "Categories", category_list: [] })
})

exports.category_create_get = asyncHandler(async (req, res) => {
  console.log("category_create_get")
})

exports.category_create_post = asyncHandler(async (req, res) => {
  console.log("category_create_post")
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
