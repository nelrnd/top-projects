import PageHeader from "../components/PageHeader/PageHeader"
import back from "../assets/back.svg"
import { Link, useLoaderData } from "react-router-dom"
import ProductView from "../components/ProductView/ProductView"

export async function loader({ params }) {
  const data = await fetch(
    `https://fakestoreapi.com/products/${params.productId}`
  )
  const product = await data.json()
  return { product }
}

export default function Product() {
  const { product } = useLoaderData()

  return (
    <div>
      <PageHeader>
        <Link to="/products" className="btn link-btn">
          <img src={back} alt="" />
          <span>Go back</span>
        </Link>
      </PageHeader>
      <ProductView product={product} />
    </div>
  )
}
