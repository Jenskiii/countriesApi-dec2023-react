import { useState } from "react";

import styles from "./Select.module.css";

// select
export function Select({ title, values, className, setSelected }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isActive, setIsActive] = useState(false);

  function setIndex(index, region) {
    setActiveIndex(index);
    setIsActive(false);
    setSelected(region);
  }

  function clearIndex() {
    if (activeIndex !== null) {
      setActiveIndex(null);
      setSelected("");
      setIsActive(false)
    }
  }
  return (
    <>
      {/* MODAL */}
      {isActive && (
        <div className={styles.modal} onClick={() => setIsActive(false)}></div>
      )}
      <div className={`${styles.select} ${className}`}>
        {/* TITLE */}
        <h2
          className={styles["select-title"]}
          onClick={() => setIsActive((prev) => !prev)}
        >
          {`Filter by ${title}`}
          <div className={`${styles.caret} ${isActive && styles.active}`}>
            <ion-icon name="chevron-down-outline"></ion-icon>
          </div>
        </h2>

        {/* LIST */}
        <ul className={`${styles["select-list"]} ${isActive && styles.active}`}>
          {/* clear button */}
          <p className={styles.clear} onClick={clearIndex} id="all">
            clear
          </p>
          {values.map((value, index) => {
            return (
              <li
                key={value.id}
                id={value.region}
                className={`${styles["select-list_item"]}  ${
                  index === activeIndex && styles.active
                }`}
                onClick={() => setIndex(index, value.region)}
              >
                {value.region}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
