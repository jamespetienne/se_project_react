import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import AddItemModal from "../AddItemModal/AddItemModal";
import "./ClothesSection.css";

const ClothesSection = ({ clothingItems, onAddItem, onDeleteItem }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="clothes-section">
      <button className="clothes-section__add-button" onClick={handleAddClick}>
        + Add Clothes
      </button>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
      {isModalOpen && (
        <AddItemModal
          isOpen={isModalOpen}
          onAddItem={onAddItem}
          onCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ClothesSection;
