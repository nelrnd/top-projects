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

exports.getAllMessages = async () => {
  const { rows } = await pool.query(
    "SELECT messages.*, users.first_name, users.last_name FROM messages LEFT JOIN users ON messages.user_id = users.user_id ORDER BY timestamp DESC;"
  )
  return rows
}

exports.deleteMessage = async (messageId) => {
  await pool.query("DELETE FROM messages WHERE message_id = $1", [messageId])
}

exports.joinClub = async (userId) => {
  await pool.query("UPDATE users SET is_member = TRUE WHERE user_id = $1;", [
    userId,
  ])
}

exports.becomeAdmin = async (userId) => {
  await pool.query("UPDATE users SET is_admin = TRUE WHERE user_id = $1;", [
    userId,
  ])
}
