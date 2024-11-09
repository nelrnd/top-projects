import CartItem from "../CartItem/CartItem"
import styles from "./CartList.module.css"

export default function CartList({ items }) {
  return (
    <div>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  )
}
