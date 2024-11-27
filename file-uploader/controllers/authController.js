exports.auth_login_get = (req, res) => {
  res.render("login", { title: "Login" })
}

exports.auth_register_get = (req, res) => {
  res.render("register", { title: "Create an account" })
}
