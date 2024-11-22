require("dotenv").config()
const express = require("express")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3000

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: false }))

const indexRouter = require("./routes/indexRouter")
app.use("/", indexRouter)

app.listen(
  PORT,
  process.env.NODE_ENV === "production"
    ? console.log("Server started")
    : console.log(`Server started at http://localhost:${PORT}`)
)
