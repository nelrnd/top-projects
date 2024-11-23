const { Router } = require("express")
const usersController = require("../controllers/usersController")

const router = Router()

router.get("/sign-up", usersController.user_register_get)

router.post("/sign-up", usersController.user_register_post)

router.get("/log-in", usersController.user_login_get)

router.post("/log-in", usersController.user_login_post)

module.exports = router
