import { create, addTo } from "../helpers";

export function createContact() {
  const tab = create("div")
  const add = addTo(tab)

  add(create("h1", "Contact", "heading"))
  add(create("p", "contact@pizzabato.it"))
  add(create("p", "+331 628 420"))

  return tab
}