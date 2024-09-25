import { displayTo } from "./helpers.js"
import { createHome } from "./home.js"

const menu = document.querySelector("nav")
const content = document.getElementById("content")

const display = displayTo(content)

menu.addEventListener("click", (event) => {
  const target = event.target

  switch(target.id) {
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
})

window.addEventListener("load", () => {
  const home = createHome()
  display(home)
})