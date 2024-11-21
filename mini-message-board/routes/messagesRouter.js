const { Router } = require("express")
const messagesController = require("../controllers/messagesController")

const router = Router()

router.get("/", messagesController.getAllMessages)

router.get("/new", messagesController.createMessageGet)

router.post("/new", messagesController.createMessagePost)

router.get("/:messageId", messagesController.getMessageById)

module.exports = router
