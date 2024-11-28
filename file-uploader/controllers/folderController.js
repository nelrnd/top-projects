const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator")
const prisma = require("../prisma/prisma")
const authController = require("./authController")

exports.folder_create_get = [
  authController.auth_is_auth,
  (req, res) => {
    const { folder } = req.query
    res.render("folder-form", {
      title: "Create a new folder",
      buttonText: "Create",
      backFolderId: folder,
    })
  },
]

const createFolderValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Folder name is required")
    .isLength({ max: 100 })
    .withMessage("Folder name cannot exceed 100 characters"),
]

exports.folder_create_post = [
  authController.auth_is_auth,
  createFolderValidation,
  asyncHandler(async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      res.render("folder-form", {
        title: "Create a new folder",
        errors: result.array(),
      })
      return
    }

    const parentFolderId = Number(req.query.folder)

    if (!parentFolderId) {
      // must provide parent folder id
      return
    }

    const parentFolder = await prisma.folder.findUnique({
      where: { id: parentFolderId },
    })

    if (!parentFolder) {
      // parent folder not found
      return
    } else if (parentFolder.userId !== req.user.id) {
      // unauthorized
      return
    }

    await prisma.folder.create({
      data: {
        parentFolderId,
        name: req.body.name,
        userId: req.user.id,
      },
    })

    const redirectUrl = parentFolder.isRoot ? "/" : `/folder/${parentFolder.id}`
    res.redirect(redirectUrl)
  }),
]

exports.folder_get_folder = folder_get_folder = asyncHandler(
  async (req, res, next) => {
    let { folderId } = req.params

    let folder

    if (!folderId) {
      if (!req.isAuthenticated()) {
        next()
        return
      }
      // root folder
      folder = await prisma.folder.findFirst({
        where: { userId: req.user.id, isRoot: true },
        include: { folders: true, files: true },
      })
    } else {
      folder = await prisma.folder.findUnique({
        where: { id: Number(folderId) },
        include: { folders: true, files: true },
      })
    }

    if (!folder) {
      console.log("not found")
      return
    } else if (folder.userId !== req.user.id) {
      console.log("not authorized")
      return
    }

    res.locals.currentFolder = folder
    next()
  }
)

exports.folder_detail = [
  authController.auth_is_auth,
  folder_get_folder,
  asyncHandler(async (req, res) => {
    const { currentFolder } = res.locals

    if (currentFolder.isRoot) {
      res.redirect("/")
    } else {
      res.render("folder", { title: currentFolder.name })
    }
  }),
]

exports.folder_update_get = [
  authController.auth_is_auth,
  folder_get_folder,
  (req, res) => {
    const { folderId } = req.params
    res.render("folder-form", {
      title: "Edit folder",
      buttonText: "Save",
      backFolderId: folderId,
    })
  },
]

exports.folder_update_post = [
  authController.auth_is_auth,
  folder_get_folder,
  createFolderValidation,
  asyncHandler(async (req, res) => {
    const result = validationResult(req)
    const { folderId } = req.params
    if (!result.isEmpty()) {
      res.render("folder-form", {
        title: "Edit folder",
        buttonText: "Save",
        backFolderId: folderId,
        errors: result.array(),
      })
      return
    }

    await prisma.folder.update({
      where: { id: Number(folderId) },
      data: { name: req.body.name },
    })

    res.redirect(`/folder/${folderId}`)
  }),
]
