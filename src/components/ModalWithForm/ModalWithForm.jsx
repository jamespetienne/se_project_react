import "./ModalWithForm.css";
import union from "../../assets/Union.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  handleCloseClick,
}) {
  return (
    <div className={'modal ${activeModal && "modal_opened"}'}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img className="close__btn" src={union} alt="close" />
        </button>
        <form className="modal__form">
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
