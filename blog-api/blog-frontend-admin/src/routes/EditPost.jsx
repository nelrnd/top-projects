import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "../axios"
import useFetch from "../hooks/useFetch"

export default function EditPost() {
  const navigate = useNavigate()
  const { postId } = useParams()
  const [post, loading] = useFetch(`/admin/posts/${postId}`)
  const [formLoading, setFormLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormLoading(true)
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    data.published = data.published ? true : false
    try {
      await axios.put(`/posts/${postId}`, data)
      navigate("/")
    } catch (err) {
      console.error(err)
    }
    setFormLoading(false)
  }

  if (loading) {
    return <p>Loading...</p>
  } else if (!post) {
    return <p>Post not found</p>
  }

  return (
    <div>
      <h1>Edit post</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={post.title}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            defaultValue={post.content}
          ></textarea>
        </div>
        <div>
          <input
            type="checkbox"
            name="published"
            id="published"
            defaultChecked={post.published}
          />
          <label htmlFor="published">Published</label>
        </div>
        <button type="submit" disabled={formLoading}>
          {formLoading ? "Loading..." : "Save"}
        </button>
      </form>
    </div>
  )
}
