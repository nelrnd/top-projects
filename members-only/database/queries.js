const pool = require("./pool")

exports.createUser = async ({ first_name, last_name, email, password }) => {
  await pool.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, email, password]
  )
}
