import { useEffect, useState } from "react";

import citiesData from "../../constants/cities.json";
import SearchBox from "../modules/SearchBox";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const [cities, setCities] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [hint, setHint] = useState("");

  useEffect(() => {
    const search = citiesData.find((city) => city.startsWith(userInput));
    setHint(search);
    if (!userInput || !search) setHint("");
  }, [userInput]);

  const searchHandler = (value) => {
    const searchedData = citiesData.filter((city) => city.startsWith(value));
    setCities(searchedData);

    if (!value) setCities([]);
  };

  return (
    <div className={styles.container}>
      <SearchBox
        searchHandler={searchHandler}
        cities={cities}
        setCities={setCities}
        userInput={userInput}
        setUserInput={setUserInput}
        hint={hint}
      />

      <div className={styles.footer}>
        Challenge by :<a href="https://botostart.ir/">Botostart</a>| Coded by :
        <a href="https://github.com/sama-khodadady">Sama Khodadady</a>
      </div>
    </div>
  );
};

export default HomePage;
