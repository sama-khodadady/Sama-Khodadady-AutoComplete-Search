const BASE_URL = "https://serpapi.com/search";
const API_KEY =
  "54b146815885afa3a1e766379d2034c60498eea6d5534b9449a7d737e9092db8";

const cityData = (city) =>
  `${BASE_URL}.json?engine=google&q=${city}&api_key=${API_KEY}`;

export { cityData };
