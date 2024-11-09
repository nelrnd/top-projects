import { useLoaderData } from "react-router-dom"
import PageHeader from "../components/PageHeader/PageHeader"
import ProductList from "../components/ProductList/ProductList"

export async function loader() {
  const data = await fetch("https://fakestoreapi.com/products")
  const products = await data.json()
  return { products }
}

export default function Products() {
  const { products } = useLoaderData()

  return (
    <div>
      <PageHeader title="Products" />
      <ProductList products={products} />
    </div>
  )
}
