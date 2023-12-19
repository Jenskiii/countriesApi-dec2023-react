import { Outlet, ScrollRestoration } from "react-router-dom";
import { PageHeader } from "../../components/Pageheader/PageHeader";
import styles from "./RootLayout.module.css";
import { ToggleDarkMode } from "../../components/ToggleDarkMode/ToggleDarkMode";

export function RootLayout() {
  return (
    <>
      <PageHeader>
        <h1>
          Where in the world?
          <ToggleDarkMode />
        </h1>
      </PageHeader>

      {/* resets scroll to top of the page */}
      <ScrollRestoration />

      {/* content  */}
      <div className={`${styles.layout} container`}>
        <Outlet />
      </div>
    </>
  );
}
