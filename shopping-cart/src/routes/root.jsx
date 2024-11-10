import CartProvider from "../CartProvider"
import NavBar from "../components/NavBar/NavBar"
import { Outlet } from "react-router-dom"

export default function Root() {
  return (
    <CartProvider>
      <div className="page-content">
        <NavBar />
        <Outlet />
      </div>
    </CartProvider>
  )
}
