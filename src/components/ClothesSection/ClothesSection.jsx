import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="clothesSection__page">
      <div className="clothesSection__nav">
        <p className="clothesSection__title">Your Items</p>
        <button
          className="clothesSection__add-new-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>

      <ul className="clothesSection__list">
        {clothingItems
          .filter((item) => item.owner === currentUser._id)
          .map((item, index) => (
            <ItemCard
              onCardClick={handleCardClick}
              key={`${item._id}-${index}`}
              item={item}
              onCardLike={onCardLike}
            />
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
