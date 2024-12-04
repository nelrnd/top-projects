import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../axios"

export default function NewPost() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    data.published = data.published ? true : false
    try {
      await axios.post("/posts", data)
      navigate("/")
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div>
      <h1>New post</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea name="content" id="content"></textarea>
        </div>
        <div>
          <input type="checkbox" name="published" id="published" />
          <label htmlFor="published">Published</label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Create post"}
        </button>
      </form>
    </div>
  )
}
