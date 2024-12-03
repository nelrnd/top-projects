import { Link, useNavigate } from "react-router-dom"
import axios from "../axios"

export default function Register() {
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    try {
      await axios.post("/users", data)
      navigate("/login")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="pwd">Password</label>
          <input type="password" id="pwd" name="password" />
        </div>
        <button type="submit">Create account</button>
      </form>

      <p>
        Have an account already? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}
