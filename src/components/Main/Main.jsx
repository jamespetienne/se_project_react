import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import React from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

function Main({
  weatherData,
  handleCardClick,
  isMobileMenuOpened,
  clothingItems,
  onCardLike,
  deleteCard,
  isLoggedIn,
}) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <main>
      {isMobileMenuOpened ? <></> : <WeatherCard weatherData={weatherData} />}

      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} °
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item, index) => {
              return (
                <ItemCard
                  onCardClick={handleCardClick}
                  key={`${item._id}-${index}`}
                  item={item}
                  onCardLike={onCardLike}
                  isLoggedIn={isLoggedIn}
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
