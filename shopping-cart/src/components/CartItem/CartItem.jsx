import QuantityController from "../QuantityController/QuantityController"
import trash from "../../assets/trash.svg"
import styles from "./CartItem.module.css"
import { useCart } from "../../CartProvider"

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart()

  const totalPrice = item.product.price * item.quantity

  const quantity = item.quantity

  return (
    <div className={styles.CartItem}>
      <img src={item.product.image} alt="" className={styles.image} />

      <div className={styles.content}>
        <header>
          <h3 className={styles.title}>{item.product.title}</h3>
          <div className={styles.totalPrice}>${totalPrice}</div>
        </header>
        <div className={styles.price}>${item.product.price}</div>

        <div className={styles.menu}>
          <QuantityController
            quantity={item.quantity}
            onIncr={() => updateQuantity(item.id, Number(quantity) + 1)}
            onDecr={() => updateQuantity(item.id, Number(quantity) - 1)}
            onChange={(event) => updateQuantity(item.id, event.target.value)}
          />
          <button
            onClick={() => removeFromCart(item.product.id)}
            className={styles.btn + " btn"}
          >
            <img src={trash} alt="" />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
