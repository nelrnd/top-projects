import { Link } from "react-router-dom"
import axios from "../axios"
import { useAuth } from "../providers/authProvider"

export default function Login() {
  const { setToken } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    try {
      const res = await axios.post("/users/login", data)
      const { token } = res.data
      setToken(token)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="pwd">Password</label>
          <input type="password" id="pwd" name="password" />
        </div>
        <button type="submit">Log in</button>
      </form>

      <p>
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}
