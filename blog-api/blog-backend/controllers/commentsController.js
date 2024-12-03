const asyncHandler = require("express-async-handler")
const prisma = require("../prisma/client")

exports.createComment = asyncHandler(async (req, res) => {
  const { postId } = req.params
  // check if post exist
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
})

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

exports.deleteComment = asyncHandler(async (req, res) => {
  const { postId, commentId } = req.params
  const deleteComment = await prisma.comment.delete({
    where: { id: +commentId, postId: +postId },
  })
  res.json(deleteComment)
})
