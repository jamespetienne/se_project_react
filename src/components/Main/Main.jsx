import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import React from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  onCardLike,
  deleteCard,
}) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "C"
            ? weatherData.temp.C + "°C"
            : weatherData.temp.F + "°F"}{" "}
          / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  onCardClick={handleCardClick}
                  key={item._id}
                  item={item}
                  onCardLike={onCardLike}
                  deleteCard={deleteCard}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
