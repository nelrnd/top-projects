const { Router } = require("express")
const commentsController = require("../controllers/commentsController")

const router = Router({ mergeParams: true })

router.post("/", commentsController.createComment)

router.get("/", commentsController.getAllCommentsFromPost)

router.get("/:commentId", commentsController.getCommentByIdFromPost)

router.delete("/:commentId", commentsController.deleteComment)

module.exports = router
