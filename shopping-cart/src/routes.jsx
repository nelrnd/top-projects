import { createBrowserRouter } from "react-router-dom"
import Root from "./routes/root"
import ErrorPage from "./routes/error-page"
import Home from "./routes/home"
import Products, { loader as productsLoader } from "./routes/products"
import Product, { loader as productLoader } from "./routes/product"
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
        loader: productsLoader,
      },
      {
        path: "products/:productId",
        element: <Product />,
        loader: productLoader,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
])

export default router
