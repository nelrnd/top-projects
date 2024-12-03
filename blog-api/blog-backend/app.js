require("dotenv").config()
const express = require("express")
const cors = require("cors")
const postsRouter = require("./routes/postsRouter")
const commentsRouter = require("./routes/commentsRouter")
const usersRouter = require("./routes/usersRouter")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

postsRouter.use("/:postId/comments", commentsRouter)
app.use("/api/posts", postsRouter)
app.use("/api/users", usersRouter)

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
