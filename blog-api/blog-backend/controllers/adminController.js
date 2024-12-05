const asyncHandler = require("express-async-handler")
const prisma = require("../prisma/client")

exports.getAllPosts = asyncHandler(async (req, res) => {
  const posts = await prisma.post.findMany()
  res.json(posts)
})

exports.getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params
  const post = await prisma.post.findUnique({
    where: { id: +postId, published: true },
  })
  if (!post) {
    return res.status(404).json()
  }
  res.json(post)
})
