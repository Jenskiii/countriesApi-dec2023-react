import { useRef } from "react";
import { Form, FormGroup, FormRow } from "../../components/Form/Form";
import { getCountries } from "../../api/countries";
import { Link, useLoaderData } from "react-router-dom";
import { Card, CardGrid } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";
import { List } from "../../components/List/List";
import { countryRegions } from "../../utils/regions";
import { Select } from "../../components/Select/Select";
import styles from "./CountryList.module.css";

function CountryList() {
  const queryRef = useRef();
  const countries  = useLoaderData();

  return (
    <>
      <Form  className={styles.form}>
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
            <button>hey</button>
          </FormRow>
        </FormGroup>

        <Select title={"Region"} values={countryRegions} />
      </Form>

      {/* CARD GRID */}
      <CardGrid className={styles["page-spacing"]}>
        {countries.map((country) => {
          // stored information inside array to make a list
          const cardInformation = [
            { title: "Population:", value: country.population },
            { title: "Region:", value: country.region },
            { title: "Capital:", value: country.capital },
          ];

          return (
            // CARD
            <Card
              key={crypto.randomUUID()}
              header={
                <Button AsComponent={Link} to={`/countries/${country.cca2}`}>
                  <img src={country.flags.png} alt="country flag" />
                </Button>
              }
              title={country.name.common}
            >
              {/* CARD BODY */}
              <List value={cardInformation} />
            </Card>
          );
        })}
      </CardGrid>
    </>
  );
}

// LOADER
function loader({ request: { signal } }) {
 
  let filter = "all"
  return getCountries(filter,{ signal });
}

export const countryListRoute = {
  loader,
  element: <CountryList />,
};
