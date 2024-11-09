import Rating from "../Rating/Rating"
import ProductForm from "../ProductForm/ProductForm"
import styles from "./ProductView.module.css"

export default function ProductView({ product }) {
  return (
    <div className={styles.ProductView}>
      <div className={styles.imgWrapper}>
        <img src={product.image} alt="" />
      </div>

      <div className={styles.contentWrapper}>
        <Rating rating={product.rating} />
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.price}>${product.price}</div>

        <ProductForm product={product} />
      </div>
    </div>
  )
}
