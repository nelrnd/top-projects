const { Router } = require("express")
const usersController = require("../controllers/usersController")

const router = Router()

router.post("/", usersController.createUser)

router.post("/login", usersController.loginUser)

router.get("/me", usersController.getMe)

module.exports = router
