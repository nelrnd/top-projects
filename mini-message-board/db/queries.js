const pool = require("./pool")

async function getAllMessages() {
  const { rows } = await pool.query(`SELECT * FROM messages;`)
  return rows
}

async function getMessageById(id) {
  const { rows } = await pool.query(
    `SELECT * FROM messages WHERE id = $1 LIMIT 1`,
    [id]
  )
  return rows[0]
}

async function createMessage(user, text) {
  await pool.query(
    `INSERT INTO messages (username, text, added) VALUES ($1, $2, $3)`,
    [user, text, new Date()]
  )
}

module.exports = { getAllMessages, getMessageById, createMessage }
