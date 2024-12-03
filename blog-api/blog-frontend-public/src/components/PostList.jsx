import { useEffect, useState } from "react"
import axios from "../axios"
import PostCard from "./PostCard"

export default function PostList() {
  const [posts, setPosts] = useState([])

  console.log(posts)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts")
      setPosts(res.data)
    }
    fetchPosts()
  }, [])

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
