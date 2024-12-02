const { Router } = require("express")
const postsController = require("../controllers/postsController")

const router = Router()

router.post("/", postsController.createPost)

router.get("/", postsController.getAllPosts)

router.get("/:postId", postsController.getPostById)

module.exports = router
