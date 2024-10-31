import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useForm } from "../../Hooks/useForm.js";

const EditModal = ({ isOpen, closeActiveModal, onEdit, currentUser }) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  // Update form values with current user data when modal opens
  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  const { name, avatar } = values;

  function handleSubmit(e) {
    e.preventDefault();
    onEdit(values);
    closeActiveModal(); // Close modal after submission
  }

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      name="edit"
      title="Change Profile Data"
      buttonText="Edit Item"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="edit-name">
        Name
      </label>
      <input
        className="modal__input"
        type="text"
        name="name"
        id="edit-name"
        placeholder="Name"
        value={name}
        onChange={handleChange}
        required
      />
      <label className="modal__label" htmlFor="edit-avatar">
        Image
      </label>
      <input
        className="modal__image"
        type="text"
        name="avatar"
        id="edit-avatar"
        placeholder="Image"
        value={avatar}
        onChange={handleChange}
        required
      />
    </ModalWithForm>
  );
};

export default EditModal;
