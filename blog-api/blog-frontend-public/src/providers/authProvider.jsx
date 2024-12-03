import { createContext, useContext, useEffect, useMemo, useState } from "react"
import axios from "../axios"

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [token, setToken_] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState()

  const isAuth = !!user

  const setToken = (newToken) => {
    setToken_(newToken)
  }

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      localStorage.setItem("token", token)
    } else {
      delete axios.defaults.headers.common["Authorization"]
      localStorage.removeItem("token")
    }
  }, [token])

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const res = await axios.get("/users/me")
        setUser(res.data)
      }
      fetchUser()
    } else {
      setUser(null)
    }
  }, [token])

  const contextValue = useMemo(
    () => ({ token, setToken, user, isAuth }),
    [token]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
