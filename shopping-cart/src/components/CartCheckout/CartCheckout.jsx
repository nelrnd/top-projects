import { Link, useOutletContext } from "react-router-dom"
import styles from "./CartCheckout.module.css"

export default function CartCheckout({ items }) {
  const subtotal = items.reduce(
    (prev, curr) => prev + curr.quantity * curr.product.price,
    0
  )

  const shipping = 20.0

  const total = subtotal + shipping

  return (
    <div className={styles.CartCheckout}>
      <div>
        <span>Subtotal</span>
        <span>${subtotal}</span>
      </div>
      <div>
        <span>Shipping</span>
        <span>${shipping}</span>
      </div>
      <div>
        <span>Total</span>
        <span>${total}</span>
      </div>
      <Link to="/checkout" className="btn primary-btn">
        Checkout
      </Link>
    </div>
  )
}
