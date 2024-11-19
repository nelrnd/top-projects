const express = require("express")
const path = require("path")
const asyncHandler = require("express-async-handler")
const CustomNotFoundError = require("./errors/CustomNotFoundError")

const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
]

app.get("/", (req, res) => res.render("index", { messages }))

app.get("/new", (req, res) => res.render("form"))

app.post("/new", (req, res) => {
  const message = {
    user: req.body.author,
    text: req.body.text,
    added: new Date(),
  }

  messages.push(message)

  res.redirect("/")
})

app.get(
  "/messages/:messageId",
  asyncHandler((req, res, next) => {
    const { messageId } = req.params

    const message = messages[messageId]

    if (!message) {
      throw new CustomNotFoundError("Message not found")
    }

    res.render("message", { message })
  })
)

app.use((err, req, res, next) => {
  console.log(err.message)
  res.render("error", { error: err })
})

app.listen(2001)
