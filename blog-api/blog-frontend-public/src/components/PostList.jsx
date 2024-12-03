import PostCard from "./PostCard"
import useFetch from "../hooks/useFetch"

export default function PostList() {
  const [posts, loading] = useFetch("/posts")

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
