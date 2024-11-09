import { useLoaderData, useOutletContext } from "react-router-dom"
import PageHeader from "../components/PageHeader/PageHeader"
import CartList from "../components/CartList/CartList"

export default function Cart() {
  const { cart, cartCount } = useOutletContext()
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
    </div>
  )
}
