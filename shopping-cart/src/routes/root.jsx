import { useState } from "react"
import NavBar from "../components/NavBar/NavBar"
import { Outlet } from "react-router-dom"

export default function Root() {
  const [cart, setCart] = useState({})

  const addToCart = (id, quantity) =>
    setCart((prevCart) => {
      const newCart = { ...prevCart }
      if (newCart[id]) {
        newCart[id] += quantity
      } else {
        newCart[id] = quantity
      }
      return newCart
    })

  const removeFromCart = (id) =>
    setCart((prevCart) => {
      const newCart = { ...prevCart }
      delete newCart[id]
      return newCart
    })

  const cartCount = Object.values(cart).reduce((prev, curr) => prev + curr, 0)

  return (
    <div className="page-content">
      <NavBar cartCount={cartCount} />
      <Outlet context={{ cart, addToCart }} />
    </div>
  )
}
