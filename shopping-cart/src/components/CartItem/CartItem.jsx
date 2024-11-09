import QuantityController from "../QuantityController/QuantityController"
import trash from "../../assets/trash.svg"
import styles from "./CartItem.module.css"

export default function CartItem({ item }) {
  const totalPrice = item.product.price * item.quantity

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
          <QuantityController quantity={item.quantity} />
          <button className={styles.btn + " btn"}>
            <img src={trash} alt="" />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
