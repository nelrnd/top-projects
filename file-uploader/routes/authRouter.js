const { Router } = require("express")
const authController = require("../controllers/authController")

const router = Router()

router.get("/register", authController.auth_register_get)

router.post("/register", authController.auth_register_post)

router.get("/login", authController.auth_login_get)

router.post("/login", authController.auth_login_post)

module.exports = router
