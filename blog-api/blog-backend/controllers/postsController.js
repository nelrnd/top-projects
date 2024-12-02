const prisma = require("../prisma/client")

exports.createPost = async (req, res) => {
  const post = await prisma.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
    },
  })
  res.json(post)
}

exports.getAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany()
  res.json(posts)
}

exports.getPostById = async (req, res) => {
  const { postId } = req.params
  const post = await prisma.post.findUnique({ where: { id: postId } })
  if (!post) {
    return res.status(404).json({ message: "Post not found" })
  }
  res.json(post)
}

exports.updatePost = async (req, res) => {
  const { postId } = req.params
  const updatePost = await prisma.post.update({
    where: { id: postId },
    data: {
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
    },
  })
  if (!updatePost) {
    return res.status(404).json({ message: "Post not found" })
  }
  res.json(updatePost)
}

exports.deletePost = async (req, res) => {
  const { postId } = req.params
  const deletePost = await prisma.post.delete({ where: { id: postId } })
  if (!deletePost) {
    return res.status(404).json({ message: "Post not found" })
  }
  res.json({ deletePost })
}
