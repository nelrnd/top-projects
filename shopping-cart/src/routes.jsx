import Cart from "./routes/cart"
import Checkout from "./routes/checkout"
import Error from "./routes/error"
import Home from "./routes/home"
import Product from "./routes/product"
import Products from "./routes/products"
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
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
]

export default routes
