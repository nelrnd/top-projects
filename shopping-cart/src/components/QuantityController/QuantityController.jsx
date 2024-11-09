import styles from "./QuantityController.module.css"

export default function QuantityController({
  quantity,
  onIncr,
  onDecr,
  onChange,
}) {
  return (
    <div className={styles.QuantityController}>
      <button type="button" onClick={onDecr}>
        -
      </button>
      <input type="number" value={quantity} onChange={onChange} />
      <button type="button" onClick={onIncr}>
        +
      </button>
    </div>
  )
}
