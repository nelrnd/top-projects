import { displayTo } from "./helpers.js"
import { createHome } from "./pages/home.js"
import { createMenu } from "./pages/menu.js"
import { createAbout } from "./pages/about.js"
import { createContact } from "./pages/contact.js"
import "./assets/style.css"

const menu = document.querySelector("nav")
const content = document.getElementById("content")

const display = displayTo(content)

function switchTab(tab) {
  switch(tab) {
    case "home":
      const home = createHome()
      display(home)
      break
    case "menu":
      const menu = createMenu()
      display(menu)
      break
    case "about":
      const about = createAbout()
      display(about)
      break
    case "contact":
      const contact = createContact()
      display(contact)
      break
  }
}

menu.addEventListener("click", (event) => {
  const target = event.target
  switchTab(target.id)
})

window.addEventListener("load", () => {
  const home = createHome()
  display(home)
})