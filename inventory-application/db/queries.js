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
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ])
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
  const { rows } = await pool.query("SELECT * FROM brands WHERE id = $1", [id])
  return rows[0]
}

async function getItemsByCategoryId(categoryId) {
  const { rows } = await pool.query(
    "SELECT * FROM items LEFT JOIN categories ON items.category_id = categories.id LEFT JOIN brands ON items.brand_id = brands.id WHERE category_id = $1",
    [categoryId]
  )
  return rows
}

async function getItemsByBrandId(brandId) {
  const { rows } = await pool.query(
    "SELECT * FROM items LEFT JOIN categories ON items.category_id = categories.id LEFT JOIN brands ON items.brand_id = brands.id WHERE brand_id = $1",
    [brandId]
  )
  return rows
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
}
