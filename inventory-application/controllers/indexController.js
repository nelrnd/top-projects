function home(req, res) {
  res.render("index", { title: "Home" })
}

module.exports = {
  home,
}
