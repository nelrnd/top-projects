const { Router } = require("express")
const folderController = require("../controllers/folderController")

const router = Router()

router.get("/create", folderController.folder_create_get)

router.post("/create", folderController.folder_create_post)

router.get("/:folderId", folderController.folder_detail)

module.exports = router
