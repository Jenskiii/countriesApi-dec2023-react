import { Form as RouterForm } from "react-router-dom";
import styles from "./Form.module.css";

// form
export function Form({ className, ...props }) {
  return <RouterForm className={`${styles.form} ${className}`} {...props} />;
}

// form group
export function FormGroup({ children, errorMessage, className }) {
  return (
    <div
      className={`${styles.group} ${className} ${
        errorMessage != null ? styles.error : ""
      }`}
    >
      {children}
      {errorMessage != null && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
}

// form row
export function FormRow({ children, className }) {
  return <div className={`${className} ${styles.row}`}>{children}</div>;
}


