import { useState } from "react";
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
  const countries = useLoaderData();
  const [searchValue, setSearchValue] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  return (
    <>
      <Form className={styles.form}>
        <FormGroup>
          <FormRow>
            <ion-icon name="search-outline"></ion-icon>
            <input
              type="search"
              name="query"
              id="query"
              onInput={(e) => setSearchValue(e.target.value)}
              placeholder="Search for a country…"
            />
          </FormRow>
        </FormGroup>

        <Select
          title={"Region"}
          values={countryRegions}
          setSelected={setSelectedRegion}
        />
      </Form>

      {/* CARD GRID */}
      <CardGrid className={styles["page-spacing"]}>
        {countries
          // filter countries based on search value or selected region
          .filter((item) => {
            if (
              selectedRegion.toLowerCase() === "" &&
              searchValue.toLowerCase() === ""
            ) {
              return item;
            } else if (
              selectedRegion.toLowerCase() !== "" &&
              searchValue.toLowerCase() === ""
            ) {
              return item.region.includes(selectedRegion);
            } else if (
              searchValue.toLowerCase() !== "" &&
              selectedRegion.toLowerCase() === ""
            ) {
              return item.name.common.toLowerCase().startsWith(searchValue);
            } else if (
              selectedRegion.toLowerCase() !== "" &&
              searchValue.toLowerCase() !== ""
            ) {
              return (
                item.region.includes(selectedRegion) &&
                item.name.common.toLowerCase().startsWith(searchValue)
              );
            }
            // reduce country output to 20 
          }).slice(0,20)
          .map((country) => {
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
  let filter = "all";
  return getCountries(filter, { signal });
}

export const countryListRoute = {
  loader,
  element: <CountryList />,
};
