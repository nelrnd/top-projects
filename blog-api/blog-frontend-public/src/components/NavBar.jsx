import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Nel's Blog</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  )
}
