const { Router } = require("express")
const fileController = require("../controllers/fileController")

const router = Router()

router.get("/upload", fileController.file_upload_get)

router.post("/upload", fileController.file_upload_post)

router.get("/:fileId/download", fileController.file_download)

module.exports = router
