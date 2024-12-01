const path = require("path")
const { createWriteStream } = require("fs")
const { unlink } = require("fs/promises")
const { Readable } = require("stream")
const asyncHandler = require("express-async-handler")
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage })
const prisma = require("../prisma/prisma")
const authController = require("./authController")
const { decode } = require("base64-arraybuffer")
const supabase = require("../config/supabase")
const { finished } = require("stream/promises")
const { v4: uuidv4 } = require("uuid")

exports.file_upload_get = [
  authController.auth_is_auth,
  (req, res) => {
    const { folder } = req.query
    res.render("file-form", {
      title: "Upload a new file",
      parentFolderId: folder,
    })
  },
]

exports.file_upload_post = [
  authController.auth_is_auth,
  upload.single("file"),
  asyncHandler(async (req, res) => {
    const file = req.file

    if (!file) {
      res.redirect(req.originalUrl)
      return
    }

    const parentFolderId = Number(req.query.folder)

    if (!parentFolderId) {
      // parent folder not found
      return
    }

    const parentFolder = await prisma.folder.findUnique({
      where: { id: parentFolderId },
    })

    if (!parentFolder) {
      console.log("not found")
    } else if (parentFolder.userId !== req.user.id) {
      console.log("not authorized")
      return
    }

    const fileBase64 = decode(file.buffer.toString("base64"))

    const { data, error } = await supabase.storage
      .from("file-uploader-bucket")
      .upload(file.originalname, fileBase64, { contentType: file.mimetype })

    if (error) {
      throw error
    }

    const { data: uploadedFile } = supabase.storage
      .from("file-uploader-bucket")
      .getPublicUrl(data.path)

    await prisma.file.create({
      data: {
        name: file.originalname,
        type: file.mimetype,
        size: file.size,
        path: uploadedFile.publicUrl,
        userId: req.user.id,
        parentFolderId: parentFolder.id,
      },
    })

    const redirectUrl = parentFolder.isRoot ? "/" : `/folder/${parentFolder.id}`
    res.redirect(redirectUrl)
  }),
]

exports.file_download = [
  authController.auth_is_auth,
  asyncHandler(async (req, res) => {
    let { fileId } = req.params
    fileId = Number(fileId)
    const file = await prisma.file.findUnique({ where: { id: fileId } })
    if (!file) {
      // render not found
      return
    }
    if (file.userId !== req.user.id) {
      // render unauthorized
      return
    }

    const data = await fetch(file.path)
    const dest = path.resolve("./uploaded_files", uuidv4())
    const fileStream = createWriteStream(dest, { flags: "wx" })
    await finished(Readable.fromWeb(data.body).pipe(fileStream))

    res.download(dest, file.name)

    setTimeout(async () => {
      await unlink(dest)
    }, 3000)
  }),
]
