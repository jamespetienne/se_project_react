import "./App.css";
import { useState, useEffect } from "react";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999 },
    city: "",
    isDay: true,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

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

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        console.log(filterData);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleAddClick={handleAddClick}
          weatherData={weatherData}
          toggleMobileMenu={toggleMobileMenu}
          isMobileMenuOpened={isMobileMenuOpened}
          handleCloseClick={handleCloseClick}
        />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          isMobileMenuOpened={isMobileMenuOpened}
        />
        <Footer />
      </div>

      <ModalWithForm
        titleText="New garment"
        buttonText="Add garment"
        isOpened={activeModal === "add-garment"}
        handleCloseClick={handleCloseClick}
      >
        {" "}
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image
          <span className="modal__error"> (This is not an Email.)</span>
          <input
            type="link"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weathe type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              className="modal__radio-input"
              value="1"
              checked={selectedOption === "1"}
              onChange={handleOptionChange}
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              type="radio"
              className="modal__radio-input"
              value="2"
              checked={selectedOption === "2"}
              onChange={handleOptionChange}
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              type="radio"
              className="modal__radio-input"
              value="3"
              checked={selectedOption === "3"}
              onChange={handleOptionChange}
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        isOpened={activeModal === "preview"}
        selectedCard={selectedCard}
        handleCloseClick={handleCloseClick}
      />
    </div>
  );
}

export default App;
