import { render, screen } from "@testing-library/react"

import QuantityController from "./QuantityController"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"

const propsBase = {
  quantity: 1,
  onIncr: () => this.quantity++,
  onDecr: () => this.quantity--,
  onChange: (newQuantity) => (quantity = newQuantity),
}

describe("QuantityController component", () => {
  it("renders with correct quantity", () => {
    render(
      <QuantityController
        quantity={6}
        onIncr={() => {}}
        onDecr={() => {}}
        onChange={() => {}}
      />
    )

    expect(screen.getByRole("spinbutton")).toHaveValue(6)
  })

  it("calls onIncr when + button is clicked", async () => {
    const onIncrMock = vi.fn()
    render(
      <QuantityController
        quantity={5}
        onIncr={onIncrMock}
        onDecr={() => {}}
        onChange={() => {}}
      />
    )
    const user = userEvent.setup()
    await user.click(screen.getByRole("button", { name: "+" }))
    expect(onIncrMock).toHaveBeenCalledTimes(1)
  })

  it("calls onDecr when - button is clicked", async () => {
    const onDecrMock = vi.fn()
    render(
      <QuantityController
        quantity={5}
        onIncr={() => {}}
        onDecr={onDecrMock}
        onChange={() => {}}
      />
    )
    const user = userEvent.setup()
    await user.click(screen.getByRole("button", { name: "-" }))
    expect(onDecrMock).toHaveBeenCalledTimes(1)
  })
})
