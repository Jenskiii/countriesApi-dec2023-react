import { useRef } from "react";
import { Form, FormGroup, FormRow } from "../../components/Form/Form";
import { getCountries } from "../../api/countries";
import { Link, useLoaderData } from "react-router-dom";
import { Card, CardGrid } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";
import { ListItem } from "../../components/ListItem/ListItem";
import styles from "./CountryList.module.css"


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

    {/* CARD GRID */}
      <CardGrid className={styles["page-spacing"]}>
        {countries.map((country) => {
          // stored information inside array to make a list
            const countryInformation = [
              { id: crypto.randomUUID(), title: "Population:", value: country.population,},
              { id: crypto.randomUUID(), title: "Region:", value: country.region,},
              { id: crypto.randomUUID(), title: "Capital:", value: country.capital,},
            ]
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
            <ul>
              {countryInformation.map(item =>{
                return (
                <ListItem key={item.id} title={item.title} value={item.value}/>
                )
              })}
            </ul>
            </Card>
          );
        })}
      </CardGrid>
    </>
  );
}


// LOADER
function loader({ request: { signal } }) {
  return getCountries({ signal });
}

export const countryListRoute = {
  loader,
  element: <CountryList />,
};
