import { Navigate, createBrowserRouter, useRouteError } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout/RootLayout";
import { countryListRoute } from "./pages/CountryList";
import { countryRoute } from "./pages/Country";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        // error handeling
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="/countries" /> },
          {
            path: "countries",
            children: [
              {
                index: true,
                ...countryListRoute,
              },
              {
                path: ":countryName", ...countryRoute
              },
            ],
          },
        ],
      },
    ],
  },
]);

//  error handeling
function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <h1>Error - Something went wrong</h1>
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}
