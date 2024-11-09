import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"

export default function NavBar() {
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
          <Link to="cart">Cart</Link>
        </li>
      </ul>
    </nav>
  )
}
