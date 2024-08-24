import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import "./AddItemModal.css";

function AddItemModal({
  handleCloseClick,
  handleOptionChange,
  isOpened,
  handleAddItem,
}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImgUrlChange = (e) => {
    setLink(e.target.value);
  };

  const resetForm = () => {
    setName("");
    setLink("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      imageUrl: link,
    };
    handleAddItem(e, data);
    resetForm();
  };

  const handleCloseModal = () => {
    resetForm();
    handleCloseClick();
  };

  if (!isOpened) return null;

  return (
    <ModalWithForm
      titleText="New garment"
      buttonText="Add garment"
      isOpened={isOpened}
      handleCloseClick={handleCloseModal}
      handleSubmit={handleSubmit}
      handleOptionChange={handleOptionChange}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <span className="modal__error"> (This is not an Email.)</span>
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={link}
          onChange={handleImgUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weathe type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleOptionChange}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleOptionChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleOptionChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
