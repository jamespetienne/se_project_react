import "./ConfirmModal.css";
import close from "../../assets/close-gray.png";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function ConfirmModal({ isOpen, closeActiveModal, card, onConfirm }) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!card || !currentUser) {
    return null;
  }

  const handleDeleteClick = (e) => {
    e.preventDefault();
    onConfirm(card);
  };

  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <form
        className="modal__form modal__container modal__form-delete"
        onSubmit={onConfirm}
      >
        <button
          type="button"
          onClick={closeActiveModal}
          className="modal__close"
        >
          <img src={close} alt="close-button" onClick={closeActiveModal} />
        </button>
        <h2 className="modal__title-delete">
          Are you sure you want to delete this item? <br></br>This action is
          irreversible{" "}
        </h2>

        <button
          className="modal__confirm-button"
          onClick={handleDeleteClick}
          type="submit"
        >
          Yes, delete item
        </button>
        <button
          type="button"
          className="modal__span-button"
          onClick={closeActiveModal}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ConfirmModal;
