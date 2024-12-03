import { useState } from "react"
import axios from "../axios"

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    try {
      const res = await axios.post("/users/login", data)
      const { token } = res.data
      const user = await axios.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (user.role === "ADMIN") {
        console.log("do the thing")
      } else {
        setError("User is not admin")
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message)
      }
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Log in"}
        </button>
      </form>
    </div>
  )
}
