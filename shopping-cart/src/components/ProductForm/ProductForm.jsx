import { useState } from "react"
import styles from "./ProductForm.module.css"
import { useOutletContext } from "react-router-dom"
import QuantityController from "../QuantityController/QuantityController"

export default function ProductForm({ product }) {
  const { addToCart } = useOutletContext()

  const [quantity, setQuantity] = useState(1)

  const handleSubmit = (event) => {
    event.preventDefault()
    addToCart(product.id, quantity)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.ProductForm}>
      <QuantityController
        quantity={quantity}
        onIncr={() => setQuantity((prev) => Number(prev) + 1)}
        onDecr={() => setQuantity((prev) => Number(prev) - 1)}
        onChange={(event) => setQuantity(event.target.value)}
      />
      <button className="btn primary-btn">Add to cart</button>
    </form>
  )
}
