require("dotenv").config()
const { argv } = require("node:process")
const { Client } = require("pg")

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  is_member BOOLEAN,
  is_admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS messages (
  message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255),
  content TEXT,
  timestamp TIMESTAMP,
  user_id INTEGER REFERENCES users
);

CREATE TABLE IF NOT EXISTS sessions (
  sid VARCHAR NOT NULL COLLATE "default",
  sess JSON NOT NULL,
  expire TIMESTAMP(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE sessions ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX IDX_session_expire ON sessions (expire);
`

async function main() {
  console.log("seeding...")
  const client = new Client({
    connectionString: argv[2] || process.env.DATABASE_URL,
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log("done")
}

main()
