import { Link } from "react-router-dom"

export default function PostCard({ post }) {
  return (
    <Link to={`/posts/${post.id}`}>
      <h2>{post.title}</h2>
    </Link>
  )
}
