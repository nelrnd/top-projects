import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../providers/AuthProvider"

export default function ProtectedRoute() {
  const { token } = useAuth()

  return token ? <Outlet /> : <Navigate to="/login" replace={true} />
}
