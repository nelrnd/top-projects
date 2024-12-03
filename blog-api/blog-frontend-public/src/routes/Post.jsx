import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "../axios"
import CommentList from "../components/CommentList"

export default function Post() {
  const { postId } = useParams()
  const [post, setPost] = useState()

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/posts/${postId}`)
      setPost(res.data)
    }
    fetchPost()
  }, [])

  if (!post) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <CommentList />
    </div>
  )
}
