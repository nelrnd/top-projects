const pool = require("./pool")

async function createCategory({ name, desc }) {
  await pool.query(
    "INSERT INTO categories (category_name, category_desc) VALUES ($1, $2);",
    [name, desc]
  )
}

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories;")
  return rows
}

async function getCategoryById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE category_id = $1",
    [id]
  )
  return rows[0]
}

async function createBrand({ name, desc }) {
  await pool.query(
    "INSERT INTO brands (brand_name, brand_desc) VALUES ($1, $2);",
    [name, desc]
  )
}

async function getAllBrands() {
  const { rows } = await pool.query("SELECT * FROM brands;")
  return rows
}

async function getBrandById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM brands WHERE brand_id = $1",
    [id]
  )
  return rows[0]
}

async function getItemsByCategoryId(categoryId) {
  const { rows } = await pool.query(
    "SELECT * FROM items LEFT JOIN categories ON items.category_id = categories.category_id LEFT JOIN brands ON items.brand_id = brands.brand_id WHERE items.category_id = $1",
    [categoryId]
  )
  return rows
}

async function getItemsByBrandId(brandId) {
  const { rows } = await pool.query(
    "SELECT * FROM items LEFT JOIN categories ON items.category_id = categories.category_id LEFT JOIN brands ON items.brand_id = brands.brand_id WHERE items.brand_id = $1",
    [brandId]
  )
  return rows
}

async function getItemById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM items LEFT JOIN categories ON items.category_id = categories.category_id LEFT JOIN brands ON items.brand_id = brands.brand_id WHERE id = $1",
    [id]
  )
  return rows[0]
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  createBrand,
  getAllBrands,
  getBrandById,
  getItemsByCategoryId,
  getItemsByBrandId,
  getItemById,
}
