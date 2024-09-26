import { create, addTo } from "../helpers";

export function createAbout() {
  const tab = create("div")
  const add = addTo(tab)

  add(create("h1", "About", "heading"))
  add(create("p", "PizzaBato makes the best pizzas in the world."))
  add(create("p", "Founded in 1205, it's the oldest pizzera that exists."))

  return tab
}