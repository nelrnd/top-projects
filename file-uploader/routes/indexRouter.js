const { Router } = require("express")
const indexController = require("../controllers/indexController")

const router = Router()

router.get("/", indexController.home_get)

module.exports = router
