import "./ItemModal.css";
import close from "../../assets/close-white.png";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({
  isOpened,
  selectedCard,
  handleCloseClick,
  deleteModal,
  openDeleteModal,
  handleDeleteClose,
  handleDeleteItem,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  if (!selectedCard || !isOpened) {
    return null;
  }

  const isOwn = selectedCard.owner === currentUser._id;
  console.log(selectedCard);

  return (
    <div className={`modal ${isOpened ? "modal_open" : ""}`}>
      <div className="modal__container modal__content_type_image">
        <button
          className="modal__close"
          type="button"
          onClick={handleCloseClick}
        >
          <img src={close} alt="close-button" className="modal__close-image" />
        </button>
        <img
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
          className="modal__card_image"
        />
        <div className="modal__footer">
          <div className="modal__footer_title">
            <h2 className="modal__card_name">{selectedCard.name}</h2>
            <p className="modal__card_weather">
              Weather: {selectedCard.weather}
            </p>
          </div>
          <div className="modal__footer_delete">
            {isOwn && (
              <button
                type="button"
                className="modal__card_delete"
                onClick={openDeleteModal}
              >
                Delete Item
              </button>
            )}
          </div>
        </div>
      </div>
      <ConfirmModal
        item={selectedCard}
        isOpened={deleteModal === "delete"}
        handleCloseClick={handleDeleteClose}
        handleDeleteItem={handleDeleteItem}
        handleDeleteClose={handleDeleteClose}
      />
    </div>
  );
}

export default ItemModal;
