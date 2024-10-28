import "./Header.css";

import logo from "../../assets/logo.png";
import menu from "../../assets/menu-icon.png";
import close from "../../assets/close-gray.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({
  handleAddClick,
  handleLogInClick,
  handleSignUpClick,
  weatherData,
  isLoggedIn,
  toggleMobileMenu,
  isMobileMenuOpened,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  //DATE
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const profileLogin = (isLoggedIn) => {
    if (isLoggedIn && currentUser) {
      return (
        <>
          <button
            className="header__add-clothes-btn"
            type="button"
            onClick={handleAddClick}
          >
            +Add Clothes
          </button>
          <p className="header__username">{currentUser.name}</p>
          <Link to="/profile">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt="User Avatar"
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">
                {getInitials(currentUser.name)}
              </div>
            )}
          </Link>
        </>
      );
    } else {
      return (
        <>
          <button
            className="header__sign-up-btn"
            type="button"
            onClick={handleSignUpClick}
          >
            Sign Up
          </button>
          <button
            className="header__log-in-btn"
            type="button"
            onClick={handleLogInClick}
          >
            Log In
          </button>
        </>
      );
    }
  };

  return (
    <header className="header">
      <nav
        className={`header__nav ${
          isMobileMenuOpened ? "header__nav_mobile" : ""
        }`}
      >
        <Link to="/">
          <img src={logo} alt="Logo" className="header__logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
        {isMobileMenuOpened ? (
          <button className=" header__menu_close" type="button">
            <img
              src={close}
              alt="close-icon"
              className="  header__menu_close_img"
              onClick={toggleMobileMenu}
            />
          </button>
        ) : (
          <button className="header__menu" type="button">
            <img
              src={menu}
              alt="menu-icon"
              className="header__menu_img"
              onClick={toggleMobileMenu}
            />
          </button>
        )}

        <div className="header__user-container">
          <ToggleSwitch />

          {profileLogin(isLoggedIn)}
        </div>
      </nav>
    </header>
  );
}

export default Header;
