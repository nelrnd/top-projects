import { create, addTo } from "../helpers";
import pizzaImage from "../assets/pizza.png"

export function createHome() {
  const tab = create("div")
  const add = addTo(tab)

  add(create("h1", "Home", "heading"))
  add(create("p", "PizzaBato makes the best pizzas in the world."))
  add(create("p", "Founded in 1205, it's the oldest pizzera that exists."))

  const image = create("img")
  image.src = pizzaImage
  add(image)

  return tab
}