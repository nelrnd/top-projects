import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./routes/Login"
import ProtectedRoute from "./routes/ProtectedRoute"
import AuthProvider from "./providers/AuthProvider"
import Dashboard from "./routes/Dashboard"
import Logout from "./routes/Logout"
import NewPost from "./routes/NewPost"
import DeletePost from "./routes/DeletePost"
import EditPost from "./routes/EditPost"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/posts/new",
        element: <NewPost />,
      },
      {
        path: "/posts/:postId/edit",
        element: <EditPost />,
      },
      {
        path: "/posts/:postId/delete",
        element: <DeletePost />,
      },
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
