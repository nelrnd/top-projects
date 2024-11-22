const { Router } = require("express")
const categoryController = require("../controllers/categoryController")

const router = Router()

router.get("/", categoryController.category_list)

router.get("/new", categoryController.category_create_get)

router.post("/new", categoryController.category_create_post)

router.get("/:categoryId", categoryController.category_detail)

router.get("/:categoryId/update", categoryController.category_update_get)

router.post("/:categoryId/update", categoryController.category_update_post)

router.get("/:categoryId/delete", categoryController.category_delete_get)

router.post("/:categoryId/delete", categoryController.category_delete_post)

module.exports = router
