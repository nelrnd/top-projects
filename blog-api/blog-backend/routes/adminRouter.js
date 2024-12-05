const { Router } = require("express")
const adminController = require("../controllers/adminController")
const userController = require("../controllers/usersController")

const router = Router()

router.use(userController.verifyAdmin)

router.get("/posts", adminController.getAllPosts)

router.get("/posts/:postId", adminController.getPostById)

module.exports = router
