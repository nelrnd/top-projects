import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../providers/authProvider"

export default function Logout() {
  const navigate = useNavigate()
  const { setToken } = useAuth()

  useEffect(() => {
    setToken(null)
    navigate("/", { replace: true })
  })

  return <></>
}
