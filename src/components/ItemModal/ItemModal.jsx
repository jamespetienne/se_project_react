// import "./ItemModal.css";
// import close from "../../assets/close-white.png";

// function ItemModal({ isOpened, selectedCard, handleCloseClick }) {
//   return (
//     <div className={`modal ${isOpened && "modal_opened"}`}>
//       <div className="modal__container modal__content_type_image">
//         <button className="modal__close" type="button">
//           <img
//             src={close}
//             alt="close-button"
//             className="modal__close-image"
//             onClick={handleCloseClick}
//           />
//         </button>
//         <img
//           src={selectedCard.link}
//           alt={selectedCard.name}
//           className="modal__card_image"
//         />
//         <div className="modal__footer">
//           <h2 className="modal__card_name">{selectedCard.name}</h2>
//           <p className="modal__card_weather">Weather: {selectedCard.weather}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ItemModal;

import React from "react";
import "./ItemModal.css";
import close from "../../assets/close-white.png";

function ItemModal({ isOpened, selectedCard, handleCloseClick, onDeleteItem }) {
  const handleDeleteClick = () => {
    onDeleteItem(selectedCard);
    handleCloseClick();
  };

  return (
    <div className={`modal ${isOpened && "modal_opened"}`}>
      <div className="modal__container modal__content_type_image">
        <button className="modal__close" type="button">
          <img
            src={close}
            alt="close-button"
            className="modal__close-image"
            onClick={handleCloseClick}
          />
        </button>
        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="modal__card_image"
        />
        <div className="modal__footer">
          <h2 className="modal__card_name">{selectedCard.name}</h2>
          <p className="modal__card_weather">Weather: {selectedCard.weather}</p>
          <button className="modal__delete-button" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
