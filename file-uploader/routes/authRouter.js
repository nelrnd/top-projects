const { Router } = require("express")
const authController = require("../controllers/authController")

const router = Router()

router.get("/login", authController.auth_login_get)

router.get("/register", authController.auth_register_get)

module.exports = router
