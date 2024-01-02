import { useLoaderData } from "react-router-dom";
import { getBorderCountryName, getCountry } from "../../api/countries";
import { EvenColumns } from "../../components/EvenColumns/EvenColumns";
import { BackButton, BorderCounryButton } from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { List } from "../../components/List/List";
import styles from "./Country.module.css";


function Country() {

  // import fetched data
  const { country } = useLoaderData();
  const currentCountry = country[0];

  // get shortname of border then fetches common name
  const [borderName, setBorderName] = useState([]);
  useEffect(() => {
    setBorderName([]);
    currentCountry.borders?.map((item) => {
      getBorderCountryName(item).then((data) => {
        setBorderName((borderName) => [...borderName, data.name.common]);
      });
    });
  }, [country]);

  // stored information of list values
  const countryInformation = {
    firstSection: [
      {
        title: "Native Name:",
        value: Object.entries(currentCountry.name.nativeName).at(-1)[1].common,
      },
      {
        title: "Population:",
        value: currentCountry.population,
      },
      {
        title: "Region:",
        value: currentCountry.region,
      },
      {
        title: "Sub Region:",
        value: currentCountry.subregion,
      },
      {
        title: "Capital:",
        value: currentCountry.capital,
      },
    ],
    secondSection: [
      {
        title: "Top Level Domain:",
        value: currentCountry?.tld[0],
      },
      {
        title: "Currencies:",
        value: Object.entries(currentCountry.currencies)[0][1].name,
      },
      {
        title: "Languages:",
        value: Object.values(currentCountry.languages).join(", "),
      },
    ],
  };

  // START
  return (
    <>
      {/* back button */}
      <BackButton spacing={styles["back-button"]} />
      {/* main content */}
      <EvenColumns
        // FIRST COLUMN
        firstColumn={
          <img className={styles.flag} src={currentCountry.flags.png} />
        }
        // SECOND COLUMN
        secondColumn={
          <div>
            {/* title */}
            <h2 className={styles.header}>{currentCountry.name.common}</h2>
            {/* body */}
            <div className={styles.body}>
              {/* country information list 1 */}
              <List value={countryInformation.firstSection} />
              {/* country information list 2 */}
              <List value={countryInformation.secondSection} />
            </div>
            {/* footer */}
            <div className={styles["footer"]}>
              {currentCountry.borders !== undefined && (
                <h3>Border Countries:</h3>
              )}
              
              {/* links to border countries */}
              <div className={styles["border-links__wrapper"]}>
                {currentCountry.borders?.map((borderCountry, index) => {
                  return (
                    <BorderCounryButton
                      key={crypto.randomUUID()}
                      link={`../${borderCountry}`}
                      value={borderName.length > 0 && borderName[index]}
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
