require("dotenv").config()
const express = require("express")
const path = require("path")
const PORT = process.env.PORT || 3000
const app = express()

app.get("/", (req, res) => res.sendFile(getPage("index")))

app.get("/about", (req, res) => res.sendFile(getPage("about")))

app.get("/contact-me", (req, res) => res.sendFile(getPage("contact-me")))

app.get("*", (req, res) => res.status(404).sendFile(getPage("404")))

function getPage(name) {
  return path.join(__dirname, "pages", `${name}.html`)
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
