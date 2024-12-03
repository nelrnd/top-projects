require("dotenv").config()
const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/posts", require("./routes/postsRouter"))
app.use("/api/users", require("./routes/usersRouter"))

app.use((err, req, res, next) => {
  console.log(err)
  if (err.code === "P2025") {
    // P2025 = Prisma error: "An operation failed because it depends on one or more records that were required but not found.
    return res.status(404).json({ message: `${err.meta.modelName} not found` })
  }
  res.status(err.statusCode || 500).json({ message: err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
)
