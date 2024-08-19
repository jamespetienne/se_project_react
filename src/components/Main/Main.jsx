// import "./Main.css";
// import WeatherCard from "../WeatherCard/WeatherCard";
// import { defaultClothingItems } from "../../utils/constants";
// import ItemCard from "../ItemCard/ItemCard";

// function Main({ weatherData, handleCardClick, isMobileMenuOpened }) {
//   return (
//     <main>
//       {isMobileMenuOpened ? <></> : <WeatherCard weatherData={weatherData} />}

//       <section className="cards">
//         <p className="cards__text">
//           Today is {weatherData.temp.F}° F / You may want to wear:
//         </p>
//         <ul className="cards__list">
//           {defaultClothingItems
//             .filter((item) => {
//               return item.weather === weatherData.type;
//             })
//             .map((item) => {
//               return (
//                 <ItemCard
//                   key={item._id}
//                   item={item}
//                   handleCardClick={handleCardClick}
//                 />
//               );
//             })}
//         </ul>
//       </section>
//     </main>
//   );
// }

// export default Main;

import React, { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, isMobileMenuOpened }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      {isMobileMenuOpened ? <></> : <WeatherCard weatherData={weatherData} />}

      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}°{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  handleCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
