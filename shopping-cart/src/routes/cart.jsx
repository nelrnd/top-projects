import { useLoaderData } from "react-router-dom"
import PageHeader from "../components/PageHeader/PageHeader"
import CartList from "../components/CartList/CartList"
import CartCheckout from "../components/CartCheckout/CartCheckout"
import { useCart } from "../CartProvider"

export default function Cart() {
  const { cart, cartCount } = useCart()
  const { products } = useLoaderData()

  const countText =
    cartCount > 1 ? cartCount + " items" : cartCount > 0 ? "1 item" : "empty"

  const items = cart.map((item) => ({
    ...item,
    product: products.find((product) => product.id === item.id),
  }))

  return (
    <div>
      <PageHeader>
        <h1>
          Cart <span className="detail">({countText})</span>
        </h1>
      </PageHeader>
      <CartList items={items} />
      {items.length > 0 && <CartCheckout items={items} />}
    </div>
  )
}
