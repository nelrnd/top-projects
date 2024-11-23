const pool = require("./pool")

exports.createUser = async ({
  first_name,
  last_name,
  email,
  password,
  is_member,
  is_admin,
}) => {
  is_member = is_member || false
  is_admin = is_admin || false
  await pool.query(
    "INSERT INTO users (first_name, last_name, email, password, is_member, is_admin) VALUES ($1, $2, $3, $4, $5, $6);",
    [first_name, last_name, email, password, is_member, is_admin]
  )
}

exports.createMessage = async ({ title, content, user_id }) => {
  const timestamp = new Date()
  await pool.query(
    "INSERT INTO messages (title, content, timestamp, user_id) VALUES ($1, $2, $3, $4);",
    [title, content, timestamp, user_id]
  )
}
