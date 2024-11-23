require("dotenv").config()
const path = require("path")
const express = require("express")
const session = require("express-session")
const pgSession = require("connect-pg-simple")(session)
const passport = require("passport")
const pool = require("./database/pool")

const app = express()
const PORT = process.env.PORT || 3000

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
  session({
    store: new pgSession({ pool, tableName: "sessions" }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // for 30 days
  })
)

require("./config/passport")
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

app.get("/", (req, res) => res.send("Hello?"))

app.listen(PORT, console.log(`app running at http://localhost:${PORT}`))
