// import "./WeatherCard.css";
// import { weatherOptions, defaultWeatherOption } from "../../utils/constants";

// function WeatherCard({ weatherData }) {
//   const filteredOption = weatherOptions.filter((option) => {
//     return (
//       option.day === weatherData.isDay &&
//       option.condition === weatherData.condition
//     );
//   });

//   let weatherOption;
//   if (filteredOption.length === 0) {
//     weatherOption = defaultWeatherOption[weatherData.isDay ? "day" : "night"];
//   } else {
//     weatherOption = filteredOption[0];
//   }

//   return (
//     <section className="weather-card">
//       <p className="weather-card__temp">{weatherData.temp.F}° F</p>
//       <img
//         src={weatherOption?.url}
//         alt={`${weatherOption ? "day" : "night"} time ${
//           weatherOption?.condition
//         }`}
//         className="weather-card__image"
//       />
//     </section>
//   );
// }

// export default WeatherCard;

import React, { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOption } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOption = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOption.length === 0) {
    weatherOption = defaultWeatherOption[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOption[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}° {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`${weatherOption ? "day" : "night"} time ${
          weatherOption?.condition
        }`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
