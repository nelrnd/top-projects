const asyncHandler = require("express-async-handler")
const db = require("../db/queries")

exports.brand_list = asyncHandler(async (req, res) => {
  const brand_list = await db.getAllBrands()
  res.render("brand-list", { title: "Brands", brand_list })
})

exports.brand_create_get = asyncHandler(async (req, res) => {
  res.render("brand-form", { title: "Create brand" })
})

exports.brand_create_post = asyncHandler(async (req, res) => {
  const { name, desc } = req.body
  const brand = await db.createBrand({ name, desc })
  res.redirect(`/brand/${brand.id}`)
})

exports.brand_detail = asyncHandler(async (req, res) => {
  const { brandId } = req.params
  console.log("brand_detail")
})

exports.brand_update_get = asyncHandler(async (req, res) => {
  const { brandId } = req.params
  console.log("brand_update_get")
})

exports.brand_update_post = asyncHandler(async (req, res) => {
  const { brandId } = req.params
  console.log("brand_update_post")
})

exports.brand_delete_get = asyncHandler(async (req, res) => {
  const { brandId } = req.params
  console.log("brand_delete_get")
})

exports.brand_delete_post = asyncHandler(async (req, res) => {
  const { brandId } = req.params
  console.log("brand_delete_post")
})