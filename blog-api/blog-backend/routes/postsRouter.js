const { Router } = require("express")
const postsController = require("../controllers/postsController")

const router = Router()

router.post("/", postsController.createPost)

router.get("/", postsController.getAllPosts)

router.get(
  "/:postId",
  postsController.incrementPostViewCount,
  postsController.getPostById
)

router.put("/:postId", postsController.updatePost)

router.delete("/:postId", postsController.deletePost)

module.exports = router
