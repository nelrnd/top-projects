import styles from "./PageHeader.module.css"

export default function PageHeader({ title, children }) {
  return (
    <header className={styles.PageHeader}>
      {title && <h1>{title}</h1>}
      {children}
    </header>
  )
}
