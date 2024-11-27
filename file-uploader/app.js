require("dotenv").config()
const path = require("path")
const express = require("express")

const app = express()
const PORT = process.env.PORT || 2001

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/", require("./routes/indexRouter"))
app.use("/", require("./routes/authRouter"))

app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
)
