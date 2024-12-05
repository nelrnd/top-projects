import { useNavigate, useParams } from "react-router-dom"
import axios from "../axios"
import useFetch from "../hooks/useFetch"

export default function DeletePost() {
  const navigate = useNavigate()
  const { postId } = useParams()
  const [post, loading] = useFetch(`/posts/${postId}`)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.delete(`/posts/${postId}`)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Delete post</h1>

      {loading ? (
        <p>Loading</p>
      ) : !post ? (
        <p>Post not found</p>
      ) : (
        <>
          <p>Do you really want to delete the following post?</p>
          <p>{post.title}</p>
          <p>This will delete everything about the post, including comments.</p>
          <form onSubmit={handleSubmit}>
            <button type="submit">Confirm</button>
          </form>
        </>
      )}
    </div>
  )
}
