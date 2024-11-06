import { useLoaderData } from "react-router-dom"
import ProductCard from "../components/ProductCard"

export async function loader() {
  const data = await fetch("https://fakestoreapi.com/products")
  const products = await data.json()
  return { products }
}

export default function Products() {
  const { products } = useLoaderData()

  return (
    <div>
      <h1>Products page</h1>

      {products && (
        <div>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
