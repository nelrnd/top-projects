require("dotenv").config()
const express = require("express")
const path = require("path")
const asyncHandler = require("express-async-handler")
const CustomNotFoundError = require("./errors/CustomNotFoundError")

const app = express()
const PORT = process.env.PORT || 3000

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }))

const messagesRouter = require("./routes/messagesRouter")
app.use("/", messagesRouter)

app.use((err, req, res, next) => {
  console.log(err.message)
  res.status(err.statusCode || 500).render("error", { error: err })
})

app.listen(PORT, () =>
  process.env.NODE_ENV === "production"
    ? console.log(`Server started on port ${PORT}`)
    : console.log(`Server started at http://localhost:${PORT}`)
)
