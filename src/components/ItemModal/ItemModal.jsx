import { useState } from "react";
import React from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import "./ItemModal.css";
import close from "../../assets/close-white.png";

function ItemModal({
  isOpened,
  selectedCard,
  handleCloseClick,
  deleteModal,
  openDeleteModal,
  handleDeleteClose,
  handleDeleteItem,
}) {
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
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
          className="modal__card_image"
        />
        <div className="modal__footer">
          <h2 className="modal__card_name">{selectedCard.name}</h2>
          <p className="modal__card_weather">Weather: {selectedCard.weather}</p>
        </div>
        <div className="modal__footer_delete">
          <button
            type="button"
            className="modal__card_delete"
            onClick={openDeleteModal}
          >
            Delete Item
          </button>
        </div>
      </div>
      <DeleteModal
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
