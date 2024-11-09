import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"

export default function NavBar({ cartCount }) {
  return (
    <nav className={styles.NavBar}>
      <ul>
        <li>
          <Link to="/">MyShop</Link>
        </li>
        <li>
          <Link to="products">Products</Link>
        </li>
        <li>
          <Link to="cart">
            Cart
            <CartBadge count={cartCount} />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

function CartBadge({ count }) {
  if (count < 1) return null

  return (
    <div className={styles.CartBadge} aria-label={`${count} items in cart`}>
      {count}
    </div>
  )
}
