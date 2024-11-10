import { render, screen } from "@testing-library/react"
import CartCheckout from "./CartCheckout"
import { BrowserRouter } from "react-router-dom"

describe("CartCheckout component", () => {
  it("renders with correct subtotal and total with multiple items", () => {
    const items = [
      {
        id: 0,
        quantity: 1,
        product: {
          price: 40,
        },
      },
      {
        id: 1,
        quantity: 1,
        product: {
          price: 10,
        },
      },
      {
        id: 2,
        quantity: 1,
        product: {
          price: 50,
        },
      },
    ]

    render(<CartCheckout items={items} />, { wrapper: BrowserRouter })

    expect(screen.getByTestId("subtotal").textContent).toMatch("$100")
    expect(screen.getByTestId("total").textContent).toMatch("$120")
  })

  it("renders with correct subtotal and total with more than one quantity", () => {
    const items = [
      {
        id: 0,
        quantity: 3,
        product: {
          price: 30,
        },
      },
    ]

    render(<CartCheckout items={items} />, { wrapper: BrowserRouter })

    expect(screen.getByTestId("subtotal").textContent).toMatch("$90")
    expect(screen.getByTestId("total").textContent).toMatch("$110")
  })

  it("renders with correct subtotal and total with multiple products and more than one quantity", () => {
    const items = [
      {
        id: 0,
        quantity: 3,
        product: {
          price: 30,
        },
      },
      {
        id: 1,
        quantity: 2,
        product: {
          price: 40,
        },
      },
      {
        id: 2,
        quantity: 1,
        product: {
          price: 10,
        },
      },
    ]

    render(<CartCheckout items={items} />, { wrapper: BrowserRouter })

    expect(screen.getByTestId("subtotal").textContent).toMatch("$180")
    expect(screen.getByTestId("total").textContent).toMatch("$200")
  })
})
