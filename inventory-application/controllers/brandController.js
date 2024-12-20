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
  res.redirect(`/brand/${brand.brand_id}`)
})

exports.brand_detail = asyncHandler(async (req, res) => {
  const { brandId } = req.params
  const [brand, item_list] = await Promise.all([
    db.getBrandById(brandId),
    db.getItemsByBrandId(brandId),
  ])
  res.render("brand", { brand, item_list })
})

exports.brand_update_get = asyncHandler(async (req, res) => {
  const { brandId } = req.params
  const brand = await db.getBrandById(brandId)
  res.render("brand-form", { title: "Update brand", brand })
})

exports.brand_update_post = asyncHandler(async (req, res) => {
  const { brandId } = req.params
  const { name, desc } = req.body
  await db.updateBrand(brandId, { name, desc })
  res.redirect(`/brand/${brandId}`)
})

exports.brand_delete_get = asyncHandler(async (req, res) => {
  const { brandId } = req.params
  const [brand, item_list] = await Promise.all([
    db.getBrandById(brandId),
    db.getItemsByBrandId(brandId),
  ])
  res.render("brand-delete", { title: "Delete brand", brand, item_list })
})

exports.brand_delete_post = asyncHandler(async (req, res) => {
  const { brandId } = req.params
  const item_list = await db.getItemsByBrandId(brandId)
  if (item_list.length > 0) {
    res.redirect(`/brand/${brandId}/delete`)
    return
  }
  await db.deleteBrand(brandId)
  res.redirect("/brand")
})
