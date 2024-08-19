// import "./App.css";
// import { useState, useEffect } from "react";
// import { coordinates, APIkey } from "../../utils/constants";
// import Header from "../Header/Header";
// import Main from "../Main/Main";
// import Footer from "../Footer/Footer";
// import AddItemModal from "../AddItemModal/AddItemModal";
// import ItemModal from "../ItemModal/ItemModal";
// import { getWeather, filterWeatherData } from "../../utils/weatherApi";
// import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";

// function App() {
//   const [weatherData, setWeatherData] = useState({
//     type: "cold",
//     temp: { F: 999 },
//     city: "",
//     isDay: true,
//   });
//   const [activeModal, setActiveModal] = useState("");
//   const [selectedCard, setSelectedCard] = useState({});
//   const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

//   const handleCardClick = (selectedCard) => {
//     setActiveModal("preview");
//     setSelectedCard(selectedCard);
//   };

//   const handleAddClick = () => {
//     setActiveModal("add-garment");
//   };

//   const handleCloseClick = () => {
//     setActiveModal("");
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpened((prev) => !prev);
//   };

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const handleToggleSwitchChange = () => {
//     if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
//     if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
//   };

//   useEffect(() => {
//     getWeather(coordinates, APIkey)
//       .then((data) => {
//         const filterData = filterWeatherData(data);
//         console.log(filterData);
//         setWeatherData(filterData);
//       })
//       .catch(console.error);
//   }, []);

//   return (
//     <div className="page">
//       <div className="page__content">
//         <CurrentTemperatureUnitContext.Provider
//           value={{ currentTemperatureUnit, handleToggleSwitchChange }}
//         >
//           <Header
//             handleAddClick={handleAddClick}
//             weatherData={weatherData}
//             toggleMobileMenu={toggleMobileMenu}
//             isMobileMenuOpened={isMobileMenuOpened}
//             handleCloseClick={handleCloseClick}
//           />
//           <Main
//             weatherData={weatherData}
//             handleCardClick={handleCardClick}
//             isMobileMenuOpened={isMobileMenuOpened}
//           />
//           <Footer />
//           <AddItemModal />
//           <ItemModal
//             isOpened={activeModal === "preview"}
//             selectedCard={selectedCard}
//             handleCloseClick={handleCloseClick}
//           />
//         </CurrentTemperatureUnitContext.Provider>
//       </div>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
// import { getItems, addItem, deleteItem } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999, C: 999 },
    city: "",
    isDay: true,
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardClick = (selectedCard) => {
    setActiveModal("preview");
    setSelectedCard(selectedCard);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCloseClick = () => {
    setActiveModal("");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpened((prev) => !prev);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);

    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  const handleAddItemSubmit = (newItem) => {
    addItem(newItem)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
      })
      .catch(console.error);
  };

  const handleCardDelete = (item) => {
    deleteItem(item._id)
      .then(() => {
        setClothingItems(clothingItems.filter((i) => i._id !== item._id));
      })
      .catch(console.error);
  };

  return (
    <Router>
      <div className="page">
        <div className="page__content">
          <CurrentTemperatureUnitContext.Provider
            value={{
              currentTemperatureUnit,
              handleToggleSwitchChange,
            }}
          >
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              toggleMobileMenu={toggleMobileMenu}
              isMobileMenuOpened={isMobileMenuOpened}
              handleCloseClick={handleCloseClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    isMobileMenuOpened={isMobileMenuOpened}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    clothingItems={clothingItems}
                    onAddItem={handleAddItemSubmit}
                    onDeleteItem={handleCardDelete}
                  />
                }
              />
            </Routes>
            <Footer />
            {activeModal === "add-garment" && (
              <AddItemModal
                isOpen={activeModal === "add-garment"}
                onAddItem={handleAddItemSubmit}
                onCloseModal={handleCloseClick}
              />
            )}
            {activeModal === "preview" && (
              <ItemModal
                isOpened={activeModal === "preview"}
                selectedCard={selectedCard}
                handleCloseClick={handleCloseClick}
                onDeleteItem={handleCardDelete}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </Router>
  );
}

export default App;
