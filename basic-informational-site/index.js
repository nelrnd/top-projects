const http = require("node:http")
const fs = require("node:fs/promises")

http
  .createServer(async (req, res) => {
    let statusCode = 200
    let page

    switch (req.url) {
      case "/":
        page = "./pages/index.html"
        break
      case "/about":
        page = "./pages/about.html"
        break
      case "/contact-me":
        page = "./pages/contact-me.html"
        break
      default:
        statusCode = 404
        page = "./pages/404.html"
        break
    }

    const data = await fs.readFile(page, { encoding: "utf-8" })

    res.writeHead(statusCode, { "Content-Type": "text/html" })
    res.write(data)
    res.end()
  })
  .listen(8080)
