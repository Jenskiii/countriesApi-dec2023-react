import { useRef } from "react";
import { Form, FormGroup, FormRow } from "../components/Form/Form";
import { getCountries } from "../api/countries";
import { Link, useLoaderData } from "react-router-dom";
import { Card, CardGrid } from "../components/Card/Card";
import { Button} from "../components/Button/Button";

function CountryList() {
  const queryRef = useRef();
  const countries = useLoaderData();

  return (
    <>
      <Form>
        <FormRow>
          <FormGroup>
            <FormRow>
              <ion-icon name="search-outline"></ion-icon>
              <input
                type="search"
                name="query"
                id="query"
                ref={queryRef}
                placeholder="Search for a country…"
              />
            </FormRow>
          </FormGroup>

          <FormGroup></FormGroup>
        </FormRow>
      </Form>

      <CardGrid>
        {countries.map((country) => {
          return (
            <Card
              key={crypto.randomUUID()}
              header={
                <Button AsComponent={Link} to={`/countries/${country.ccn3}`}>
                  <img src={country.flags.png} alt="country flag" />
                </Button>
              }
              country={country.name.common}
            >
              <div>
                <span>Population: </span>
                {country.population ? (
                  country.population
                ) : (
                  <p className="error">Not Available</p>
                )}
              </div>
              <div>
                <span>Region: </span>
                {country.region ? (
                  country.region
                ) : (
                  <p className="error">Not Available</p>
                )}
              </div>
              <div>
                <span>Capital: </span>
                {country.capital ? (
                  country.capital
                ) : (
                  <p className="error">Not Available</p>
                )}
              </div>
            </Card>
          );
        })}
      </CardGrid>
    </>
  );
}

function loader({ request: { signal } }) {
  return getCountries({ signal });
}

export const countryListRoute = {
  loader,
  element: <CountryList />,
};
