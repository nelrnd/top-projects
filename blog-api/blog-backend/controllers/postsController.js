const asyncHandler = require("express-async-handler")
const prisma = require("../prisma/client")
const usersController = require("./usersController")

exports.createPost = [
  usersController.verifyAdmin,
  asyncHandler(async (req, res) => {
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        published: req.body.published,
      },
    })
    res.json(post)
  }),
]

exports.getAllPosts = asyncHandler(async (req, res) => {
  const posts = await prisma.post.findMany()
  res.json(posts)
})

exports.getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params
  const post = await prisma.post.findUnique({ where: { id: +postId } })
  if (!post) {
    return res.status(404).json({ message: "Post not found" })
  }
  res.json(post)
})

exports.updatePost = [
  usersController.verifyAdmin,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params
    const updatePost = await prisma.post.update({
      where: { id: +postId },
      data: {
        title: req.body.title,
        content: req.body.content,
        published: req.body.published,
      },
    })
    res.json(updatePost)
  }),
]

exports.deletePost = [
  usersController.verifyAdmin,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params
    const [deleteComments, deletePost] = await prisma.$transaction([
      prisma.comment.deleteMany({ where: { postId: +postId } }),
      prisma.post.delete({ where: { id: +postId } }),
    ])
    res.json(deletePost)
  }),
]

exports.incrementPostViewCount = asyncHandler(async (req, res, next) => {
  const { postId } = req.params
  await prisma.post.update({
    where: { id: +postId },
    data: { viewCount: { increment: 1 } },
  })
  next()
})
