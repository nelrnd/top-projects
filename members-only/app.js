require("dotenv").config()
const path = require("path")
const express = require("express")
const session = require("express-session")

const app = express()
const PORT = process.env.PORT || 3000

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

app.get("/", (req, res) => res.send("Hello?"))

app.listen(PORT, console.log(`app running at http://localhost:${PORT}`))
