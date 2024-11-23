const { Router } = require("express")
const messagesController = require("../controllers/messagesController")

const router = Router()

router.get("/create-message", messagesController.message_create_get)

router.post("/create-message", messagesController.message_create_post)

router.post("/message/:messageId/delete", messagesController.message_delete)

module.exports = router
