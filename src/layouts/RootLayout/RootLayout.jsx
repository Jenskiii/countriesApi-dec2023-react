import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import { PageHeader } from "../../components/Pageheader/PageHeader";
import styles from "./RootLayout.module.css";
import { ToggleDarkMode } from "../../components/ToggleDarkMode/ToggleDarkMode";

export function RootLayout() {
  const { state } = useNavigation();
  const isLoading = state === "loading";
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
      {isLoading && <div className={styles.loadingSpinner} />}
      <div
        className={`${styles.layout} ${
          isLoading ? styles.loading : ""
        } | container`}
      >
        <Outlet />
      </div>
    </>
  );
}
