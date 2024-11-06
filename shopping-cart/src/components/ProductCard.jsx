import { Link } from "react-router-dom"

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`}>
      <div>
        <img src={product.image} alt={product.title} />
      </div>
      <h3>{product.title}</h3>
      <div>${product.price}</div>
    </Link>
  )
}
