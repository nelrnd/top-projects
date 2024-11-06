import { useLoaderData } from "react-router-dom"

export async function loader({ params }) {
  const data = await fetch(
    "https://fakestoreapi.com/products/" + params.productId
  )
  const product = await data.json()
  if (!product) {
    throw new Error("Could not find product")
  }
  return { product }
}

export default function Product() {
  const { product } = useLoaderData()

  return (
    <div>
      <h1>{product.title}</h1>
    </div>
  )
}
