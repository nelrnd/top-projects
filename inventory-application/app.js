require("dotenv").config()
const express = require("express")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3000

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

const indexRouter = require("./routes/indexRouter")
const itemRouter = require("./routes/itemRouter")
const categoryRouter = require("./routes/categoryRouter")
const brandRouter = require("./routes/brandRouter")
app.use("/", indexRouter)
app.use("/item", itemRouter)
app.use("/category", categoryRouter)
app.use("/brand", brandRouter)

app.listen(
  PORT,
  process.env.NODE_ENV === "production"
    ? console.log("Server started")
    : console.log(`Server started at http://localhost:${PORT}`)
)
