import { create, addTo } from "./helpers";

export function createHome() {
  const page = create("div")
  const add = addTo(page)

  add(create("h1", "Home", "heading"))
  add(create("p", "PizzaBato makes the best pizzas in the world."))
  add(create("p", "Founded in 1205, it's the oldest pizzera that exists."))

  return page
}