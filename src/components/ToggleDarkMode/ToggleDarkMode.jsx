import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import styles from "./ToggleDarkMode.module.css"

export function ToggleDarkMode() {
  const [theme, setTheme] = useState(() => {
    const initialTheme = localStorage.getItem("theme");
    return initialTheme ? initialTheme : "light";
  });

  //   get theme for local storage and updates theme to useState
  function getThemeFromLocalStorage() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }

  // switches between light and dark
  function toggleTheme() {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }

  useEffect(() => {
    //   get theme for local storage and updates theme to useState
    getThemeFromLocalStorage();
    // update body with theme
    document.body.classList = theme;
  }, [theme]);

  return (
    <>
      <Button handleClick={toggleTheme} className={styles.darkmode}>
        <ion-icon name="moon"></ion-icon> Dark Mode
      </Button>
    </>
  );
}
