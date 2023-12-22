import styles from "./Card.module.css";

// grid
export function CardGrid({ children , className}) {
  return <div className={`${styles.grid} ${className}`}>{children}</div>;
}

// CARD
export function Card({ header, title, children }) {
  return (
    <div className={styles.card}>
      {header && header}
      <div className={styles["card-body"]}>
        {title && <h2>{title}</h2>}
        {children && <div className={styles["card-children"]}>{children}</div>}
      </div>
    </div>
  );
}
