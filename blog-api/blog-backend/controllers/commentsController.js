const asyncHandler = require("express-async-handler")
const prisma = require("../prisma/client")
const usersController = require("./usersController")

exports.createComment = [
  usersController.verifyUser,
  asyncHandler(async (req, res) => {
    const { postId } = req.params
    const post = await prisma.post.findUnique({ where: { id: +postId } })
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }
    const comment = await prisma.comment.create({
      data: {
        content: req.body.content,
        userId: req.user.id,
        postId: +postId,
      },
    })
    res.json(comment)
  }),
]

exports.getAllCommentsFromPost = asyncHandler(async (req, res) => {
  const { postId } = req.params
  console.log(postId)
  const comments = await prisma.comment.findMany({
    where: { postId: +postId },
    include: { user: { select: { id: true, name: true, email: true } } },
  })
  res.json(comments)
})

exports.getCommentByIdFromPost = asyncHandler(async (req, res) => {
  const { postId, commentId } = req.params
  const comment = await prisma.comment.findUnique({
    where: { id: +commentId, postId: +postId },
    include: { user: { select: { id: true, name: true, email: true } } },
  })
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" })
  }
  res.json(comment)
})

exports.deleteComment = [
  verifyUser,
  asyncHandler(async (req, res) => {
    const { postId, commentId } = req.params
    const comment = await prisma.comment.findUnique({
      where: { id: +commentId, postId: +postId },
    })
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" })
    }
    if (req.user.id !== comment.userId && req.user.role !== "ADMIN") {
      return res.status(401).json({
        message: "Cannot delete comment: must be admin or comment author",
      })
    }
    const deleteComment = await prisma.comment.delete({
      where: { id: +commentId, postId: +postId },
    })
    res.json(deleteComment)
  }),
]
