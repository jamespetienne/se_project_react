import "./ConfirmModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function ConfirmModal({
  isOpen,
  closeActiveModal,
  card,
  onConfirm,
  deleteCard,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!card || !currentUser) {
    return null;
  }

  const handleDeleteClose = (e) => {
    console.log(card);
    e.preventDefault();
    deleteCard(card._id);
  };

  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <form className="modal__form" onSubmit={onConfirm}>
        <h2 className="modal__title">
          Are you sure you want to delete this item? This action is irreversible{" "}
        </h2>
        <button
          type="button"
          onClick={closeActiveModal}
          className="modal__close"
        ></button>
        <div className="modal__login-wrapper">
          <button
            className="modal__confirm-button"
            onClick={handleDeleteClose}
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
        </div>
      </form>
    </div>
  );
}

export default ConfirmModal;
