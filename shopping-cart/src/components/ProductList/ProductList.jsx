import ProductCard from "../ProductCard/ProductCard"
import styles from "./ProductList.module.css"

export default function ProductList({ products }) {
  return (
    <div className={styles.ProductList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
