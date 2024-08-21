import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleCardClick, clothingItems, onAddItem }) {
  return (
    <div className="clothes-section">
      <div className="section__title_btn">
        <p>Your items</p>
        <button
          className="header__add-clothes-btn"
          type="button"
          onClick={onAddItem}
        >
          + Add New
        </button>
      </div>
      <ul className="cards__list">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            handleCardClick={handleCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
