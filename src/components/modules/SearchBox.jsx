import { useEffect, useState } from "react";
import { cityData } from "../../services/cityData";

import CityImage from "../modules/CityImage";

import styles from "./SearchBox.module.css";

const SearchBox = ({
  searchHandler,
  cities,
  setCities,
  userInput,
  setUserInput,
  hint,
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showImage, setShowImage] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (showImage) {
        try {
          const res = await fetch(cityData(userInput));
          const json = await res.json();
          console.log(json);

          if (json.inline_images) {
            setImages(json.inline_images);
          } else {
            setImages([]);
            console.log("inline_images not found in the response");
          }
        } catch (error) {
          console.error("Error fetching city data:", error);
          setImages([]);
        }
      }
    };

    getData();
  }, [showImage]);

  const changHandler = (event) => {
    setShowImage(false);
    setUserInput(event.target.value);
    searchHandler(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      if (activeIndex < cities.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        setUserInput(cities[activeIndex]);
        setCities([]);
        setActiveIndex(-1);
        setShowImage(true);
      }
    }
  };

  return (
    <div className={styles.search}>
      <h1>Find Your Heaven! </h1>
      <div className={styles.inputDiv}>
        <input
          type="text"
          value={userInput}
          placeholder="Search City"
          onChange={changHandler}
          onKeyDown={handleKeyDown}
        />
        <input className={styles.hint} type="text" value={hint} readOnly />
      </div>

      {!!cities.length && (
        <div className={styles.suggestionDiv}>
          <ul>
            {cities.map((city, index) => (
              <li
                key={index}
                className={index === activeIndex ? styles.active : null}
                onClick={() => {
                  setUserInput(city);
                  setCities([]);
                  setShowImage(true);
                }}
              >
                <span className={styles.highlighted}>
                  {city.substr(0, userInput.length)}
                </span>
                {city.substr(userInput.length)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showImage && <CityImage images={images} />}
    </div>
  );
};

export default SearchBox;
