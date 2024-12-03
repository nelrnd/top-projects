import { useEffect, useState } from "react"
import axios from "../axios"
import { useAuth } from "../providers/AuthProvider"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  const { token, setToken } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    try {
      const loginRes = await axios.post("/users/login", data)
      const { token } = loginRes.data
      const userRes = await axios.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const user = userRes.data
      if (user.role === "ADMIN") {
        setToken(token)
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

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token])

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" autoFocus />
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
