require("dotenv").config()
const path = require("path")
const express = require("express")
const session = require("express-session")
const passport = require("passport")

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
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }, // for 30 days
  })
)

require("./config/passport")

app.use(passport.session())

app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

app.use("/", require("./routes/indexRouter"))
app.use("/", require("./routes/authRouter"))

app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
)
