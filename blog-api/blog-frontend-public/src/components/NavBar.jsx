import { Link } from "react-router-dom"
import { useAuth } from "../providers/authProvider"

export default function NavBar() {
  const { isAuth } = useAuth()

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
          {isAuth ? (
            <Link to="/logout">Logout</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  )
}
