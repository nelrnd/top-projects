const { Router } = require("express")
const indexController = require("../controllers/indexController")
const fileController = require("../controllers/fileController")

const router = Router()

router.get("/", fileController.file_get_user_files, indexController.home_get)

module.exports = router
