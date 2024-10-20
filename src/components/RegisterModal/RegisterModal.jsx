import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../Hooks/useForm.js";

const RegisterModal = ({
  isOpen,
  closeActiveModal,
  onRegister,
  handleLoginModal,
}) => {
  const { values, handleChange } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const { name, avatar, email, password } = values;

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      name="signup"
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      spanText="or Log In"
      onSubmit={handleSubmit}
      orModal={handleLoginModal}
    >
      <label className="modal__label" htmlFor="register-email">
        Email*
      </label>
      <input
        className="modal__input"
        type="email"
        name="email"
        id="register-email"
        placeholder="Email"
        value={email}
        onChange={handleChange}
        required
        autoComplete="username"
      />
      <label className="modal__label" htmlFor="register-password">
        Password*
      </label>
      <input
        className="modal__image"
        type="password"
        name="password"
        id="register-password"
        placeholder="Password"
        value={password}
        onChange={handleChange}
        required
        autoComplete="new-password"
      />
      <label className="modal__label" htmlFor="register-name">
        Name
      </label>
      <input
        className="modal__input"
        type="text"
        name="name"
        id="register-name"
        placeholder="Name"
        value={name}
        onChange={handleChange}
        required
      />
      <label className="modal__label" htmlFor="register-avatar">
        Avatar URL
      </label>
      <input
        className="modal__input"
        type="url"
        name="avatar"
        id="register-avatar"
        placeholder="Avatar URL"
        value={avatar}
        onChange={handleChange}
        required
      />
    </ModalWithForm>
  );
};
export default RegisterModal;
