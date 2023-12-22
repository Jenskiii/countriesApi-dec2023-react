import styles from "./EvenColumns.module.css";

export function EvenColumns({ className, firstColumn, secondColumn }) {
  return (
    <>
      <div className={`${styles["even-columns"]} ${className}`}>
          <div className={styles.first}>{firstColumn}</div>
          <div className={styles.second}>{secondColumn}</div>
      </div>
    </>
  );
}
