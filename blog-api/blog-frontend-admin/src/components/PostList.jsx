import useFetch from "../hooks/useFetch"
import PostCard from "./PostCard"

export default function PostList() {
  const [posts, loading] = useFetch("/posts")

  let content

  if (loading) {
    content = <p>Loading...</p>
  } else if (posts.length === 0) {
    content = <p>No posts for now...</p>
  } else {
    content = posts.map((post) => <PostCard key={post.id} post={post} />)
  }

  return (
    <div>
      <h2>Posts</h2>
      {content}
    </div>
  )
}
