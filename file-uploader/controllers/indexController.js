exports.home_get = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("dashboard", { title: "Dashboard" })
  } else {
    res.render("index", { title: "Home" })
  }
}
