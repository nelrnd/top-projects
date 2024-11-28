const { Router } = require("express")
const folderController = require("../controllers/folderController")
const authController = require("../controllers/authController")

const router = Router()

router.get(
  "/:parentFolderId/create",
  authController.auth_is_auth,
  folderController.folder_create_get
)

router.post(
  "/:parentFolderId/create",
  authController.auth_is_auth,
  folderController.folder_create_post
)

module.exports = router
