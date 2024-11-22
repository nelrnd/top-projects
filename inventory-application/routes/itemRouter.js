const { Router } = require("express")
const itemController = require("../controllers/itemController")

const router = Router()

router.get("/", itemController.item_list)

router.get("/new", itemController.item_create_get)

router.post("/new", itemController.item_create_post)

router.get("/:itemId", itemController.item_detail)

router.get("/:itemId/update", itemController.item_update_get)

router.post("/:itemId/update", itemController.item_update_post)

router.get("/:itemId/delete", itemController.item_delete_get)

router.post("/:itemId/delete", itemController.item_delete_post)

module.exports = router
