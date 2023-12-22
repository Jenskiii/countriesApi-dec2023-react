import { useLoaderData, useNavigation } from "react-router-dom";
import { getBorderCountryName, getCountry } from "../../api/countries";
import { EvenColumns } from "../../components/EvenColumns/EvenColumns";
import { BackButton, BorderCounryButton } from "../../components/Button/Button";
import { ListItem } from "../../components/ListItem/ListItem";

import styles from "./Country.module.css";

function Country() {
  // import fetched data
  const { country } = useLoaderData();
  const currentCountry = country[0];

      // stored information to use .map
      const countryInformation = {
        firstSection: [
          { id: crypto.randomUUID(), title: "Native Name:",value: Object.entries(currentCountry.name.nativeName).at(-1)[1].common,},
          { id: crypto.randomUUID(), title: "Population:", value: currentCountry.population,},
          { id: crypto.randomUUID(), title: "Region:", value: currentCountry.region,},
          { id: crypto.randomUUID(), title: "Sub Region:", value: currentCountry.subregion,},
          { id: crypto.randomUUID(), title: "Capital:", value: currentCountry.capital,},
        ],
        secondSection: [
          { id: crypto.randomUUID(), title: "Top Level Domain:", value: currentCountry.tld[0],},
          { id: crypto.randomUUID(), title: "Currencies:", value: Object.entries(currentCountry.currencies)[0][1].name,},
          { id: crypto.randomUUID(), title: "Languages:", value: Object.values(currentCountry.languages).join(", "),},
        ],

      };
  return (
    <>
      {/* back button */}
      <BackButton spacing={styles["back-button"]} />

      {/* main content */}
      <EvenColumns
        // first column
        firstColumn={
          <img className={styles.flag} src={currentCountry.flags.png} />
        }
        // second column
        secondColumn={
          <div>
            {/* title */}
            <h2 className={styles.header}>{currentCountry.name.common}</h2>

            {/* body */}
            {/* country information list 1 */}
            <div className={styles.body}>
              <ul>
                {countryInformation.firstSection.map((item) => {
                  return (
                    <ListItem
                      key={item.id}
                      title={item.title}
                      value={item.value}
                    />
                  );
                })}
              </ul>

              {/* country information list 2 */}
              <ul>
                {countryInformation.secondSection.map((item) => {
                  return (
                    <ListItem
                      key={item.id}
                      title={item.title}
                      value={item.value}
                    />
                  );
                })}
              </ul>
            </div>

            {/* footer */}
            <div className={styles["footer"]}>
              {currentCountry.borders !== undefined && (
                <h3>Border Countries:</h3>
              )}

              {/* links to border countries */}
              <div className={styles["border-links__wrapper"]}>
                {currentCountry.borders?.map((borderCountry) => {

                  // example 1
                  const borderCountryName = getBorderCountryName(borderCountry)
                  console.log(borderCountryName)
                  // example 2
                  const borderCountryName2 = getBorderCountryName(borderCountry).then(data => {
                    console.log(data.name.common)
                  })
                  return (
                    <BorderCounryButton
                      key={crypto.randomUUID()}
                      link={`../${borderCountry}`}
                      value={borderCountry}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        }
      />
    </>
  );
}

// fetch data of selectec country
async function loader({ request: { signal }, params: { countryCode } }) {
  const country = await getCountry(countryCode, { signal });
  return { country: country };
}
//export loader + element
export const countryRoute = {
  loader,
  element: <Country />,
};
