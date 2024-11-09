import { useState } from "react"
import NavBar from "../components/NavBar/NavBar"
import { Outlet } from "react-router-dom"

export default function Root() {
  const [cart, setCart] = useState([])

  const addToCart = (id, quantity) =>
    setCart((prevCart) => {
      const newCart = [...prevCart]

      let item = newCart.find((item) => item.id === id)

      if (item) {
        item.quantity += quantity
      } else {
        item = { id, quantity }
        newCart.push(item)
      }

      return newCart
    })

  const cartCount = cart.reduce((prev, curr) => prev + curr.quantity, 0)

  return (
    <div className="page-content">
      <NavBar cartCount={cartCount} />
      <Outlet context={{ cart, addToCart, cartCount }} />
    </div>
  )
}
