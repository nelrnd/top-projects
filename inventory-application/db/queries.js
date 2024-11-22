const pool = require("./pool")

async function createCategory({ name, desc }) {
  const { rows } = await pool.query(
    "INSERT INTO categories (category_name, category_description) VALUES ($1, $2) RETURNING *;",
    [name, desc]
  )
  return rows[0]
}

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories;")
  return rows
}

async function getCategoryById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE category_id = $1;",
    [id]
  )
  return rows[0]
}

async function createBrand({ name, desc }) {
  const { rows } = await pool.query(
    "INSERT INTO brands (brand_name, brand_description) VALUES ($1, $2) RETURNING *;",
    [name, desc]
  )
  return rows[0]
}

async function getAllBrands() {
  const { rows } = await pool.query("SELECT * FROM brands;")
  return rows
}

async function getBrandById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM brands WHERE brand_id = $1;",
    [id]
  )
  return rows[0]
}

async function createItem({ name, desc, price, quantity, category, brand }) {
  const { rows } = await pool.query(
    "INSERT INTO items (name, description, price_in_dollar, stock_quantity, category_id, brand_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
    [name, desc, price, quantity, category, brand]
  )
  return rows[0]
}

async function getAllItems() {
  const { rows } = await pool.query(
    "SELECT * FROM items LEFT JOIN categories ON items.category_id = categories.category_id LEFT JOIN brands ON items.brand_id = brands.brand_id;"
  )
  return rows
}

async function getItemsByCategoryId(categoryId) {
  const { rows } = await pool.query(
    "SELECT * FROM items LEFT JOIN categories ON items.category_id = categories.category_id LEFT JOIN brands ON items.brand_id = brands.brand_id WHERE items.category_id = $1;",
    [categoryId]
  )
  return rows
}

async function getItemsByBrandId(brandId) {
  const { rows } = await pool.query(
    "SELECT * FROM items LEFT JOIN categories ON items.category_id = categories.category_id LEFT JOIN brands ON items.brand_id = brands.brand_id WHERE items.brand_id = $1;",
    [brandId]
  )
  return rows
}

async function getItemById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM items LEFT JOIN categories ON items.category_id = categories.category_id LEFT JOIN brands ON items.brand_id = brands.brand_id WHERE id = $1;",
    [id]
  )
  return rows[0]
}

async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE id = $1", [id])
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  createBrand,
  getAllBrands,
  getBrandById,
  createItem,
  getAllItems,
  getItemsByCategoryId,
  getItemsByBrandId,
  getItemById,
  deleteItem,
}
