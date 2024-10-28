// import "./ItemModal.css";
// import { useContext } from "react";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// function ItemModal({ activeModal, closeActiveModal, card, deleteCard }) {
//   const { currentUser } = useContext(CurrentUserContext);

//   if (!card || !currentUser) {
//     return null;
//   }

//   const isOwn = card.owner === currentUser._id;

//   const itemDeleteButtonClassName = `item__delete-button ${
//     isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
//   }`;

//   return (
//     <div className={`modal ${activeModal === "preview" ? "modal_open" : ""}`}>
//       <div className="modal__content modal__content-type-image">
//         <button
//           type="button"
//           onClick={closeActiveModal}
//           className=" modal__close_type_image"
//         ></button>

//         <img
//           className="modal__preview_image"
//           src={card.imageUrl}
//           alt={card.name}
//         />
//         <div className="modal__footer">
//           <div className="modal__wrapper">
//             <h2 className="modal__caption">{card.name}</h2>
//             <button
//               onClick={deleteCard}
//               className={itemDeleteButtonClassName}
//               type="button"
//             >
//               Delete Item
//             </button>
//           </div>
//           <p className="modal__weather">Weather: {card.weather}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ItemModal;

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
  if (!selectedCard || !currentUser) {
    return null;
  }

  const isOwn = selectedCard.owner === currentUser._id;

  return (
    <div className={`modal ${isOpened ? "modal_opened" : ""}`}>
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
