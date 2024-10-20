import { useContext } from "react";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onSignOut, handleEditClick }) {
  function handleSignOut(e) {
    e.preventDefault();
    onSignOut();
  }
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar-page">
      <div className="sidebar__username-wrapper">
        <img
          src={currentUser.avatar}
          alt="App Profile Image"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <button
        className="sidebar__change-prof"
        type="button"
        onClick={handleEditClick}
      >
        Change profile data
      </button>
      <button
        className="sidebar__signout-btn"
        type="button"
        onClick={handleSignOut}
      >
        Log out
      </button>
    </div>
  );
}
export default SideBar;
