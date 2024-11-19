const express = require("express")

const app = express()

app.get("/", (req, res) => res.send("Message Board"))

app.listen(2001)
