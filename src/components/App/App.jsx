import "./App.css";
import { useState, useEffect } from "react";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";
import { Routes, Route } from "react-router-dom";
import { getItems, postItem, deleteItem } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999, C: 999 },
    city: "",
    isDay: true,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [deleteModal, setDeleteModal] = useState("");

  const handleCardClick = (selectedCard) => {
    setActiveModal("preview");
    setSelectedCard(selectedCard);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpened((prev) => !prev);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  const handleAddItem = (e, data = { name: "", imageUrl: "" }) => {
    e.preventDefault();
    const newClothingItem = {
      name: data.name,
      imageUrl: data.imageUrl,
      weather: selectedOption,
    };

    postItem(newClothingItem)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => console.error("Failed to post item:", err));
  };

  const handleDeleteItem = (item) => {
    deleteItem(item)
      .then(() => {
        setClothingItems(
          clothingItems.filter((clothingItem) => clothingItem._id !== item._id)
        );
        handleDeleteClose();
        handleCloseModal();
      })
      .catch(console.error);
  };

  const openDeleteModal = () => {
    setDeleteModal("delete");
  };

  const handleDeleteClose = () => {
    setDeleteModal("");
  };

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            toggleMobileMenu={toggleMobileMenu}
            isMobileMenuOpened={isMobileMenuOpened}
            handleCloseClick={handleCloseModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  isMobileMenuOpened={isMobileMenuOpened}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                  onDeleteItem={handleDeleteItem}
                />
              }
            />
          </Routes>

          <Footer />

          {activeModal === "add-garment" && (
            <AddItemModal
              handleCloseClick={handleCloseModal}
              handleOptionChange={handleOptionChange}
              selectedOption={selectedOption}
              isOpened={activeModal === "add-garment"}
              handleAddItem={handleAddItem}
            />
          )}

          <ItemModal
            isOpened={activeModal === "preview"}
            selectedCard={selectedCard}
            handleCloseClick={handleCloseModal}
            deleteModal={deleteModal}
            openDeleteModal={openDeleteModal}
            handleDeleteClose={handleDeleteClose}
            handleDeleteItem={handleDeleteItem}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </div>
  );
}

export default App;
