import { Link } from "react-router-dom"
import PostList from "../components/PostList"

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        <Link to="/logout">Logout</Link>
      </p>
      <p>
        <Link to="/posts/new">Create new post</Link>
      </p>

      <PostList />
    </div>
  )
}
