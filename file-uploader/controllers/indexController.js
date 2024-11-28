const fileController = require("./fileController")

exports.home_get = [
  fileController.file_get_user_files,
  (req, res) => {
    if (req.isAuthenticated()) {
      res.render("dashboard", { title: "Dashboard" })
    } else {
      res.render("index", { title: "Home" })
    }
  },
]
