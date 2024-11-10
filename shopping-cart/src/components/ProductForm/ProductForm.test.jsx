import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ProductForm from "./ProductForm"
import { vi } from "vitest"

const product = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120,
  },
}

describe("ProductForm component", () => {
  it("renders ProductForm", () => {
    const { container } = render(<ProductForm product={product} />)
    expect(container).toMatchSnapshot()
  })

  /*

  it("adds one item when clicking button", async () => {
    vi.mock("../../CartProvider", () => ({ addToCart: () => {} }))
    const user = userEvent.setup()
    render(<ProductForm product={product} />)
    const addButton = screen.getByRole("button", { name: "Add to cart" })
    expect(addButton).toBeInTheDocument()
    await user.click(addButton)
  })

  */
})
