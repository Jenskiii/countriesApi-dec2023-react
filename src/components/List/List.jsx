import styles from "./List.module.css";

export function List({ value }) {
  return (
    <ul>
      {value.map((item) => {
        return <ListItem key={crypto.randomUUID()} {...item} />;
      })}
    </ul>
  );
}

export function ListItem({ title, value }) {
  return (
    <>
      {/* if item exist print it else dont */}
      {value ? (
        <li className={styles["list-item"]}>
          {title && <span className={styles["list-title"]}>{title}</span>}{" "}
          {value}
        </li>
      ) : null}
    </>
  );
}
