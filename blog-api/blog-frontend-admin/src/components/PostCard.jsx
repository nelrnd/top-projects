import { Link } from "react-router-dom"

export default function PostCard({ post }) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>
        {post.content.slice(0, 100)}
        {post.content.length > 100 && "..."}
      </p>
      <p>Number of views: {post.viewCount}</p>
      <ul>
        <li>
          <Link to={`/posts/${post.id}/edit`}>Edit post</Link>
        </li>
        <li>
          <Link to={`/posts/${post.id}/delete`}>Delete post</Link>
        </li>
      </ul>
    </div>
  )
}
