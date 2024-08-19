// import React from "react";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";
// import "./AddItemModal.css";

// const AddItemModal = ({
//   handleCloseClick,
//   handleOptionChange,
//   selectedOption,
// }) => {
//   return (
//     <ModalWithForm
//       titleText="New garment"
//       buttonText="Add garment"
//       isOpened={activeModal === "add-garment"}
//       handleCloseClick={handleCloseClick}
//     >
//       {" "}
//       <label htmlFor="name" className="modal__label">
//         Name
//         <input
//           type="text"
//           className="modal__input"
//           id="name"
//           placeholder="Name"
//         />
//       </label>
//       <label htmlFor="imageUrl" className="modal__label">
//         Image
//         <span className="modal__error"> (This is not an Email.)</span>
//         <input
//           type="link"
//           className="modal__input"
//           id="imageUrl"
//           placeholder="Image URL"
//         />
//       </label>
//       <fieldset className="modal__radio-buttons">
//         <legend className="modal__legend">Select the weathe type:</legend>
//         <label htmlFor="hot" className="modal__label modal__label_type_radio">
//           <input
//             id="hot"
//             type="radio"
//             className="modal__radio-input"
//             value="1"
//             checked={selectedOption === "1"}
//             onChange={handleOptionChange}
//           />
//           Hot
//         </label>
//         <label htmlFor="warm" className="modal__label modal__label_type_radio">
//           <input
//             id="warm"
//             type="radio"
//             className="modal__radio-input"
//             value="2"
//             checked={selectedOption === "2"}
//             onChange={handleOptionChange}
//           />
//           Warm
//         </label>
//         <label htmlFor="cold" className="modal__label modal__label_type_radio">
//           <input
//             id="cold"
//             type="radio"
//             className="modal__radio-input"
//             value="3"
//             checked={selectedOption === "3"}
//             onChange={handleOptionChange}
//           />
//           Cold
//         </label>
//       </fieldset>
//     </ModalWithForm>
//   );
// };

// export default AddItemModal;

import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);
  const handleWeatherChange = (e) => setWeather(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
    onCloseModal();
  };

  return (
    <ModalWithForm
      titleText="New garment"
      buttonText="Add garment"
      isOpened={isOpen}
      handleCloseClick={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="link"
          className="modal__input"
          id="imageUrl"
          value={imageUrl}
          onChange={handleImageUrlChange}
          placeholder="Image URL"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            checked={weather === "hot"}
            onChange={handleWeatherChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            value="warm"
            checked={weather === "warm"}
            onChange={handleWeatherChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            checked={weather === "cold"}
            onChange={handleWeatherChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
