import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ handleCardClick, clothingItems, onAddItem, onDeleteItem }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          onAddItem={onAddItem}
          onDeleteItem={onDeleteItem}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
