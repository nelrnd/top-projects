import star from "../../assets/star.svg"
import styles from "./Rating.module.css"

export default function Rating({ rating }) {
  return (
    <div className={styles.Rating}>
      <img src={star} alt="rating" />
      <span>{rating.rate}</span>
      <span className={styles.Rating_count}>({rating.count})</span>
    </div>
  )
}
