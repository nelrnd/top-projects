import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <nav>
      <div>E-Commerce</div>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  )
}
