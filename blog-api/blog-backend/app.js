require("dotenv").config()
const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => res.json({ message: "Hello" }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
)
