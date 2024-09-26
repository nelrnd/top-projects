import { create, addTo } from "../helpers";

const menu = [
  {
    name: "Margherita",
    desc: "A classic pizza with a simple, yet delicious blend of tomato, mozzarella, and fresh basil.",
    ingredients: ["Tomato sauce", "Mozzarella", "Fresh basil", "Olive oil"],
    price: 9.99
  },
  {
    name: "Pepperoni",
    desc: "A popular favorite topped with spicy pepperoni and gooey mozzarella cheese.",
    ingredients: ["Tomato sauce", "Mozzarella", "Pepperoni"],
    price: 12.99
  },
  {
    name: "BBQ Chicken",
    desc: "Tangy BBQ sauce, grilled chicken, and red onions on a mozzarella base.",
    ingredients: ["BBQ sauce", "Grilled chicken", "Red onions", "Mozzarella"],
    price: 13.99
  },
  {
    name: "Veggie Delight",
    desc: "A garden-fresh mix of peppers, mushrooms, olives, and spinach with a mozzarella base.",
    ingredients: ["Tomato sauce", "Mozzarella", "Peppers", "Mushrooms", "Olives", "Spinach"],
    price: 11.99
  },
  {
    name: "Hawaiian",
    desc: "A tropical treat featuring sweet pineapple, savory ham, and mozzarella cheese.",
    ingredients: ["Tomato sauce", "Mozzarella", "Ham", "Pineapple"],
    price: 12.49
  }
];

export function createMenu() {
  const tab = create("div")
  const add = addTo(tab)

  add(create("h1", "Menu", "heading"))

  menu.forEach((pizza) => {
    const card = create("div", null, "card")
    addTo(card, create("h2", pizza.name))
    addTo(card, create("p", pizza.desc))
    addTo(card, create("p", `$${pizza.price}`, "price"))
    addTo(card, create("p", pizza.ingredients.join(", "), "ingredients"))
    add(card)
  })

  return tab
}