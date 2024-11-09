import Cart from "./routes/cart"
import Checkout from "./routes/checkout"
import Error from "./routes/error"
import Home from "./routes/home"
import Product, { loader as productLoader } from "./routes/product"
import Products, { loader as productsLoader } from "./routes/products"
import Root from "./routes/root"

const routes = [
  {
    path: "/",
    errorElement: <Error />,
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        loader: productsLoader,
        element: <Products />,
      },
      {
        path: "products/:productId",
        loader: productLoader,
        element: <Product />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
]

export default routes
