import { Link } from "react-router-dom";
import styles from "./Card.module.css";

// grid
export function CardGrid({ children }) {
  return <div className={styles.grid}>{children}</div>;
}

// CARD
export function Card({ header, country, children }) {
  return (
    <div className={styles.card}>
      {header && header}
      <div className={styles["card-body"]}>
        {country && <h2>{country}</h2>}
        {children && <div className={styles["card-children"]}>{children}</div>}
      </div>
    </div>
  );
}
