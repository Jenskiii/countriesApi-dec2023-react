import { useLoaderData } from "react-router-dom";
import { getCountry } from "../api/countries";

function Country() {
  const { country } = useLoaderData();

  console.log(country)
  return (
    <>
      <h1>country - {country[0].name.common}</h1>
    </>
  );
}

async function loader({ request: { signal }, params: { countryName } }) {
  const country = getCountry(countryName, { signal });
  return {country : await country};
}

export const countryRoute = {
  loader,
  element: <Country />,
};
