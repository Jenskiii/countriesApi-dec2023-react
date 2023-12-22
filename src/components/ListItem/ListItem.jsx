import styles from "./ListItem.module.css"

export function ListItem({ title, value }) {
  return (
    <>
    {/* if item exist print it else dont */}
      {value ? (
        <li className={styles.list}>
          {title && <span className={styles.title}>{title}</span>}
          {" "}{value}
        </li>
      ) : null}
    </>
  );
}
