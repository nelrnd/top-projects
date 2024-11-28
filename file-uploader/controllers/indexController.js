const folderController = require("./folderController")

exports.home_get = [
  folderController.folder_get_folder,
  (req, res) => {
    if (req.isAuthenticated()) {
      res.render("dashboard", { title: "Dashboard" })
    } else {
      res.render("index", { title: "Home" })
    }
  },
]
