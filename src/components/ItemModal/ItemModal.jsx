import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, closeActiveModal, card, deleteCard }) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!card || !currentUser) {
    return null;
  }

  const isOwn = card.owner === currentUser._id;

  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_open" : ""}`}>
      <div className="modal__content modal__content-type-image">
        <button
          type="button"
          onClick={closeActiveModal}
          className=" modal__close_type_image"
        ></button>

        <img
          className="modal__preview_image"
          src={card.imageUrl}
          alt={card.name}
        />
        <div className="modal__footer">
          <div className="modal__wrapper">
            <h2 className="modal__caption">{card.name}</h2>
            <button
              onClick={deleteCard}
              className={itemDeleteButtonClassName}
              type="button"
            >
              Delete Item
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
