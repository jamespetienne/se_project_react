import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import EditModal from "../EditModal/EditModal.jsx";
import ConfirmModal from "../ConfirmModal/ConfirmModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { coordinates, APIkey } from "../../utils/constants.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { Routes, Route } from "react-router-dom";
import {
  getItems,
  addItems,
  deleteItems,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import { signIn, signUp, checkToken, editProfile } from "../../utils/auth.js";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [currentUser, setCurrentUser] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);

  const handleAddClick = () => setActiveModal("add-garment");
  const handleLogInClick = () => setActiveModal("add-login");
  const closeActiveModal = () => setActiveModal("");
  const handleSignUpClick = () => setActiveModal("add-register");
  const handleEditClick = () => setActiveModal("edit");
  const toggleMobileMenu = () => setMobileMenuOpened((prev) => !prev);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleConfirmClick = () => {
    setActiveModal("confirm");
  };

  const handleCardLike = ({ _id }, isLiked) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("No token found.");
      return;
    }

    const action = isLiked ? removeCardLike : addCardLike;
    action(_id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
        })
        .catch((err) => console.error("Token check failed", err));
    }
  }, []);

  const onRegister = ({ name, avatar, email, password }) => {
    signUp(name, avatar, email, password)
      .then(() => {
        closeActiveModal();
        onSignIn({ email, password });
      })
      .catch((err) => {
        console.error("Registration failed", err);
      });
  };

  const onEdit = ({ name, avatar }) => {
    editProfile(name, avatar)
      .then((res) => {
        setCurrentUser(res);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Edit failed", err);
      });
  };

  const onSignIn = ({ email, password }) => {
    signIn(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          closeActiveModal();
          checkToken(res.token).then((userResponse) => {
            setCurrentUser(userResponse);
            setIsLoggedIn(true);
          });
        } else {
          throw new Error("Token not received");
        }
      })
      .catch((err) => console.error("Login failed", err));
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  const onAddItem = (item) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    addItems(item.name, item.link, item.weather.toLowerCase(), token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (item) => {
    const token = localStorage.getItem("jwt");
    if (!token || !selectedCard) return;

    deleteItems(item._id, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter((clothingItem) => clothingItem._id !== item._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((res) => {
        setWeatherData(filterWeatherData(res));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <div className="page">
        <div className="page__content">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header
              isLoggedIn={isLoggedIn}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleLogInClick={handleLogInClick}
              handleSignUpClick={handleSignUpClick}
              toggleMobileMenu={toggleMobileMenu}
              isMobileMenuOpened={isMobileMenuOpened}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    deleteCard={handleDeleteItem}
                    isLoggedIn={isLoggedIn}
                    isMobileMenuOpened={isMobileMenuOpened}
                  />
                }
              />
              <Route
                path="/main"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      deleteCard={handleDeleteItem}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onSignOut={onSignOut}
                      handleEditClick={handleEditClick}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <AddItemModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItem={onAddItem}
            />
            <ConfirmModal
              isOpen={activeModal === "confirm"}
              card={selectedCard}
              onConfirm={handleDeleteItem}
              closeActiveModal={closeActiveModal}
            />
            <EditModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "edit"}
              onEdit={onEdit}
              currentUser={currentUser}
            />
            <LoginModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "add-login"}
              handleRegisterModal={handleSignUpClick}
              onSignIn={onSignIn}
            />
            <RegisterModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "add-register"}
              onRegister={onRegister}
              handleLoginModal={handleLogInClick}
            />
            <ItemModal
              isOpened={activeModal === "preview"}
              selectedCard={selectedCard}
              handleCloseClick={closeActiveModal}
              openDeleteModal={handleConfirmClick}
            />

            <Footer />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
