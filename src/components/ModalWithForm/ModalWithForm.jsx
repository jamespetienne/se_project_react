import "./ModalWithForm.css";
import close from "../../assets/close-gray.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  closeActiveModal,
  orModal,
  onSubmit,
  spanText,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__container">
        <form className="modal__form" onSubmit={onSubmit}>
          <h2 className="modal__title">{title}</h2>
          <button type="button" className="modal__close">
            <img src={close} alt="close-button" onClick={closeActiveModal} />
          </button>
          {children}
          <div className="modal__login-wrapper">
            <button className="modal__submit-button" type="submit">
              {buttonText}
            </button>
            <button
              className="modal__span-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Switching Modals");
                orModal();
              }}
            >
              {spanText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
