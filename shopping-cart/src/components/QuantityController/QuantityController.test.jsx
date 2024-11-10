import { render, screen } from "@testing-library/react"

import QuantityController from "./QuantityController"

const propsBase = {
  quantity: 1,
  onIncr: () => quantity++,
  onDecr: () => quantity--,
  onChange: (newQuantity) => (quantity = newQuantity),
}

describe("QuantityController component", () => {
  it("increment when clicking + button", () => {
    const { quantity, onIncr, onDecr, onChange } = { ...propsBase }
    render(
      <QuantityController
        quantity={quantity}
        onIncr={onIncr}
        onDecr={onDecr}
        onChange={onChange}
      />
    )
    expect(screen.getByRole("spinbutton").value).toBe("1")
  })
})
