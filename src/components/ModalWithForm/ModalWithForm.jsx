import "./ModalWithForm.css";
import close from "../../assets/close-gray.svg";

function ModalWithForm({
  children,
  titleText,
  buttonText,
  handleCloseClick,
  isOpened,
  handleSubmit,
}) {
  return (
    <div className={`modal ${isOpened && "modal_opened"}`}>
      <div className="modal__container">
        <button className="modal__close" type="button">
          <img
            src={close}
            alt="close-button"
            className="modal__close-image"
            onClick={handleCloseClick}
          />
        </button>

        <p className="modal__title">{titleText}</p>
        <form onSubmit={handleSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
