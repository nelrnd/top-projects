import { createContext, useContext, useState } from "react"

const CartContext = createContext({
  cart: [],
  cartCount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
})

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const cartCount = cart.reduce((prev, curr) => prev + curr.quantity, 0)

  const addToCart = (id, quantity) => {
    setCart((prevCart) => {
      if (prevCart.find((item) => item.id === id)) {
        return prevCart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prevCart, { id, quantity }]
    })
  }

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    quantity = Number(quantity)
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  return (
    <CartContext.Provider
      value={{ cart, cartCount, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
