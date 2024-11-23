const { Router } = require("express")
const usersController = require("../controllers/usersController")

const router = Router()

router.get("/sign-up", usersController.user_register_get)

router.post("/sign-up", usersController.user_register_post)

router.get("/log-in", usersController.user_login_get)

router.post("/log-in", usersController.user_login_post)

router.get("/log-out", usersController.user_logout)

router.get("/join-club", usersController.join_club_get)

router.post("/join-club", usersController.join_club_post)

router.get("/become-admin", usersController.become_admin_get)

router.post("/become-admin", usersController.become_admin_post)

module.exports = router
