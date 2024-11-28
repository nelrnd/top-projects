const multer = require("multer")
const upload = multer({ dest: "uploaded_files/" })

exports.file_upload_get = (req, res) => {
  res.render("upload", { title: "Upload a file" })
}

exports.file_upload_post = [
  upload.single("file"),
  (req, res) => {
    console.log(req.file)
    res.redirect("/")
  },
]
