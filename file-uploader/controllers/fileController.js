const asyncHandler = require("express-async-handler")
const multer = require("multer")
const upload = multer({ dest: "uploaded_files/" })
const prisma = require("../prisma/prisma")

exports.file_upload_get = (req, res) => {
  res.render("upload", { title: "Upload a file" })
}

exports.file_upload_post = [
  upload.single("file"),
  asyncHandler(async (req, res) => {
    const file = req.file
    if (!file) {
      res.redirect("/file/upload")
      return
    }

    await prisma.file.create({
      data: {
        name: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path,
        userId: req.user.id,
      },
    })

    res.redirect("/")
  }),
]

exports.file_get_user_files = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    const files = await prisma.file.findMany({ where: { userId: req.user.id } })
    res.locals.files = files
  }
  next()
})
