const { Router } = require("express")
const usersController = require("../controllers/usersController")

const router = Router()

router.get("/sign-up", usersController.user_register_get)

router.post("/sign-up", usersController.user_register_post)

module.exports = router
