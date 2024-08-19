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

import "./ItemModal.css";
import closeBtn from "../../assets/cls-btn.svg";

function ItemModal({ activeModal, handleCloseClick, card, openDeleteModal }) {
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={closeBtn} alt="close button" className="modal__close-btn" />
        </button>
        <img src={card.imageUrl} alt="Image" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        <button
          onClick={() => {
            openDeleteModal();
          }}
          className="card-item__delete-btn"
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
