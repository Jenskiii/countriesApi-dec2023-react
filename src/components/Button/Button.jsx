import { Link, useNavigation } from "react-router-dom";
import styles from "./Button.module.css";

export function Button({
  className = "",
  AsComponent = "button",
  handleClick = "",
  ...props
}) {
  return (
    // if function is defined return function else null
    <div onClick={() => (handleClick !== "" ? handleClick() : null)}>
      <AsComponent className={`${styles.btn} ${className} `} {...props} />
    </div>
  );
}

export function BackButton({ spacing }) {
  // loading state
  const { state } = useNavigation();
  const isLoading = state === "loading";
  const value = <ion-icon name="arrow-back-outline">back</ion-icon>;

  return (
    <Button
      AsComponent={Link}
      to=".."
      className={`${styles["back-button"]} ${spacing}`}
    >
      {isLoading ? "loading..." : value}
    </Button>
  );
}

export function BorderCounryButton({ link, value }) {
    // loading state
  const { state } = useNavigation();
  const isLoading = state === "loading";
  return (
    <Button
      to={link}
      AsComponent={Link}
      className={styles["border-country__button"]}
    >
      {isLoading ? "Loading..." : value}
    </Button>
  );
}
