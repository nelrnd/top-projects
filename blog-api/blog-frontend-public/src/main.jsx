import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./routes/Root.jsx"
import Home from "./routes/Home.jsx"
import Posts from "./routes/Posts.jsx"
import Post from "./routes/Post.jsx"
import AuthProvider from "./providers/authProvider.jsx"
import Login from "./routes/Login.jsx"
import Register from "./routes/Register.jsx"
import Logout from "./routes/Logout.jsx"

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/posts/:postId",
        element: <Post />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/logout",
        element: <Logout />,
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
