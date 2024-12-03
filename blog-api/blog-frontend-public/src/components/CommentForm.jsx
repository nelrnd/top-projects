import { useNavigate, useParams } from "react-router-dom"
import axios from "../axios"

export default function CommentForm() {
  const { postId } = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    try {
      await axios.post(`/posts/${postId}/comments`, data)
      navigate(0)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea placeholder="Your message" name="content"></textarea>
      <button type="submit">Send</button>
    </form>
  )
}
