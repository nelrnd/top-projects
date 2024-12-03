import { useEffect } from "react"
import { useAuth } from "../providers/AuthProvider"

export default function Logout() {
  const { setToken } = useAuth()

  useEffect(() => {
    setToken(null)
  }, [])

  return <></>
}
