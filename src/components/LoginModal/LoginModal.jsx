import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../Hooks/useForm.js";

const LoginModal = ({
  isOpen,
  closeActiveModal,
  handleRegisterModal,
  onSignIn,
}) => {
  const { values, handleChange } = useForm({ email: "", password: "" });

  const { email, password } = values;

  function handleSubmit(e) {
    e.preventDefault();
    onSignIn(values);
  }

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      name="login"
      title="Login"
      buttonText="Log in"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      spanText="or Sign Up"
      orModal={handleRegisterModal}
    >
      <label className="modal__label" htmlFor="login-email">
        Email
      </label>
      <input
        className="modal__input"
        type="text"
        name="email"
        id="login-email"
        placeholder="Email"
        value={email}
        onChange={handleChange}
        autoComplete="username"
      />
      <label className="modal__label" htmlFor="login-password">
        Password
      </label>
      <input
        className="modal__image"
        type="password"
        name="password"
        id="login-password"
        placeholder="Password"
        value={password}
        onChange={handleChange}
        autoComplete="current-password"
      />
    </ModalWithForm>
  );
};
export default LoginModal;
