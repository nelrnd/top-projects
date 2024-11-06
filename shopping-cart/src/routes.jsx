import { createBrowserRouter } from "react-router-dom"
import Root from "./routes/root"
import ErrorPage from "./routes/error-page"
import Home from "./routes/home"
import Products from "./routes/products"
import Product from "./routes/product"
import Cart from "./routes/cart"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:productId",
        element: <Product />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
])

export default router
