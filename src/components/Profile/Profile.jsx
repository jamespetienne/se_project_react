import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  weatherData,
  handleCardClick,
  clothingItems,
  handleAddClick,
  onSignOut,
  handleEditClick,
  onCardLike,
}) {
  return (
    <div className="profile__page">
      <SideBar
        weatherData={weatherData}
        onSignOut={onSignOut}
        handleEditClick={handleEditClick}
      />

      <ClothesSection
        weatherData={weatherData}
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        onCardLike={onCardLike}
      />
    </div>
  );
}
export default Profile;
