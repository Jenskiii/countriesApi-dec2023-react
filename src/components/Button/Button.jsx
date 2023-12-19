import styles from "./Button.module.css";

export function Button({
  className = "",
  AsComponent = "button",
  handleClick = "",
  ...props
}) {
  return (
    // if function is defined return function else null
    <div onClick={() => handleClick !== "" ? handleClick() : null}>
      <AsComponent className={`${styles.btn} ${className}`} {...props} />
    </div>
  );
}
