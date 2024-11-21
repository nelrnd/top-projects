const pool = require("./pool")

async function getAllMessages() {
  const { rows } = await pool.query(`SELECT * FROM messages;`)
  return rows
}

async function getMessageById(id) {
  const message = await pool.query(`SELECT * FROM messages WHERE id = $1`, [id])
  return message
}

async function createMessage(user, text) {
  await pool.query(`INSERT INTO messages (user, text) VALUES ($1, $2)`, [
    user,
    text,
  ])
}

module.exports = { getAllMessages, getMessageById, createMessage }
