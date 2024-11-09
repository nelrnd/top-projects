import { Link } from "react-router-dom"
import styles from "./ProductCard.module.css"
import star from "../../assets/star.svg"

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

function Rating({ rating }) {
  return (
    <div className={styles.Rating}>
      <img src={star} alt="rating" />
      <span>{rating.rate}</span>
      <span className={styles.Rating_count}>({rating.count})</span>
    </div>
  )
}
