const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator")
const prisma = require("../prisma/prisma")

exports.folder_create_get = (req, res) => {
  res.render("folder-create", { title: "Create a new folder" })
}

const createFolderValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Folder name is required")
    .isLength({ max: 100 })
    .withMessage("Folder name cannot exceed 100 characters"),
]

exports.folder_create_post = [
  createFolderValidation,
  asyncHandler(async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      res.render("folder-create", {
        title: "Create a new folder",
        errors: result.array(),
      })
      return
    }

    let { parentFolderId } = req.params
    parentFolderId = Number(parentFolderId)

    const parentFolder = await prisma.folder.findUnique({
      where: { id: parentFolderId },
    })

    if (!parentFolder) {
      // not found
      return
    }
    if (parentFolder.userId !== req.user.id) {
      // not authorized
      return
    }

    const folder = await prisma.folder.create({
      data: {
        name: req.body.name,
        userId: req.user.id,
      },
    })

    res.redirect(`/folder/${folder.id}`)
  }),
]

exports.folder_get_user_root_folder = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    const folder = await prisma.folder.findFirst({
      where: { userId: req.user.id, isRoot: true },
      include: { folders: true, files: true },
    })

    if (!folder) {
      // not found
      return
    }

    res.locals.currentFolder = folder
  }
  next()
})
