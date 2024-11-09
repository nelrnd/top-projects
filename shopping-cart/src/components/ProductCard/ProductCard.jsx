import { Link } from "react-router-dom"
import Rating from "../Rating/Rating"
import styles from "./ProductCard.module.css"

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className={styles.ProductCard}>
      <div className={styles["ProductCard_img-wrapper"]}>
        <img src={product.image} alt="" />
      </div>
      <Rating rating={product.rating} />
      <h2 className={styles.title}>{product.title}</h2>
      <div className={styles.price}>${product.price}</div>
    </Link>
  )
}
