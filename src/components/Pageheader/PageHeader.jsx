import styles from "./PageHeader.module.css";

export function PageHeader({ children, className = "",}) {
  return (
    <>
      <header
        className={`${styles.header} ${className}`}
      >
        <div className="container">{children}</div>
      </header>
    </>
  );
}
