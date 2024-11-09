import { useState } from "react"
import Rating from "../Rating/Rating"
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

        <ProductForm />
      </div>
    </div>
  )
}

function ProductForm() {
  const [quantity, setQuantity] = useState(1)

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <button className="btn primary-btn">Add to cart</button>
    </form>
  )
}
