import NavBar from "../components/NavBar/NavBar"
import { Outlet } from "react-router-dom"

export default function Root() {
  return (
    <div className="page-content">
      <NavBar />
      <Outlet />
    </div>
  )
}
