const { Router } = require("express")
const brandController = require("../controllers/brandController")

const router = Router()

router.get("/", brandController.brand_list)

router.get("/new", brandController.brand_create_get)

router.post("/new", brandController.brand_create_post)

router.get("/:brandId", brandController.brand_detail)

router.get("/:brandId/update", brandController.brand_update_get)

router.post("/:brandId/update", brandController.brand_update_post)

router.get("/:brandId/delete", brandController.brand_delete_get)

router.post("/:brandId/delete", brandController.brand_delete_post)

module.exports = router
